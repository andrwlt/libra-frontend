import styled from "styled-components";
import { Image, Space, Typography, Avatar } from "antd";
import getImageUrl from "utils/getImageUrl";

import { LineItem, Asset } from "types";

import { ASSET_METADATA } from "config";

const Wrapper = styled.div`
  width: 100%;
`;

const ProductImage = styled.div`
  margin-top: 16px;
`;

interface Props {
  product: LineItem,
  asset: Asset,
}

export default function ProductInfo({
  product,
  asset = 'dot',
}: Props) {
  const { name, description, price, images } = product;

  const imageUrl = getImageUrl(images[0]);

  const assetMetadata = ASSET_METADATA.dot;

  return <Wrapper>
    <Typography.Title type="secondary" level={5} style={{ marginBottom: 0 }}>{name}</Typography.Title>
    {
      <Space align="center">
        { assetMetadata.logo && <Avatar src={assetMetadata.logo} size='small'></Avatar>}
        <Typography.Title level={4} style={{ margin: '1rem 0' }}>{price} {assetMetadata.symbol}</Typography.Title>
      </Space>
    }

    {
      description && <Typography.Paragraph type="secondary">{ description }</Typography.Paragraph>
    }
    
    <ProductImage>
      <Image src={imageUrl} preview={false}/>
    </ProductImage>
  </Wrapper>
}