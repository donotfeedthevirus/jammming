# Goal

Turn ´last.fm 1k´ dataset into a clean **user** x **album** table with preference score and Spotify IDs to make album recommendations.

# Input

The dataset we'll start with has the following columns:

- ´user_index´
- ´artist_index´
- ´track_index´
- ´user_id´
- ´timestamp´
- ´musicbrainz_artist_id´
- ´artist_name´
- ´musicbrainz_track_id´
- ´track_name´
- ´age´
- ´signup_date´

However for the desired conversion we'll only use ´user_id´, ´timestamp´ and ´musicbrainz_track_id´ to create this new dataset.

# Output

The output would be a dataset that would have information about the interaction **user** x **album**. The output would be a dataset with the following structure:

- ´user_id´
- ´spotify_album_id´
- ´score´

# Steps

## 1. Load & clean scrobbles

**What**: Read listens, keep only rows that have a valid ´musicbrainz_track_id´.
**Why**: Everything else will depend on this ID.

### Checkpoint:

- "Do we see resonable numbers of user/tracks?"
- "Are there duplicates or missing MDIDs?"

## 2. Track into Albums

**What**: Convert each ´musicbrainz_track_id´ (track) into its **album** via MusicBrainz release group ID.
**Why**: Albums are represented by release groups (the abstract album across editions).

### Checkpoint:

- "For most tracks, do I get a release-group MBID?"
- "What fraction is missing?"

## 3. Choose a fair track count per album

**What**: For each album, decide how many tracks it has for scoring.
**How**: Pick official early releases and use its track count, or take the median across a few releases. Clamp extremes (like: **min 6, max 18**) so EPs and deluxe editions don't distort things.
**Why**: The album-preference metric needs a denominator that's fair.

### Checkpoint:

- "Do most albums end up with track count between 6 and 18?"
- "Spot-check a few famous albums to see if the count feels right"

## 4. Album into Spotify album ID

**What**: For each release-group MBID, fetch the Spotify album ID.
**Why**: The recommendation would be able to link directly to Spotify without having to use the Spotify API.

### Checkpoint:

- "What percentage of albums get Spotify ID?"

## 5. Compute a preference score per user x album

**What**: Aggregate listens by user + album and compare your coverage score.
**How**: Simple recipe:

- ´u´ = number of distinc tracks from that album the user listened to
- ´T´ = album's canonical track count
- Coverage (smoothed): ´(u + 1) / (T + 4)´ (a simple smoothing tweak later)
- Depth (optional): add small bonus for repeats, capped (like up to 3 plays per track)
- Final score: ´0.7 _ coverage + 0.3 _ depth_component´ (tune later)
  **Why**: Captures how much the user liked and explored the album beyond a single hit.

## 6. Produce the final table

**What**: Keep only rows with a **Spotify album ID** then save with output structure.
**Why**: This is the clean input for baselines (item-item) or models (ALS :D)

### Checkpoint:

- "File size ok? Columns correct? A few quick rows look right?"

# Roadmap

- [ ] Explore: show top users, top tracks, a random user's timeline, explore the dataset.
- [ ] Map 100 tracks to album, inspect results, then scale up.
- [ ] Compute **T** for 50 albums, inspect, then scale up.
- [ ] Score for one user, print their top 10 albums and sanity-check.
- [ ] Export the final table. try a tiny item-item recommender to see similar albums.
