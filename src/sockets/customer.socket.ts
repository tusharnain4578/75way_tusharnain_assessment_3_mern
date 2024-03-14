
import { Server, Socket } from 'socket.io';
import Booking, { IBooking } from "../models/booking.model";

export default function initializeCustomerSockets(io: Server, driverSockets: Socket[]) {
    io.on('connection', (socket: Socket) => {
        console.log('A customer connected');
        socket.on('search', async (queryObject) => {
            console.log('queryobject ', queryObject);
            const { customerId, customerName, currentLocation, destination } = queryObject;
            const data = { customerId, pickupLocation: currentLocation, destination };
            const booking: IBooking = new Booking(data);
            booking.socketId = socket.id;
            await booking.save();
            driverSockets.forEach(driverSocket => {
                driverSocket.emit('searchNotification', { bookingId: booking.id, ...queryObject });
            });
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
}
