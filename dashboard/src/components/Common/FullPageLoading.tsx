import styled from 'styled-components';
import { LoadingOutlined } from '@ant-design/icons';
import { Space, Spin, Typography, theme } from 'antd';
import Loading from './Loading';

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
  hasFunnyQuote?: boolean;
  oldLoading?: boolean;
}

export default function FullPageLoading({
  isOpen,
  message,
  hasFunnyQuote = false,
  oldLoading = true,
}: FullPageLoadingProps) {
  const {
    token: { colorBgBase, colorTextTertiary },
  } = theme.useToken();

  const newStyle = hasFunnyQuote || !oldLoading;

  return (
    <>
      {isOpen && (
        <Wrapper
          style={{
            background: colorBgBase,
            alignItems: newStyle ? 'start' : 'center',
          }}
        >
          <Space
            direction="vertical"
            align="center"
            style={{
              marginTop: newStyle ? 200 : 0,
              marginBottom: newStyle ? 0 : 200,
            }}
          >
            {hasFunnyQuote ? (
              <Loading size="large" />
            ) : oldLoading ? (
              <>
                <Spin
                  size="large"
                  indicator={<LoadingOutlined style={{ fontSize: 32, color: colorTextTertiary }} spin />}
                />
                <Typography.Title style={{ marginTop: '-4px' }} type="secondary" level={4}>
                  {message}
                </Typography.Title>
              </>
            ) : (
              <Spin tip={message} size="large"></Spin>
            )}
          </Space>
        </Wrapper>
      )}
    </>
  );
}
