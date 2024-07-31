import React from 'react'
import '../BrewCard/BrewCard.css'

const BrewCard = ({ name, type, city }) => {
  return (
    <div className='brew_card'>
        <h2>{name}</h2>
        <p>{type}</p>
        <p>{city}</p>
    </div>
  )
}

export default BrewCard

