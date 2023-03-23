import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import './OTPScreen.css';
import services from '../../Services/services';
import { useNavigate } from "react-router-dom";

const OTP = () => {
    const [otp,setOTP] = useState('');
    const [error,setError] = useState({
        validError: '',
        serverError: ''
    })
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        let errors = ''
        const email = sessionStorage.getItem('email')
        if (!otp) {
            errors = 'OTP is required'
        } else if (!/^[0-9]*$/) {
            errors = 'OTP is invalid'
        }
        if(errors.length === 0) {
            services({url: 'http://localhost:5000/otp', method:'post'},{ email: email,otp: Number(otp) }).then(res => {
                sessionStorage.setItem('token', res.data.accessToken)
                navigate('/dashboard')
            }).catch(err => {
                console.log("Error", err?.response?.data?.message)
                const serverError = {
                    serverError: err?.response?.data?.message
                }
                setError({...error, ...serverError})
            })
        } else {
            const validError = {
                validError: errors
            }
            setError({...error, ...validError})
        }
        
    }
    const handleChange = (event) => {
        event.preventDefault();
        setOTP(event.target.value);
        if (error.length > 0) {
            const errors = {
                validError: '',
                serverError: ''
            }
            setError({...error, ...errors})
        }
    }
    return (
        <div>
            <Container className="d-flex flex-column align-items-center justify-content-center otp-container">
                <h1>OTP Screen</h1>
                {error.serverError && <h5 style={{color: 'red'}}>{error.serverError}</h5>}
                <Row>
                    <Col sm={12}>
                        <Form>
                            <Form.Group controlId="formName" style={{ margin: '10px' }}>
                                <Row>
                                    <Col>
                                        <Form.Control name="otp" type="text" value={otp} onChange={handleChange} />
                                    </Col>
                                    <Col sm={4} lg={4} lx={4}>
                                       <Button onClick={handleSubmit}>submit</Button>
                                    </Col>
                                </Row>
                                {error.validError && <Form.Text style={{ color: "red" }}>{error.validError}</Form.Text>}
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default OTP