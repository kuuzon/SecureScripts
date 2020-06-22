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
    .card {
        padding-left: 0rem;
    }
`;

const PharmaciesList = () => {
    return (
        <Styles>
            <Fragment className="card text-center">
                <H2>{name}</H2>
                <P>{pharmStreetNumber}</P>
                <P>{pharmAddress.street}</P>
                <P>{pharmAddress.city}</P>
                <P>{pharmAddress.state}</P>
                <P>{pharmAddress.postcode}</P>
                <P>{headPharmacist}</P>
                <P>{email}</P>
            </Fragment>
        </Styles>
    )
}

export default PharmaciesList