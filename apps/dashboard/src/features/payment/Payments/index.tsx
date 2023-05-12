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
import Loading from 'components/Common/Loading';
import { LOCALE_WORKSPACE } from 'app/i18n';

export default function Payments() {
  const { t } = useTranslation(LOCALE_WORKSPACE.PAYMENT);
  const { t: tWording } = useTranslation(LOCALE_WORKSPACE.WORDING);
  const { charges, hasCheckout, firstCheckoutAsset, getChargesLoading, chargesPaging, isFirstLoad } = useCharges();

  const { status, createdLte, createdGte } = useChargeParams();
  const navigate = useNavigate();

  const subTitle = hasCheckout ? (
    <>
      <div>{tWording('noPaymentHasCheckoutSubTitle', { asset: firstCheckoutAsset.toUpperCase() })}</div>
    </>
  ) : (
    tWording('hasPaymentNoCheckoutSubtitle')
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
            <ChargeTable charges={charges} getChargesLoading={getChargesLoading} chargesPaging={chargesPaging} />
          ) : (
            <Result
              style={{ maxWidth: '480px', margin: 'auto' }}
              icon={<WalletOutlined />}
              title={hasCheckout ? tWording('noPaymentHasCheckoutTitle') : tWording('paymentWillShowHere')}
              subTitle={subTitle}
              extra={[
                <Button
                  key="1"
                  type="primary"
                  onClick={hasCheckout ? goToCheckouts : goToCreateCheckout}
                  icon={!hasCheckout && <PlusOutlined />}
                >
                  {hasCheckout ? t('getCheckoutLinks') : t('createCheckoutNow')}
                </Button>,
              ]}
            ></Result>
          )}
        </Card>
      </StyledContainer>
      <Loading isContentPage loading={isFirstLoad} />
    </div>
  );
}
