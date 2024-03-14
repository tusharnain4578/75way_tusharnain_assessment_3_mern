import React, { useState, useEffect } from 'react';
import { Button, Col, Form, FormLabel, Row } from 'react-bootstrap';
import axios from '../../config/axios';
import toast, { Toaster } from 'react-hot-toast';

const MyVehicle = (): React.JSX.Element => {
    const [selectedVehicle, setSelectedVehicle] = useState('');
    const [status, setStatus] = useState(false); // Default status is false

    useEffect(() => {
        axios.get('/driver/get-registered-vehicle')
            .then(response => {
                const vehicle: string = response.data.vehicle || '';
                const status: boolean = response.data.status || false;
                if (vehicle !== '') {
                    toast.success(`Your current vehicle is ${vehicle}.`);
                    setSelectedVehicle(vehicle);
                }
                setStatus(status);
            })
            .catch(error => {
                console.error('Error fetching vehicle:', error);
            });
    }, []);

    const handleSaveChanges = () => {
        if (selectedVehicle === "") {
            toast.error('Please select a vehicle');
            return;
        }

        axios.post('/driver/register-vehicle', { vehicle: selectedVehicle, status })
            .then(response => {
                toast.success(response.data.message);
                console.log('Vehicle saved successfully:', response.data);
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    const errorMessage = error.response.data.message;
                    toast.error(errorMessage);
                } else {
                    console.error('Error:', error);
                }
            });
    };

    return (
        <>
            <div><Toaster /></div>
            <Row className='text-center mt-5 justify-content-center'>
                <Col xl={5} lg={6} md={8}>
                    <div className='p-4' style={{ backgroundColor: '#e8e8e8' }}>
                        <h2>Select Your Vehicle</h2>
                        <Form.Group controlId="vehicleSelect">
                            <Form.Label>Select Vehicle:</Form.Label>
                            <Form.Control as="select" value={selectedVehicle} onChange={(e) => setSelectedVehicle(e.target.value)}>
                                <option value="" disabled>Select...</option>
                                <option value="bike">Bike (2 Wheeler)</option>
                                <option value="car">Car (4 Wheeler)</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className='d-flex mt-3' controlId="statusSwitch">
                            <FormLabel>Status</FormLabel>
                            <Form.Check
                                type="switch"
                                name="status"
                                checked={status}
                                className='ms-2'
                                onChange={(e) => setStatus(e.target.checked)}
                            />
                        </Form.Group>

                        <Button className='mt-3' variant="primary" onClick={handleSaveChanges}>Save Changes</Button>
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default MyVehicle;
