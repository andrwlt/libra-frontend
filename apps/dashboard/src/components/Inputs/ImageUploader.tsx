import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { RcFile, UploadChangeParam } from 'antd/es/upload/interface';
import { UploadRequestOption as RcCustomRequestOptions } from 'rc-upload/lib/interface';
import { useState } from 'react';
import requester from 'services/requester';
import { useTranslation } from 'react-i18next';
import { LOCALE_WORKSPACE } from 'app/i18n';

interface ImageUploaderProps {
  label?: string;
  onChange?: Function;
  size?: string;
  value?: string;
  purpose: string;
  onHoverImageInput?: () => void;
  onMouseLeaveImageInput?: () => void;
}

export default function ImageUploader({
  label,
  onChange,
  value,
  purpose,
  onHoverImageInput,
  onMouseLeaveImageInput,
}: ImageUploaderProps) {
  const { t } = useTranslation(LOCALE_WORKSPACE.LAYOUT);
  const [isLoading, setIsLoading] = useState(false);

  const uploadImage = async (options: RcCustomRequestOptions) => {
    const { onSuccess, onError, file } = options;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('purpose', purpose);

    try {
      const response = await requester.post(`${process.env.REACT_APP_API_URL}/files` || '', formData, {
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
      message.error(t('fileTypeWarning'));
    }

    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error(t('fileSizeWarning'));
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
    }
  };

  const uploadButton = (
    <div>
      {isLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>{label}</div>
    </div>
  );

  return (
    <div
      onMouseOver={() => {
        onHoverImageInput?.();
      }}
      onMouseLeave={() => {
        onMouseLeaveImageInput?.();
      }}
    >
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
    </div>
  );
}
