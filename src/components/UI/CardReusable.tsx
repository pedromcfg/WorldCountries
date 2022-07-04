import React, { Fragment } from 'react';

import { Badge, Button, Card } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import CountryModal from '../CountryList/CountryModal';

import { useSelector, useDispatch } from 'react-redux';
import { favoriteActions } from '../../components/store/store';

type Props =
{ [x:string]: any; }

const CardReusable:React.FC<Props> = (props) => 
{
  const favorites:string[] = useSelector<any, string[]>(state => state.favorites); 
  const dispatch = useDispatch();

  const favoriteHandler = () =>
  { dispatch(favoriteActions.addFavorites(props.country.name.common)); }

  return (
    <Fragment>    
        <Card>
            <Card.Img variant="top" src={props.country.flags.png}/>
            <Card.Body>
                <Card.Title>{props.country.name.common}</Card.Title>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item"><Badge bg="success">Capital</Badge> {props.country.capital}</li>
                      <li className="list-group-item"><Badge bg="success">Population</Badge> {props.country.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</li>
                    </ul>
                <div className="row">
                  <CountryModal country={props.country}/>
                  <Button variant="danger" onClick={favoriteHandler} disabled={favorites.includes(props.country.name.common)? true : false}>
                    <FontAwesomeIcon icon={faHeart}/>
                  </Button>
                </div>
            </Card.Body>
        </Card>
    </Fragment>
  )
}

export default CardReusable