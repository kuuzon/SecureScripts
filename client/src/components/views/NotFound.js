//Import React components
import React from 'react';

//Import packages
import styled from 'styled-components';
import { Container } from 'react-bootstrap';
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

const Styles = styled.div`
    .container {
        padding-bottom: 1rem;
    }
`;

//Render section:
const NotFound = () => {
    return (
        <Styles>
            <Container>
                <H2><FontAwesomeIcon icon= {faExclamationTriangle}/>Page Not Found</H2>
                <H3>It seems that you made an error somewhere</H3>
                <P>This is not the page you were looking for!</P>
            </Container>
        </Styles>
    )
}

export default NotFound