import styled from 'styled-components';
import { TwitterOutlined, FacebookFilled, LinkedinFilled } from '@ant-design/icons';
import { Divider, Space } from 'antd';
import ShareButton from 'components/ShareURL/ShareButton';
import CopyableField from 'components/Common/CopyableField';
import { useTranslation } from 'react-i18next';
import { LOCALE_WORKSPACE } from 'app/i18n';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
interface SharableURLProps {
  url: string;
}

export default function SharableURL({ url }: SharableURLProps) {
  const { t } = useTranslation(LOCALE_WORKSPACE.LAYOUT);
  return (
    <Wrapper>
      <CopyableField text={url} />
      <Divider>{t('orShareItOn')}</Divider>
      <Space size="large">
        <ShareButton sharer="twitter" url={url} icon={<TwitterOutlined />} />
        <ShareButton sharer="facebook" url={url} icon={<FacebookFilled />} />
        <ShareButton sharer="linkedin" url={url} icon={<LinkedinFilled />} />
      </Space>
    </Wrapper>
  );
}
