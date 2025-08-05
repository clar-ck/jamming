import React from 'react';
const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
const scope = import.meta.env.VITE_SPOTIFY_SCOPE;
const authEndpoint = 'https://accounts.spotify.com/authorize';
const authUrl =  `${authEndpoint}?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;
const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';


const extractCode = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('code');
};

const getAccessTokenFromBackend = async (code) => {
    const response = await fetch(`${backendUrl}/callback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
    });
    if (!response.ok) {
        throw new Error('Failed to retrieve access token');
    }
    const data = await response.json();
    return data.accessToken;
    
};


const searchSpotify = async (searchTerm, accessToken) => {
    if (searchTerm.trim() === '') {
        console.warn('Search term is empty');
        return;
    }
    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchTerm)}&type=track&limit=10`;
    const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
    })
    if (!response.ok) {
        throw new Error('Failed to fetch search results');
    }
    const data = await response.json();
    return data.tracks.items;
}

const savePlaylist = async (playlistName, tracks, accessToken) => {
    if (!playlistName || !tracks.length) {
        console.warn('Playlist name or tracks are missing');
        return;
    }

    const createPlaylistUrl = 'https://api.spotify.com/v1/me/playlists';
    const createResponse = await fetch(createPlaylistUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: playlistName, public: true })
    });
    if (!createResponse.ok) {
        throw new Error('Failed to create playlist');
    }

    const playlistData = await createResponse.json();
    const playlistId = playlistData.id;
    const addTracksUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
    const addTracksResponse = await fetch(addTracksUrl, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ uris: tracks })
    });
    if (!addTracksResponse.ok) {
        throw new Error('Failed to add tracks to playlist');
    }
    return playlistData;
};
    

export { extractCode, getAccessTokenFromBackend, searchSpotify, savePlaylist, authUrl }; 
