import { NumberPriceCheckoutResponse } from '@atscale/libra-ui';
import { Typography, Row } from 'antd';
import { getAssetMetadata } from '@atscale/libra-ui';
import { Fragment } from 'react';
import CopyableField from 'components/Common/CopyableField';
import { getCheckoutLink } from 'utils/format/formatText';

const { Title, Text } = Typography;

const Header = ({ checkout }: { checkout: NumberPriceCheckoutResponse }) => {
  const { assetId, networkId, item } = checkout;
  const assetMetadata = getAssetMetadata({ assetId, networkId });
  const isFixedPrice = checkout.item.price.type === 'fixed';

  return (
    <Fragment>
      <Row style={{ marginTop: 28, marginBottom: 0 }}>
        <Text type="secondary" style={{ textTransform: 'uppercase', color: 'rgb(104, 115, 133)', fontSize: 13 }}>
          Checkout Details
        </Text>
      </Row>
      <Row align="bottom">
        <Title level={2} style={{ margin: 0, fontSize: 28 }}>
          {checkout?.item.name}
          {isFixedPrice && (
            <Fragment>
              <Text style={{ margin: 0, marginLeft: 7, fontSize: 20, fontWeight: 300, color: 'rgb(104, 115, 133)' }}>
                for
              </Text>{' '}
              <Text style={{ margin: 0, fontSize: 20, fontWeight: 300, color: 'rgb(26, 27, 37)' }}>
                {item.price.value} {assetMetadata.symbol}
              </Text>
            </Fragment>
          )}
        </Title>
      </Row>
      <Text style={{ color: 'rgb(65, 69, 82)', marginTop: 10, marginBottom: 5, display: 'block' }}>
        Copy and share to start accepting payments with this link.
      </Text>

      <Row>
        <CopyableField textStyle={{ fontWeight: 500, minWidth: 503 }} text={getCheckoutLink(checkout.id)} />
      </Row>
    </Fragment>
  );
};

export default Header;
