import React from 'react'
import { useParams } from 'react-router-dom'

const DetailPage = ({ breweries }) => {
    const { id } = useParams();
    console.log('id', id)
    const singleBrewery = breweries.find(brewery => brewery.id === id)

    if (!singleBrewery) {
        return <div>Brewery not found</div>;
      }
      const { name, brewery_type, address_1, address_2, address_3, city, state, postal_code, country, phone, website_url } = singleBrewery;
  return (
    <div>{name}
    {brewery_type}</div>
  )
}

export default DetailPage