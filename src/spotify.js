const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
const authEndpoint = 'https://accounts.spotify.com/authorize';
const scope = 'playlist-modify-public';
const authUrl =  `${authEndpoint}?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;

const extractCode = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('code');
};

const getAccessTokenFromBackend = async (code) => {
    const response = await fetch('/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
    });
    if (!response.ok) {
        throw new Error('Failed to retrieve access token');
    }
    const data = await response.json();
    return data.access_token;
    
};



const searchSpotify = (searchTerm) => {
    // This function will fetch search results from the Spotify API
    alert(`Searching Spotify for: ${searchTerm}`);
}

export { extractCode, getAccessTokenFromBackend, searchSpotify, authUrl }; 
