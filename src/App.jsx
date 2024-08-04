import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import BrewContainer from './Components/BrewContainer/BrewContainer';
import NavBar from './Components/NavBar/NavBar';
import FilterBar from './Components/FilterBar/FilterBar';
import DetailPage from './Components/DetailPage/DetailPage';
import AllBrew from './Components/AllBreweryPage/AllBrew';
import HeroSection from './Components/HeroSection/HeroSection';

const App = () => {
  const [breweries, setBreweries] = useState([]);
  const [filteredBreweries, setFilteredBreweries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const [filterType, setFilterType] = useState(''); 
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const getBeer = async () => {
    let allBreweries = [];
    let page = 1;
    let perPage = 200;
    let fetchMore = true;

    while (fetchMore) {
      try {
        const response = await fetch(`https://api.openbrewerydb.org/v1/breweries?per_page=${perPage}&page=${page}`);
        if (!response.ok) {
          throw new Error('Failed to load breweries');
        }
        const data = await response.json();
        allBreweries = [...allBreweries, ...data];
        if (data.length < perPage) {
          fetchMore = false;
        } else {
          page += 1;
        }
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        setError('Failed to load breweries'); 
        fetchMore = false;
      }
    }

    const threeCities = allBreweries.filter(brewery =>
      brewery.city === 'Atlanta' ||
      brewery.city === 'Denver' ||
      brewery.city === 'Phoenix'
    );
    setBreweries(threeCities);
    setFilteredBreweries(threeCities);
    setLoading(false);
  };

  const handleFilter = (filtered, type) => {
    setFilteredBreweries(filtered);
    setFilterType(type);
  };

  useEffect(() => {
    getBeer();
  }, []);

  return (
    <div className='App'>
      <NavBar />
      {isHomePage && (
        <>
          <HeroSection />
          <FilterBar breweries={breweries} onFilter={handleFilter} />
        </>
      )}
      {error && <div className="error-message">{error}</div>}
      <Routes>
        <Route path='/' element={<BrewContainer breweries={filteredBreweries} loading={loading} filterType={filterType} />} />
        <Route path='/detail/:id' element={<DetailPage breweries={breweries} />} />
        <Route path='/AllBreweries' element={<AllBrew breweries={breweries} onFilter={handleFilter} />} />
      </Routes>
    </div>
  );
}

export default App;