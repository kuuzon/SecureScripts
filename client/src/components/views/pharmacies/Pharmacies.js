//Import React 
import React, { Fragment } from 'react';

//Import packages
import { Container, Button, Row, Col } from 'react-bootstrap';
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
                <Container>
                    <H2>Pharmacy Options:</H2>
                    <P>Click on the links below to view or adjust the pharmacies in the SecureScripts database:</P>
                    <Row >
                        <Col>
                            <Button variant="success" size="lg">
                                Available Pharmacies
                            </Button>
                            {' '}    
                        </Col>
                        <Col>
                            <Button variant="success" size="lg">
                                Add Pharmacy
                            </Button>
                            {' '}
                        </Col>
                        <Col>
                            <Button variant="success" size="lg">
                                Update Pharmacy
                            </Button>
                            {' '}
                        </Col>
                        <Col>
                            <Button variant="success" size="lg">
                                Delete Pharmacy
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        </Styles>
    )
}

export default Pharmacies