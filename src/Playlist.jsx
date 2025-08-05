import React, { useState } from "react";
import { savePlaylist } from './spotify';

const Playlist = ({ playlist, onNameChange, onRemoveTrack, accessToken }) => {
    const [editMode, setEditMode] = useState(false);
    const [temporaryName, setTemporaryName] = useState(playlist.name);

    // Function to toggle edit mode
    const toggleEditMode = () => {
        setEditMode(!editMode);
        if (editMode) {
            // Save changes when exiting edit mode
            onNameChange({ target: { value: temporaryName } });
        } else {
            // Enter edit mode
            setTemporaryName(playlist.name);
        }
    };

    // Function to handle temporary name change
    const handleTemporaryNameChange = (event) => {
        setTemporaryName(event.target.value);
    };


    // Function to handle saving the playlist
    const handleSavePlaylist = () => {
        const playListName = playlist.name || "New Playlist";
        const tracks = playlist.tracks.map(track => track.uri);

        savePlaylist(playListName, tracks, accessToken)
            .then(data => {
                console.log('Playlist saved:', data);
                alert(`Playlist "${data.name}" saved successfully!`);
            })
            .catch(error => {
                console.error('Error saving playlist:', error);
                alert('Failed to save playlist. Please try again.');
            });
    };

    return (
        <div className="playlist-container">
            {!editMode ? (
                <>
                    <h2>{playlist.name}</h2> <button className="button" onClick={toggleEditMode}>Edit</button>   
                </>
            ) : (
                <>
                    <input
                        type="text"
                        value={temporaryName}
                        onChange={handleTemporaryNameChange}
                        placeholder="Playlist Name"
                    /> <button className="button" onClick={toggleEditMode}>Save</button>
                </>
            )}

            <h3>Tracks</h3>
            {playlist.tracks.length === 0 && <p>No tracks in the playlist</p>}

            <ul className="track-list">
                {playlist.tracks.map(track => (
                    <li className="track-item" key={track.id}>
                        {track.name} by {track.artists[0]?.name || 'Unknown Artist'}
                        <button className="button" onClick={() => onRemoveTrack(track.id)}>Remove</button>
                    </li>
                ))}
            </ul>

            <button className="button" onClick={handleSavePlaylist}>Save to Spotify</button>
        </div>

    );
};

export default Playlist;
