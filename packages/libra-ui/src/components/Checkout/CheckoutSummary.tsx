import styled from 'styled-components';
import { Image, Space, Avatar, Typography, Divider, Skeleton } from 'antd';
import { AssetMetadata, CheckoutProductItemNumberPrice } from '../../app/types';
import LibraLogo from 'components/LibraLogo';
import { ASSET_METADATA } from '../../config';
import { getCheckoutPrice } from '../../utils';
import { useTranslation } from 'react-i18next';

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
  product: CheckoutProductItemNumberPrice | undefined;
  asset: string;
  loading: boolean;
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

const ProductInformation = ({ product, asset, loading }: ProductInfoProps) => {
  const { name, description, price, image } = product || {};

  const assetMetadata: AssetMetadata = ASSET_METADATA[asset];

  return (
    <ProductInfoWrapper>
      <Skeleton active className="product-name-skeleton" paragraph={false} loading={loading}>
        <Typography.Title type="secondary" level={4} style={{ marginBottom: 0, fontWeight: 400 }}>
          {name || 'Product name'}
        </Typography.Title>
      </Skeleton>

      <Skeleton active className="product-price-skeleton" paragraph={false} loading={loading}>
        <Space align="center" style={{ marginTop: 10 }}>
          {assetMetadata && <Avatar src={assetMetadata.logo}>{asset}</Avatar>}

          <Typography.Title level={3} style={{ margin: 0, fontSize: 32 }}>
            {price ? getCheckoutPrice({ price, asset }, assetMetadata) : '0'}
          </Typography.Title>
        </Space>
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

      <FooterLink href="https://golibra.xyz/privacy-policy" target='_blank'> {t('privacy')}</FooterLink>
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
}: {
  product: CheckoutProductItemNumberPrice;
  asset: string;
  previewMode: boolean;
  loading: boolean;
}) => {
  return (
    <CheckoutSummaryWrapper style={previewMode ? { maxHeight: 550 } : {}}>
      <ProductInformation product={product} asset={asset} loading={loading} />
      <div>
        <FooterLinks />
      </div>
    </CheckoutSummaryWrapper>
  );
};

export default CheckoutSummary;
