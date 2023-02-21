import React, { useState } from 'react';

function SearchBar(props) {
  const [city, setCity] = useState('');

  const handleSearch = () => {
    props.onSearch(city);
  };

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <div>
      <input type="text" value={city} onChange={handleInputChange} placeholder="Enter a city name" />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;

