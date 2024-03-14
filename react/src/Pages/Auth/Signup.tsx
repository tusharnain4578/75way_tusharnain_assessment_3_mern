import React, { SyntheticEvent, useState } from 'react';
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from '../../config/axios';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Signup = () => {
    const formInitialState = {
        fullName: '',
        email: '',
        phone: '',
        role: '1', // default to customer
        password: '',
        confirmPassword: '',
    };
    const [formData, setFormData] = useState(formInitialState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();

        axios.post('/auth/signup', formData)
            .then((response: { data: any }) => {
                const data = response.data;
                toast.success(data.message);
                setFormData(formInitialState);
            })
            .catch((error: any) => {
                if (error.response && error.response.data) {
                    const errorMessage = error.response.data.message;
                    toast.error(errorMessage);
                } else {
                    console.error('Error:', error);
                }
            });
    };

    return (
        <Container className="py-5">
            <div><Toaster /></div>
            <Row className="justify-content-center">
                <Col md="6">
                    <div className='p-4' style={{ backgroundColor: '#e8e8e8' }}>
                        <h2 className="mb-4 text-center">Sign Up</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className='mt-3' controlId="formFullName">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your full name"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className='mt-3' controlId="formEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className='mt-3' controlId="formPhone">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                    type="tel"
                                    placeholder="Enter phone number"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Label className='mt-3' >Register as</Form.Label>

                            <Form.Group controlId="formRoleCustomer">
                                <Form.Check
                                    type="radio"
                                    label="Customer"
                                    name="role"
                                    value="1"
                                    checked={formData.role === '1'}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="formRoleDriver">

                                <Form.Check
                                    type="radio"
                                    label="Driver"
                                    name="role"
                                    value="2"
                                    checked={formData.role === '2'}
                                    onChange={handleChange}
                                />
                            </Form.Group>


                            <Form.Group className='mt-3' controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className='mt-3' controlId="formConfirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm Password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit" className="w-100 mt-4">
                                Sign Up
                                <Spinner size="sm" className='ms-2' animation="border" role="status" hidden={true}>
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            </Button>
                        </Form>
                        <h5 className='mt-3'>Already have an account?
                            <Link to="/auth/login" className='ms-2'>Log in</Link>
                        </h5>
                    </div>
                </Col>
            </Row>

        </Container>
    );
};

export default Signup;
