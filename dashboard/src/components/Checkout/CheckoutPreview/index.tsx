import styled from 'styled-components';
import { Typography, Row, Layout, theme, Skeleton } from 'antd';
import CheckoutSummary from './CheckoutSummary';
import PaymentSummary from './PaymentSummary';
import { Brand as BrandType, CheckoutType } from 'features/checkout/types';
import getImageUrl from 'utils/getImageUrl';
import { ReactNode } from 'react';

const { Header, Content } = Layout;

const { Title } = Typography;

const LogoWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 14px;
`;

const LogoImage = styled.img`
  height: 24px;
`;

function BrandLogo({ name, logo }: BrandType) {
  let content: ReactNode = (
    <Title style={{ margin: 0 }} level={5}>
      {name}
    </Title>
  );

  if (!name && !logo) {
    content = <Skeleton.Button style={{ marginTop: '16px' }} active />;
  }

  if (logo) {
    content = <LogoImage src={getImageUrl(logo)} alt="brand logo" />;
  }

  return <LogoWrapper>{content}</LogoWrapper>;
}

const Wrapper = styled(Layout)`
  width: 100%;
  height: 100%;
  min-height: 100%;
`;

const FullHeightRow = styled(Row)`
  height: 100%;
`;

export default function CheckoutPreview({ previewingCheckout }: { previewingCheckout: CheckoutType }) {
  const { branding, item, asset } = previewingCheckout;
  const {
    token: { colorBgContainer, colorBorderSecondary },
  } = theme.useToken();

  return (
    <Wrapper>
      <Header style={{ background: colorBgContainer, borderBottom: `solid 1px ${colorBorderSecondary}` }}>
        <BrandLogo name={branding?.name} logo={branding?.logo} />
      </Header>

      <Content>
        <FullHeightRow>
          <CheckoutSummary product={item} asset={asset} />
          <PaymentSummary />
        </FullHeightRow>
      </Content>
    </Wrapper>
  );
}
