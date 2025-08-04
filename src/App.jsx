import React, { useEffect } from 'react';
import SearchBar from './SearchBar';
import { extractCode, getAccessTokenFromBackend, authUrl } from './spotify';

const App = () => {
    const [accessToken, setAccessToken] = React.useState(null);

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
                });
        }
    }, []);

    return (
        <div>
            <h1>Spotify Jamming App</h1>
            {accessToken ? (
                <SearchBar />
            ) : (
                <a href={authUrl}>Login to Spotify</a>
            )}
        </div>
    );

}

export default App;
