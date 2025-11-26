import pandas as pd
import re
from sklearn.utils import resample

df = pd.read_csv("news.csv")

# Clean text
def clean(t):
    t = str(t).lower()
    t = re.sub(r"http\S+", " ", t)       # remove URLs
    t = re.sub(r"[^a-zA-Z0-9\s.,!?]", " ", t)  # keep numbers + punctuation
    t = re.sub(r"\s+", " ", t).strip()
    return t


df["text"] = df["text"].apply(clean)
df = df.dropna()
df = df[df["text"].str.len() > 30]

fake = df[df.label=="fake"]
real = df[df.label=="real"]

# Downsample fake to match real
min_size = min(len(fake), len(real))
fake_down = resample(fake, replace=False, n_samples=min_size, random_state=42)
real_down = resample(real, replace=False, n_samples=min_size, random_state=42)

df_bal = pd.concat([fake_down, real_down]).sample(frac=1, random_state=42)

df_bal.to_csv("cleaned_news.csv", index=False)

print("Balanced dataset created:", df_bal["label"].value_counts())
