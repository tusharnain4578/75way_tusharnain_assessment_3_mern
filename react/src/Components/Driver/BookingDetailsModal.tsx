import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { IBooking } from '../../types/index.types';

interface Props {
    booking: IBooking;
    onCancel: () => void;
    onFinish: () => void;
}

const BookingDetailsModal: React.FC<Props> = ({ booking, onCancel, onFinish }) => {
    return (
        <Modal show={true} backdrop="static" keyboard={false} centered>
            <Modal.Header>
                <Modal.Title>Booking Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><strong>Customer Name:</strong> {booking.customerName}</p>
                <p><strong>Pickup Location:</strong> {booking.currentLocation}</p>
                <p><strong>Destination Location:</strong> {booking.destination}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCancel}>Cancel Ride</Button>
                <Button variant="primary" onClick={onFinish}>Finish Ride</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default BookingDetailsModal;
