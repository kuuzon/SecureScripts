import React from 'react';

//Import packages
import styled from 'styled-components';
import { Container } from 'react-bootstrap';

//Custom styles
const Styles = styled.div`
    .container {
        margin-bottom: 2rem;
    }
`;

const Layout = props => (
    <Styles>
        <Container>
            {props.children}
        </Container>
    </Styles>
)

export default Layout