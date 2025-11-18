import pandas as pd

# %%
# Import the dataset
DATA_BASE_URL = "hf://datasets/matthewfranglen/lastfm-1k/"
DATA_SPLITS = {
    "train": "train.gz.parquet",
    "valid": "valid.gz.parquet",
    "test": "test.gz.parquet",
}
DATA_URL = DATA_BASE_URL + DATA_SPLITS["train"]


# What columns to return
USE_COLS = ["user_id", "timestamp", "musicbrainz_track_id"]

df = pd.read_parquet(DATA_URL, columns=USE_COLS)
# %%

df.header()
