import styled from 'styled-components';
import { Image, Space, Avatar, Typography, Divider, Skeleton, InputNumber, Button, Form } from 'antd';
import { AssetMetadata, NumberPriceProduct, Asset, NumFlexPrice, FlexPriceValid, StringPriceProduct } from 'app/types';
import LibraLogo from 'components/LibraLogo';
import { getCheckoutPrice } from 'utils';
import { useTranslation } from 'react-i18next';
import { getAssetMetadata } from 'utils/asset';
import { useEffect, useRef, useState } from 'react';

const { Paragraph, Link } = Typography;

const FormItem = Form.Item;

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

const ProductInformation = ({
  product,
  asset,
  loading,
  onNumFlexPriceChange,
  numFlexPrice,
  flexPriceValid,
  previewMode,
}: {
  product: NumberPriceProduct | StringPriceProduct;
  asset: Asset;
  loading: boolean;
  previewMode: boolean;
  onNumFlexPriceChange?: (price: NumFlexPrice) => void;
  numFlexPrice?: NumFlexPrice;
  flexPriceValid: FlexPriceValid;
}) => {
  const {
    name,
    description,
    price: { type: priceType, value: priceValue, preset: presetPrice, minimum, maximum },
    image,
  } = product;

  const assetMetadata: AssetMetadata = getAssetMetadata(asset);
  const [isUpdatingPrice, setIsUpdatingPrice] = useState(false);
  const inputRef = useRef<any>(null);

  useEffect(() => {
    if (isUpdatingPrice) {
      inputRef?.current?.focus();
    }
  }, [isUpdatingPrice]);

  const flexPriceElement = (
    <FormItem validateStatus={flexPriceValid !== true ? 'error' : ''} help={flexPriceValid !== true && flexPriceValid}>
      <InputNumber
        ref={inputRef}
        onBlur={() => {
          if (flexPriceValid === true) {
            setIsUpdatingPrice(false);
          }
        }}
        style={{ width: 200 }}
        value={numFlexPrice}
        onChange={onNumFlexPriceChange}
      />
    </FormItem>
  );

  const isPlexPrice = priceType === 'flexible';

  return (
    <ProductInfoWrapper>
      <div style={{ minHeight: isPlexPrice ? (description ? 170 : 140) : 0 }}>
        <Skeleton active className="product-name-skeleton" paragraph={false} loading={loading}>
          <Typography.Title type="secondary" level={4} style={{ marginBottom: 0, fontWeight: 400 }}>
            {name || 'Product name'}
          </Typography.Title>
        </Skeleton>

        <Skeleton active className="product-price-skeleton" paragraph={false} loading={loading}>
          <Space align="start" style={{ marginTop: 10 }}>
            {assetMetadata && <Avatar src={assetMetadata.logoUrl}>{assetMetadata.symbol}</Avatar>}

            {!isPlexPrice ? (
              <Typography.Title level={3} style={{ margin: 0, fontSize: 32, lineHeight: '32px' }}>
                {!!priceValue ? getCheckoutPrice({ price: priceValue, asset }, assetMetadata) : '0'}
              </Typography.Title>
            ) : (
              <div>
                {presetPrice ? (
                  <div>
                    {isUpdatingPrice ? (
                      flexPriceElement
                    ) : (
                      <Typography.Title
                        level={3}
                        style={{ margin: 0, fontSize: 32, marginBottom: 24, lineHeight: '32px' }}
                      >
                        {getCheckoutPrice({ price: numFlexPrice ?? presetPrice, asset }, assetMetadata)}
                      </Typography.Title>
                    )}
                  </div>
                ) : previewMode ? (
                  <InputNumber value="" style={{ width: 200 }} />
                ) : (
                  flexPriceElement
                )}
              </div>
            )}
          </Space>

          {isPlexPrice && presetPrice && !isUpdatingPrice && (
            <Button
              style={{ display: 'block', marginBottom: 10 }}
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
          <Typography.Paragraph
            style={{ marginTop: isPlexPrice ? 0 : 5, marginBottom: description ? '1em' : 0 }}
            type="secondary"
          >
            {description}
          </Typography.Paragraph>
        </Skeleton>
      </div>

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
  flexPriceValid,
}: {
  product: NumberPriceProduct | StringPriceProduct;
  asset: Asset;
  previewMode: boolean;
  loading: boolean;
  onNumFlexPriceChange?: (price: NumFlexPrice) => void;
  numFlexPrice?: NumFlexPrice;
  flexPriceValid: FlexPriceValid;
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
        flexPriceValid={flexPriceValid}
      />
      <div>
        <FooterLinks />
      </div>
    </CheckoutSummaryWrapper>
  );
};

export default CheckoutSummary;
