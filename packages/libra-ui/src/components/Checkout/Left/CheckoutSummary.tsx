import styled from 'styled-components';
import { Image, Space, Avatar, Typography, Divider, Skeleton, InputNumber, Input, Button } from 'antd';
import { AssetMetadata, NumberPriceProduct, Asset } from 'app/types';
import LibraLogo from 'components/LibraLogo';
import { getCheckoutPrice } from 'utils';
import { useTranslation } from 'react-i18next';
import { getAssetMetadata } from 'utils/asset';
import { useState } from 'react';
import FormItem from 'antd/es/form/FormItem';

const { Paragraph, Link } = Typography;

const ImageWrapper = styled.div`
  margin: 32px 0;
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface ProductInfoProps {
  product: NumberPriceProduct | undefined;
  asset: Asset;
  loading: boolean;
  previewMode: boolean;
  onUpdatePrice?: (price: number | null) => void;
  updatingPrice?: number | null;
}

const ProductInfoWrapper = styled.div`
  width: 100%;

  .product-name-skeleton {
    .ant-skeleton-title {
      height: 20px !important;
      margin-bottom: 4px;
      margin-top: 30px !important;
      width: 60%;
    }
  }

  .product-price-skeleton {
    .ant-skeleton-title {
      height: 32px !important;
      margin-bottom: 5px;
      margin-top: 15px;
    }
  }

  .product-description-skeleton {
    .ant-skeleton-title {
      height: 18px !important;
      margin-bottom: 0;
      margin-top: 5px;
    }
  }

  .product-image-skeleton {
    .ant-skeleton-avatar {
      width: 300px;
      height: 300px;
    }
  }
`;

const ProductInformation = ({
  product,
  asset,
  loading,
  onUpdatePrice,
  updatingPrice,
  previewMode,
}: ProductInfoProps) => {
  const { name, description, price, image, priceType, presetPrice } = product || {};
  const assetMetadata: AssetMetadata = getAssetMetadata(asset);
  const [isUpdatingPrice, setIsUpdatingPrice] = useState(false);
  const [priceValid, setPriceValid] = useState<true | string>(true);

  const onPriceChange = (price: number | null) => {
    let priceValid: true | string = true;

    if (!price) {
      priceValid = 'Price is Required!';
    } else {
      if (product?.minPrice && price < product?.minPrice) {
        priceValid = `Price must be greater or equal to ${product.minPrice}`;
      }

      if (product?.maxPrice && price > product?.maxPrice) {
        priceValid = `Price must be less than or equal to ${product.maxPrice}`;
      }
    }

    console.log(priceValid);

    setPriceValid(priceValid);
    onUpdatePrice?.(price);
  };

  return (
    <ProductInfoWrapper>
      <Skeleton active className="product-name-skeleton" paragraph={false} loading={loading}>
        <Typography.Title type="secondary" level={4} style={{ marginBottom: 0, fontWeight: 400 }}>
          {name || 'Product name'}
        </Typography.Title>
      </Skeleton>

      <Skeleton active className="product-price-skeleton" paragraph={false} loading={loading}>
        <Space align="start" style={{ marginTop: 10 }}>
          {assetMetadata && <Avatar src={assetMetadata.logoUrl}>{assetMetadata.symbol}</Avatar>}
          {priceType === 'fixed' ? (
            <Typography.Title level={3} style={{ margin: 0, fontSize: 32, lineHeight: '32px' }}>
              {price ? getCheckoutPrice({ price, asset }, assetMetadata) : '0'}
            </Typography.Title>
          ) : (
            <div>
              {presetPrice ? (
                <div>
                  {isUpdatingPrice ? (
                    <FormItem
                      validateStatus={priceValid !== true ? 'error' : ''}
                      help={priceValid !== true && priceValid}
                      style={{ marginBottom: 0 }}
                    >
                      <InputNumber style={{ width: 200 }} value={updatingPrice} onChange={onPriceChange} />
                    </FormItem>
                  ) : (
                    <Typography.Title level={3} style={{ margin: 0, fontSize: 32, lineHeight: '32px' }}>
                      {getCheckoutPrice({ price: presetPrice, asset }, assetMetadata)}
                    </Typography.Title>
                  )}
                </div>
              ) : (
                <InputNumber value={''} style={{ width: 200 }} />
              )}
            </div>
          )}
        </Space>

        {priceType === 'flexible' && presetPrice && !isUpdatingPrice && (
          <Button
            style={{ display: 'block', marginTop: 20 }}
            onClick={() => {
              if (!previewMode) {
                setIsUpdatingPrice(true);
              }
            }}
          >
            Change Amount
          </Button>
        )}
      </Skeleton>

      <Skeleton active className="product-description-skeleton" paragraph={false} loading={loading}>
        <Typography.Paragraph type="secondary">{description}</Typography.Paragraph>
      </Skeleton>

      <ImageWrapper>
        {loading ? (
          <Skeleton.Avatar shape="square" active className="product-image-skeleton" />
        ) : (
          <Image src={image} preview={false} style={{ maxWidth: 300, maxHeight: 300 }} />
        )}
      </ImageWrapper>
    </ProductInfoWrapper>
  );
};

const FooterLink = styled(Link)`
  font-size: 12px;
  margin-right: auto;
  color: rgba(0, 0, 0, 0.5) !important;

  &:hover {
    color: rgba(0, 0, 0, 0.8) !important;
  }
`;

function FooterLinks() {
  const { t } = useTranslation();
  return (
    <Space>
      <a href="https://golibra.xyz" target="_blank">
        <Space>
          <Paragraph style={{ margin: 0 }} strong>
            {t('poweredBy')}
          </Paragraph>
          <LibraLogo height={18}></LibraLogo>
        </Space>
      </a>

      <Divider type="vertical" style={{ height: 20 }} />

      <FooterLink href="https://golibra.xyz/privacy-policy" target="_blank">
        {' '}
        {t('privacy')}
      </FooterLink>
      <FooterLink href="https://golibra.xyz/terms-of-service" target="_blank">
        {t('terms')}
      </FooterLink>
    </Space>
  );
}

const CheckoutSummaryWrapper = styled.div`
  width: 380px;
  max-width: 380px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const CheckoutSummary = ({
  product,
  asset,
  previewMode,
  loading,
  onUpdatePrice,
  updatingPrice,
}: {
  product: NumberPriceProduct;
  asset: Asset;
  previewMode: boolean;
  loading: boolean;
  onUpdatePrice?: (price: number | null) => void;
  updatingPrice?: number | null;
}) => {
  return (
    <CheckoutSummaryWrapper style={previewMode ? { maxHeight: 550 } : {}}>
      <ProductInformation
        previewMode={previewMode}
        product={product}
        asset={asset}
        loading={loading}
        onUpdatePrice={onUpdatePrice}
        updatingPrice={updatingPrice}
      />
      <div>
        <FooterLinks />
      </div>
    </CheckoutSummaryWrapper>
  );
};

export default CheckoutSummary;
