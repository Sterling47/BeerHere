import React from 'react';
import PropTypes from 'prop-types';
import '../BrewContainer/BrewContainer.css';
import BrewCard from '../BrewCard/BrewCard';
import { Link } from 'react-router-dom';

const BrewContainer = ({ breweries }) => {
    const BreweryCards = breweries.map(brewery => {
        return (
            <div key={brewery.id}>
                <Link  className='link' to={`/detail/${brewery.id}`}>
                    <BrewCard 
                    name={brewery.name}
                    type={brewery.brewery_type}
                    city={brewery.city}
                    /> 
                </Link>
            </div> 
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
