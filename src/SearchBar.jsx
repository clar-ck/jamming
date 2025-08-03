import React, { useState } from 'react';

const SearchBar = () => {
    const [Search, setSearch] = useState('');

    const handleChange = ({target}) => {
        setSearch(target.value);
    }

    return (
        <>
        <div>Search Bar</div>
        <input type="text" value={Search} onChange={handleChange} placeholder="Search..." />
        <button>Search</button>
        <button>Clear</button>
        </>
    )

}

export default SearchBar;