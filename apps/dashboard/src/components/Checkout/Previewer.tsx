import { ReactNode } from 'react';
import styled from 'styled-components';
import { theme } from 'antd';

const Wrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 20px 44px #32325d1f, 0 -1px 32px #32325d0f, 0 3px 12px #00000014;
  background-color: #fff;
`;

const ColorDot = styled.div`
  width: 6px;
  height: 6px;
  background-color: #ecf2f7;
  border-radius: 50%;
  margin-right: 4px;
  display: inline-block;
`;

const FakeUrlBar = styled.div`
  width: 60%;
  height: 12px;
  background: #ecf2f766;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PreviewHeader = styled.div`
  width: 100%;
  height: 20px;
  height: 20px;
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  background-color: #fff;
  position: relative;
  z-index: 1000;
`;

const PreviewContent = styled.div`
  scale: 0.65;
  height: 831px;
  transform-origin: top left;
`;

const SmallPreviewContent = styled.div`
  scale: 0.45;
  height: 831px;
  transform-origin: top left;
`;

interface DotBoxProps {
  small?: boolean;
}

const DotBoxWrapper = styled.div<DotBoxProps>`
  display: flex;
  position: absolute;
  left: ${(props) => (props.small ? '10px' : '14px')};
`;

const DotBox = ({ small }: { small?: boolean }) => {
  return (
    <DotBoxWrapper small={small}>
      <ColorDot />
      <ColorDot />
      <ColorDot />
    </DotBoxWrapper>
  );
};
interface PreviewProps {
  width?: number;
  height?: number;
  children?: ReactNode;
  style?: Record<string, string>;
  onboardingMode?: boolean;
  small?: boolean;
}

export default function Previewer({
  width = 690,
  height = 560,
  children,
  style = {},
  onboardingMode = false,
  small = false,
}: PreviewProps) {
  const {
    token: { boxShadow },
  } = theme.useToken();

  const smallWith = 476;
  const smallHeight = 395;

  return (
    <Wrapper
      style={{
        width: `${small ? smallWith : width}px`,
        height: `${small ? smallHeight : height}px`,
        boxShadow,
        ...style,
        marginLeft: small ? '0' : 'auto',
      }}
    >
      <PreviewHeader>
        <DotBox small={small} />
        <FakeUrlBar>
          <p style={{ fontSize: 7, margin: 0, lineHeight: '11px' }}>{`checkout.libra.atscale.xyz`}</p>
        </FakeUrlBar>
      </PreviewHeader>
      {small ? (
        <SmallPreviewContent style={{ width: 1065 }}>{children}</SmallPreviewContent>
      ) : (
        <PreviewContent style={{ width: onboardingMode ? 1183 : 1062 }}>{children}</PreviewContent>
      )}
    </Wrapper>
  );
}
