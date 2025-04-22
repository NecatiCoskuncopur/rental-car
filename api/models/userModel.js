import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
      minlength: [3, 'Name must be at least 3 characters long.'],
      maxlength: [30, 'Name must be at most 30 characters long.'],
      validate: {
        validator: function (value) {
          return /^[A-Za-zÇçĞğİıÖöŞşÜü\s]+$/.test(value) && value.trim().length > 0;
        },
        message: 'Name can only contain letters and spaces, and must not be empty or contain only whitespace.',
      },
    },
    surname: {
      type: String,
      required: [true, 'Surname is required.'],
      minlength: [3, 'Surname must be at least 3 characters long.'],
      maxlength: [30, 'Surname must be at most 30 characters long.'],
      validate: {
        validator: function (value) {
          return /^[A-Za-zÇçĞğİıÖöŞşÜü\s]+$/.test(value) && value.trim().length > 0;
        },
        message: 'Surname can only contain letters and spaces, and must not be empty or contain only whitespace.',
      },
    },
    dateofBirth: {
      type: Date,
      required: [true, 'Date of Birth is required.'],
      validate: {
        validator: function (value) {
          const today = new Date();
          const minAgeDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
          return value <= minAgeDate;
        },
        message: 'User must be at least 18 years old.',
      },
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      validate: {
        validator: function (value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: 'Please provide a valid email address.',
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
      select: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.plugin(mongoosePaginate);

const User = mongoose.model('User', userSchema);

export default User;
