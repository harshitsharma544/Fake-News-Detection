import pandas as pd
import re
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report
import joblib


def clean(t):
    t = str(t).lower()
    t = re.sub(r"http\S+", " ", t) 
    t = re.sub(r"[^a-zA-Z0-9\s.,!?]", " ", t)
    t = re.sub(r"\s+", " ", t).strip()
    return t

print("Loading cleaned_news.csv...")
df = pd.read_csv("cleaned_news.csv")

# Apply cleaning
df["text"] = df["text"].apply(clean)

print("Dataset size:", df.shape)

# REDUCE DATASET TO SPEED UP TRAINING (OPTIONAL BUT RECOMMENDED)
df = df.sample(n=20000, random_state=42)
print("Reduced dataset size:", df.shape)

X = df["text"]
y = df["label"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# SMALLER, FASTER TF-IDF 
vectorizer = TfidfVectorizer(
    max_features=50000,
    ngram_range=(1, 2),
    stop_words="english"
)

print("Vectorizing...")
X_train_vec = vectorizer.fit_transform(X_train)
X_test_vec = vectorizer.transform(X_test)

#  FASTER MODEL: Logistic Regression
model = LogisticRegression(
    max_iter=2000,
    n_jobs=-1,
    class_weight="balanced"
)

print("Training...")
model.fit(X_train_vec, y_train)

print("Evaluating...")
pred = model.predict(X_test_vec)

print("Accuracy:", accuracy_score(y_test, pred))
print(classification_report(y_test, pred))

joblib.dump(model, "model.pkl")
joblib.dump(vectorizer, "vectorizer.pkl")

print("\nModel saved!")
