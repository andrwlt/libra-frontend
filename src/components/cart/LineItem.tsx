
import { Image, Typography, Skeleton } from 'antd';
import styled from 'styled-components';
import { LineItem as LineItemType } from '../../types';
import Pricing from '../Pricing';
import getImageUrl from 'utils/getImageUrl';

const { Paragraph } = Typography;

const Wrapper = styled.div`
  display: flex;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 96px;
  height: 96px;
  margin-right: 16px;
`;

const ProductImage = styled(Image)`
  height: 100%;
  width: 100%;
  max-width: 100%;
  border-radius: 4px;
`

const ProductInfoWrapper = styled.div`
`;

const SkeletonImage = styled(Skeleton.Image)`
  width: 100% !important;
  height: 100% !important;

  svg {
    width: 48px !important;
    height: 48px !important;
  }
`;

const SkeletonProductTitle = styled(Skeleton.Input)`
  width: 220px !important;
  height: 16px !important;
`;

export function LineItemSkeleton() {
  return (
    <Wrapper>
      <ImageWrapper>
        <SkeletonImage active />
      </ImageWrapper>
      <ProductInfoWrapper>
        <SkeletonProductTitle active/>
        <Skeleton title={false} active></Skeleton>
      </ProductInfoWrapper>
    </Wrapper>
  );
}

interface LineItemProps {
  data?: LineItemType;
}

export default function LineItem({ data }: LineItemProps) {
  if (!data) {
    return <LineItemSkeleton/>
  }

  return (
    <Wrapper>
      <ImageWrapper>
        {
          data.images[0] ? <ProductImage placeholder preview={false} src={getImageUrl(data.images[0])}/>
          : <SkeletonImage active />
        } 
      </ImageWrapper>
      <ProductInfoWrapper>
        <Paragraph strong>{data.title}</Paragraph>
        <Pricing size='normal' amount={data.price} hasLogo currency={data.currency}></Pricing>
        <Paragraph type='secondary'>{data.description}</Paragraph>
      </ProductInfoWrapper>
    </Wrapper>
  )
}