//Import React components
import React from 'react';

//Import packages
import { Navbar } from 'react-bootstrap';
import styled from 'styled-components';

//Custom styles for navs
const Styles = styled.div`  
    .navbar {
        background-color: #D6EAF0;
        height: 2rem;
        /* Scrolling opacity */
        backdrop-filter: saturate(180%) blur(20px);
        opacity: 0.80;
    }

    .navbar-brand {
        color: #F9923B;
        font-size: 0.8rem;
        &:hover {        
            color: #F96376;
        }
    }

    .d-inline-block {
        color: #F96376;
    }
`;

const BottomNav = () => {
    return (
        <Styles>
            <Navbar className="justify-content-center"  expand='lg' sticky="bottom">
                <Navbar.Brand>
                    CatKingdom: Copyright © Alex Bicknell 2020
                </Navbar.Brand>
            </Navbar>
        </Styles>
    )
}

export default BottomNav