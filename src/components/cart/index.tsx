
import { Divider, Skeleton, Typography } from 'antd';
import LineItem, { LineItemProps, LineItemSkeleton } from './LineItem';
import styled from 'styled-components';

const { Title } = Typography;

const Items = styled.div`

`;

const Wrapper = styled.div`
  display: flex;
  
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface CartProps {
  lineItems: LineItemProps[];
}

export default function Cart({ lineItems }: CartProps) {
  return (
    <Wrapper>
      <Items>
        {
          lineItems.length === 0 
          ? <LineItemSkeleton/>
          : lineItems.map(
            (item) => <LineItem title={item.title} images={item.images} price={item.price} currency={item.currency} />
          )
        }
      </Items>
      <Divider/>
      <Total>
        <Title>Total</Title>
        <Skeleton></Skeleton>
      </Total>
    </Wrapper>
  )
}