//Import React 
import React, { useState, useEffect, Fragment } from 'react';

//Import packages
import { Card, CardColumns } from 'react-bootstrap'; 
import styled from 'styled-components';
import axios from 'axios';

//Custom styles
const H1 = styled.h1`
    font-size: 1.5rem;
    font-weight: bold;
    color: #1b1c32;
`;

const H2 = styled.h2`
    font-size: 1.2rem;
    font-weight: bold;
    color: #1b1c32;
`;

const H3 = styled.h3`
    font-size: 1rem;
    font-weight: bold;
    color: black;
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

    .card-title {
        padding-bottom: 0.2rem;
    }
`;

const PharmaciesList = () => {
    //React States
    //[1] Set states for list
    const [data, setData] = useState([]);

    //Read (get) function
    //[1] Fetch database data to display    
    useEffect(() => {
        const listData = async () => {
            const res = await axios.get('/api/pharms');
            setData(res.data);
        };
        listData();
    }, []);
    
    return (
        <Styles>
            <Fragment>
                <H1>List of Registered Pharmacies</H1>
                <P>Please register a new pharmacy if your desired location is not listed below:</P>
                <CardColumns>
                    {data.map(item => (
                        <Card key={item.objectID}>
                            <Card.Body>
                                <Card.Title><H2>{item.name}</H2></Card.Title>
                                <Card.Text><H3>Address:</H3></Card.Text>
                                <Card.Text>{item.pharmStreetNumber}{' '}{item.pharmStreetName}</Card.Text>
                                <Card.Text>{item.pharmCity}{' '}{item.pharmState}{' '}{item.pharmPostcode}</Card.Text>
                                <Card.Text><H3>Head Pharmacist:</H3></Card.Text>
                                <Card.Text>{item.headPharmacist}</Card.Text>
                                <Card.Text>{item.email}</Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </CardColumns>
            </Fragment>
        </Styles>
    )
}

export default PharmaciesList