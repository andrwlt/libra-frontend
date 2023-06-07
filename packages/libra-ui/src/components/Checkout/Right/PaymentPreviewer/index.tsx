import { useState } from 'react';
import { Button, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import AccountOption from './AccountOption';
import ContactInformation from './ContactInformation';
import { Payment } from 'app/types';
import { getExtensionId } from 'utils/asset';

const EXAMPLE_POLKADOT_ADDRESS = '5ERjkQVj8M7v5UVZQ8qTbZ2qb1o5TgNXq9tXt2BsWF9jBpDu';
const EXAMPLE_METAMASK_ADDRESS = '0x71a753bFc4F9AeADc744c2Aa01e928bfD4BF5ceC';

export default function PaymentSummary({ payment }: { payment: Payment }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const extensionId = getExtensionId(payment.asset);

  return (
    //TODO: Fix style
    <div style={{ width: 430, maxWidth: 430, marginLeft: 50 }}>
      <ContactInformation value={email} onChange={setEmail} productName={payment.productName} />

      <div>
        <Typography.Title level={4}>{t('paymentMethod')} </Typography.Title>
        <AccountOption
          variant="select"
          account={{
            name: 'Test Account',
            address: extensionId === 'polkadot-js' ? EXAMPLE_POLKADOT_ADDRESS : EXAMPLE_METAMASK_ADDRESS,
            type: extensionId || 'polkadot-js',
          }}
        />

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
          {t('pay')}
        </Button>
      </div>
    </div>
  );
}
