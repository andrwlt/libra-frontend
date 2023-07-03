import { useState } from 'react';
import { Button, Form, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import AccountOption from './AccountOption';
import ContactInformation from './ContactInformation';
import { Asset } from 'app/types';
import NetworkInfo from './NetworkInfo';
import { getSs58AddressByAsset } from 'utils';

const EXAMPLE_POLKADOT_ADDRESS = '5ERjkQVj8M7v5UVZQ8qTbZ2qb1o5TgNXq9tXt2BsWF9jBpDu';

export default function PaymentSummary({
  productName,
  actionName,
  asset,
}: {
  productName: string;
  actionName?: string | null;
  asset: Asset;
}) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  return (
    <div style={{ width: 380, maxWidth: 380, marginLeft: 80 }}>
      <ContactInformation value={email} onChange={setEmail} productName={productName} />

      <Form layout="vertical">
        <Typography.Title level={4}>{t('paymentMethod')} </Typography.Title>
        <NetworkInfo asset={asset} />
        <Form.Item label="Account">
          <AccountOption
            variant="select"
            account={{
              name: 'Test Account',
              address: getSs58AddressByAsset(EXAMPLE_POLKADOT_ADDRESS, asset),
            }}
            asset={asset}
          />
        </Form.Item>

        <Button
          style={{ marginTop: 32, marginBottom: 8 }}
          type="primary"
          size="large"
          block
          loading={loading}
          onClick={() => {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
            }, 1000);
          }}
        >
          {actionName || t('pay')}
        </Button>
      </Form>
    </div>
  );
}
