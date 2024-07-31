import React from 'react';
import BrewCard from '../BrewCard/BrewCard';

const AllBrew = ({ breweries }) => {
  const groupedBreweries = groupBreweriesByFirstChar(breweries);

  return (
    <div>
      {Object.keys(groupedBreweries).sort().map(char => (
        <div key={char}>
          <h2>{char.match(/[A-Z]/) ? char : '0-9'}</h2>
          {groupedBreweries[char].map(brewery => (
            <BrewCard
              key={brewery.id}
              name={brewery.name}
              type={brewery.brewery_type}
              city={brewery.city}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

const groupBreweriesByFirstChar = (breweries) => {
  const grouped = {};
  breweries.forEach(brewery => {
    const firstChar = brewery.name.charAt(0).toUpperCase();
    if (!grouped[firstChar]) {
      grouped[firstChar] = [];
    }
    grouped[firstChar].push(brewery);
  });
  return grouped;
};

export default AllBrew;
