import React from 'react'
import PropTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom'
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
        <h2 className='brewery-name'>{name}</h2>
        <p className='brewery-type'><strong>Brewery Type:</strong> {brewery_type}</p>
        <p className='brewery-location'><strong>Location:</strong> {city}, {state}</p>
        <p className='brewery-address'><strong>Address:</strong> {address_1}, {city}, {state} - {postal_code}</p>
        {address_2 && <p className='brewery-address'><strong>Address 2:</strong> {address_2}</p>}
        {address_3 && <p className='brewery-address'><strong>Address 3:</strong> {address_3}</p>}
        <p className='brewery-phone'><strong>Phone Number:</strong> {phone}</p>
        {website_url && <p className='brewery-website'><strong>Website:</strong> <a href={website_url} target='_blank' rel='noopener noreferrer'>{website_url}</a></p>}
      </div>
      
      <Link to="/" className='home-button'>
        Home
      </Link>
        
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