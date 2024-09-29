from flask import Flask, render_template, send_from_directory, request, redirect, url_for, flash, session as flask_session
import os
from werkzeug.security import generate_password_hash, check_password_hash
# from deepface import DeepFace
from database import User, RegisterModel, LoginModel, engine
from sqlmodel import Session as db_session, select
from pydantic import ValidationError
# import mediapipe as mp
# from mediapipe.tasks import python
# from mediapipe.tasks.python import vision
from datetime import datetime
import humanize
from src.face_analysis import FaceAnalysis
from src.object_detection import YOLOv8
from utils.image import encode_image
from PIL import Image
import numpy as np


app = Flask("Analyze Face")
app.config["UPLOAD_FOLDER"] = './uploads'
app.config["ALLOWED_EXTENSIONS"] = {'png', 'jpg', 'jpeg'}
app.secret_key = '000'

model_path = "models/pose_landmarker_lite.task"
face_analysis = FaceAnalysis("models/det_10g.onnx", "models/genderage.onnx")
object_detector = YOLOv8("models/yolov8n.onnx")

def auth(email, password):
    with db_session(engine) as session:
        statement = select(User).where(User.email == email)
        user = session.exec(statement).first()
        if user and check_password_hash(user.password, password):
            return user
    return False

def allowed_files(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config["ALLOWED_EXTENSIONS"]


def relative_time(dt):
    # Check if the input is a string and convert to datetime object
    if isinstance(dt, str):
        dt = datetime.strptime(dt, '%Y-%m-%d %H:%M:%S.%f')
    
    # Use humanize to convert the datetime object into a human-readable format
    return humanize.naturaltime(dt)
# Example usage
# datetime_str = "2024-06-21 13:21:20.975970"
# print(relative_time(datetime_str))  # Output example: "2 months ago"

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/login", methods=['GET', 'POST'])
def login():
    if request.method == "POST":

        action = request.form.get("action")
        email = request.form["email"]
        password = request.form["password"]

        if action == "login":
            user = auth(email, password)
            if user:
                flask_session['email'] = user.email
                flask_session['role'] = user.role
                flash("Login successful", "info")
                return redirect(url_for("dashboard"))
            else:
                flash("Invalid email or password", "warning")
                return redirect(url_for("login"))

        elif action == "register":
            
            with db_session(engine) as session:
                statement = select(User).where(User.email == email)
                user = session.exec(statement).first()
                if user:
                    flash("Email already registered", "danger")
                    return redirect(url_for("login"))
                
                try:
                    register_data = RegisterModel(
                        first_name=request.form["first_name"],
                        last_name=request.form["last_name"],
                        email=email,
                        age=int(request.form["age"]),
                        city=request.form["city"],
                        country=request.form["country"],
                        password=password,
                        confirm_password=request.form["confirm_password"]
                    )
                except ValidationError as e:
                    error_messages = [err['msg'] for err in e.errors()]
                    for msg in error_messages:
                        flash(f"Validation Error: {msg}", "danger")
                    return redirect(url_for("login"))
                
                hashed_password = generate_password_hash(password)
                role = request.form["role"]

                new_user = User(
                    first_name=register_data.first_name,
                    last_name=register_data.last_name,
                    email=register_data.email,
                    age=register_data.age,
                    city=register_data.city,
                    country=register_data.country,
                    password=hashed_password,
                    role=role
                )
                session.add(new_user)
                session.commit()
                flash("Registered successfully! Please log in.", "success")
                return redirect(url_for("login"))

    return render_template("login.html")

@app.route("/ai-face-analysis", methods=["GET", "POST"])
def ai_face_analysis():
    if 'email' not in flask_session:
        flash("Please log in to upload images", "warning")
        return redirect(url_for("login"))

    if request.method == 'POST':
        image = request.files['image']
        if image.filename == "":
            flash("No selected file", "warning")
            return redirect(url_for("ai_face_analysis"))

        if image and allowed_files(image.filename):
            try:
                input_image = Image.open(image.stream)
                input_image = np.array(input_image)
                output_image, genders, ages = face_analysis.detect_age_gender(input_image)
                image_uri = encode_image(output_image)


                # os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)
                # save_path = os.path.join(app.config["UPLOAD_FOLDER"], image.filename)
                # image.save(save_path)
                # result = DeepFace.analyze(img_path=save_path, actions=["age"])
                return render_template("ai_face_analysis.html", genders=genders, ages=ages, image_uri=image_uri)
            except Exception as e:
                flash(f"Error processing image: {e}", "danger")
                return redirect(url_for("ai_face_analysis"))
        flash("File type not allowed", "warning")
        return redirect(url_for("ai_face_analysis"))
    
    return render_template("ai_face_analysis.html")


@app.route("/ai-object-detection", methods=["GET", "POST"])
def ai_object_detection():
    if 'email' not in flask_session:
        flash("Please log in to upload images", "warning")
        return redirect(url_for("login"))
    if request.method == "GET":
        return render_template("ai_object_detection.html")
    elif request.method == "POST":
        input_image_file = request.files['image']
        if input_image_file.filename == "":
            return redirect(url_for('ai_object_detection'))
        else:
            if input_image_file and allowed_files(input_image_file.filename):
                input_image = Image.open(input_image_file.stream)
                input_image = np.array(input_image)
                output_image, labels = object_detector(input_image)
                image_uri = encode_image(output_image)
                return render_template("ai_object_detection.html", labels=labels, image_uri=image_uri)
    else:
        return redirect(url_for("index"))




def calculate_bmr(weight, height, age, gender):
    if gender == 'male':
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
    else:
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age)
    return bmr

