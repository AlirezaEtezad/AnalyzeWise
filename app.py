from flask import Flask, render_template, send_from_directory, request, redirect, url_for, flash, session as flask_session
import os
from werkzeug.security import generate_password_hash, check_password_hash
from deepface import DeepFace
from database import User, RegisterModel, LoginModel, engine
from sqlmodel import Session as db_session, select
from pydantic import ValidationError
import mediapipe as mp
from mediapipe.tasks import python
from mediapipe.tasks.python import vision

app = Flask("Analyze Face")
app.config["UPLOAD_FOLDER"] = './uploads'
app.config["ALLOWED_EXTENSIONS"] = {'png', 'jpg', 'jpeg'}
app.secret_key = '000'

model_path = "models/pose_landmarker_lite.task"

def auth(email, password):
    with db_session(engine) as session:
        statement = select(User).where(User.email == email)
        user = session.exec(statement).first()
        if user and check_password_hash(user.password, password):
            return True
    return False

def allowed_files(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config["ALLOWED_EXTENSIONS"]

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
            if auth(email, password):
                flask_session['email'] = email
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
                new_user = User(
                    first_name=register_data.first_name,
                    last_name=register_data.last_name,
                    email=register_data.email,
                    age=register_data.age,
                    city=register_data.city,
                    country=register_data.country,
                    password=hashed_password
                )
                session.add(new_user)
                session.commit()
                flash("Registered successfully! Please log in.", "success")
                return redirect(url_for("login"))

    return render_template("login.html")

@app.route("/upload", methods=["GET", "POST"])
def upload():
    if 'email' not in flask_session:
        flash("Please log in to upload images", "warning")
        return redirect(url_for("login"))

    if request.method == 'POST':
        image = request.files['image']
        if image.filename == "":
            flash("No selected file", "warning")
            return redirect(url_for("upload"))

        if image and allowed_files(image.filename):
            try:
                os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)
                save_path = os.path.join(app.config["UPLOAD_FOLDER"], image.filename)
                image.save(save_path)
                result = DeepFace.analyze(img_path=save_path, actions=["age"])
                return render_template("result.html", result=result)
            except Exception as e:
                flash(f"Error processing image: {e}", "danger")
                return redirect(url_for("upload"))
        flash("File type not allowed", "warning")
        return redirect(url_for("upload"))
    
    return render_template("upload.html")




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

@app.route("/result")
def result():
    return render_template("result.html")

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



    return render_template("mind-reader.html")

@app.route("/mind-reader-result")
def mind_reader_result():
    if 'number' not in flask_session:
        flash("First enter a number", "warning")
        return redirect(url_for("mind_reader"))
    y = request.args.get("number")
    flask_session.pop('number', None)
    return render_template("mind-reader-result.html", number=y)


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



@app.route("/logout")
def logout():
    flask_session.pop('email', None)
    flash("You have been logged out.", "info")
    return redirect(url_for("index"))


