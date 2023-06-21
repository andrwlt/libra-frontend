import styled from 'styled-components';
import { Image, Space, Avatar, Typography, Divider, Skeleton, Slider } from 'antd';
import { AssetMetadata, NumberPriceProduct, Asset, NumFlexPrice, StringPriceProduct } from 'app/types';
import LibraLogo from 'components/LibraLogo';
import { getCheckoutPrice, priceFormatHelper } from 'utils';
import { useTranslation } from 'react-i18next';
import { getAssetMetadata } from 'utils/asset';
import { useEffect, useRef, useState } from 'react';

const { Paragraph, Link } = Typography;

const ImageWrapper = styled.div`
  margin: 32px 0;
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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

type NumPrice = number | null | undefined;

const getSliderStep = (min: NumPrice, max: NumPrice) => {
  if (!min || !max || min >= max) {
    return 0;
  }

  return (max - min) / 20;
};

const ProductInformation = ({
  product,
  asset,
  loading,
  onNumFlexPriceChange,
  numFlexPrice,
  previewMode,
}: {
  product: NumberPriceProduct | StringPriceProduct;
  asset: Asset;
  loading: boolean;
  previewMode: boolean;
  onNumFlexPriceChange?: (price: NumFlexPrice) => void;
  numFlexPrice?: NumFlexPrice;
}) => {
  const {
    name,
    description,
    price: { type: priceType, value: priceValue, preset: presetPrice, minimum, maximum },
    image,
  } = product;

  const minPriceNumber = typeof minimum === 'string' ? priceFormatHelper.formatBalance(minimum, asset) : minimum;
  const maxPriceNumber = typeof maximum === 'string' ? priceFormatHelper.formatBalance(maximum, asset) : maximum;

  const step = getSliderStep(minPriceNumber, maxPriceNumber);

  const assetMetadata: AssetMetadata = getAssetMetadata(asset);
  const [isUpdatingPrice, setIsUpdatingPrice] = useState(false);
  const inputRef = useRef<any>(null);

  useEffect(() => {
    if (isUpdatingPrice) {
      inputRef?.current?.focus();
    }
  }, [isUpdatingPrice]);

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
              {getCheckoutPrice({ price: priceValue ?? '0', asset }, assetMetadata)}
            </Typography.Title>
          ) : (
            <div style={{ width: '100%' }}>
              <Typography.Title level={3} style={{ margin: 0, fontSize: 32, lineHeight: '32px' }}>
                {getCheckoutPrice({ price: numFlexPrice ?? presetPrice ?? '0', asset }, assetMetadata)}
              </Typography.Title>
            </div>
          )}
        </Space>

        {priceType === 'flexible' && (
          <Slider
            value={numFlexPrice ?? undefined}
            min={minPriceNumber ?? 0}
            max={maxPriceNumber ?? 0}
            step={step}
            onChange={(val) => {
              if (!previewMode) {
                onNumFlexPriceChange?.(val);
              }
            }}
            tooltip={{ formatter: () => numFlexPrice }}
          />
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
  onNumFlexPriceChange,
  numFlexPrice,
}: {
  product: NumberPriceProduct | StringPriceProduct;
  asset: Asset;
  previewMode: boolean;
  loading: boolean;
  onNumFlexPriceChange?: (price: NumFlexPrice) => void;
  numFlexPrice?: NumFlexPrice;
}) => {
  return (
    <CheckoutSummaryWrapper style={previewMode ? { maxHeight: 550 } : {}}>
      <ProductInformation
        previewMode={previewMode}
        product={product}
        asset={asset}
        loading={loading}
        onNumFlexPriceChange={onNumFlexPriceChange}
        numFlexPrice={numFlexPrice}
      />
      <div>
        <FooterLinks />
      </div>
    </CheckoutSummaryWrapper>
  );
};

export default CheckoutSummary;
