import React, { useState } from "react";


const Playlist = () => {
    // State to manage the playlist name and tracks
    const [playlist, setPlaylist] = useState({
    name: "New Playlist",
    tracks: []
    });

    // Function to handle playlist name change
    const handleNameChange = (event) => {
        setPlaylist({ ...playlist, name: event.target.value });
    };

    // Functions to add and remove tracks from the playlist
    const handleAddTrack = (track) => {
        if (!playlist.tracks.some(t => t.id === track.id)) {
            setPlaylist({ ...playlist, tracks: [...playlist.tracks, track] });
        } else {
            console.warn('Track already exists in the playlist');
        }
    };

    const handleRemoveTrack = (trackId) => {
        setPlaylist({
            ...playlist,
            tracks: playlist.tracks.filter(track => track.id !== trackId)
        });
    };

    return (
        <div>
            <h2>{playlist.name}</h2>
            <input
                type="text"
                value={playlist.name}
                onChange={handleNameChange}
                placeholder="Playlist Name"
            />

            <button onClick={() => handleAddTrack({ id: 'new-track-id', name: 'New Track', artists: [{ name: 'Artist Name' }] })}>
                Add Track
            </button>

            <h3>Tracks</h3>
            {playlist.tracks.length === 0 && <p>No tracks in the playlist</p>}

            <ul>
                {playlist.tracks.map(track => (
                    <li key={track.id}>
                        {track.name} by {track.artists[0]?.name || 'Unknown Artist'}
                        <button onClick={() => handleRemoveTrack(track.id)}>Remove</button>
                    </li>
                ))}
            </ul>
            <button onClick={() => console.log('Save Playlist:', playlist)}>
                Save Playlist
            </button>
            <button onClick={() => setPlaylist({ name: "New Playlist", tracks: [] })}>
                Clear Playlist
            </button>
        </div>
    );
};

export default Playlist;
