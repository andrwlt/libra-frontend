import icon from 'assets/web-setting.png';
import polkadotIcon from 'assets/polkadot.png';
import styled from 'styled-components';
import { Typography, Space } from 'antd';
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
  margin-bottom: 50px;
`;

const Image = styled.img`
  width: 300px;
  height: 300px;
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

const { Title, Text, Link } = Typography;

const NoExtension = () => {
  const { t } = useTranslation(LOCALE_WORKSPACE.WORDING);

  return (
    <Wrapper>
      <Content>
        <Image src={icon} />
        <Title style={{ display: 'block', marginTop: 10 }} level={3}>
          {t('noExtensionTitle')}
        </Title>
        <Text style={{ display: 'block', fontSize: 18 }}>{t('preferExtension')}</Text>

        <Space style={{ marginTop: 40, marginBottom: 40 }}>
          <ExtensionLink href="https://polkadot.js.org/extension/" target="_blank">
            <ExtensionImage src={polkadotIcon} alt="polkadot" />
            <Text type="secondary" style={{ display: 'block', marginTop: 10 }}>
              Polkadot.js
            </Text>
          </ExtensionLink>
        </Space>

        <Space>
          <Text style={{ display: 'block', fontSize: 18 }}>{t('noExtensionHelpText')}</Text>
          <Link
            href="https://discord.com/channels/999216269226164234/1101337338493292705"
            target="_blank"
            style={{ display: 'block', fontSize: 18 }}
          >
            {t('letUsKnow')}
          </Link>
        </Space>
      </Content>
    </Wrapper>
  );
};

export default NoExtension;
