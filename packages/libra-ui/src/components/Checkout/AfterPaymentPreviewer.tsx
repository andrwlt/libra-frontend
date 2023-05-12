import { AfterPayment } from '../../app/types';
import { Result } from 'antd';
import { useTranslation } from 'react-i18next';

const AfterPaymentPreviewer = ({ afterPayment, productName }: { afterPayment: AfterPayment; productName: string }) => {
  const { t } = useTranslation();
  const message = afterPayment.config?.message;

  return (
    <div style={{ width: 380, maxWidth: 380, marginLeft: 'auto' }}>
      {' '}
      <Result
        status="success"
        title={message || t('thankForYourPayment')}
        subTitle={!message && t('productWillBeSent', { productName })}
      />
    </div>
  );
};

export default AfterPaymentPreviewer;
