import styled from 'styled-components';

export const StyledContainer = styled.div`
  padding: 24px;
  max-width: 1268px;
  margin: 0 auto;
`;

export const FixedWrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  top: 0;
  left: 0;
  background-color: #fff;
`;

interface FixedHeaderProps {
  token: any;
}

export const FixedHeader = styled.div<FixedHeaderProps>`
  height: 56px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  background: ${(props) => props.token.colorBgBase};
  justify-content: space-between;
  border-bottom: solid 1px ${(props) => props.token.colorBorder};
`;
