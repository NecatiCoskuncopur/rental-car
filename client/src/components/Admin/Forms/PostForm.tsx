import React, { useState } from 'react';
import { Form } from 'antd';

import { adminPostForm } from '@/constants';

type PostProps = {
  handleImageUpload: (file: File) => void;
  uploadProgress: number;
  imageUrl: string | null;
  existingImage?: string;
};

const PostForm: React.FC<PostProps> = ({ handleImageUpload, uploadProgress, imageUrl, existingImage }) => {
  const [content, setContent] = useState<string>('');

  const formData = adminPostForm(handleImageUpload, uploadProgress, imageUrl, existingImage, content, setContent);

  return (
    <>
      {formData.map((item) => (
        <Form.Item
          key={item.name}
          name={item.name}
          label={item.label}
          rules={item.rules}
          initialValue={item.initialValue}
        >
          {item.children}
        </Form.Item>
      ))}
    </>
  );
};

export default PostForm;
