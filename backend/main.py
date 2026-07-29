from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

from deepface import DeepFace

import base64
import cv2
import numpy as np
import time

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ImageRequest(BaseModel):
    image: str


@app.get("/")
def home():
    return {"message": "EmotionSense AI Backend Running"}


@app.post("/detect")
def detect_emotion(request: ImageRequest):
    try:
        # Decode Base64 image
        image_data = request.image.split(",")[1]
        image_bytes = base64.b64decode(image_data)

        np_arr = np.frombuffer(image_bytes, np.uint8)
        frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

        start = time.time()

        result = DeepFace.analyze(
            img_path=frame,
            actions=["emotion"],
            detector_backend="retinaface",
            enforce_detection=False,
            silent=True,
        )

        end = time.time()
        print(f"Analysis took {end - start:.2f} seconds")

        if isinstance(result, list):
            result = result[0]

        emotion = result["dominant_emotion"]
        confidence = float(result["emotion"][emotion])

        region = result.get(
            "region",
            {
                "x": 0,
                "y": 0,
                "w": 0,
                "h": 0,
            },
        )

        response = {
            "emotion": emotion,
            "confidence": round(confidence, 2),
            "face": {
                "x": int(region.get("x", 0)),
                "y": int(region.get("y", 0)),
                "w": int(region.get("w", 0)),
                "h": int(region.get("h", 0)),
            },
        }

        print(response)

        return response

    except Exception as e:
        print("ERROR:", e)

        return {
            "emotion": "Error",
            "confidence": 0,
            "face": {
                "x": 0,
                "y": 0,
                "w": 0,
                "h": 0,
            },
            "error": str(e),
        }