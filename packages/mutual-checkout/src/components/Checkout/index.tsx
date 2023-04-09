import styled from 'styled-components';
import { Row, Layout, Typography, Col } from 'antd';
import CheckoutSummary from './CheckoutSummary';
import PaymentSummary from './PaymentSummary';
import { AFTER_PAYMENT_TYPE, CheckoutPreviewType } from '../../app/types';
import CheckoutBrand from './Brand';
import AfterPaymentPreviewer from './AfterPaymentPreviewer';
import { useTranslation } from 'react-i18next';
import { GlobalOutlined } from '@ant-design/icons';
import '../../app/i18n';

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

const CheckoutPreview = ({
  previewingCheckout,
  previewMode = true,
  isShowAfterPayment = false,
  loading = false,
}: {
  previewingCheckout: CheckoutPreviewType;
  previewMode?: boolean;
  isShowAfterPayment?: boolean;
  loading?: boolean;
}) => {
  const { t } = useTranslation();
  const { branding, item, asset, afterPayment } = previewingCheckout;

  if (isShowAfterPayment && afterPayment?.type === AFTER_PAYMENT_TYPE.REDIRECT) {
    return (
      <Wrapper style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <GlobalOutlined
          style={{ fontSize: 35, marginBottom: 5, color: `rgba(0, 0, 0, 0.45)`, bottom: 30, position: 'relative' }}
        />
        <Typography.Title level={3} style={{ marginTop: 0, bottom: 30, position: 'relative' }} type="secondary">
          {t('checkout.websiteWillBeShow')}
        </Typography.Title>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <CheckoutBrand branding={branding} loading={loading} />
      <ContentWrapper>
        <MainContent justify="space-between">
          <Col span={12}>
            <CheckoutSummary loading={loading} product={item} asset={asset} previewMode={previewMode} />
          </Col>
          <Col span={12}>
            {isShowAfterPayment && afterPayment ? (
              <AfterPaymentPreviewer afterPayment={afterPayment} />
            ) : (
              <PaymentSummary />
            )}
          </Col>
        </MainContent>
      </ContentWrapper>
    </Wrapper>
  );
};

export default CheckoutPreview;
