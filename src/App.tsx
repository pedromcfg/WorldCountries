import React, { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import TitleNavbar from './components/TitleNavbar';
import Countries from './components/CountryList/Countries';
import Favorites from './components/Favorites/Favorites';
import { Row, Col } from 'react-bootstrap';
import _ from 'lodash';

const WorldMap = require('react-world-map');

const App:React.FC = ():JSX.Element => 
{
  console.log("APP");
  
  const [allCountries, setAllCountries] = useState<any[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<any[]>([]);
  const [selectedContinent, setSelectedContinent] = useState<string>("");
  const [title, setTitle] = useState<string>("Select a region")

  const fetchCountriesHandler = useCallback(async () =>
  {    
    const url:string = `https://restcountries.com/v3.1/all`;  
    await fetch(url)
      .then(result => result.json())
        .then(data => {
          setAllCountries(data);
        })
          .catch(error => alert("Error: "+error.message));
  }, [])

  useEffect(() => {
    fetchCountriesHandler();
    console.log("FETCHING ALL");
  }, [fetchCountriesHandler]);

  
  const selectedContinentHandler = (selectedContinent: React.SetStateAction<string>) => 
  {
    //in case it's null: unselected or initial state
    const convertToString:string = String(selectedContinent);
    setSelectedContinent(convertToString);

    let regionContinent:string = "";

    if (selectedContinent === "eu") regionContinent = "Europe";
    if (selectedContinent === "na") regionContinent = "North America";
    if (selectedContinent === "sa") regionContinent = "South America";
    if (selectedContinent === "as") regionContinent = "Asia";
    if (selectedContinent === "oc") regionContinent = "Oceania";
    if (selectedContinent === "af") regionContinent = "Africa";

    let subRegionFlag:number = 0;
    if (selectedContinent === "na" || selectedContinent === "sa")
      subRegionFlag = 1;

    const filteredCountries:any[] = _.filter(allCountries, function(item){ 
      return subRegionFlag? item.subregion === regionContinent : item.region === regionContinent;
    });

    setFilteredCountries(filteredCountries);
    regionContinent? setTitle(regionContinent) : setTitle("Select a region");

    console.log("SELECT");
  }
  
  return (
    <div className="App">
      <TitleNavbar/>

      <header className="App-header">
        {(allCountries.length) ? <h5>{title}</h5> : ""}
          {(allCountries.length)? <WorldMap selected={ selectedContinent } onSelect={ selectedContinentHandler }/> : <h3>Loading...</h3>}  
      </header>
      
      <main>
        <Row>
          <Col xs={3} md={2} className='mySidebar'>
            <Favorites/>
          </Col>
          <Col xs={12} md={8}>
            {selectedContinent && <Countries countries={filteredCountries}/>}
          </Col>
        </Row> 
      </main>
  </div>

  );
}

export default App;
