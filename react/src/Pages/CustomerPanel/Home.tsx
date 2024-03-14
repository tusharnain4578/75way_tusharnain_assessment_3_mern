import { useEffect, useState } from 'react';
import { Card, Spinner } from 'react-bootstrap';
import axios from "../../config/axios";
import toast from 'react-hot-toast';
import SearchBox from './SearchBox';

const Home = () => {
    const [liveLocation, setLiveLocation] = useState('');

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

    return (
        <div>
            <Card className="mt-4">
                <Card.Body>
                    <Card.Title>Live Location</Card.Title>
                    <Card.Text>
                        {liveLocation ? liveLocation : <Spinner size='sm' animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>}
                    </Card.Text>


                </Card.Body>
            </Card>

            <div className='mt-4'>
                {liveLocation ? <SearchBox currentLocation={liveLocation} /> : 'Wait...'}
            </div>
        </div>
    );
};

export default Home;
