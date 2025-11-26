import kagglehub
import pandas as pd
import os

def main():
    print("📥 Downloading Fake & Real News Dataset...")

    # Download directly
    path = kagglehub.dataset_download("clmentbisaillon/fake-and-real-news-dataset")
    print("📂 Dataset downloaded to:", path)

    fake_path = os.path.join(path, "Fake.csv")
    true_path = os.path.join(path, "True.csv")

    print("Loading CSV files...")

    df_fake = pd.read_csv(fake_path)
    df_true = pd.read_csv(true_path)

    df_fake["label"] = "fake"
    df_true["label"] = "real"

    df_fake = df_fake[["text", "label"]]
    df_true = df_true[["text", "label"]]

    df = pd.concat([df_fake, df_true], axis=0).sample(frac=1, random_state=42)

    df.to_csv("news.csv", index=False, encoding="utf-8")

    print("✅ news.csv created successfully!")
    print(df["label"].value_counts())

if __name__ == "__main__":
    main()
