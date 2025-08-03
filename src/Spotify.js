const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
const authEndpoint = 'https://accounts.spotify.com/authorize';
const scope = 'playlist-modify-public';
const authUrl =  `${authEndpoint}?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;

export const getAccessToken = () => {
    const hash = window.location.hash;
    let accessToken = null;
    if (hash) {
        accessToken = hash.split('&').find(elem => elem.startsWith('access_token=')).split('=')[1];
        window.location.hash = ''; // Clear the hash from the URL
    }
    return accessToken;
}

const searchSpotify = (searchTerm) => {
    // This function will fetch search results from the Spotify API
    alert(`Searching Spotify for: ${searchTerm}`);
}

export default searchSpotify;