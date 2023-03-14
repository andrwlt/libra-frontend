import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { RcFile, UploadChangeParam } from 'antd/es/upload/interface';
import { UploadRequestOption as RcCustomRequestOptions } from 'rc-upload/lib/interface';
import { useState } from 'react';
import requester from 'services/requester';
import { useTranslation } from 'react-i18next';

interface ImageUploaderProps {
  label?: string;
  onChange?: Function;
  size?: number;
  value?: string;
  purpose: string;
  onFieldsChange?: () => void;
}

export default function ImageUploader({ label, onChange, value, purpose, onFieldsChange }: ImageUploaderProps) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const uploadImage = async (options: RcCustomRequestOptions) => {
    const { onSuccess, onError, file } = options;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('purpose', purpose);

    try {
      const response = await requester.post('http://api.libra.atscale.xyz/files', formData, {
        headers: { 'content-type': 'multipart/form-data' },
      });
      onSuccess?.(response);
    } catch (err: any) {
      onError?.(err);
    }
  };

  const beforeUpload = async (file: RcFile) => {
    const isImage = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/svg+xml';

    if (!isImage) {
      message.error(t('imageUploader.fileTypeWarning'));
    }

    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error(t('imageUploader.fileSizeWarning'));
    }

    return isImage && isLt2M;
  };

  const handleChange = (info: UploadChangeParam) => {
    if (info.file.status === 'uploading') {
      setIsLoading(true);
    }

    if (info.file.status === 'done') {
      const imageUrl = info.file?.response?.data?.url;
      setIsLoading(false);
      onChange?.(imageUrl);
      onFieldsChange?.();
    }
  };

  const uploadButton = (
    <div>
      {isLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>{label}</div>
    </div>
  );

  return (
    <Upload
      customRequest={uploadImage}
      listType="picture-card"
      showUploadList={false}
      onChange={handleChange}
      beforeUpload={beforeUpload}
      style={{ height: '100%', width: '100%' }}
    >
      {value ? (
        <img src={value} alt={label} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      ) : (
        uploadButton
      )}
    </Upload>
  );
}
