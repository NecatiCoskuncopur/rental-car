import { FormInstance, Input } from 'antd';

const addressFormData = (form: FormInstance) => [
  {
    label: 'Country',
    children: <Input />,
  },
  {
    label: 'State',
    children: <Input />,
  },
  {
    label: 'City',
    children: <Input />,
  },
  {
    label: 'Pincode',
    children: <Input type="number" />,
  },
];

export default addressFormData;
