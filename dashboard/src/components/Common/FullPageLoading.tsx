import styled from 'styled-components';
import { LoadingOutlined } from '@ant-design/icons';
import { Space, Spin, Typography, theme } from 'antd';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface FullPageLoadingProps {
  isOpen?: boolean;
  message?: string;
}

export default function FullPageLoading({ isOpen, message }: FullPageLoadingProps) {
  const { token: { colorBgBase, colorTextTertiary } } = theme.useToken();

  return (
    <>
      {isOpen && (
        <Wrapper style={{ background: colorBgBase }}>
          <Space direction='vertical' align='center'>
            <Spin size='large' indicator={<LoadingOutlined style={{ fontSize: 32, color: colorTextTertiary }} spin />}/>
            <Typography.Title style={{ marginTop: '-4px' }} type='secondary' level={4}>{message}</Typography.Title>
          </Space>
        </Wrapper>
      )}
    </>
  );
}
