import { useState } from "react";
import Spotify from "../Spotify";

function Search({ handleSearch }){
    const [text, setText] = useState("");

    const handleTextChange = ({target}) => setText(target.value);
    
    return (
        <form onSubmit={handleSearch}>
            <input type="text" value={text} onChange={handleTextChange} placeholder="Search for a song" />
            <button type="submit">SEARCH</button>
        </form>
    )
}

export default Search;