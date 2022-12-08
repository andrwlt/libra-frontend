import React from 'react';
import logo from '../logo.svg';
import { Layout, Menu } from 'antd';
import styled from 'styled-components';

const { Header, Content, Footer } = Layout;

const Wrapper = styled.div`
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
  return (
    <Wrapper>
      <LogoWrapper>
        <Logo src={logo} alt="logo" />
      </LogoWrapper>
    </Wrapper>
  );
};
