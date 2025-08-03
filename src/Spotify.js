const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;


const searchSpotify = (searchTerm) => {
    // This function will fetch search results from the Spotify API
    alert(`Searching Spotify for: ${searchTerm}`);
}

export default searchSpotify;