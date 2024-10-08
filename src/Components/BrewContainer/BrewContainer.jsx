import React from 'react';
import PropTypes from 'prop-types';
import '../BrewContainer/BrewContainer.css';
import BrewCard from '../BrewCard/BrewCard';
import { Link } from 'react-router-dom';

const BrewContainer = ({ breweries, loading, filterType }) => {
  if (loading) {
    return (
      <div className='brew-wrapper'>
      <h2>Loading...</h2>
      </div>
    )
  }

  if (breweries.length === 0) {
    return (
      <div className='brew-wrapper'>
      <h2>There are no {filterType} breweries!</h2>
      </div>
    )
  }

    const BreweryCards = breweries.map(brewery => {
        return (
                  <Link  key={brewery.id} className='link' to={`/detail/${brewery.id}`}>
                    <BrewCard 
                    name={brewery.name}
                    type={brewery.brewery_type}
                    city={brewery.city}
                    /> 
                  </Link> 
        )
    })

  return (
    <div className='brew-wrapper' >
        <h2>All Breweries</h2>
        <div className='brew-container'>
        {BreweryCards}
        </div>
    </div>
  )
}

BrewContainer.propTypes = {
    breweries: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        brewery_type: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
      })
    ).isRequired,
  };

export default BrewContainer
