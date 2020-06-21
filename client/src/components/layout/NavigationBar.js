//Import React
import React from 'react';

//Import packages
import { Nav, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrescriptionBottle } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

//Custom styles for Nav
const Styles = styled.div`
    .navbar {
        background-color: #F9BE8B;
        font-weight: bold;
        height: 3rem;
        /* Scrolling opacity */
        backdrop-filter: saturate(180%) blur(20px);
        opacity: 0.80;
    }

    .navbar-brand, .navbar-nav .nav-link {
        color: #D2691E;
        &:hover {        
            color: #F96376;
        }
    }

    .d-inline-block {
        color: #F96376;
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
                            <Nav.Link href='/'>Home</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Styles>
    )
}

export default NavigationBar