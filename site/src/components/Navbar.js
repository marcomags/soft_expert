import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import logo from "./../logo.png";
import {BsFillCartFill, BsFillHouseFill} from "react-icons/bs";

function NavBar() {

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Collapse className="justify-content-start">
                    <Navbar.Text>
                        <Nav.Link title="Home" to="/" as={Link}><BsFillHouseFill/></Nav.Link>
                    </Navbar.Text>
                </Navbar.Collapse>
                <Navbar.Brand to="/" as={Link} className="justify-content-center mx-auto">
                    <img src={logo} alt="Market SE" height={"60px"}/>
                </Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        <Nav.Link title="Cart" to="/cart" as={Link}><BsFillCartFill/></Nav.Link>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;