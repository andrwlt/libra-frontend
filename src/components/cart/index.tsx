
import { Divider, Skeleton, Typography } from 'antd';
import LineItem, { LineItemSkeleton } from './LineItem';
import styled from 'styled-components';
import { LineItem as LineItemProps } from '../../types';

const { Title } = Typography;

const Items = styled.div`

`;

const Wrapper = styled.div`
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
`;

interface CartProps {
  items?: LineItemProps[];
}

export default function Cart({ items }: CartProps) {
  return (
    <Wrapper>
      <Items>
        {
          (!items || items.length === 0) && <LineItemSkeleton/>
        }
        {
          items && items.length >= 0 && items.map((item) => 
            <LineItem
              title={item.title}
              image={item.image}
              price={item.price}
              currency={item.currency}
            />
          )
        }
      </Items>
      <Divider/>
      <Total>
        <Title level={3}>Total</Title>
        <div>
          <Skeleton active paragraph={false} title={{ width: 48 }}/>
        </div>
      </Total>
    </Wrapper>
  )
}