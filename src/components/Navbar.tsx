import logo from '../logo.svg';
import styled from 'styled-components';
import { Layout, theme } from 'antd';

const { Header } = Layout;

const Wrapper = styled(Header)`
  height: 40px;
  width: 100%;
  border-bottom: solid 1px #f7f7f7;
  padding: 0 64px;
`;

const LogoWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  height: 24px;
`;

export default function Navbar() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Wrapper style={ {background: colorBgContainer }}>
      <LogoWrapper>
        <Logo src={logo} alt="logo" />
      </LogoWrapper>
    </Wrapper>
  );
};
