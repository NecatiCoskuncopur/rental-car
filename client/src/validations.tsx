import { FormInstance } from 'antd';
import { RuleObject } from 'antd/es/form';

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

export { emailValidations };
