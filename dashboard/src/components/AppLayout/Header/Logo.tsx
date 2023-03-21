import logo from 'assets/logo.svg';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  min-width: 152px;
`;

const StyledImage = styled.img`
  height: 24px;
`;

function Logo() {
  return (
    <Wrapper>
      <Link to="/" style={{ lineHeight: '48px', display: 'flex', alignItems: 'center' }}>
        <StyledImage src={logo} alt="logo" />
      </Link>
    </Wrapper>
  );
}

export default Logo;
