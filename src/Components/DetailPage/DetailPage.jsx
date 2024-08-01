import React from 'react'
import { useParams } from 'react-router-dom'
import '../DetailPage/DetailPage.css'

const DetailPage = ({ breweries }) => {
  const { id } = useParams();
  console.log('id', id)
  const singleBrewery = breweries.find(brewery => brewery.id === id)

  if (!singleBrewery) {
    return <div>Brewery not found</div>;
  }
  const { name, brewery_type, address_1, address_2, address_3, city, state, postal_code, country, phone, website_url } = singleBrewery;
  return (
    <div className='container'>
      <div className='detail-section'>
        <h2>{name}</h2>
        <p>Brewery Type: {brewery_type}</p>
        <p>This brewery is Located in {city}, {state}</p>
        <p>Main Location: {address_1}, {city}, {state} - {postal_code}</p>
        <p>Phone: {phone}</p>
      </div>
    </div>
  )
}

export default DetailPage