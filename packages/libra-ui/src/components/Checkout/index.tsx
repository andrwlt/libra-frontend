import styled from 'styled-components';
import { Row, Layout, Col } from 'antd';
import CheckoutSummary from './Left/CheckoutSummary';
import PaymentPreviewer from './Right/PaymentPreviewer';
import { Checkout, NumFlexPrice, FlexPriceValid, CheckoutResponse } from 'app/types';
import CheckoutBrand from './Brand';
import AfterPaymentPreviewer from './Right/AfterPaymentPreviewer';
import 'app/i18n';
import { useState } from 'react';
import { priceFormatHelper } from 'utils';

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
  HandlePaymentComponent,
  onNumFlexPriceChange,
  numFlexPrice,
  flexPriceValid,
  validateFlexPrice,
}: {
  checkoutData: Checkout | CheckoutResponse;
  previewMode?: boolean;
  isShowAfterPayment?: boolean;
  loading?: boolean;
  HandlePaymentComponent?: any;
  onNumFlexPriceChange?: (price: NumFlexPrice) => void;
  validateFlexPrice?: (price: NumFlexPrice) => FlexPriceValid;
  numFlexPrice?: NumFlexPrice;
  flexPriceValid: FlexPriceValid;
}) => {
  const { branding, item, assetId, networkId, afterPayment, payee, checkoutType } = checkoutData;
  const { price, name } = item;

  const checkoutPrice =
    price.type === 'fixed'
      ? price.value
      : numFlexPrice
      ? priceFormatHelper.toSmallestUnit(numFlexPrice, { assetId, networkId })
      : undefined;

  const [completed, setCompleted] = useState(false);

  const handlePaymentSuccess = () => {
    if (afterPayment && afterPayment.type === 'redirect' && afterPayment.config.url) {
      window.location.href = afterPayment.config.url;
      return;
    }

    setCompleted(true);
  };

  return (
    <Wrapper>
      <CheckoutBrand branding={branding} loading={loading} />
      <ContentWrapper>
        <MainContent justify="space-between">
          <Col span={12}>
            <CheckoutSummary
              loading={loading}
              product={item}
              asset={{ assetId, networkId }}
              previewMode={previewMode}
              onNumFlexPriceChange={onNumFlexPriceChange}
              numFlexPrice={numFlexPrice}
              flexPriceValid={flexPriceValid}
            />
          </Col>

          <Col span={12}>
            {(completed || isShowAfterPayment) && afterPayment ? (
              <AfterPaymentPreviewer afterPayment={afterPayment} productName={item.name || 'The product'} />
            ) : previewMode ? (
              <PaymentPreviewer productName={name} checkoutType={checkoutType} asset={{ assetId, networkId }} />
            ) : (
              <HandlePaymentComponent
                onPaymentSuccess={handlePaymentSuccess}
                payment={{
                  payee: payee ?? '',
                  amount: checkoutPrice,
                  asset: { assetId, networkId },
                  productName: name,
                }}
                validateFlexPrice={validateFlexPrice}
                priceType={item.price.type}
                numFlexPrice={numFlexPrice}
                checkoutType={checkoutType}
              />
            )}
          </Col>
        </MainContent>
      </ContentWrapper>
    </Wrapper>
  );
};

export default CheckoutPreview;
