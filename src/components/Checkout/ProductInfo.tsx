import styled from "styled-components";
import { Image, Space, Typography, Avatar, Skeleton } from "antd";
import getImageUrl from "utils/getImageUrl";

import { LineItem } from "types";

const Wrapper = styled.div`
  width: 100%;
`;

const ProductImage = styled.div`
  margin-top: 16px;
`;

interface Props {
  product: LineItem
}

export default function ProductInfo({
  product
}: Props) {
  const { title, description, price, currency, images } = product;

  const imageUrl = getImageUrl(images[0]);

  return <Wrapper>
    <Typography.Title type="secondary" level={5} style={{ marginBottom: 0 }}>{title}</Typography.Title>
    {
      
      currency ?
      <Space align="center">
        { currency.logo && <Avatar src={currency.logo} size='small'></Avatar>}
        <Typography.Title level={4} style={{ margin: '1rem 0' }}>{price} {currency.symbol}</Typography.Title>
      </Space>
      : <Skeleton.Input active/>
    }

    {
      description && <Typography.Paragraph type="secondary">{ description }</Typography.Paragraph>
    }
    
    <ProductImage>
      <Image src={imageUrl} preview={false}/>
    </ProductImage>
  </Wrapper>
}