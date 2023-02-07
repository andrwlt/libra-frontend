import styled from 'styled-components';
import logo from 'assets/logo.svg';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

export default function Logo() {
  return (
    <Wrapper>
      <a href="https://golibra.xyz">
        <img height={24} src={logo} alt="Libra logo" />
      </a>
    </Wrapper>
  );
}
