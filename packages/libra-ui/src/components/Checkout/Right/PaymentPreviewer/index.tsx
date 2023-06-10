import { useState } from 'react';
import { Button, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import AccountOption from './AccountOption';
import ContactInformation from './ContactInformation';
import { Payment } from 'app/types';

const EXAMPLE_POLKADOT_ADDRESS = '5ERjkQVj8M7v5UVZQ8qTbZ2qb1o5TgNXq9tXt2BsWF9jBpDu';

export default function PaymentSummary({ payment }: { payment: Payment }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  return (
    //TODO: Fix style
    <div style={{ width: 380, maxWidth: 380, marginLeft: 80 }}>
      <ContactInformation value={email} onChange={setEmail} productName={payment.productName} />

      <div>
        <Typography.Title level={4}>{t('paymentMethod')} </Typography.Title>
        <AccountOption
          variant="select"
          account={{
            name: 'Test Account',
            address: EXAMPLE_POLKADOT_ADDRESS,
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
