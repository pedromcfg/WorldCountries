import React, { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import TitleNavbar from './components/TitleNavbar';
import Countries from './components/CountryList/Countries';
import Favorites from './components/Favorites/Favorites';
import { Row, Col } from 'react-bootstrap';

const WorldMap = require('react-world-map');

const App:React.FC = ():JSX.Element => 
{
  const [countries, setCountries] = useState<any[]>([]);
  const [showCountryList, setShowCountryList] = useState(false);
  const [selectedContinent, setSelectedContinent] = useState<string>("null");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("Select a region")

  const fetchCountriesHandler = useCallback(async (sc: React.SetStateAction<string>) =>
  {
    if (sc === "null") 
      { setCountries([]); 
        setShowCountryList(false);
        return;
      }

    setIsLoading(true);
    let regionContinent: string = "";
      if (sc === "eu") regionContinent = "region/europe";
      if (sc === "na") regionContinent = "subregion/north america";
      if (sc === "sa") regionContinent = "subregion/south america";
      if (sc === "as") regionContinent = "region/asia";
      if (sc === "oc") regionContinent = "region/oceania";
      if (sc === "af") regionContinent = "region/africa";
    
    const url:string = `https://restcountries.com/v3.1/${regionContinent}`;

    const extractRegionContinentName:string = regionContinent.substring(regionContinent.indexOf('/')+1,regionContinent.length)

    setTitle(extractRegionContinentName.toUpperCase());
    
    await fetch(url)
      .then(result => result.json())
        .then(data => {
          setCountries(data);
          setIsLoading(false);
          setShowCountryList(true);
        })
          .catch(error => alert("Error: "+error));
  }, [])

  useEffect(() => {
    fetchCountriesHandler(selectedContinent);
  }, [fetchCountriesHandler]);
  
  const selectedContinentHandler = (selectedContinent: React.SetStateAction<string>) => 
  {
    //in case it's null: unselected or initial state
    const convertToString = String(selectedContinent);
    setSelectedContinent(convertToString);
    fetchCountriesHandler(convertToString);
  }
  

  return (
    <div className="App">
        <TitleNavbar/>

        <header className="App-header">
          <h5>{title}</h5>
            <WorldMap selected={ selectedContinent } onSelect={ selectedContinentHandler }/>
        </header>
       
        <main>
          <Row>
            <Col xs={3} md={2} className='mySidebar'>
              <Favorites/>
            </Col>
            <Col xs={12} md={8}>
            {showCountryList && !isLoading && <Countries selectedContinent={selectedContinent} countries={countries}/>}
                  {isLoading && <h3>Loading...</h3>}
            </Col>
          </Row> 
        </main>
  </div>

  );
}

export default App;
