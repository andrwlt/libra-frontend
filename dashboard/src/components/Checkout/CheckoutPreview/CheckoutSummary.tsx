import styled from 'styled-components';
import { Typography } from 'antd';
import { Image, Space, Avatar, Col } from 'antd';
import { AssetMetadata } from 'types';
import { LineItem } from 'features/checkout/types';
import { ASSET_METADATA } from 'config';
import { formatBalance } from 'utils/format/balance';
import logo from 'assets/logo.svg';
import { useTranslation } from 'react-i18next';

const CheckoutSummaryWraper = styled.div`
  width: 100%;
  max-width: 460px;
  padding: 32px;
  padding-right: 64px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  width: 100%;
`;

const ProductImage = styled.div`
  margin-top: 16px;
`;

interface Props {
  product: LineItem | undefined;
  asset: string;
}

function ProductInfo({ product, asset }: Props) {
  const { name, description, price, image } = product || {};

  const assetMetadata: AssetMetadata = ASSET_METADATA[asset];

  return (
    <Wrapper>
      <Typography.Title type="secondary" level={4} style={{ marginBottom: 0 }}>
        {name}
      </Typography.Title>
      {!!price && (
        <Space align="center">
          {assetMetadata && (
            <Avatar src={assetMetadata.logo} size="small">
              {asset}
            </Avatar>
          )}
          <Typography.Title level={3} style={{ margin: '1rem 0' }}>
            {formatBalance(price, asset)} {asset}
          </Typography.Title>
        </Space>
      )}

      {description && <Typography.Paragraph type="secondary">{description}</Typography.Paragraph>}

      <ProductImage>
        <Image src={image} preview={false} />
      </ProductImage>
    </Wrapper>
  );
}

const { Paragraph, Link } = Typography;

const FooterLinksWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
`;

const FooterLink = styled(Link)`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5) !important;
  &:hover {
    color: rgba(0, 0, 0, 0.8) !important;
  }
`;

function FooterLinks() {
  const { t } = useTranslation();
  return (
    <FooterLinksWrapper>
      <Space align="center">
        <Paragraph style={{ margin: 0 }} strong>
          {t('footer.poweredBy')}
        </Paragraph>
        <img src={logo} height={16} alt={t<string>('footer.libraLogo')} />
      </Space>
      <Space>
        <FooterLink> {t('footer.privacy')}</FooterLink>
        <FooterLink>{t('footer.terms')}</FooterLink>
      </Space>
    </FooterLinksWrapper>
  );
}

const CheckoutSummary = ({ product, asset }: { product: LineItem; asset: string }) => {
  return (
    <Col span={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <CheckoutSummaryWraper>
        <ProductInfo product={product} asset={asset}></ProductInfo>
        <FooterLinks></FooterLinks>
      </CheckoutSummaryWraper>
    </Col>
  );
};

export default CheckoutSummary;
