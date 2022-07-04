import React, { Fragment, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import ModalReusable from '../UI/ModalReusable';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo } from '@fortawesome/free-solid-svg-icons';

type Props =
{ [x:string]: any; }

const CountryModal:React.FC<Props> = (props) => 
{
    // console.log("COUNTRY MODAL")
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (event: React.SyntheticEvent) => {
        event.preventDefault();
        setShow(true);
    };

    let contentToBeRenderedInModal: JSX.Element = 
        <Table variant="dark table-striped table-sm" className='text-center'>
            <tbody>
                <tr key="Latitude">
                  <th>Latitude</th>
                      <td>{props.country.latlng[0]}</td>
                </tr>
                <tr key="Longitude">
                  <th>Longitude</th>
                      <td>{props.country.latlng[1]}</td>
                </tr>
                <tr key="Status">
                  <th>Status</th>
                      <td>{props.country.status}</td>
                </tr>
                <tr key="UnMember">
                  <th>U.N. Member</th>
                      <td>{props.country.unMember? "Yes" : "No"}</td>
                </tr>
            </tbody>
        </Table>;

  return (
    <Fragment>
        <Button variant="primary" onClick={handleShow} ><FontAwesomeIcon icon={faInfo} /></Button>
        <ModalReusable show={show} handleClose={handleClose} modalTitle={props.country.name.common}>
          <div className="table-responsive">
              {contentToBeRenderedInModal}
          </div>
        </ModalReusable>
    </Fragment>
  )
}

export default CountryModal