import React, { useState } from 'react';
import { Container, InputGroup, FormControl } from 'react-bootstrap';
import CardReusable from '../UI/CardReusable';

import _ from 'lodash';

type Props =
{ 
    selectedContinent: string;
    countries: any[];
}

const Countries:React.FC<Props> = (props):JSX.Element => 
{
    const orderedCountries = _.orderBy(props.countries, item => item.name.common, ['asc']);

    const [inputText, setInputText] = useState("");
    
    const inputHandler = (e: { target: { value: string; }; }) => {
        //convert input text to lower case
        let lowerCase:string = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };

    const filteredCountries = _.filter(orderedCountries, function(item){
        return item.name.common.toLowerCase().includes(inputText.toLowerCase());
      })

    return ( 
        <Container fluid="sm">
            <InputGroup className="mb-3">
                <FormControl
                placeholder="Search country"
                aria-label=""
                aria-describedby=""
                onChange={inputHandler}
                />
            </InputGroup>
            <div className='row cards'>
                {filteredCountries.map(country =>
                    <div className='col-md-3' key={country.name.common}>
                        <CardReusable country={country}/>
                    </div>
                )}
            </div>
        </Container>
    )
}

export default Countries;