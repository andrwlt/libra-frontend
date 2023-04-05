import { Fragment } from 'react';
import styled from 'styled-components';
import { Image, Space, Avatar, Typography, Divider } from 'antd';
import { AssetMetadata } from 'types';
import { CheckoutProductItemNumberPrice } from 'features/checkout/types';
import { ASSET_METADATA } from 'config';
import { getCheckoutPrice } from 'utils/format/formatText';
import logo from 'assets/logo.svg';
import { useTranslation } from 'react-i18next';
import { Brand as BrandType } from 'features/checkout/types';

const { Paragraph, Link, Title } = Typography;

const LogoBox = styled.div`
  height: 56px;
  position: fixed;
  top: 0;
`;

const LogoWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 24px;
`;

const ImageWrapper = styled.div`
  margin: 32px 0;
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CheckoutBrand = ({ branding }: { branding: BrandType }) => {
  const { name, logo } = branding;

  const HasNoBrand = !logo && !name;

  return (
    <LogoBox>
      <LogoWrapper>
        {HasNoBrand ? (
          'Brand'
        ) : (
          <Fragment>
            {logo && <img style={{ height: 24 }} src={logo} alt="brand logo" />}
            {name && (
              <Title style={{ margin: 0 }} level={5}>
                {name}
              </Title>
            )}
          </Fragment>
        )}
      </LogoWrapper>
    </LogoBox>
  );
};

interface ProductInfoProps {
  product: CheckoutProductItemNumberPrice | undefined;
  asset: string;
}

const ProductInfo = ({ product, asset }: ProductInfoProps) => {
  const { name, description, price, image } = product || {};

  const assetMetadata: AssetMetadata = ASSET_METADATA[asset];

  return (
    <div style={{ width: '100%' }}>
      <Typography.Title type="secondary" level={4} style={{ marginBottom: 0, fontWeight: 400 }}>
        {name || 'Product name'}
      </Typography.Title>

      <Space align="center" style={{ marginTop: 10 }}>
        {assetMetadata && <Avatar src={assetMetadata.logo}>{asset}</Avatar>}

        <Typography.Title level={3} style={{ margin: 0, fontSize: 32 }}>
          {price ? getCheckoutPrice({ price, asset }, assetMetadata) : '0'}
        </Typography.Title>
      </Space>

      {description && <Typography.Paragraph type="secondary">{description}</Typography.Paragraph>}

      <ImageWrapper>
        <Image src={image} preview={false} style={{ maxWidth: 300, maxHeight: 300 }} />
      </ImageWrapper>
    </div>
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
      <Paragraph style={{ margin: 0 }} strong>
        {t('footer.poweredBy')}
      </Paragraph>
      <img src={logo} height={16} alt={t<string>('footer.libraLogo')} />

      <Divider type="vertical" style={{ height: 20 }} />

      <FooterLink> {t('footer.privacy')}</FooterLink>
      <FooterLink>{t('footer.terms')}</FooterLink>
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
}: {
  product: CheckoutProductItemNumberPrice;
  asset: string;
  previewMode: boolean;
}) => {
  return (
    <CheckoutSummaryWrapper style={previewMode ? { maxHeight: 550 } : {}}>
      <ProductInfo product={product} asset={asset} />
      <div>
        <FooterLinks />
      </div>
    </CheckoutSummaryWrapper>
  );
};

export default CheckoutSummary;
