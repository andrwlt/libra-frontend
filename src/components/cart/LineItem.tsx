
import { Image, Typography, Skeleton } from 'antd';
import styled from 'styled-components';
import { LineItem as CartItemProps } from '../../types';

const { Title } = Typography;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 16px;
`;

const ProductInfo = styled.div`
  display: flex;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleWrapper = styled.div`
  margin-left: 16px;
`;

const PriceWrapper = styled.div`
  margin-left: 8px;
  min-width: 120px;
  text-align: right;
`;

export function LineItemSkeleton() {
  return (
    <Wrapper>
      <ProductInfo>
        <ImageWrapper>
          <Skeleton.Image active></Skeleton.Image>
        </ImageWrapper>
        <TitleWrapper>
          <Skeleton title={ {width: 360 } } active paragraph={false}/>
        </TitleWrapper>
      </ProductInfo>
      <PriceWrapper>
        <Skeleton title={ {width: 48} } active paragraph={false}/>
      </PriceWrapper>
    </Wrapper>
  );
}

export default function LineItem({ title, image, price, currency }: CartItemProps) {
  return (
    <Wrapper>
      <ProductInfo>
        <ImageWrapper>
          {
            image
            ? <Image src={image}></Image>
            : <Skeleton.Image active></Skeleton.Image>
          }
        </ImageWrapper>
        <TitleWrapper>
          { 
            title
            ? <Title level={3} style={ { margin: 0 }}>{title}</Title>
            : <Skeleton title={ {width: 360 } } active paragraph={false}/>
          }
        </TitleWrapper>
      </ProductInfo>

      <PriceWrapper>
        {
          price
          ? <Title level={4} style={ { margin: 0 }}>{price} {currency && currency.symbol}</Title>
          : <Skeleton title={ {width: 48} } active paragraph={false}/>
        }    
      </PriceWrapper>
    </Wrapper>
  );
}