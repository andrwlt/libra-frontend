import { Loading } from '@atscale/libra-ui';
import { useCheckoutDetails } from 'features/checkout/checkoutHooks';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'antd';
import { getAssetMetadata } from '@atscale/libra-ui';
import Header from './Header';
import LatestPayments from './LatestPayments';
import Performance from './Performance';
import Information from './Information';

const CheckoutDetails = () => {
  const { id } = useParams();
  const { checkoutDetails, getCheckoutDetailsLoading } = useCheckoutDetails(id);

  if (!checkoutDetails) {
    return (
      <div>
        <Loading isContentPage loading={getCheckoutDetailsLoading} />
      </div>
    );
  }

  const { checkout, performance, payments } = checkoutDetails;
  const {
    assetId,
    networkId,
    payee,
    item: {
      price: { type },
    },
  } = checkout;

  const isFlexPrice = type === 'flexible';

  const asset = {
    assetId,
    networkId,
  };

  const assetMetadata = getAssetMetadata(asset);

  return (
    <div className="checkout-details transparent-table" style={{ paddingBottom: 40 }}>
      <Loading isContentPage loading={getCheckoutDetailsLoading} />

      <Header checkout={checkout} />

      <Row justify={'space-between'} style={{ marginTop: 35 }}>
        <Col span={8}>
          <Performance
            isFlexPrice={isFlexPrice}
            performance={performance}
            assetMetadata={assetMetadata}
            asset={asset}
          />
        </Col>
        <Col span={15}>
          <Information asset={asset} checkout={checkout} payee={payee} assetMetadata={assetMetadata} />
        </Col>
      </Row>

      <LatestPayments payments={payments} />
    </div>
  );
};

export default CheckoutDetails;
