
import { Image, Divider, Typography, Skeleton } from 'antd';
import styled from 'styled-components';

const { Title } = Typography;

type LineItem = {
  title: string;
  
};

const Wrapper = styled.div`
  display: flex;
  margin-left: 8px;
`;

const ImageWrapper = styled.div`
  display: flex;
`;

export function LineItemSkeleton() {
  return (
    <Wrapper>
      <ImageWrapper>
        <Skeleton.Image></Skeleton.Image>
      </ImageWrapper>
      <div>
        <Skeleton/>
        <Skeleton/>
      </div>
    </Wrapper>
  );
}

export interface LineItemProps {
  title: string;
  quantity?: number;
  price: number;
  images: string[];
  currency: {
    name?: string;
    logo?: string;
    symbol?: string;
  },
}

export default function LineItem(props: LineItemProps) {
  return (
    <Wrapper>
      <ImageWrapper>
        <Image src={props.images[0]}></Image>
      </ImageWrapper>
      <div>
        <Title>{props.title}</Title>
        <Title>{props.price}{props.currency.symbol}</Title>
      </div>
    </Wrapper>
  );
}