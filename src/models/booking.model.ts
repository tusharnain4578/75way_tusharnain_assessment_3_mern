import mongoose, { Schema, model, Document } from 'mongoose';
import BookingStatus from '../enums/BookingStatus.enum';


// Interface
export interface IBooking extends Document {
    socketId: string;
    customerId: mongoose.Types.ObjectId;
    pickupLocation: string;
    destination: string;
    driverId: mongoose.Types.ObjectId | null;
    status: BookingStatus;
    createdAt: Date;
}


const bookingSchema = new Schema<IBooking>({
    socketId: { type: String, required: true },
    customerId: { type: Schema.Types.ObjectId, required: true },
    pickupLocation: { type: String, required: true },
    destination: { type: String, required: true },
    driverId: { type: Schema.Types.ObjectId, required: false },
    status: { type: String, enum: Object.values(BookingStatus), required: true, default: BookingStatus.PENDING },
    createdAt: { type: Date, default: Date.now }
});


export default model<IBooking>('Booking', bookingSchema);