import styled from 'styled-components';
import { Layout, theme } from 'antd';
import Logo from './Logo';
import Menu from './Menu';
import Account from './Account';
import { Container, MenuInnerContainer, LogoWrapperXlOnly, LogoWrapperLgOnly } from '../Styled';

const { Header } = Layout;

interface ThemeType {
  token: any;
}

const StyledHeader = styled(Header)<ThemeType>`
  background: ${(props) => props.token.colorBgContainer} !important;
  height: 56px !important;
  line-height: 56px !important;
  box-shadow: rgb(231, 231, 231) 0px -1px 0px inset;
  transition: background 0.3s, width 0.2s;
  padding-inline: 0px !important;
  z-index: 20;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LayoutHeader = () => {
  const { token } = theme.useToken();

  return (
    <StyledHeader token={token}>
      <Container>
        <FlexContainer>
          <LogoWrapperXlOnly>
            <Logo />
          </LogoWrapperXlOnly>

          <MenuInnerContainer>
            <LogoWrapperLgOnly>
              <Logo />
            </LogoWrapperLgOnly>
            <Menu />
            <Account />
          </MenuInnerContainer>
        </FlexContainer>
      </Container>
    </StyledHeader>
  );
};

export default LayoutHeader;
