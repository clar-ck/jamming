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
        <div>Search Bar</div>
        <input type="text" value={Search} onChange={handleChange} placeholder="Search..." />
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleClear}>Clear</button>
        <ul>
            {results.map((track) => (
                <li key={track.id}>
                    {track.name} by {track.artists[0]?.name || 'Unknown Artist'} <button onClick={() => onAddTrack(track)}>Add</button>

                </li>
            ))}
        </ul>
        <div>Search Term: {Search}</div>
        <div>Results: {results.length}</div>
        </>
    )

}

export default SearchBar;