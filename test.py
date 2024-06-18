import requests
from deepface import DeepFace

# response = requests.post("http://127.0.0.1:5000/blog")
# print(response.text)

objs = DeepFace.analyze(

    img_path="uploads/me.jpg",
    actions=["age"],
)

print(objs)