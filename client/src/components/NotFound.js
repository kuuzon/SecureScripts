//Import React components
import React from 'react';

//Import packages
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

//Custom styles
const H2 = styled.h2`
    font-size: 3rem;
    font-weight: bold;
    color: red;
    text-align: center;
`;

const H3 = styled.h3`
    font-size: 1.5rem;
    color: red;
    text-align: center;
`;

const P = styled.p`
    font-size: 1rem;
    color: black;
    text-align: center;
`;

//Render section:
const NotFound = () => {
    return (
        <div>
            <H2><FontAwesomeIcon icon= {faExclamationTriangle}/> OOPS...</H2>
            <H3>It seems that you made an error somewhere</H3>
            <P>This is not the page you were looking for!</P>
        </div>
    )
}

export default NotFound