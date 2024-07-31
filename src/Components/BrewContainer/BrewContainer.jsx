import React from 'react'
import '../BrewContainer/BrewContainer.css'
import BrewCard from '../BrewCard/BrewCard'
import FilterBar from '../FilterBar/FilterBar'
import { Link } from 'react-router-dom'

const BrewContainer = ({ breweries }) => {
    const BreweryCards = breweries.map(brewery => {
        return (
            <div key={brewery.id}>
                <Link to={`/detail/${brewery.id}`}>
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
    <div>
    
    {BreweryCards}
    </div>
  )
}

export default BrewContainer