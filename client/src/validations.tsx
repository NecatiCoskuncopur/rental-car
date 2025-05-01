import { FormInstance } from 'antd';
import { RuleObject } from 'antd/es/form';
import dayjs from 'dayjs';

const birthDateValidations = (form: FormInstance): RuleObject[] => [
  {
    required: true,
    message: 'Date of birth is mandatory',
  },
  {
    validator: (_, value) => {
      const birthDate = dayjs(value);
      if (!birthDate.isValid()) {
        return Promise.reject(new Error('Please enter a valid date'));
      }

      const today = dayjs();
      const age = today.diff(birthDate, 'year');
      if (value && age < 18) {
        return Promise.reject(new Error('Must be over 18 years old'));
      }
      return Promise.resolve();
    },
  },
];

const emailValidations = (form: FormInstance): RuleObject[] => [
  { required: true, message: 'Email is required' },
  { type: 'email', message: 'Please enter a valid email address' },
  {
    validator(_, value) {
      if (!value) return Promise.resolve();

      if (value.endsWith('@tempmail.com')) {
        return Promise.reject(new Error('Temporary email addresses are not allowed.'));
      }
      return Promise.resolve();
    },
  },
];

const messageValidations: RuleObject[] = [
  { required: true, message: 'Message cannot be empty' },
  { max: 300, message: 'Message must be at most 300 characters' },
  {
    pattern: /^[a-zA-ZğüşöçĞÜŞİÖÇ\sı0-9]+$/,
    message: 'Message can only contain letters, numbers, and spaces',
  },
];

const nameValidations: RuleObject[] = [
  { required: true, message: 'Name is required' },
  { min: 3, message: 'Name must be at least 3 characters' },
  { max: 30, message: 'Name must be at most 30 characters' },
  {
    pattern: /^[a-zA-ZğüşöçĞÜŞİÖÇ\sı]+$/,
    message: 'Name can only contain letters and spaces',
  },
  {
    validator: (_, value) => {
      if (value.trim().length === 0) {
        return Promise.reject(new Error('Name cannot be empty or contain only whitespace.'));
      }
      return Promise.resolve();
    },
  },
];

const passwordValidations: RuleObject[] = [
  { required: true, message: 'Password is required' },
  { min: 8, message: 'Password must be at least 8 characters' },
  { max: 64, message: 'Password must be at most 64 characters' },
];

const passwordConfirmValidations = (form: FormInstance): RuleObject[] => [
  {
    required: true,
    message: 'Please confirm your password!',
  },
  {
    validator(_, value) {
      const password = form.getFieldValue('password');
      if (!value || password === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('Passwords do not match!'));
    },
  },
];

const phoneNumberValidations = [
  { required: true, message: 'Phone number is required' },
  {
    pattern: /^\d{10}$/,
    message: 'Phone number must consist of 10 digits',
  },
];

const surnameValidations: RuleObject[] = [
  { required: true, message: 'Surname is required' },
  { min: 3, message: 'Surname must be at least 3 characters' },
  { max: 30, message: 'Surname must be at most 30 characters' },
  {
    pattern: /^[a-zA-ZğüşöçĞÜŞİÖÇ\sı]+$/,
    message: 'Surname can only contain letters and spaces',
  },
  {
    validator: (_, value) => {
      if (value.trim().length === 0) {
        return Promise.reject(new Error('Surname cannot be empty or contain only whitespace.'));
      }
      return Promise.resolve();
    },
  },
];

export {
  birthDateValidations,
  emailValidations,
  messageValidations,
  nameValidations,
  passwordValidations,
  passwordConfirmValidations,
  phoneNumberValidations,
  surnameValidations,
};
