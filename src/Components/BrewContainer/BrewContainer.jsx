import React from 'react'
import '../BrewContainer/BrewContainer.css'
import BrewCard from '../BrewCard/BrewCard'
import FilterBar from '../FilterBar/FilterBar'
import { Link } from 'react-router-dom'

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

export default BrewContainer
