import React, { SyntheticEvent, useState } from 'react';
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from '../../config/axios';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../store/slices/AuthSlice';

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formInitialState = {
        email: '',
        password: '',
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

        axios.post('/auth/login', formData)
            .then((response: { data: any }) => {
                const data = response.data;

                dispatch(login({
                    user: data.user,
                    token: data.token
                }));

                toast.success(data.message);
                setFormData(formInitialState);

                navigate(data.user.role == 1 ? '/customer' : '/driver');
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
                        <h2 className="mb-4 text-center">Log in</h2>
                        <Form onSubmit={handleSubmit}>

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

                            <Button variant="primary" type="submit" className="w-100 mt-4">
                                Log in
                                <Spinner size="sm" className='ms-2' animation="border" role="status" hidden={true}>
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            </Button>
                        </Form>
                        <h5 className='mt-3'>Don't have an account?
                            <Link to="/auth/signup" className='ms-2'>Sign Up</Link>
                        </h5>
                    </div>
                </Col>
            </Row>

        </Container>
    );
};

export default Login;
