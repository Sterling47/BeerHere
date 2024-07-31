import { React, useState, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom';
import BrewContainer from './Components/BrewContainer/BrewContainer';
import NavBar from './Components/NavBar/NavBar';

import FilterBar from './Components/FilterBar/FilterBar';
import DetailPage from './Components/DetailPage/DetailPage';
import AboutMe from './Components/AboutMe/AboutMe';
import AllBrew from './Components/AllBreweryPage/AllBrew';
import HeroSection from './Components/HeroSection/HeroSection';

const App = () => {
  const [breweries, setBreweries] = useState([])
  const [filteredBreweries, setFilteredBreweries] = useState([])
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
        const data = await response.json();
        allBreweries = [...allBreweries, ...data];
        if (data.length < perPage) {
          fetchMore = false;
        } else {
          page += 1;
        }
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        fetchMore = false;
      }
    }
    console.log('All Breweries', allBreweries)
    const threeCities = allBreweries.filter(brewery =>
      brewery.city === 'Atlanta' ||
      brewery.city === 'Denver' ||
      brewery.city === 'Phoenix'
    )
    console.log('Breweries', threeCities)
    setBreweries(threeCities);
    setFilteredBreweries(threeCities)
  };

  const handleFilter = (filtered) => {
    setFilteredBreweries(filtered)
  }

  useEffect(() => {
    getBeer()
  }, [])

  return (
    <div className='App'>
      <NavBar />
      {isHomePage && (
        <>
          <HeroSection />
          <FilterBar  breweries={breweries} onFilter={handleFilter}/>

        </>
      )}
      <Routes>
        <Route path='/' element={<BrewContainer breweries={filteredBreweries} />} />
        <Route path='/detail/:id' element={<DetailPage breweries={breweries} />} />
        <Route path='/aboutMe' element={<AboutMe />} />
        <Route path='/AllBreweries' element={<AllBrew breweries={filteredBreweries} />} />
      </Routes>
    </div>
  )
}

export default App