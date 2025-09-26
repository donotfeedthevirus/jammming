function TrackList({ trackList, isSearch, handleClick }) {
    return (
        <div className="trackList">
            {trackList.map((track, index) => (
                <div key={`track-${index}`} className="track">
                    <div className="info">
                        <h1>{track.name}</h1>
                        <h2>{track.artist}</h2>
                    </div>
                    <button onClick={() => handleClick(track.id)}>{isSearch ? "+" : "x"}</button>
                </div>
            ))}
        </div>
    )
}

export default TrackList;