//Import React components
import React from 'react';

//Import packages
import { Nav } from 'react-bootstrap';
import styled from 'styled-components';

//Custom styles for navs
const Styles = styled.div`  
    .nav {
        background-color: #1b1c32;
        height: 2rem;
        position: absolute;
        overflow: hidden;
        bottom: 0;
        width: 100%;
        /* Scrolling opacity */
        backdrop-filter: saturate(180%) blur(20px);
        opacity: 0.80;
    };

    .nav-link {
        color: #DDDDDD;
        font-size: 0.8rem;
        &:hover {        
            color: #FFFFFF;
        }
    };
`;

const BottomNav = () => {
    return (
        <Styles>
            <Nav className="justify-content-center"  expand='lg' sticky="bottom">
                <Nav.Link>
                    SecureScripts: Copyright © Alex Bicknell 2020
                </Nav.Link>
            </Nav>
        </Styles>
    )
}

export default BottomNav