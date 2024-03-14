
import { Server, Socket } from 'socket.io';
import Booking, { IBooking } from "../models/booking.model";
import BookingStatus from "../enums/BookingStatus.enum";

export default function initializeDriverSockets(io: Server, driverSockets: Socket[]) {
    io.of('/drivers').on('connection', (socket: Socket) => {
        console.log('A driver connected');
        driverSockets.push(socket);

        socket.on('bookBooking', async (bookingData) => {
            const { bookingId, driver } = bookingData;
            console.log(`Booking Id '${bookingId}' and driver name is '${driver.fullName}'`);
            const booking: IBooking | null = await Booking.findById(bookingId);
            if (booking) {
                booking.driverId = driver.userId;
                booking.status = BookingStatus.ACCEPTED;
                await booking.save();
                console.log('customer id -> ', booking.socketId);
                io.to(booking.socketId).emit('ride_booked', {
                    driverName: driver.fullName,
                });
            }
        });

        socket.on('disconnect', () => {
            console.log('Driver disconnected');
            const index = driverSockets.indexOf(socket);
            if (index !== -1) {
                driverSockets.splice(index, 1);
            }
        });
    });
}
