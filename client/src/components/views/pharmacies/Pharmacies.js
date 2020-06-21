//Import React 
import React, { Fragment } from 'react';

//Import packages
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

//Custom styles
const H2 = styled.h2`
    font-size: 1.5rem;
    font-weight: bold;
    color: #1b1c32;
`;

const P = styled.p`
    font-size: 1rem;
    color: black;
    padding-bottom: 1rem;
`;

const Styles = styled.div`
    .button {
        padding-left: 2rem;
    }
`;

const Pharmacies = () => {
    return (
        <Styles>
            <Fragment>
                <H2>Pharmacy Options:</H2>
                <P>Click on the links below to view or adjust the pharmacies in the SecureScripts database:</P>
                <Button variant="success" size="lg" href='/pharmacieslist'>
                    Available Pharmacies
                </Button>
                {' '}    
                <Button variant="success" size="lg" href='/pharmaciesnew'>
                    Add Pharmacy
                </Button>
                {' '}
                <Button variant="success" size="lg" href='/pharmaciesupdate'>
                    Update Pharmacy
                </Button>
                {' '}
                <Button variant="success" size="lg" href='/pharmaciesremove'>
                    Remove Pharmacy
                </Button>
            </Fragment>
        </Styles>
    )
}

export default Pharmacies