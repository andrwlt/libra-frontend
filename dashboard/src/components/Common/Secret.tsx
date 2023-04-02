import { useState } from 'react';
import { Button, Space, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;

const Secret = ({ value }: any) => {
  const { t } = useTranslation();
  const [isShow, setIsShow] = useState(false);
  const toggleShow = () => {
    setIsShow(!isShow);
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center', lineHeight: '32px' }}>
      {isShow ? (
        <Space>
          <Text style={{ margin: 0, cursor: 'pointer' }}>{value}</Text>
          <Button size="small" onClick={toggleShow}>
            {t('hide')}
          </Button>
        </Space>
      ) : (
        <Button size="small" onClick={toggleShow}>
          {t('reveal')}
        </Button>
      )}{' '}
    </div>
  );
};

export default Secret;
