import cron from 'node-cron';
import Booking from '../models/bookingModel.js';

cron.schedule('* * * * *', async () => {
  try {
    const now = new Date();
    const turkeyNow = new Date(now.getTime() + 3 * 60 * 60 * 1000); // UTC+3 farkı

    const bookings = await Booking.find({
      status: 'pending',
      startDate: { $lt: turkeyNow },
    });

    for (let booking of bookings) {
      booking.status = 'cancelled';
      await booking.save();
    }

    console.log('Pending bookings automatically cancelled:', bookings.length);
  } catch (error) {
    console.error('Error in auto cancelling pending bookings:', error);
  }
});
