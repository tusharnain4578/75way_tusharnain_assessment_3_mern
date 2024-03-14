
import { Navbar, Nav, Container } from 'react-bootstrap';
import { brand } from '../config/main';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className='container'>
            {/* Navbar */}
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#">{brand}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Link to="/auth/login" className='nav-link'>Login</Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            {/* Jumbotron */}
            <div className="jumbotron mt-5 pt-5">
                <Container>
                    <h1>Welcome to {brand}</h1>
                    <p>
                        {brand} is a simple platform for Drivers and those who needs a driver.
                    </p>
                </Container>
            </div>


            {/* Footer */}
            <footer className="bg-light text-center text-lg-start">
                <div className="text-center p-3">
                    © {new Date().getFullYear()} {brand}
                </div>
            </footer>
        </div>
    );
}

export default Home;
