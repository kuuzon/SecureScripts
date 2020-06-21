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
        color: #EAEAEA;
        &:hover {        
            color: #FFFFFF;
        }
    }

    .d-inline-block {
        color: #e96530;
        margin-right: 0.5rem;
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