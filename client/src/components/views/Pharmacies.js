//Import React 
import React, { Fragment, useState } from 'react';

//Import packages
import { Form, Button, Alert } from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';

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

//Render
const Pharmacies = () => {
    return (
<Fragment>
            <H2>Add a Pharmacy</H2>
            <P>Please complete the pharmacy details below:</P>

            {/* Alert Display */}

            
            {/* Form */}
            <Form >
                <Form.Group controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter first name"
                        name="firstName"
                        value="firstName"
                    />
                </Form.Group>
                <Form.Group controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter last name"
                        name="lastName"
                        value="lastName"
                    />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value="email"
                    />
                </Form.Group>
                <Button variant="dark" type="submit">Submit</Button>
            </Form>
        </Fragment>
    )
}

export default Pharmacies