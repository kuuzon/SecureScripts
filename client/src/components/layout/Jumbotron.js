//Import React components
import React from 'react'

//Import packages
import {Jumbotron as Jumbo, Container} from 'react-bootstrap';
import styled from 'styled-components';

//Import image
import doctorImage from '../../assets/doctor.jpg';

//Custom styles CSS
const Styles = styled.div`
    .jumbo {
        background: url(${doctorImage}) no-repeat;
        background-size: cover;
        background-position: right 50% bottom 60%;
        color: #FFFFFF;
        height: 350px;
        position: relative;
        z-index: -1;    
        scale: 1rem;
        /* z-index is about stacking things on each other */
    }

    .overlay {
        background-color: #000;
        opacity: 0.3;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
    }

    .container {
        padding-top: 10rem;
    }

    p {
        font-style: italic;
    }
`;

const Jumbotron = () => {
    return (
        <Styles>
            <Jumbo fluid className='jumbo'>
                <div className='overlay'></div>
                <Container className='container'>
                    <h3>SecureScripts</h3>
                    <p>The modern nexus between patients, doctors and pharmacists.</p>
                </Container>
            </Jumbo>
        </Styles>
    )
}

export default Jumbotron