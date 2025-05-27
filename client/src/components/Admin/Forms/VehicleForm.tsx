import React from 'react';
import { Col, Form, Row } from 'antd';

import { adminVehicleForm } from '@/constants';

type VehicleProps = {
  handleImageUpload: (file: File) => void;
  uploadProgress: number;
  imageUrl: string | null;
  existingImage?: string;
};

const VehicleForm: React.FC<VehicleProps> = ({ handleImageUpload, uploadProgress, imageUrl, existingImage }) => {
  const formFields = adminVehicleForm(handleImageUpload, uploadProgress, imageUrl, existingImage);

  return (
    <>
      <Row gutter={16}>
        {formFields.map((field, index) => (
          <Col
            xs={12}
            md={8}
            key={field.name || index}
          >
            <Form.Item
              name={field.name}
              label={field.label}
              rules={field.rules}
            >
              {field.component}
            </Form.Item>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default VehicleForm;
