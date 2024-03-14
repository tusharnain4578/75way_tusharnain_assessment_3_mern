import React from 'react';
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { Outlet, useNavigate } from 'react-router-dom';
import { brand } from '../config/main';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/AuthSlice';

const DriverPanelLayout = (): React.JSX.Element => {



    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state: any) => state.auth?.user ?? null);

    const _logout = () => {
        dispatch(logout());
        navigate('/auth/login');
    }

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Link to="/driver" className='navbar-brand'>
                        {brand} - Driver Panel
                    </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">

                            <Link to="/driver/my-vehicle" className='nav-link'>My Vehicle</Link>



                            <NavDropdown title={user.fullName} id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1" onClick={_logout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container>
                <Outlet />
            </Container>
        </>
    );
};

export default DriverPanelLayout;
