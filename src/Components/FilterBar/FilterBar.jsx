import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../FilterBar/FilterBar.css';

const FilterBar = ({ breweries, onFilter }) => {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [searchTerm, setSearchTerm] = useState('')

  const cities = ['Atlanta', 'Phoenix', 'Denver'];
  const types = ['micro', 'nano', 'regional', 'brewpub', 'large', 'planning', 'bar', 'contract', 'proprietor', 'closed'];

  useEffect(() => {
    let filteredBreweries = breweries;

    if (selectedCity) {
      filteredBreweries = filteredBreweries.filter(brewery => brewery.city === selectedCity);
    }
    if (selectedType) {
      filteredBreweries = filteredBreweries.filter(brewery => brewery.brewery_type === selectedType);
    }
    if(searchTerm){
      filteredBreweries = filteredBreweries.filter(brewery => brewery.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    onFilter(filteredBreweries, selectedType);
  }, [selectedCity, selectedType, searchTerm, breweries]);

  const handleCitySelect = (e) => {
    setSelectedCity(e.target.value);
    setSelectedType('');
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div className='form_wrapper'>
      <form>
        <select className='drop-down' onChange={handleCitySelect} value={selectedCity}>
          <option value=''>Select A City</option>
          {cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
        <select className='drop-down' onChange={handleTypeChange} value={selectedType}>
          <option value=''>Select a Type</option>
          {types.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <input 
          type='text' 
          placeholder='Search For a Brewery'
          value={searchTerm}
          onChange={handleSearchChange}
          />
      </form>
    </div>
  );
};

FilterBar.propTypes = {
  breweries: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
    })
  ).isRequired,
  onFilter: PropTypes.func.isRequired,
};

export default FilterBar;
