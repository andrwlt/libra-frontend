import icon1 from 'assets/outdated-1.png';
import icon2 from 'assets/outdated-2.svg';
import polkadotIcon from 'assets/polkadot.png';
import styled from 'styled-components';
import { Typography, Space } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LOCALE_WORKSPACE } from 'app/i18n';

const Wrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 150px;
`;

const Image = styled.img`
  width: 350px;
  height: 350px;
`;

const ExtensionImage = styled.img`
  width: 110px;
  height: 110px;
`;

const ExtensionLink = styled.a`
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  padding: 15px 31px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NoExtension = () => {
  const [icon, setIcon] = useState(icon2);
  const { t } = useTranslation(LOCALE_WORKSPACE.WORDING);

  const changeIcon = () => {
    setIcon(icon === icon2 ? icon1 : icon2);
  };
  return (
    <Wrapper>
      <Content>
        <Image src={icon} onClick={changeIcon} />
        <Typography.Title style={{ display: 'block', marginTop: 10 }} level={3}>
          {t('noExtensionTitle')}
        </Typography.Title>
        <Typography.Text style={{ display: 'block', fontSize: 18 }}>{t('preferExtension')}</Typography.Text>

        <Space style={{ marginTop: 50 }}>
          <ExtensionLink href="https://polkadot.js.org/extension/" target="_blank">
            <ExtensionImage src={polkadotIcon} alt="polkadot" />
            <Typography.Text type="secondary" style={{ display: 'block', marginTop: 10 }}>
              Polkadot.js
            </Typography.Text>
          </ExtensionLink>
        </Space>
      </Content>
    </Wrapper>
  );
};

export default NoExtension;
