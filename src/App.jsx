import { useState, useEffect } from 'react'
import './App.css'
import Spotify from './Spotify'
import Search from './Search/Search'

function App() {
  const [token, setToken] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchToken = async () => {
      const token = await Spotify.getAccessToken();
      setToken(token);
    }
    fetchToken();
    const intervalId = setInterval(fetchToken, 3600 * 1000 - 60000);

    return () => clearInterval(intervalId);
  }, [])

  const searchSongs = event => {
    event.preventDefault();
    Spotify.searchSong(event.target[0].value, token).then(response => setSearchResults(response));
  }

  return (
    <>
      {!token ? (
        <h1>Ja<span>mmm</span>ing</h1>
      ) : (
        <>
          <header>
            <h1>Ja<span>mmm</span>ing</h1>
          </header>
          <main>
            <section className='searchSection'>
              <Search handleSearch={searchSongs} />
            </section>
          </main>
        </>
      )}
    </>
  )
}

export default App;
