import styled from 'styled-components';
import { CopyOutlined, TwitterOutlined, FacebookFilled, InstagramFilled } from '@ant-design/icons';
import { Input, Tooltip, Button, Divider, Space } from 'antd';
import ClipboardJS from 'clipboard';
import { useEffect, useState, useRef } from 'react';

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
  const [copied, setCopied] = useState(false);
  const copyButtonRef = useRef(null);

  useEffect(() => {
    if (copyButtonRef.current) {
      const clipboard = new ClipboardJS(copyButtonRef.current);

      clipboard.on('success', () => {
        setCopied(true);
      });
    }
  }, [copyButtonRef]);

  return (
    <Wrapper
      onMouseLeave={() => {
        setCopied(false);
      }}
    >
      <Input.Group compact>
        <Input readOnly style={{ width: 'calc(100% - 48px)' }} value={url} defaultValue={url} />
        <Tooltip title={copied ? 'Copied' : 'Copy'}>
          <Button ref={copyButtonRef} data-clipboard-text={url} icon={<CopyOutlined />} />
        </Tooltip>
      </Input.Group>
      <Divider>or share it on</Divider>
      <Space size="large">
        <Button size="large" shape="circle" icon={<TwitterOutlined />}></Button>
        <Button size="large" shape="circle" icon={<FacebookFilled />}></Button>
        <Button size="large" shape="circle" icon={<InstagramFilled />}></Button>
      </Space>
    </Wrapper>
  );
}
