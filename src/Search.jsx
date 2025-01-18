import { useState } from "react";

function Search({ handleSearch }){
    const [text, setText] = useState("");

    const handleTextChange = ({target}) => setText(target.value);
    
    return (
        <form onSubmit={handleSearch}>
            <input type="text" value={text} onChange={handleTextChange} placeholder="Search for a song" />
            <button className="searchButton" type="submit">SEARCH</button>
        </form>
    )
}

export default Search;