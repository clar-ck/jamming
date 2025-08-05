import React, { useEffect } from 'react';
import SearchBar from './SearchBar';
import Playlist from './Playlist';
import { extractCode, getAccessTokenFromBackend, authUrl } from './spotify';

const App = () => {
  // State to manage the access token
  const [accessToken, setAccessToken] = React.useState(null);
  // State to manage the playlist name and tracks
  const [playlist, setPlaylist] = React.useState({
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


  useEffect(() => {
    const code = extractCode();
    if (code) {
      getAccessTokenFromBackend(code)
        .then(token => {
          setAccessToken(token);
          // Optionally, clear the code from the URL after retrieving the token
          window.history.replaceState({}, document.title, window.location.pathname);
        })
        .catch(error => {
          console.error('Error retrieving access token:', error);
          alert('Failed to retrieve access token. Please try again.');
        });
    }
  }, []);

  // Render the app
  return (
    <div>
      <h1>Spotify Jamming App</h1>
      {accessToken ? (
        <>
          <SearchBar accessToken={accessToken} onAddTrack={handleAddTrack} />
          <Playlist
            playlist={playlist}
            onNameChange={handleNameChange}
            onRemoveTrack={handleRemoveTrack}
            accessToken={accessToken}
          />
        </>
      ) : (
            <a href={authUrl}>Login to Spotify</a>
          )}
    </div>
  );
};

export default App;
