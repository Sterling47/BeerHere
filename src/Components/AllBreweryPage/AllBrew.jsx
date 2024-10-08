import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import BrewCard from '../BrewCard/BrewCard';
import FilterBar from '../FilterBar/FilterBar';
import '../AllBreweryPage/AllBrew.css';

const AllBrew = ({ breweries, onFilter }) => {
  const [filteredBreweries, setFilteredBreweries] = useState(breweries);

  useEffect(() => {
    setFilteredBreweries(breweries);
  }, [breweries]);

  const handleFilter = (filtered) => {
    setFilteredBreweries(filtered);
    onFilter(filtered); 
  };

  const groupedBreweries = groupBreweriesByFirstChar(filteredBreweries);

  return (
    <div className='wrapper'>
      <div className='page-container'>
        <h2 className='allBrewHeader'>All Breweries</h2>
        <FilterBar breweries={breweries} onFilter={handleFilter} />
        {Object.keys(groupedBreweries).sort().map(char => (
          <div key={char}>
            <h2>{char.match(/[A-Z]/) ? char : '0-9'}</h2>
            {groupedBreweries[char].map(brewery => (
              <Link to={`/detail/${brewery.id}`} key={brewery.id}>
                <BrewCard
                  name={brewery.name}
                  type={brewery.brewery_type}
                  city={brewery.city}
                />
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const groupBreweriesByFirstChar = (breweries) => {
  const grouped = {};
  breweries.forEach(brewery => {
    const firstChar = brewery.name.charAt(0).toUpperCase();
    if (!grouped[firstChar]) {
      grouped[firstChar] = [];
    }
    grouped[firstChar].push(brewery);
  });
  return grouped;
};


AllBrew.propTypes = {
  breweries: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      brewery_type: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
    })
  ).isRequired,
  onFilter: PropTypes.func.isRequired,
};

export default AllBrew;
