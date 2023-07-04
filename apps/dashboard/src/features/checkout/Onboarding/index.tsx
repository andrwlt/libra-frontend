import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Previewer from 'components/Checkout/Previewer';
import { ASSETS_CONFIG, CheckoutComponent, isPriceTooLong } from '@atscale/libra-ui';
import Loading from 'components/Common/Loading';
import Steps from './steps/Steps';
import ConnectWallet from '../FormItems/ConnectWallet';
import { theme, Button, Form, Modal, Space } from 'antd';
import { useLogin } from 'features/auth/authHooks';
import { useCheckout, useCreateCheckout, useResetCheckout } from 'features/checkout/checkoutHooks';
import CheckoutProductFormItems from 'features/checkout/FormItems/CheckoutProductFormItems';
import CheckoutBrandingFormItems from 'features/checkout/FormItems/CheckoutBrandingFormItems';
import Congratulation from './Congratulation';
import { useDebounceCallback } from 'app/hooks';
import { Account } from '@atscale/libra-ui';
import { useTranslation } from 'react-i18next';
import { formatCheckoutToStringPrice } from 'utils/format/balance';
import { LOCALE_WORKSPACE } from 'app/i18n';
import { initMessageAfterPayment } from 'config';
import waveIcon from 'assets/wave.png';
import ConnectWalletModal from 'components/ConnectWalletModal';

const Header = styled.div`
  padding: 32px 64px;
  margin-left: auto;
  margin-right: auto;
  height: auto;
  padding-top: 40px;
  padding-bottom: 22px;
`;

const Content = styled.div`
  height: 680px;
  padding: 32px;
  margin-left: auto;
  margin-right: auto;
  background-color: rgb(246, 248, 250) !important;
`;

export default function Onboarding() {
  const { t } = useTranslation(LOCALE_WORKSPACE.CHECKOUT);
  const { t: tWording } = useTranslation(LOCALE_WORKSPACE.WORDING);
  const [form] = Form.useForm();
  const { checkout } = useCheckout();

  const onboardingMode = true;
  const { checkoutURL, handleCreateCheckout, createCheckoutLoading } = useCreateCheckout(onboardingMode);
  const [previewingCheckout, setPreviewingCheckout] = useState({
    ...checkout,
    assetId: 'ast_dot',
    networkId: 'nw_polkadot',
  });
  const [isOpenSelectWalletModal, setIsOpenSelectWalletModal] = useState(false);
  const { handleLogin, loginLoading, loginSuccess, loginFailed } = useLogin();
  const [stepIndex, setStepIndex] = useState(0);
  const loginSuccessRef = useRef(null);
  const loginFailedRef = useRef(null);

  loginSuccessRef.current = loginSuccess;
  loginFailedRef.current = loginFailed;

  const onFieldsChange = useDebounceCallback(() => {
    const formValues = form.getFieldsValue();

    const network = ASSETS_CONFIG.find(({ id }) => id === formValues.assetId)?.networks[0].networkId;

    const previewingCheckout = {
      ...formValues,
      networkId: network,
      item: {
        ...formValues.item,
        price: { value: formValues.item.price.value, type: 'fixed' },
      },
      metadata: { actionName: '' },
    };
    setPreviewingCheckout(previewingCheckout);
  });

  useResetCheckout();

  useEffect(() => {
    const modal = Modal.info({
      okText: tWording('welcomeOkBtnText'),
      maskClosable: true,
      width: 600,
      icon: null,
      className: 'welcome-modal',
      title: (
        <Space align="center" size={6}>
          <img alt="welcome-icon" src={waveIcon} style={{ width: 22, lineHeight: 1 }} />{' '}
          <span style={{ lineHeight: 1.5 }}>{tWording('welcomeTitle')}</span>
        </Space>
      ),
      content: tWording<string>('welcomeContent'),
    });

    return () => {
      modal.destroy();
    };
  }, [tWording]);
  const {
    token: { boxShadow, colorBgLayout },
  } = theme.useToken();

  const {
    item: {
      name,
      price: { value },
    },
    branding,
  } = previewingCheckout;

  const steps = [
    {
      index: 0,
      name: 'Add your product',
      disabled: !name || !value || isPriceTooLong(value),
    },
    {
      index: 1,
      name: 'Setup your branding',
      disabled: !branding.name,
    },
    {
      index: 2,
      name: 'Add your wallet',
      nextAction: (
        <Button type="primary" onClick={() => setIsOpenSelectWalletModal(true)}>
          {t('connectWallet')}
        </Button>
      ),
    },
  ];

  const loginThenCreateCheckout = async (account: Account) => {
    setIsOpenSelectWalletModal(false);
    await handleLogin(account);

    if (loginSuccessRef.current) {
      handleCreateCheckout(
        formatCheckoutToStringPrice({ ...previewingCheckout, afterPayment: initMessageAfterPayment }),
      );
    }
  };

  const step = steps[stepIndex];

  if (checkoutURL) {
    return <Congratulation checkoutURL={checkoutURL}></Congratulation>;
  }

  return (
    <>
      <Header style={{ boxShadow }}>
        <Steps
          style={{ maxWidth: '1200px', margin: 'auto' }}
          step={step}
          setStepIndex={(index: number) => setStepIndex(index)}
          numberOfSteps={steps.length + 1}
        >
          <Form
            autoComplete="off"
            form={form}
            layout="vertical"
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
            initialValues={previewingCheckout}
            onFieldsChange={onFieldsChange}
          >
            <CheckoutProductFormItems isShow={stepIndex === 0} onboardingMode onFieldsChange={onFieldsChange} />
            <CheckoutBrandingFormItems isShow={stepIndex === 1} onboardingMode onFieldsChange={onFieldsChange} />
          </Form>

          <ConnectWallet isShow={stepIndex === 2} />
        </Steps>
      </Header>

      <Content style={{ background: colorBgLayout, display: 'flex', justifyContent: 'center' }}>
        <Previewer onboardingMode width={768} style={{ marginRight: '0px' }}>
          <CheckoutComponent
            flexPriceValid={true}
            previewMode={true}
            checkoutData={previewingCheckout}
            isShowAfterPayment={false}
          />
        </Previewer>
      </Content>

      <Loading
        loading={loginLoading || createCheckoutLoading}
        isFullPage
        message={t('creatingCheckoutPage') as string}
      />

      <ConnectWalletModal
        handleLogin={loginThenCreateCheckout}
        open={isOpenSelectWalletModal}
        onClose={() => setIsOpenSelectWalletModal(false)}
      />
    </>
  );
}
