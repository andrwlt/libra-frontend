import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { RcFile } from 'antd/es/upload/interface';
import { useState } from 'react';

const getBase64 = (img: RcFile): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result as string));
    reader.readAsDataURL(img);
  });
};

interface Props {
  name?: string;
  onChange?: Function;
  size?: number;
}

export default function ImageUploader({ name, onChange, size }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const beforeUpload = async (file: RcFile) => {
    const isImage =
      file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/svg+xml';

    if (!isImage) {
      message.error('You can only upload SVG/PNG/JPG file!');
    }
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
      <div style={{ marginTop: 8 }}>{name}</div>
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
      {imageUrl ? <img src={imageUrl} alt={name} style={{ width: '100%' }} /> : uploadButton}
    </Upload>
  );
}
