import { ReactNode } from 'react';
import styled from 'styled-components';
import { theme } from 'antd';

const Wrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
`;

const ColorDot = styled.div`
  width: 12px;
  height: 12px;
  background: ${(props) => props.color || 'gray'};
  margin-right: 8px;
  border-radius: 50%;
`;

const PreviewHeader = styled.div`
  width: 100%;
  height: 40px;
  background: rgb(227, 219, 214);
  border: solid 1px rgb(227, 219, 214);
  border-radius: 6px 6px 0 0;
  display: flex;
  align-items: center;
  padding: 0 32px;
  box-sizing: border-box;
`;

const PreviewBody = styled.div`
  width: 100%;
  height: calc(100% - 40px);
  background: #f7f7f7;
  border: solid 1px rgb(227, 219, 214);
  border-radius: 0 0 6px 6px;
  box-sizing: border-box;
`;

const PreviewContent = styled.div`
  zoom: 0.5;
  width: 100%;
  height: 100%;
`;

interface PreviewProps {
  width?: number;
  height?: number;
  children?: ReactNode;
  style?: Record<string, string>;
}

export default function Preview({ width = 768, height = 540, children, style = {} }: PreviewProps) {
  const {
    token: { boxShadow },
  } = theme.useToken();

  return (
    <Wrapper style={{ width: `${width}px`, height: `${height}px`, boxShadow, ...style }}>
      <PreviewHeader>
        <ColorDot color="rgb(255, 96, 87)" />
        <ColorDot color="rgb(254, 188, 46)" />
        <ColorDot color="rgb(43, 199, 64)" />
      </PreviewHeader>
      <PreviewBody>
        <PreviewContent>{children}</PreviewContent>
      </PreviewBody>
    </Wrapper>
  );
}
