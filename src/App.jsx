import React from 'react'

const App = () => {
  const getBeer = () => {
    fetch('https://api.openbrewerydb.org/v1/breweries')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });

  }

  useEffect(() => {
    getBeer()
  }, [])
  
  return (
    <div className='App'>App</div>
  )
}

export default App