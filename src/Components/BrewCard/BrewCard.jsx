import React from 'react'
import PropTypes from 'prop-types'
import '../BrewCard/BrewCard.css'

const BrewCard = ({ name, type, city }) => {
  return (
    <div className='brew_card'>
        <h2>{name}</h2>
        <p>Brew Type: {type}</p>
        <p>City:{city}</p>
    </div>
  )
}

BrewCard.propTypess = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired
};

export default BrewCard

