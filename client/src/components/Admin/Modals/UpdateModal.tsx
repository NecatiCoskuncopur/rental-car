import React, { useEffect } from 'react';
import { Modal, Form } from 'antd';

import { useUploadImage } from '@/hooks';
import PostForm from '../Forms/PostForm';
import VehicleForm from '../Forms/VehicleForm';

type UpdateModalProps = {
  isVisible: boolean;
  handleUpdate: (values: any) => Promise<void>;
  handleCancel: () => void;
  loading: boolean;
  type: string;
  selectedItem: {
    title?: string;
    image?: string;
    content?: string;
    name?: string;
    brand?: string;
    model?: string;
    vehicleType?: string;
    price?: number;
    passengers?: number;
    transmissionType?: string;
    fuelType?: string;
    minAge?: number;
    doors?: number;
  } | null;
};

const UpdateModal: React.FC<UpdateModalProps> = ({ isVisible, handleUpdate, handleCancel, loading, type, selectedItem }) => {
  const { uploadImage, isUploading, uploadProgress, imageUrl, error } = useUploadImage();
  const [form] = Form.useForm();

  useEffect(() => {
    if (selectedItem) {
      switch (type) {
        case 'post':
          form.setFieldsValue({
            title: selectedItem.title,
            image: selectedItem.image,
            content: selectedItem.content,
          });
          break;
        case 'vehicle':
          form.setFieldsValue({
            brand: selectedItem.brand,
            model: selectedItem.model,
            image: selectedItem.image,
            vehicleType: selectedItem.vehicleType,
            price: selectedItem.price,
            passengers: selectedItem.passengers,
            transmissionType: selectedItem.transmissionType,
            fuelType: selectedItem.fuelType,
            minAge: selectedItem.minAge,
            doors: selectedItem.doors,
          });
          break;
        default:
          form.resetFields();
      }
    }
  }, [selectedItem, type, form]);

  const title = 'Update ' + type.charAt(0).toUpperCase() + type.slice(1);

  const onFinish = (values: any) => {
    const dataToSubmit = {
      ...values,
      image: imageUrl || null,
    };
    handleUpdate(dataToSubmit);
  };

  return (
    <Modal
      title={title}
      open={isVisible}
      onOk={() => form.submit()}
      onCancel={handleCancel}
      okText="Update"
      cancelText="Cancel"
      confirmLoading={loading || isUploading}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        {type === 'post' && (
          <PostForm
            handleImageUpload={uploadImage}
            uploadProgress={uploadProgress}
            imageUrl={imageUrl}
            existingImage={selectedItem?.image}
          />
        )}

        {type === 'vehicle' && (
          <VehicleForm
            handleImageUpload={uploadImage}
            uploadProgress={uploadProgress}
            imageUrl={imageUrl}
            existingImage={selectedItem?.image}
          />
        )}
      </Form>
    </Modal>
  );
};

export default UpdateModal;
