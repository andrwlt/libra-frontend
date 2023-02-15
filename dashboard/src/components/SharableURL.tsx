import styled from 'styled-components';
import { TwitterOutlined, FacebookFilled, LinkedinFilled } from '@ant-design/icons';
import { Divider, Space } from 'antd';
import ShareButton from 'components/ShareButton';
import CopyableField from 'components/CopyableField';

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
  return (
    <Wrapper>
      <CopyableField text={url}/>
      <Divider>or share it on</Divider>
      <Space size="large">
        <ShareButton sharer='twitter' url={url} icon={<TwitterOutlined />}/>
        <ShareButton sharer='facebook' url={url} icon={<FacebookFilled />}/>
        <ShareButton sharer='linkedin' url={url} icon={<LinkedinFilled />}/>
      </Space>
    </Wrapper>
  );
}
