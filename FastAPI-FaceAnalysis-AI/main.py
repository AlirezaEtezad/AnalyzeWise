from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
import numpy as np
import cv2
import io
import base64
from PIL import Image
from src.face_analysis import FaceAnalysis


app = FastAPI()
face_analysis = FaceAnalysis("models/det_10g.onnx", "models/genderage.onnx")

@app.get("/")
def index():
    return {"Hello": "World"}

@app.post("/analyze-face")
async def analyze_face(file: UploadFile = File(...)):
    image = await file.read()
    image_np_array = np.frombuffer(image, np.uint8)
    image_cv2 = cv2.imdecode(image_np_array, cv2.IMREAD_COLOR)
    output_image, genders, ages = face_analysis.detect_age_gender(image_cv2)


    output_image_bgr = cv2.cvtColor(output_image, cv2.COLOR_RGB2BGR)
    output_image_pil = Image.fromarray(output_image_bgr)
    buffered = io.BytesIO()
    output_image_pil.save(buffered, format="JPEG")
    output_image_base64 = base64.b64encode(buffered.getvalue()).decode("utf-8")

    result = {
        "genders": genders,
        "ages": ages,
        "image": f"data:image/jpeg;base64,{output_image_base64}"
    }

    return JSONResponse(result)
