import { ReactNode } from 'react';
import styled from 'styled-components';

// TODO: Full height and width follow ratio 16:9
const Wrapper = styled.div`
  width: 768px;
  height: 540px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 3%), 0 1px 6px -1px rgb(0 0 0 / 2%),
    0 2px 4px 0 rgb(0 0 0 / 2%);
`;

const ColorDot = styled.div`
  width: 12px;
  height: 12px;
  background: ${(props) => props.color || 'gray'};
  margin-right: 8px;
  border-radius: 50%;
`;

const PreviewHeader = styled.div`
  width: calc(100% - 64px);
  height: 40px;
  background: rgb(227, 219, 214);
  border: solid 1px rgb(227, 219, 214);
  border-radius: 6px 6px 0 0;
  display: flex;
  align-items: center;
  padding: 0 32px;
`;

const PreviewBody = styled.div`
  width: 100%;
  height: 100%;
  background: #f7f7f7;
  border: solid 1px rgb(227, 219, 214);
  border-radius: 0 0 6px 6px;
`;

const PreviewContent = styled.div`
  zoom: 0.5;
  width: 100%;
  height: 100%;
`;

interface PreviewProps {
  children?: ReactNode;
}

export default function Preview(props: PreviewProps) {
  return (
    <Wrapper>
      <PreviewHeader>
        <ColorDot color="rgb(255, 96, 87)" />
        <ColorDot color="rgb(254, 188, 46)" />
        <ColorDot color="rgb(43, 199, 64)" />
      </PreviewHeader>
      <PreviewBody>
        <PreviewContent>{props.children}</PreviewContent>
      </PreviewBody>
    </Wrapper>
  );
}
