import { useState } from 'react';

const useUploadImage = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const uploadImage = async (file: File) => {
    setIsUploading(true);
    setError(null);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('image', file);

    const xhr = new XMLHttpRequest();

    xhr.open('POST', '/api/upload', true);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(percent);
      }
    };

    xhr.onload = () => {
      setIsUploading(false);
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          setImageUrl(response.imageUrl);
        } catch (e) {
          setError('Invalid server response');
        }
      } else {
        setError(`Upload failed with status ${xhr.status}`);
      }
    };

    xhr.onerror = () => {
      setIsUploading(false);
      setError('An error occurred during the upload');
    };

    xhr.send(formData);
  };

  return { uploadImage, isUploading, uploadProgress, error, imageUrl };
};

export default useUploadImage;
