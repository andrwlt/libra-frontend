import { useState } from 'react';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import CopyableField from 'components/Common/CopyableField';
import { truncate } from 'utils/format/formatText';

const Secret = ({ value }: any) => {
  const [isShow, setIsShow] = useState(false);
  const toggleShow = () => {
    setIsShow(!isShow);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', lineHeight: '32px' }}>
      {isShow ? <CopyableField style={{minWidth: 300}} text={truncate(value, { start: 20, end: 20 })} /> : '************'}{' '}
      <span
        style={{
          marginLeft: 10,
          cursor: 'pointer',
          position: 'relative',
          bottom: 3,
        }}
        onClick={toggleShow}
      >
        {isShow ? <EyeInvisibleOutlined style={{ lineHeight: '32px' }} /> : <EyeOutlined />}{' '}
      </span>
    </div>
  );
};

export default Secret;
