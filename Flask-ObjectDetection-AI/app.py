from flask import Flask, request, jsonify
import numpy as np
import io
import base64
from PIL import Image
import cv2
from src.object_detection import YOLOv8


app = Flask(__name__)
object_detector = YOLOv8("models/yolov8n.onnx")

@app.route("/", methods=["GET"])
def index():
    return {"Hello": "world"}

@app.route("/detect", methods=["POST"])
def detect():
    image = request.files["file"]
    image_pil = Image.open(image.stream)
    image_np_array = np.array(image_pil)
    output_image, labels = object_detector(image_np_array)

    output_image_bgr = cv2.cvtColor(output_image, cv2.COLOR_RGB2BGR)
    # Convert the output image to a PIL image, then to Base64
    output_image_pil = Image.fromarray(output_image_bgr)
    buffered = io.BytesIO()
    output_image_pil.save(buffered, format="JPEG")
    output_image_base64 = base64.b64encode(buffered.getvalue()).decode("utf-8")


    result = {
        "labels": labels,
        "image": output_image_base64
    }

    return jsonify(result)