import React from 'react';
import { Modal, Form } from 'antd';

import { useUploadImage } from '@/hooks';
import PostForm from '../Forms/PostForm';
import VehicleForm from '../Forms/VehicleForm';

type CreateModalProps = {
  isVisible: boolean;
  handleCreate: (values: any) => Promise<void>;
  handleCancel: () => void;
  loading: boolean;
  type: string;
};

const CreateModal: React.FC<CreateModalProps> = ({ isVisible, handleCreate, handleCancel, loading, type }) => {
  const [form] = Form.useForm();
  const { uploadImage, isUploading, uploadProgress, imageUrl, error } = useUploadImage();

  const title = `Create ${type.charAt(0).toUpperCase() + type.slice(1)}`;

  const onFinish = async (values: any) => {
    const dataToSubmit = {
      ...values,
      image: imageUrl || null,
    };

    await handleCreate(dataToSubmit);
  };

  return (
    <Modal
      title={title}
      open={isVisible}
      onOk={() => form.submit()}
      onCancel={handleCancel}
      okText="Create"
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
          />
        )}
        {type === 'vehicle' && (
          <VehicleForm
            handleImageUpload={uploadImage}
            uploadProgress={uploadProgress}
            imageUrl={imageUrl}
          />
        )}
      </Form>
    </Modal>
  );
};

export default CreateModal;
