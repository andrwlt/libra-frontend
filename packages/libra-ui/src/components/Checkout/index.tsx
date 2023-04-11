import styled from 'styled-components';
import { Row, Layout, Col, message } from 'antd';
import CheckoutSummary from './CheckoutSummary';
import PaymentSummary from './PaymentSummary';
import { CheckoutType } from '../../app/types';
import CheckoutBrand from './Brand';
import AfterPaymentPreviewer from './AfterPaymentPreviewer';
import { useTranslation } from 'react-i18next';
import '../../app/i18n';
import { useState } from 'react';

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
  checkoutData,
  previewMode = true,
  isShowAfterPayment = false,
  loading = false,
}: {
  checkoutData: CheckoutType;
  previewMode?: boolean;
  isShowAfterPayment?: boolean;
  loading?: boolean;
}) => {
  const { t } = useTranslation();
  const { branding, item, asset, afterPayment } = checkoutData;
  const [completed, setCompleted] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handlePaymentSuccess = () => {
    if (afterPayment && afterPayment.type === 'redirect' && afterPayment.config.url) {
      window.location.href = afterPayment.config.url;
      return;
    }

    setCompleted(true);
  };

  const handlePaymentFailed = () => {
    messageApi.error(t('defaultErrorMessage'));
  };

  return (
    <Wrapper>
      {contextHolder}
      <CheckoutBrand branding={branding} loading={loading} />
      <ContentWrapper>
        <MainContent justify="space-between">
          <Col span={12}>
            <CheckoutSummary loading={loading} product={item} asset={asset} previewMode={previewMode} />
          </Col>
          <Col span={12}>
            {(completed || isShowAfterPayment) && afterPayment ? (
              <AfterPaymentPreviewer afterPayment={afterPayment} />
            ) : (
              <PaymentSummary
                previewMode={previewMode}
                payment={{
                  payee: checkoutData.payee || '',
                  amount: checkoutData.item.price || 0,
                  asset: checkoutData.asset,
                  productName: checkoutData.item.name,
                }}
                onPaymentSuccess={handlePaymentSuccess}
                onPaymentFailed={handlePaymentFailed}
              />
            )}
          </Col>
        </MainContent>
      </ContentWrapper>
    </Wrapper>
  );
};

export default CheckoutPreview;
