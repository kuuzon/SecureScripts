//Import React components
import React from 'react';

//Import packages
import { Navbar } from 'react-bootstrap';
import styled from 'styled-components';

//Custom styles for navs
const Styles = styled.div`  
    .navbar {
        background-color: #1b1c32;
        height: 2rem;
        /* Scrolling opacity */
        backdrop-filter: saturate(180%) blur(20px);
        opacity: 0.80;
    }

    .navbar-brand {
        color: #EAEAEA;
        font-size: 0.8rem;
        &:hover {        
            color: #FFFFFF;
        }
    }
`;

const BottomNav = () => {
    return (
        <Styles>
            <Navbar className="justify-content-center"  expand='lg' sticky="bottom">
                <Navbar.Brand>
                    SecureScripts: Copyright © Alex Bicknell 2020
                </Navbar.Brand>
            </Navbar>
        </Styles>
    )
}

export default BottomNav