import styled from 'styled-components';
import { Layout, theme } from 'antd';
import Logo from './Logo';
import Menu from './Menu';
import Account from './Account';

const { Header } = Layout;

interface ThemeType {
  token: any;
}

const StyledHeader = styled(Header)<ThemeType>`
  background: ${(props) => props.token.colorBgContainer} !important;
  height: 48px !important;
  line-height: 48px !important;
  box-shadow: 0 1px 4px 0 rgba(0, 21, 41, 0.12);
  transition: background 0.3s, width 0.2s;
  padding-inline: 0px !important;
  z-index: 20;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  padding-left: 16px;
  width: 100%;
  height: 100%;
`;

const LayoutHeader = () => {
  const { token } = theme.useToken();

  return (
    <StyledHeader token={token}>
      <HeaderContent>
        <Logo />
        <Menu />
        <Account />
      </HeaderContent>
    </StyledHeader>
  );
};

export default LayoutHeader;
