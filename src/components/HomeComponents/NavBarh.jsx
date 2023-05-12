import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';

const NavBarh = ({ data, onClick }) => {
  return (
    <div>
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand>REVINTO ANALYTICS</Navbar.Brand>
          <Navbar.Toggle as="button" aria-expanded="false" aria-label="Toggle navigation" />
          <Navbar.Collapse id="navbarScroll" className="justify-content-end">
            <Navbar.Text style={{ marginRight: '10px' }}>
              Signed in as: {data.name}
            </Navbar.Text>

            <Button onClick={onClick}>logout</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBarh;
