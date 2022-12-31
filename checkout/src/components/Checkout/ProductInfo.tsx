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
  asset,
}: Props) {
  const { name, description, price, images } = product;

  const imageUrl = images[0] ? getImageUrl(images[0]) : '';

  const assetMetadata = ASSET_METADATA[asset];

  const renderedPrice = assetMetadata ? price / (10 ** assetMetadata.decimals) : price;

  return <Wrapper>
    <Typography.Title type="secondary" level={4} style={{ marginBottom: 0 }}>{name}</Typography.Title>
    {
      !!price && 
      <Space align="center">
        { assetMetadata && <Avatar src={assetMetadata.logo} size='default'></Avatar>}
        <Typography.Title level={2} style={{ margin: '1rem 0', textTransform: 'capitalize' }}>{renderedPrice} {asset}</Typography.Title>
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