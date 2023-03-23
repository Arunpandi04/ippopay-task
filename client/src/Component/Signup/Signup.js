import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import './Signup.css';
import services from '../../Services/services';
import { useNavigate,Link } from "react-router-dom";

function Signup() {
    const [input, setInput] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmpassword: ''
    });

    const [error, setError] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmpassword: '',
        serverError: ''
    });

    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = {};
        console.log("input",input)
        if (!input.name) {
            errors.name = 'Name is required';
        }
        if (!input.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(input.email)) {
            errors.email = 'Email is invalid';
        }
        if (!input.phone) {
            errors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(input.phone)) {
            errors.phone = 'Phone number is invalid';
        }
        if (!input.password) {
            errors.password = 'Password is required';
        } else if (input.password.length < 8) {
            errors.password = 'Password must be at least 8 characters';
        }
        if (!input.confirmpassword) {
            errors.confirmpassword = 'Confirm Password is required';
        } else if (input.confirmpassword.length < 8) {
            errors.confirmpassword = 'Confirm Password must be at least 8 characters';
        }
        if (Object.keys(errors).length === 0) {
            const inputData = {...input}
            delete inputData.confirmpassword;
            services({url: 'http://localhost:5000/signup', method:'post'}, inputData).then(res => {
                sessionStorage.setItem('authenticate', true)
                sessionStorage.setItem('otp',res.data.data.otp)
                sessionStorage.setItem('id',res.data.data._id)
                sessionStorage.setItem('email',res.data.data.email)
                navigate('/otp')
            }).catch(err => {
                console.log("Error", err.response.data.message)
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
            setError({ ...error,...serverError, [event.target.name]: "" })
        }
    }
    return (
        <div className="signup-container">
            <Container className="d-flex flex-column align-items-center justify-content-center">
                <h1>Sign Up</h1>
                {error.serverError && <h5 style={{color: 'red'}}>{error.serverError}</h5>}
                <Row>
                    <Col sm={12}>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formName" style={{ margin: '10px' }}>
                                <Row>
                                    <Col sm={4} lg={4} lx={4}>
                                        <Form.Label>Name:</Form.Label>
                                    </Col>
                                    <Col>
                                        <Form.Control name="name" type="text" value={input.name} onChange={handleChange} />
                                    </Col>
                                </Row>
                                {error.name && <Form.Text style={{ color: "red" }}>{error.name}</Form.Text>}
                            </Form.Group>
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
                            <Form.Group controlId="formPhone" style={{ margin: '10px' }}>
                                <Row>
                                    <Col sm={4} lg={4} lx={6}>
                                        <Form.Label>Phone:</Form.Label>
                                    </Col>
                                    <Col>
                                        <Form.Control name="phone" type="tel" value={input.phone} onChange={handleChange} />
                                    </Col>
                                </Row>
                                {error.phone && <Form.Text style={{ color: "red" }}>{error.phone}</Form.Text>}
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
                            <Form.Group controlId="formConfirmPassword" style={{ margin: '10px' }}>
                                <Row>
                                    <Col sm={4} lg={4} lx={6}>
                                        <Form.Label>Confirm Password:</Form.Label>
                                    </Col>
                                    <Col>
                                        <Form.Control name="confirmpassword" type="password" value={input.confirmpassword} onChange={handleChange} />
                                    </Col>
                                </Row>
                                {error.confirmpassword && <Form.Text style={{ color: "red" }}>{error.confirmpassword}</Form.Text>}
                            </Form.Group>
                            <div className='signup-btn'>
                                <Button variant="primary" type="submit">Submit</Button>
                            </div>
                        </Form>
                        <h5 style={{ textAlign: "center" }}>
                            Already have an Account <Link to="/">signin</Link>
                        </h5>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Signup;
