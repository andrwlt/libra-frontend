import { GlobalOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { LOCALE_WORKSPACE } from 'app/i18n';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100%;
  background-color: #fff;
  display: block;
`;

const RedirectPreviewer = () => {
  const { t } = useTranslation(LOCALE_WORKSPACE.CHECKOUT);

  return (
    <Wrapper style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <GlobalOutlined
        style={{ fontSize: 35, marginBottom: 5, color: `rgba(0, 0, 0, 0.45)`, bottom: 30, position: 'relative' }}
      />
      <Typography.Title level={3} style={{ marginTop: 0, bottom: 30, position: 'relative' }} type="secondary">
        {t('websiteWillBeShow')}
      </Typography.Title>
    </Wrapper>
  );
};

export default RedirectPreviewer;
