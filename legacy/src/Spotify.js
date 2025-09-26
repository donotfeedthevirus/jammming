import { clientId, clientSecret } from "../credentials"

const Spotify = {
    async getAccessToken() {
        try{
            const response = await fetch("https://accounts.spotify.com/api/token", {
                method: 'POST',
                headers: {'Content-type': 'application/x-www-form-urlencoded',},
                body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`
            })

            if(response.ok){
                const data = await response.json()
                return data["access_token"];
            }
        }
        catch(e){
            console.log(e);
        };
    },
    async searchSong(term, token) {
        try{
            const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(term)}&type=track&limit=10`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if(response.ok){
                const data = await response.json();
                const results = data.tracks.items.map(track => {
                    return {
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                    }
                })

                return results;
            }
        } catch(e) {
            console.log(e);
        }
    }
}

export default Spotify;