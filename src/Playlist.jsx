import React, { useState } from "react";

const Playlist = ({ playlist, onNameChange, onRemoveTrack}) => {
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

    return (
        <div>
            {editMode ? (
                <>
                    <h2>{playlist.name}</h2> <button onClick={toggleEditMode}>Edit</button>   
                </>
            ) : (
                <>
                    <input
                        type="text"
                        value={temporaryName}
                        onChange={handleTemporaryNameChange}
                        placeholder="Playlist Name"
                    /> <button onClick={toggleEditMode}>Save</button>
                </>
            )}

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
