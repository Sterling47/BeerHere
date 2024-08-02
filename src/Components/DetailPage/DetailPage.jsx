import React from 'react'
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom'
import '../DetailPage/DetailPage.css'

const DetailPage = ({ breweries }) => {
  const { id } = useParams();
  console.log('id', id)
  const singleBrewery = breweries.find(brewery => brewery.id === id)

  if (!singleBrewery) {
    return <div>Brewery not found</div>;
  }
  const { name, brewery_type, address_1, address_2, address_3, city, state, postal_code, phone, website_url } = singleBrewery;
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

DetailPage.propTypes = {
  breweries: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      brewery_type: PropTypes.string.isRequired,
      address_1: PropTypes.string,
      address_2: PropTypes.string,
      address_3: PropTypes.string,
      city: PropTypes.string.isRequired,
      state: PropTypes.string,
      postal_code: PropTypes.string,
      phone: PropTypes.string,
      website_url: PropTypes.string,
    })
  ).isRequired,
};

export default DetailPage