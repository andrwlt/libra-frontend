import logo from 'assets/logo.svg';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledImage = styled.img`
  height: 24px;
`;

function Logo() {
  return (
    <Link to="/" style={{ lineHeight: '48px', display: 'flex', alignItems: 'center' }}>
      <StyledImage src={logo} alt="logo" />
    </Link>
  );
}

export default Logo;
