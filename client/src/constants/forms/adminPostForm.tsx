import { Image, Input, Progress, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { StyledQuill } from '@/components';

const adminPostForm = (
  handleImageUpload: (file: File) => void,
  uploadProgress: number,
  imageUrl: string | null,
  existingImage: string | undefined,
  content: string,
  setContent: (value: string) => void
) => [
  {
    label: 'Title',
    name: 'title',
    rules: [{ required: true, message: 'Please input the title!' }],
    children: <Input placeholder="Enter title" />,
  },
  {
    label: 'Image',
    name: 'image',
    rules: [
      {
        validator(_: any, value: any) {
          if (existingImage || (imageUrl && value === undefined)) {
            return Promise.resolve();
          }
          return value ? Promise.resolve() : Promise.reject(new Error('Please upload an image!'));
        },
      },
    ],
    children: (
      <Upload
        listType="picture-card"
        maxCount={1}
        beforeUpload={(file) => {
          handleImageUpload(file);
          return false;
        }}
        showUploadList={false}
      >
        {uploadProgress > 0 && uploadProgress < 100 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Progress
              type="circle"
              percent={Math.round(uploadProgress)}
              width={80}
              strokeColor="#1890ff"
            />
            <div style={{ marginTop: 8 }}>Uploading...</div>
          </div>
        ) : imageUrl || existingImage ? (
          <Image
            src={imageUrl || existingImage}
            alt="Preview"
            preview={false}
            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
          />
        ) : (
          <div>
            <UploadOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        )}
      </Upload>
    ),
  },
  {
    label: 'Content',
    name: 'content',
    rules: [{ required: true, message: 'Please input the content!' }],
    initialValue: content,
    children: (
      <StyledQuill
        value={content}
        onChange={(value) => setContent(value)}
      />
    ),
  },
];

export default adminPostForm;
