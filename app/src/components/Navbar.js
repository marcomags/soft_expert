import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import logo from "./../logo.png";
import {BsDoorOpenFill} from "react-icons/bs"

function NavBar() {

    const Logout = () => {
        localStorage.setItem("logged", false);
        window.location.reload(false);
    }

return (
    <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand to="/" as={Link}>
                <img src={logo} alt="Market SE" height={"60px"}/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <NavDropdown title="Product" id="dropdown-product">
                        <NavDropdown.Item to="/product/create" as={Link}>Create</NavDropdown.Item>
                        <NavDropdown.Item to="/product/list" as={Link}>List</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Category" id="dropdown-category">
                        <NavDropdown.Item to="/category/create" as={Link}>Create</NavDropdown.Item>
                        <NavDropdown.Item to="/category/list" as={Link}>List</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    <Nav.Link onClick={Logout} title="Logout"><BsDoorOpenFill/></Nav.Link>
                </Navbar.Text>
            </Navbar.Collapse>
        </Container>
    </Navbar>
);
}

export default NavBar;