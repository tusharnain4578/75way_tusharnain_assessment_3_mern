import { useEffect, useState } from 'react';
import { Card, Spinner } from 'react-bootstrap';
import axios from "../../config/axios";
import toast, { Toaster } from 'react-hot-toast';
import socketIOClient, { Socket } from 'socket.io-client';
import BookingCard from '../../Components/Driver/BookingCard';
import { IBooking } from '../../types/index.types';
import { useSelector } from 'react-redux';
import { SocketBaseUrl } from '../../config/main';

const Home = () => {

    const user = useSelector((state: any) => state.auth?.user ?? null);


    const [liveLocation, setLiveLocation] = useState('');
    const [rideBookings, setRideBookings] = useState<IBooking[]>([]);
    const [driverSocket, setDriverSocket] = useState<Socket>();

    useEffect(() => {
        const socket = socketIOClient(`${SocketBaseUrl}/drivers`);
        setDriverSocket(socket);


        return () => {
            if (driverSocket) {
                driverSocket.off('searchNotification');
            }
        };
    }, []);


    useEffect(() => {
        if (driverSocket) {
            driverSocket.on('searchNotification', (booking: IBooking) => {
                console.log(booking);
                setRideBookings(prevBookings => [...prevBookings, booking]);
                toast.success('New Booking Available!');
            });
        }


        return () => {
            if (driverSocket) {
                driverSocket.off('searchNotification');
            }
        };
    }, [driverSocket]);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;

                    axios.post('/map/get-address', { latitude, longitude })
                        .then(response => {
                            const data = response.data;
                            setLiveLocation(data.display_name || `Latitude: ${latitude}, Longitude: ${longitude}`);
                            toast.success("Live Location Fetched!");
                        })
                        .catch(error => {
                            if (error.response && error.response.data) {
                                const errorMessage = error.response.data.message;
                                toast.error(errorMessage);
                            } else {
                                console.error('Error:', error);
                            }
                        });
                },
                (error) => {
                    console.error('Error getting location:', error.message);
                    setLiveLocation('Location unavailable');
                }
            );
        } else {
            setLiveLocation('Geolocation is not supported by your browser');
        }
    }, []);


    const onBookingAccept = (bookingId: string) => {
        if (driverSocket) {
            driverSocket.emit('bookBooking', {
                bookingId,
                driver: user
            });
        }
    }

    return (
        <div>
            <Toaster />
            <Card className="mt-4">
                <Card.Body>
                    <Card.Title>Your Current Location</Card.Title>
                    <Card.Text>
                        {liveLocation ? liveLocation : <Spinner size='sm' animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>}
                    </Card.Text>
                </Card.Body>
            </Card>

            <Card className="mt-4">
                <Card.Body>
                    <Card.Title>Ride Bookings</Card.Title>

                    {rideBookings.map((booking, index) => (
                        <BookingCard key={index} booking={booking} onAccept={onBookingAccept} />
                    ))}
                </Card.Body>
            </Card>
        </div>
    );
};

export default Home;
