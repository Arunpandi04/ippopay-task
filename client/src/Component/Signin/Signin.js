import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import './Signin.css';
import services from '../../Services/services';
import { useNavigate,Link } from "react-router-dom";

function Signin() {
    const [input, setInput] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState({
        email: '',
        password: '',
        serverError: ''
    });

    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = {};
        if (!input.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(input.email)) {
            errors.email = 'Email is invalid';
        }

        if (!input.password) {
            errors.password = 'Password is required';
        } else if (input.password.length < 8) {
            errors.password = 'Password must be at least 8 characters';
        }
        if (Object.keys(errors).length === 0) {
            delete input.confirmpassword;
            services({url:'http://localhost:5000/signin', method:'post'}, input).then(res => {
                sessionStorage.setItem('token', res.data.accessToken)
                sessionStorage.setItem('authenticate', true)
                sessionStorage.setItem('id',res.data.data._id)
                navigate('/dashboard')
            }).catch(err => {
                console.log("Error", err?.response?.data?.message)
                const serverError = {
                    serverError: err?.response?.data?.message
                }
                setError({...error,...serverError})
            })
        } else {
            setError({ ...errors });
        }
    }

    const handleChange = (event) => {
        event.preventDefault();
        setInput({ ...input, [event.target.name]: event.target.value });
        if (error[event.target.name].length) {
            const serverError = {
                serverError: ''
            }
            setError({ ...error, ...serverError, [event.target.name]: '' })
        }
    }
    return (
        <div className="signin-container">
            <Container className="d-flex flex-column align-items-center justify-content-center">
                <h1>Sign In</h1>
                {error.serverError && <h5 style={{color: 'red'}}>{error.serverError}</h5>}
                <Row>
                    <Col sm={12}>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formEmail" style={{ margin: '10px' }}>
                                <Row>
                                    <Col sm={4} lg={4} lx={6}>
                                        <Form.Label>Email:</Form.Label>
                                    </Col>
                                    <Col>
                                        <Form.Control name="email" type="email" value={input.email} onChange={handleChange} />
                                    </Col>
                                </Row>
                                {error.email && <Form.Text style={{ color: "red" }}>{error.email}</Form.Text>}
                            </Form.Group>
                            <Form.Group controlId="formPassword" style={{ margin: '10px' }}>
                                <Row>
                                    <Col sm={4} lg={4} lx={6}>
                                        <Form.Label>Password:</Form.Label>
                                    </Col>
                                    <Col>
                                        <Form.Control name="password" type="password" value={input.password} onChange={handleChange} />
                                    </Col>
                                </Row>
                                {error.password && <Form.Text style={{ color: "red" }}>{error.password}</Form.Text>}
                            </Form.Group>
                            <div className='signin-btn'>
                                <Button variant="primary" type="submit">Submit</Button>
                            </div>
                        </Form>
                        <h5 style={{ textAlign: "center" }}>
                            Create an Account <Link to="/signup">signup</Link>
                        </h5>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Signin;
