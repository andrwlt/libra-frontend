import styled from 'styled-components';
import { Row, Layout, Col } from 'antd';
import CheckoutSummary from './CheckoutSummary';
import PaymentSummary from './PaymentSummary';
import { CheckoutPreviewType } from 'features/checkout/types';
import { CheckoutBrand } from './CheckoutSummary';

const { Content } = Layout;

const Wrapper = styled(Layout)`
  width: 100%;
  height: 100%;
  min-height: 100%;
  background-color: #fff;
  display: block;
`;

const ContentWrapper = styled(Content)`
  display: flex;
  justify-content: center;

  &::before {
    animation-fill-mode: both;
    background: #ffffff;
    content: ' ';
    height: 100%;
    position: fixed;
    right: 0;
    top: 0;
    transform-origin: right;
    width: 50%;
    box-shadow: 15px 0 30px 0 rgba(0, 0, 0, 0.18);
  }
`;

const MainContent = styled(Row)`
  height: 678px;
  max-width: 920px;
  width: 100%;
  transform: translateY(max(48px, calc(50vh - 55%)));
`;

export default function CheckoutPreview({
  previewingCheckout,
  previewMode = true,
}: {
  previewingCheckout: CheckoutPreviewType;
  previewMode?: boolean;
}) {
  const { branding, item, asset } = previewingCheckout;

  return (
    <Wrapper>
      <CheckoutBrand branding={branding} />
      <ContentWrapper>
        <MainContent justify="space-between">
          <Col span={12}>
            <CheckoutSummary product={item} asset={asset} previewMode={previewMode} />
          </Col>
          <Col span={12}>
            <PaymentSummary />
          </Col>
        </MainContent>
      </ContentWrapper>
    </Wrapper>
  );
}
