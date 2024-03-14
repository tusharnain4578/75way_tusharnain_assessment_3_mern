import { Button, Card } from 'react-bootstrap'
import { IBooking } from '../../types/index.types';

interface BookingCardProps {
    booking: IBooking;
    onAccept: (bookingId: string) => void;
}

const BookingCard = ({ booking, onAccept }: BookingCardProps) => {

    const handleAccept = () => {
        booking.bookingId && onAccept(booking.bookingId);
    };

    return (
        <Card className="mt-4">
            <Card.Body>
                <Card.Title>{booking.customerName}</Card.Title>

                <h6>
                    <strong>Pickup Location : </strong>
                    <span>
                        {booking.currentLocation}
                    </span>
                </h6>

                <h6>
                    <strong>Destination : </strong>
                    <span>
                        {booking.destination}
                    </span>
                </h6>

                <Button className='float-end' onClick={handleAccept}>
                    Accept
                </Button>

            </Card.Body>
        </Card>
    )
}

export default BookingCard;
