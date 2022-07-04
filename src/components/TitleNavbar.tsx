import React, { Fragment } from 'react';
import { Navbar, Container } from 'react-bootstrap';

const TitleNavbar = () => {
  return (
    <Fragment>
      <Navbar bg="dark" expand="lg">
        <Container  className="justify-content-center">
          <Navbar.Brand style={{color: 'white'}}>WORLD COUNTRIES</Navbar.Brand>
        </Container>
      </Navbar>
    </Fragment>
  )
}

export default TitleNavbar;