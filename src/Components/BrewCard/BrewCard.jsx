import React from 'react'
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

export default BrewCard

