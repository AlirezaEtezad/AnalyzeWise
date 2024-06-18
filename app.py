from flask import Flask, render_template, send_from_directory, request, redirect, url_for, flash, session
import os
import cv2
from werkzeug.security import generate_password_hash, check_password_hash
from deepface import DeepFace

app = Flask("Analayze Face")
app.config["UPLOAD_FOLDER"] = './uploads'
app.config["ALLOWED_EXTENSIONS"] = {'png', 'jpg', 'jpeg'}
app.secret_key = '000'



users = {}

def auth(email, password):
    user = users.get(email)
    if user and check_password_hash(user['password'], password):
        return True
    else:
        return False


# def auth(email, password):
#     if email == "a@yahoo.com" and password == "123":
#         return True
#     else:
#         return False 
    
def allowed_files(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config["ALLOWED_EXTENSIONS"]



@app.route("/")
def index():
    return render_template("index.html")



# @app.route("/login", methods= ['GET', 'POST'])
# def login():
#     if request.method == "GET":
#         return render_template("login.html")
    
#     elif request.method == "POST":

#         email = request.form["email"]
#         password = request.form["password"]
#         result = auth(email, password)

#         if result:
#             return redirect(url_for("upload"))

#         else:
#             return redirect(url_for("login"))

# @app.route("/login", methods=['GET', 'POST'])
# def login():
#     if request.method == "POST":
#         action = request.form.get("action")
#         email = request.form["email"]
#         password = request.form["password"]

#         if action == "login":
#             if email in users and check_password_hash(users[email]['password'], password):
#                 session['email'] = email
#                 flash("Login successful")
#                 return redirect(url_for("upload"))
#             else:
#                 flash("Invalid email or password")
#                 return redirect(url_for("login"))
        
#         elif action == "register":
#             if email in users:
#                 flash("Email already registered")
#                 return redirect(url_for("login"))
#             hashed_password = generate_password_hash(password)
#             users[email] = {'password': hashed_password}
#             flash("Registered successfully! Please log in.")
#             return redirect(url_for("login"))

#     return render_template("login.html")
        
@app.route("/login", methods=['GET', 'POST'])
def login():
    if request.method == "POST":
        action = request.form.get("action")
        email = request.form["email"]
        password = request.form["password"]

        if action == "login":
          #  if email in users and check_password_hash(users[email]['password'], password):
            if auth(email, password):
                session['email'] = email
                flash("Login successful")
                return redirect(url_for("upload"))
            else:
                flash("Invalid email or password")
                return redirect(url_for("login"))
        
        elif action == "register":
            if email in users:
                flash("Email already registered")
                return redirect(url_for("login"))
            hashed_password = generate_password_hash(password)
            users[email] = {'password': hashed_password}
            flash("Registered successfully! Please log in.")
            return redirect(url_for("login"))

    return render_template("login.html")





# @app.route("/upload", methods=["GET", "POST"])
# def upload():
#     if request.method == 'GET':
#         return render_template("upload.html")
#     elif request.method == 'POST':
#         print("image uploaded")

#         image = request.files['image']
#         if image.filename == "":
#             return redirect(url_for("upload"))
        
#             #print("khali")
#         else:
#          #   print("ok")
#             if image and allowed_files(image.filename):
#                 save_path = os.path.join(app.config["UPLOAD_FOLDER"], image.filename)
#                 image.save(save_path)
#                 result = DeepFace.analyze(
#                     img_path = save_path,
#                     actions = ["age"]

#                 )

#             return render_template("result.html", result=result)


#                 # return redirect(url_for("result"))


@app.route("/upload", methods=["GET", "POST"])
def upload():
    if 'email' not in session:
        flash("Please log in to upload images")
        return redirect(url_for("login"))

    if request.method == 'POST':
        image = request.files['image']
        if image.filename == "":
            flash("No selected file")
            return redirect(url_for("upload"))
        
        if image and allowed_files(image.filename):
            save_path = os.path.join(app.config["UPLOAD_FOLDER"], image.filename)
            image.save(save_path)
            result = DeepFace.analyze(img_path=save_path, actions=["age"])
            return render_template("result.html", result=result)

    return render_template("upload.html")



def calculate_bmr(weight, height, age, gender):
    if gender == 'male':
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
    else:
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age)
    return bmr


@app.route("/bmr", methods=["GET", "POST"])
def bmr():
    if 'email' not in session:
        flash("Please log in to ues bmr calculator")
        return redirect(url_for("login"))
    
    if request.method == "POST":
        weight = float(request.form["weight"])
        height = float(request.form["height"])
        age = int(request.form["age"])
        gender = request.form["gender"]
        bmr_result = calculate_bmr(weight, height, age, gender)
        return render_template("bmr.html", bmr_result=bmr_result)
    return render_template("bmr.html", bmr_result=None)



       # print("image uploaded")
        # return redirect(url_for("result"))
    


@app.route("/result")
def result():
    return render_template("result.html")


@app.route("/logout")
def logout():
    session.pop('email', None)
    flash("You have been logged out.")
    return redirect(url_for("index"))