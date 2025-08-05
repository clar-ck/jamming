import React, { useState } from "react";


const Playlist = ({ playlist, onChangeName, onRemoveTrack}) => {
    return (
        <div>
            <h2>{playlist.name}</h2>
            <input
                type="text"
                value={playlist.name}
                onChange={onChangeName}
                placeholder="Playlist Name"
            />

            <h3>Tracks</h3>
            {playlist.tracks.length === 0 && <p>No tracks in the playlist</p>}

            <ul>
                {playlist.tracks.map(track => (
                    <li key={track.id}>
                        {track.name} by {track.artists[0]?.name || 'Unknown Artist'}
                        <button onClick={() => onRemoveTrack(track.id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>

    );
};

export default Playlist;
