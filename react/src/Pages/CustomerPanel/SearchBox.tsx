import { SyntheticEvent, useEffect, useState } from 'react';
import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import socketIOClient, { Socket } from 'socket.io-client';
import { IBooking } from '../../types/index.types';
import { SocketBaseUrl, driverLookupMaxTimeout } from '../../config/main';

interface Props {
    currentLocation: string;
}

const SearchBox = ({ currentLocation }: Props) => {
    const user = useSelector((state: any) => state.auth?.user ?? null);

    const [socket, setSocket] = useState<Socket>();
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [searching, setSearching] = useState(false);
    const [driverName, setDriverName] = useState<string | null>(null);
    const [rideAccepted, setRideAccepted] = useState(false);
    const [noDriversModal, setNoDriversModal] = useState(false);

    useEffect(() => {
        const socket = socketIOClient(SocketBaseUrl);
        setSocket(socket);

        socket.on('ride_booked', handleRideBooked);

        return () => {
            socket.off('ride_booked', handleRideBooked);
        };
    }, []);

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();

        if (!searching) {
            setShowModal(true);
            setSearching(true);

            const emitObject: IBooking = {
                currentLocation,
                destination: searchQuery,
                customerName: user.fullName,
                customerId: user.userId
            };

            socket && socket.emit('search', emitObject);


            setTimeout(() => {
                setShowModal(false);
                setNoDriversModal(true);
                setSearching(false);
            }, driverLookupMaxTimeout);
        }
    }

    const handleRideBooked = (data: { driverName: string }) => {
        const { driverName } = data;

        setSearching(false);
        setShowModal(false);
        setRideAccepted(true);
        setDriverName(driverName);
    }

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='mt-3' controlId="formEmail">
                    <Form.Label>Destination Location</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Location"
                        name="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-2 float-end" disabled={searching}>
                    Find Drivers
                </Button>
            </Form>

            <Modal show={showModal} backdrop="static" keyboard={false} centered>
                <Modal.Body className="text-center">
                    <Spinner animation="border" role="status" />
                    <p>Please wait, looking for drivers...</p>
                </Modal.Body>
            </Modal>

            <Modal show={rideAccepted} backdrop="static" keyboard={false} centered>
                <Modal.Body className="text-center">
                    <p>Your ride has been accepted by a driver!</p>
                    <h5>Driver Name: <strong>{driverName}</strong></h5>
                </Modal.Body>
            </Modal>

            <Modal show={noDriversModal} onHide={() => setNoDriversModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>No Drivers Available</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Unfortunately, no drivers are available at the moment.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setNoDriversModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default SearchBox;
