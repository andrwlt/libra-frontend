import { Card, Button, Result } from 'antd';
import { WalletOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import PATHS from 'router/paths';
import { useCharges, useChargeParams } from 'features/payment/paymentHooks';
import PageHeader from 'components/Common/PageHeader';
import { useTranslation } from 'react-i18next';
import { StyledContainer } from 'components/Common/Styled';
import ChargeTable from './Table';
import ChargeFilter from './Filter';

export default function Payments() {
  const { t } = useTranslation();
  const { charges, hasCheckout, getChargesLoading, fetchCharges, chargesPaging } = useCharges();
  const { status, createdLte, createdGte } = useChargeParams();
  const navigate = useNavigate();

  const subTitle = hasCheckout ? (
    <>
      <div>{t('payment.noPaymentHasCheckoutSubTitle1')}</div>
      <div style={{ marginTop: 5 }}>{t('payment.noPaymentHasCheckoutSubTitle2')}</div>
    </>
  ) : (
    t('payment.hasNoCheckoutSubtitle')
  );

  const goToCheckouts = () => {
    navigate(PATHS.checkout.root);
  };

  const goToCreateCheckout = () => {
    navigate(PATHS.checkout.create);
  };

  const hasCharge = !!charges.length;
  const shouldShowTable = getChargesLoading || hasCharge || (!hasCharge && (status || createdLte || createdGte));

  return (
    <div>
      <PageHeader title="Payments" />

      <StyledContainer>
        {shouldShowTable ? (
          <Card style={{ marginBottom: 16 }}>
            <ChargeFilter isLoading={getChargesLoading} />
          </Card>
        ) : (
          ''
        )}

        <Card>
          {shouldShowTable ? (
            <ChargeTable
              charges={charges}
              getChargesLoading={getChargesLoading}
              fetchCharges={fetchCharges}
              chargesPaging={chargesPaging}
            />
          ) : (
            <Result
              style={{ maxWidth: '480px', margin: 'auto' }}
              icon={<WalletOutlined />}
              title={hasCheckout ? t('payment.noPaymentHasCheckoutTitle') : t('payment.paymentWillShowHere')}
              subTitle={subTitle}
              extra={[
                <Button
                  key="1"
                  type="primary"
                  onClick={hasCheckout ? goToCheckouts : goToCreateCheckout}
                  icon={!hasCheckout && <PlusOutlined />}
                >
                  {hasCheckout ? t('payment.getCheckoutLinks') : t('checkout.createCheckoutNow')}
                </Button>,
              ]}
            ></Result>
          )}
        </Card>
      </StyledContainer>
    </div>
  );
}
