import React from 'react';
import logo from '../logo.svg';
import { Layout, Menu } from 'antd';
import styled from 'styled-components';
import Cart from './cart';

const { Header, Content, Footer } = Layout;

const Wrapper = styled.div`
  display: flex;
`;

const CustomerInfo = styled.div`

`;

const CartWrapper = styled.div`

`;

const lineItems = [
  {
    title: 'Testing Product',
    price: 100,
    images: [],
    currency: {
      symbol: 'USDT',
    }
  }
];

export default function Checkout() {
  return (
    <Wrapper>
      <CustomerInfo>

      </CustomerInfo>
      <CartWrapper>
        <Cart lineItems={lineItems}></Cart>
      </CartWrapper>
    </Wrapper>
  );
};
