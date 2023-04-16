import { useState, useEffect } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Typography, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import { LOCALE_WORKSPACE } from 'app/i18n';

const { Title } = Typography;

interface CurrentStepProps {
  title?: string;
  subtitle?: string;
  canBack?: boolean;
  onBack?: Function;
}

const CurrentStep = ({ title, subtitle, canBack = true, onBack }: CurrentStepProps) => {
  const { t } = useTranslation(LOCALE_WORKSPACE.LAYOUT);
  const [backButtonHovered, setBackButtonHovered] = useState(false);
  const {
    token: { colorTextHeading, colorTextSecondary },
  } = theme.useToken();

  const handleBack = () => {
    onBack && onBack();
  };

  useEffect(() => {
    !canBack && setBackButtonHovered(false);
  }, [canBack]);

  return (
    <div style={{ position: 'relative', width: '240px', height: '96px' }}>
      {canBack && (
        <div
          style={{ cursor: 'pointer', position: 'absolute', padding: '8px', top: '-1px', left: '-32px' }}
          onMouseEnter={() => {
            setBackButtonHovered(true);
          }}
          onMouseLeave={() => {
            setBackButtonHovered(false);
          }}
          onClick={handleBack}
        >
          <ArrowLeftOutlined
            style={{
              color: backButtonHovered ? colorTextHeading : colorTextSecondary,
              fontSize: '1rem',
              fontWeight: 'bold',
            }}
          ></ArrowLeftOutlined>
        </div>
      )}
      {backButtonHovered ? (
        <Title level={4}>{t('back')}</Title>
      ) : (
        <>
          <Title level={4}>{title}</Title>
          <Title level={5} type="secondary">
            {subtitle}
          </Title>
        </>
      )}
    </div>
  );
};

export default CurrentStep;
