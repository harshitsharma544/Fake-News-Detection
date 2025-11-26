
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import joblib

from transformers import pipeline

# TF-IDF + Logistic Regression model
tfidf_model = joblib.load("model.pkl")
vectorizer = joblib.load("vectorizer.pkl")

# DistilBERT pipeline (Transformers) for text classification
bert_classifier = pipeline(
    "text-classification",
    model="distilbert-base-uncased-finetuned-sst-2-english"
)

app = FastAPI()

# CORS for your React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class NewsItem(BaseModel):
    text: str
    model: str = "tfidf"   # "tfidf" or "bert"


def predict_tfidf(text: str):
    """Use your TF-IDF + Logistic Regression model"""
    X_vec = vectorizer.transform([text])
    label = tfidf_model.predict(X_vec)[0]

    try:
        score = tfidf_model.decision_function(X_vec)[0]
        confidence = float(abs(score))
        # squash to 0–1-ish range for display
        confidence = 1 / (1 + pow(2.71828, -confidence))
    except Exception:
        confidence = None

    return label, confidence


def predict_bert(text: str):
    """Use DistilBERT transformer"""
    res = bert_classifier(text)[0]      # {'label': 'POSITIVE', 'score': 0.98}
    raw_label = res["label"]
    score = float(res["score"])

    # Map sentiment → fake/real (demo logic; you can change later)
    if raw_label in ("POSITIVE", "LABEL_1"):
        label = "real"
    else:
        label = "fake"

    confidence = score  # already 0–1
    return label, confidence


@app.post("/predict")
def predict(item: NewsItem):
    text = item.text.strip()
    if not text:
        return {"error": "Empty text", "label": None, "confidence": None}

    model_name = item.model.lower()

    if model_name == "bert":
        label, conf = predict_bert(text)
        used = "bert"
    else:
        label, conf = predict_tfidf(text)
        used = "tfidf"

    return {
        "label": label,
        "confidence": conf,
        "used_model": used,
    }


@app.get("/")
def root():
    return {"message": "Fake News Detector API is running!",
            "models": ["tfidf", "bert"]}
