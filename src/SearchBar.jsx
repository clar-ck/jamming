import React, { useState } from 'react';


const SearchBar = () => {
    const [Search, setSearch] = useState('');

    // Function to handle input changes
    const handleChange = ({target}) => {
        setSearch(target.value);
    }

    // Functions to handle search and clear actions
    const handleSearch = () => {
        alert(`Searching for: ${Search}`);
    }

    const handleClear = () => {
        setSearch('');
    }


    return (
        <>
        <div>Search Bar</div>
        <input type="text" value={Search} onChange={handleChange} placeholder="Search..." />
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleClear}>Clear</button>
        </>
    )

}

export default SearchBar;