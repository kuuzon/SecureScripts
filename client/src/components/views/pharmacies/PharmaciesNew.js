//Import React 
import React, { Fragment, useState } from 'react';

//Import packages
import { Form, Col, Button, Alert } from 'react-bootstrap';
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
const PharmaciesNew = () => {
    //React States
    //[1] Set state for the form
    const [ formData, setFormData ] = useState({
        name: '',
        pharmStreetNumber: '',
        pharmStreetName: '',
        pharmCity: '',
        pharmState: '',
        pharmPostcode: '',
        headPharmacist: '',
        email: ''
    });

    //[2] Set state for the alert
    const [show, setShow] = useState(false);
    const [alertData, setAlertData] = useState({
        variant: 'danger',
        message: ''
    })

    const { name, pharmStreetNumber, pharmStreetName, pharmCity, pharmState, pharmPostcode, headPharmacist, email } = formData;
    const { variant, message } = alertData;

    //Create (post) functions
    //[1] Record form submissions
    const onChange = e => setFormData(
        {...formData, [e.target.name]: e.target.value }
    );

    //[2] Submit button function (w Alert states)
    const handleSubmit = async e => {
        e.preventDefault();
        console.log(formData);
        
        try {
            const res = await axios.post('/api/pharms', formData);
            console.log(res);

            //Show alert
            setShow(true);
            //Set data for alert
            setAlertData({ variant: "success", message: res.data })

        } catch(error) {
            console.log(error);

            //Show alert
            setShow(true);
            //Set data for alert
            setAlertData({ variant: "danger", message: error.response.data })
        }
    };

    return (
        <Fragment>
            <H2>Add a Pharmacy</H2>
            <P>Please complete the pharmacy details below:</P>

            {/* Alert Display */}
            {
                show === true ? 
                (
                    <Alert 
                        className='mt-5' 
                        variant={variant} 
                        onClose={() => setShow(false)} dismissible 
                    >
                        <Alert.Heading>
                            { variant === 'success' ? ' Success ' : 'Oops.  Something broke!' }
                        </Alert.Heading>
                        <p>
                            {message}
                        </p>
                    </Alert>
                ) : null
            }
            
            {/* Form */}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Pharmacy Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter name of pharmacy"
                        name="name"
                        value={name}
                        onChange={e => onChange(e)}
                        required
                    />
                </Form.Group>
                <Form.Row>
                    <Form.Group as={Col} md="3" controlId="pharmStreetNumber">
                        <Form.Label>Street Number</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter pharmacy street number"
                            name="pharmStreetNumber"
                            value={pharmStreetNumber}
                            onChange={e => onChange(e)}
                            required
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="9" controlId="pharmStreetName">
                        <Form.Label>Street Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter pharmacy street name"
                            name="pharmStreetName"
                            value={pharmStreetName}
                            onChange={e => onChange(e)}
                            required
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md="6" controlId="pharmCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter city name" 
                            name="pharmCity"
                            value={pharmCity}
                            onChange={e => onChange(e)}
                            required
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="pharmState">
                        <Form.Label>State</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter state" 
                            name="pharmState"
                            value={pharmState}
                            onChange={e => onChange(e)}
                            required
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="pharmPostcode">
                        <Form.Label>Postcode</Form.Label>
                        <Form.Control 
                            type="number" 
                            placeholder="Enter postcode" 
                            name="pharmPostcode"
                            value={pharmPostcode}
                            onChange={e => onChange(e)}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Group controlId="headPharmacist">
                    <Form.Label>Head Pharmacist Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter head pharmacist name"
                        name="headPharmacist"
                        value={headPharmacist}
                        onChange={e => onChange(e)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Head Pharmacist Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter head pharmacist email"
                        name="email"
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                </Form.Group>
                <Button variant="success" type="submit">Submit</Button>
            </Form>
        </Fragment>
    )
}

export default PharmaciesNew