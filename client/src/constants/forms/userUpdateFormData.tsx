import { DatePicker, FormInstance, Input } from 'antd';

import { birthDateValidations, emailValidations, nameValidations, surnameValidations } from '@/validations';

const userUpdateFormData = (form: FormInstance) => [
  {
    label: 'Name',
    name: 'name' as const,
    rules: nameValidations,
    children: <Input />,
  },
  {
    label: 'Surname',
    name: 'surname' as const,
    rules: surnameValidations,
    children: <Input />,
  },

  {
    label: 'Date of Birth',
    name: 'dateofBirth' as const,
    rules: birthDateValidations(form),
    children: (
      <DatePicker
        showTime={false}
        format="DD-MM-YYYY"
      />
    ),
  },
  {
    label: 'Email',
    name: 'email' as const,
    rules: emailValidations(form),
    children: <Input />,
  },
];

export default userUpdateFormData;
