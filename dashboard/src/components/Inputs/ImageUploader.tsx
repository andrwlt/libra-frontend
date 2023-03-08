import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { RcFile } from 'antd/es/upload/interface';
import { useState } from 'react';

const getBase64 = (img: RcFile): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result as string));
    reader.readAsDataURL(img);
  });
};

interface Props {
  label?: string;
  onChange?: Function;
  size?: number;
  value?: string;
}

export default function ImageUploader({ label, onChange, value }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const beforeUpload = async (file: RcFile) => {
    const isImage = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/svg+xml';

    if (!isImage) {
      message.error('You can only upload SVG/PNG/JPG file!');
    }

    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }

    return isImage && isLt2M;
  };

  const handleChange = async (e: any) => {
    setLoading(true);
    const base64 = await getBase64(e.file.originFileObj as RcFile);
    setImageUrl(base64);
    setLoading(false);
    onChange &&
      onChange({
        name: e.file.name,
        type: e.file.originFileObj.type,
        content: base64,
      });
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>{label}</div>
    </div>
  );

  return (
    <Upload
      listType="picture-card"
      showUploadList={false}
      onChange={handleChange}
      beforeUpload={beforeUpload}
      customRequest={() => {}}
      style={{ height: '100%', width: '100%' }}
    >
      {imageUrl ? <img src={imageUrl} alt={label} style={{ width: '100%' }} /> : uploadButton}
    </Upload>
  );
}
