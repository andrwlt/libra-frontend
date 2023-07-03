import { Asset, AssetMetadata, priceFormatHelper } from '@atscale/libra-ui';
import { Typography, Space, Avatar, Card } from 'antd';
import { Performance as PerformanceType } from 'features/checkout/types';

const { Title, Text } = Typography;

const PerformanceInfoItem = ({
  label,
  value,
  isFlexPrice,
  style = {},
}: {
  label: string;
  value: any;
  isFlexPrice: boolean;
  style?: any;
}) => {
  return (
    <div style={{ padding: isFlexPrice ? '21.7px 0' : '20px 0', ...style }}>
      <Title level={4} style={{ marginTop: 0, marginBottom: 5 }}>
        {label}
      </Title>
      <Text style={{ fontSize: 14 }}>
        {value} {`session${value > 1 ? 's' : ''}`}
      </Text>
    </div>
  );
};

const Performance = ({
  performance,
  assetMetadata,
  asset,
  isFlexPrice,
}: {
  performance: PerformanceType;
  assetMetadata: AssetMetadata;
  asset: Asset;
  isFlexPrice: boolean;
}) => {
  const { views, sales, revenue } = performance;
  return (
    <Card>
      <div style={{ paddingBottom: isFlexPrice ? 21.7 : 20, boxShadow: 'rgb(235, 238, 241) 0px -1px 0px 0px inset' }}>
        <Title level={4} style={{ marginTop: 0, marginBottom: 5 }}>
          Total Revenue
        </Title>

        <Space size={5}>
          <Avatar src={assetMetadata.logoUrl} size={26}>
            {assetMetadata.symbol}
          </Avatar>
          <Text style={{ fontSize: 18 }}>
            {priceFormatHelper.getCheckoutPrice({ price: revenue.value, asset }, assetMetadata)}
          </Text>
        </Space>
      </div>

      <PerformanceInfoItem
        isFlexPrice={isFlexPrice}
        label="Reached checkout"
        value={views}
        style={{ boxShadow: 'rgb(235, 238, 241) 0px -1px 0px 0px inset' }}
      />
      <PerformanceInfoItem isFlexPrice={isFlexPrice} label="Session Completed" value={sales} />
    </Card>
  );
};

export default Performance;
