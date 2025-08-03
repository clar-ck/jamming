const express = require('express');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Welcome to the Spotify API integration server!');
});

app.get('/login', (req, res) => {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
    const authEndpoint = 'https://accounts.spotify.com/authorize';
    const scope = 'playlist-modify-public';
    const authUrl = `${authEndpoint}?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;
    
    // Redirect to Spotify's authorization page
    res.redirect(authUrl);
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});