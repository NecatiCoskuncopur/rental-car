import mongoose from 'mongoose';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';

const urlRegex = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/[\w.-]*)*\/?$/i;

const vehicleSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: [true, 'Brand is required.'],
      minlength: [2, 'Brand must be at least 2 characters.'],
      maxlength: [30, 'Brand must be at most 30 characters.'],
      validate: {
        validator: (v) => /^[A-Za-z\s]+$/.test(v),
        message: 'Brand can only contain letters and spaces.',
      },
    },
    model: {
      type: String,
      required: [true, 'Model is required.'],
      unique: true,
      minlength: [2, 'Model must be at least 2 characters.'],
      maxlength: [50, 'Model must be at most 50 characters.'],
      validate: {
        validator: (v) => /^[A-Za-z0-9\s]+$/.test(v),
        message: 'Model can only contain letters, numbers, and spaces.',
      },
    },
    price: {
      type: Number,
      required: [true, 'Price is required.'],
      min: [0, 'Price cannot be negative.'],
    },
    image: {
      type: String,
      validate: {
        validator: (v) => urlRegex.test(v),
        message: 'Image must be a valid URL.',
      },
    },
    vehicleType: {
      type: String,
      enum: {
        values: ['sedan', 'suv', 'hatchback', 'station vagon', 'mpv'],
        message: 'Vehicle type must be one of: sedan, suv, hatchback, station vagon, mpv.',
      },
      required: [true, 'Vehicle type is required.'],
    },
    doors: {
      type: Number,
      min: [2, 'Doors must be at least 2.'],
      max: [5, 'Doors cannot exceed 5.'],
      required: [true, 'Number of doors is required.'],
    },
    passengers: {
      type: Number,
      min: [2, 'Passengers must be at least 2.'],
      max: [12, 'Passengers cannot exceed 12.'],
      required: [true, 'Number of passengers is required.'],
    },
    transmissionType: {
      type: String,
      enum: {
        values: ['automatic', 'manual'],
        message: 'Transmission type must be either automatic or manual.',
      },
      required: [true, 'Transmission type is required.'],
    },
    fuelType: {
      type: String,
      enum: {
        values: ['gasoline', 'diesel', 'electric', 'hybrid'],
        message: 'Fuel type must be one of: gasoline, diesel, electric, hybrid.',
      },
      required: [true, 'Fuel type is required.'],
    },
    minAge: {
      type: Number,
      min: [18, 'Minimum age must be at least 18.'],
      max: [35, 'Minimum age cannot exceed 35.'],
      required: [true, 'Minimum driver age is required.'],
    },
  },
  { timestamps: true }
);

vehicleSchema.plugin(aggregatePaginate);
const Vehicle = mongoose.model('Vehicle', vehicleSchema);

export default Vehicle;
