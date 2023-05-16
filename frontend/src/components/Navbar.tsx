import { Button, Container, Nav, Navbar } from 'react-bootstrap';

import './../App.css';
import { Link } from 'react-router-dom';

interface NavbarHeaderProps {
  onShow: () => void;
}

const NavbarHeader = (props: NavbarHeaderProps) => {
  const style: React.CSSProperties = {
    textDecoration: 'none',
    padding: '1rem',
  };
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>Politicians</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link style={style} to="">
                Home
              </Link>
              <Link style={style} to="statistics">
                Statistics
              </Link>
            </Nav>
            <Nav>
              <Nav.Link eventKey={2}>
                <Button variant="primary" onClick={props.onShow}>
                  Upload
                </Button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarHeader;
