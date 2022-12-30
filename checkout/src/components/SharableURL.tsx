import styled from 'styled-components';
import { CopyOutlined, TwitterOutlined, FacebookFilled, InstagramFilled } from '@ant-design/icons';
import { Input, Tooltip, Button, Divider, Space } from 'antd';

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
      <Input.Group compact>
        <Input
          readOnly
          style={{ width: 'calc(100% - 96px)' }}
          defaultValue={url}
        />
        <Tooltip title="copy url">
          <Button icon={<CopyOutlined />} />
        </Tooltip>
      </Input.Group>
      <Divider>or share it on</Divider>
      <Space size='large'>
        <Button size='large' shape='circle' icon={<TwitterOutlined/>}></Button>
        <Button size='large' shape='circle' icon={<FacebookFilled/>}></Button>
        <Button size='large' shape='circle' icon={<InstagramFilled/>}></Button>
      </Space>
    </Wrapper>
  );
};
