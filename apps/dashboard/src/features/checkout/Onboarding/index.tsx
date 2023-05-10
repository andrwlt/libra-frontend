import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Previewer from 'components/Checkout/Previewer';
import { Checkout as CheckoutPreview } from '@atscale/libra-ui';
import Loading from 'components/Common/Loading';
import Steps from './steps/Steps';
import ConnectWallet from '../FormItems/ConnectWallet';
import { theme, Button, Form, Modal, Space } from 'antd';
import { useLogin, useConnectExtension } from 'features/auth/authHooks';
import { useCheckout, useCreateCheckout, useResetCheckout } from 'features/checkout/checkoutHooks';
import SelectAccountModal from 'components/SelectAccountModal';
import CheckoutProductFormItems from 'features/checkout/FormItems/CheckoutProductFormItems';
import CheckoutBrandingFormItems from 'features/checkout/FormItems/CheckoutBrandingFormItems';
import Congratulation from './Congratulation';
import { useDebounceCallback } from 'app/hooks';
import { AccountType } from 'features/auth/types';
import { useTranslation } from 'react-i18next';
import { formatCheckoutToStringPrice } from 'utils/format/balance';
import { LOCALE_WORKSPACE } from 'app/i18n';
import { initMessageAfterPayment } from 'config';
import waveIcon from 'assets/wave.png';

const Header = styled.div`
  padding: 32px 64px;
  margin-left: auto;
  margin-right: auto;
  height: auto;
  padding-bottom: 22px;
  padding-top: 40px;
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
  const [previewingCheckout, setPreviewingCheckout] = useState(checkout);
  const [isOpenSelectAccountModal, setIsOpenSelectAccountModal] = useState(false);
  const { handleLogin, loginLoading, loginSuccess, loginFailed } = useLogin();
  const { handleConnectExtension, connectExtensionLoading, connectedExtension } = useConnectExtension(() => {
    setIsOpenSelectAccountModal(true);
  });
  const [stepIndex, setStepIndex] = useState(0);
  const loginSuccessRef = useRef(null);
  const loginFailedRef = useRef(null);

  loginSuccessRef.current = loginSuccess;
  loginFailedRef.current = loginFailed;

  const onFieldsChange = useDebounceCallback(() => {
    setPreviewingCheckout(form.getFieldsValue());
  });

  useResetCheckout();

  useEffect(() => {
    const modal = Modal.info({
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
    item: { name, price },
    branding,
  } = previewingCheckout;

  const steps = [
    {
      index: 0,
      name: 'Add your product',
      disabled: !name || !price,
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
        <Button loading={connectExtensionLoading} type="primary" onClick={handleConnectExtension}>
          {t('connectWallet')}
        </Button>
      ),
    },
  ];

  const loginThenCreateCheckout = async (account: AccountType) => {
    setIsOpenSelectAccountModal(false);
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
            form={form}
            layout="vertical"
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
            initialValues={checkout}
            onFieldsChange={onFieldsChange}
          >
            <CheckoutProductFormItems isShow={stepIndex === 0} onboardingMode onFieldsChange={onFieldsChange} />
            <CheckoutBrandingFormItems isShow={stepIndex === 1} onboardingMode onFieldsChange={onFieldsChange} />
          </Form>

          <ConnectWallet isShow={stepIndex === 2} />
        </Steps>
      </Header>

      <Content style={{ background: colorBgLayout }}>
        <Previewer onboardingMode width={768}>
          <CheckoutPreview checkoutData={previewingCheckout} />
        </Previewer>
      </Content>

      <Loading
        loading={loginLoading || createCheckoutLoading}
        isFullPage
        message={t('creatingCheckoutPage') as string}
      />

      <SelectAccountModal
        open={isOpenSelectAccountModal}
        onClose={() => setIsOpenSelectAccountModal(false)}
        onSelectAccount={loginThenCreateCheckout}
        connectExtensionLoading={connectExtensionLoading}
        connectedExtension={connectedExtension}
      />
    </>
  );
}
