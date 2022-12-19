
import { Divider, Typography, Space, Skeleton } from 'antd';
import LineItem from './LineItem';
import styled from 'styled-components';
import { LineItem as LineItemProps } from '../../types';
import Pricing from '../Pricing';

const { Title, Paragraph } = Typography;

const Items = styled.div`
  margin: 32px 0px;
`;

const Wrapper = styled.div`
`;

interface CartProps {
  items?: LineItemProps[];
}

export default function Cart({ items }: CartProps) {
  const total = items?.reduce((total, item) => (total + (item.price || 0)), 0);

  return (
    <Wrapper>
      <Title level={3}>Order Summary</Title>
      <Skeleton
        paragraph={false}
        title={{ width: 128 }}
        loading={!items || items.length === 0}
      >
        <Space>
          <Title type='secondary' level={4}>Total: </Title>
          <Pricing
            amount={total}
            currency={items && items[0]?.currency} 
            hasLogo
            size='large'
          />
        </Space>
      </Skeleton>
      <Divider/>
      <Items>
        {
          (!items || items.length === 0) && <LineItem/>
        }
        {
          items && items.length >= 0 && items.map((item, index) => <LineItem key={index} data={item}/>)
        }
      </Items>
    </Wrapper>
  )
}