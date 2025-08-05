import React, { useState } from 'react';
import { searchSpotify } from './spotify';


const SearchBar = ({ accessToken, onAddTrack }) => {
    const [Search, setSearch] = useState('');
    const [results, setResults] = useState([]);

    // Function to handle input changes
    const handleChange = ({target}) => {
        setSearch(target.value);
    }

    // Functions to handle search and clear actions
    const handleSearch = async () => {
         const tracks = await searchSpotify(Search, accessToken);
        if (tracks) {
            setResults(tracks);
            console.log('Search results:', tracks);
        }
    }

    const handleClear = () => {
        setSearch('')
        setResults([]);
    }


    return (
        <>
        <input className="search-input" type="text" value={Search} onChange={handleChange} placeholder="Search..." />
        <button className="search-button" onClick={handleSearch}>Search</button>
        <button className="clear-button" onClick={handleClear}>Clear</button>
        <div className="search-results">
            <ul>
                {results.map((track) => (
                    <li key={track.id}>
                        {track.name} by {track.artists[0]?.name || 'Unknown Artist'} <button onClick={() => onAddTrack(track)}>Add</button>

                    </li>
                ))}
            </ul>
        </div>
        <div>Results: {results.length}</div>
        </>
    )

}

export default SearchBar;