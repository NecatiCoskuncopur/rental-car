import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    vehicle: {
      type: Schema.Types.ObjectId,
      ref: 'Vehicle',
      required: true,
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required.'],
    },
    endDate: {
      type: Date,
      required: [true, 'End date is required.'],
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: 'pending',
      enum: ['pending', 'confirmed', 'cancelled'],
    },
  },
  { timestamps: true }
);

bookingSchema.plugin(mongoosePaginate);
const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