@app.route("/bmr", methods=["GET", "POST"])
def bmr():
    if 'email' not in flask_session:
        flash("Please log in to use BMR calculator", "warning")
        return redirect(url_for("login"))

    if request.method == "POST":
        weight = float(request.form["weight"])
        height = float(request.form["height"])
        age = int(request.form["age"])
        gender = request.form["gender"]
        bmr_result = calculate_bmr(weight, height, age, gender)
        return render_template("bmr.html", bmr_result=bmr_result)
    return render_template("bmr.html", bmr_result=None)

# @app.route("/result")
# def result():
#     return render_template("result.html")

@app.route("/mind-reader", methods=["GET", "POST"])
def mind_reader():

    if 'email' not in flask_session:
        flash("Please log in to use mind reader", "warning")
        return redirect(url_for("login"))


    if request.method == "POST":
        x = request.form["number"]
        if not x:
            flash("Please enter a number", "warning")
            return redirect(url_for("mind_reader"))
            
        flask_session['number'] = x
        print(x)
        return redirect(url_for('mind_reader_result', number=x))



    return render_template("mind_reader.html")

@app.route("/mind-reader-result")
def mind_reader_result():
    if 'number' not in flask_session:
        flash("First enter a number", "warning")
        return redirect(url_for("mind_reader"))
    y = request.args.get("number")
    flask_session.pop('number', None)
    return render_template("mind_reader_result.html", number=y)


@app.route("/dashboard")
def dashboard():
    if 'email' not in flask_session:
        flash("You have to be logged in to see your dashboard.", "warning")
        return redirect(url_for("login"))

    return render_template("dashboard.html")


@app.route("/pose-detection")
def pose_detection():
    if 'email' not in flask_session:
        flash("You have to be logged in to use Pose Detection.", "warning")
        return redirect(url_for("login"))

    return render_template("pose-detection.html")



@app.route("/admin")
def admin():
    # user_id = flask_session.get("user_id")
    # role = flask_session.get("role")
    # if not user_id or role != "Admin":
    #     return redirect(url_for("login"))
    if 'email' not in flask_session or flask_session.get('role') != "admin":
        flash("You dont have access to the admin panel.", "danger")
        return redirect(url_for("index"))    

    with db_session(engine) as session:
        statement = select(User)
        users = list(session.exec(statement))

    for user in users:
        user.join_time = relative_time(user.join_time)

    return render_template("admin.html", users=users)



@app.route('/update_role/<int:user_id>', methods=['POST'])
def update_role(user_id):
    new_role = request.form.get("role")
    if new_role:
        with db_session(engine) as session:
            statement = select(User).where(User.id == user_id)
            user = session.exec(statement).first()
            if user:
                user.role = new_role
                session.commit()
                flash(f"Role updated to {new_role} for {user.first_name}.", "success")
            else:
                flash("User not found.", "danger")
    return redirect(url_for("admin"))





@app.route("/logout")
def logout():
    flask_session.pop('email', None)
    flash("You have been logged out.", "info")
    return redirect(url_for("index"))


