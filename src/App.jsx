import React, { useEffect } from 'react';
import SearchBar from './SearchBar';
import { getAccessToken } from './spotify';

const App = () => {
  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      console.log('Access Token:', token);
    } else {
      console.log('No access token found');
    }
  }, []);

  return (
    <SearchBar />
  )
}

export default App
