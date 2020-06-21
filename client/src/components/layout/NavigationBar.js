//Import React
import React from 'react';

//Import packages
import { Nav, Navbar, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrescriptionBottle } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

//Custom styles for Nav
const Styles = styled.div`
    .navbar {
        background-color: #1b1c32;
        font-weight: bold;
        height: 3rem;
        /* Scrolling opacity */
        backdrop-filter: saturate(180%) blur(20px);
        opacity: 0.90;
    }

    .navbar-brand {
        color: #FFFFFF;
        &:hover {        
            color: #FFFFFF;
        }
    }

    .navbar-nav .nav-link {
        color: #DDDDDD;
        &:hover {        
            color: #FFFFFF;
        }
    }

    .d-inline-block {
        color: #e96530;
        margin-right: 0.5rem;
    }

    .navbutton-login {
        margin-top: 0.2rem;
        margin-left: 1.5rem;
        padding-left: 1rem;
        padding-right: 1rem;
    }

    .navbutton-signup {
        margin-top: 0.2rem;
        margin-left: 1rem;
        padding-left: 1rem;
        padding-right: 1rem;
    }
`

//Render section
const NavigationBar = () => {
    return (
        <Styles>
            <Navbar expand='lg' fixed="top">
                <Navbar.Brand href='/'>
                    <FontAwesomeIcon 
                        alt=""
                        icon= {faPrescriptionBottle}
                        className="d-inline-block"
                    />{' '}
                    SecureScripts
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='ml-auto'>
                        <Nav.Item>
                            <Nav.Link href='/medication'>Medication</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href='/clinics'>Clinics</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href='/pharm'>Pharmacies</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href='/scripts'>Scripts</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href='/scripts'>Patients</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Button className="navbutton-login" variant="outline-success" size="sm">Log In</Button> 
                        </Nav.Item>
                        <Nav.Item>
                            <Button className="navbutton-signup" variant="success" size="sm">Sign Up</Button> 
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Styles>
    )
}

export default NavigationBar