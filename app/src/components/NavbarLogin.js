import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import logo from "./../logo.png";

function NavBarLogin() {
return (
    <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand to="/" as={Link}>
                <img src={logo} alt="Market SE" height={"60px"}/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    <Nav.Link to="/" as={Link}>Sign in</Nav.Link>
                </Navbar.Text>
            </Navbar.Collapse>
        </Container>
    </Navbar>
);
}

export default NavBarLogin;