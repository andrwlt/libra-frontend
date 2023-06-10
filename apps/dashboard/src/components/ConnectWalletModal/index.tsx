import { Typography, Modal, Button, Row } from 'antd';
import { Account, WalletList } from '@atscale/libra-ui';
import { useTranslation } from 'react-i18next';
import { useConnectExtension, useExtensions, useResetConnectedExtension } from 'features/auth/authHooks';
import { LOCALE_WORKSPACE } from 'app/i18n';
import { useEffect, useState } from 'react';
import Loading from 'components/Common/Loading';
import AccountOption from './AccountOption';
import { ArrowLeftOutlined } from '@ant-design/icons';

type ConnectWalletModalPropsType = {
  open: boolean;
  onClose: () => void;
  handleLogin: (account: Account) => void;
};

const { Title, Paragraph } = Typography;

const STEPS = {
  SELECT_WALLET: 'SELECT_WALLET',
  SELECT_ACCOUNT: 'SELECT_ACCOUNT',
};

const initStep = STEPS.SELECT_WALLET;

const OptionHeight = 60;
const initHeight = 310;
const wordingHeight = 40;

const ConnectWalletModal = (props: ConnectWalletModalPropsType) => {
  const { t } = useTranslation(LOCALE_WORKSPACE.AUTH);
  const { t: tWording } = useTranslation(LOCALE_WORKSPACE.WORDING);
  const [step, setStep] = useState(initStep);
  const { open, onClose, handleLogin } = props;
  const [height, setHeight] = useState(initHeight);

  const { getExtensionsLoading, installedExtensions } = useExtensions(open);
  const { handleConnectExtension, connectedExtension, connectExtensionLoading } = useConnectExtension();
  useResetConnectedExtension(open);

  const onSelectWallet = (extensionId: string) => {
    handleConnectExtension(extensionId);
    setStep(STEPS.SELECT_ACCOUNT);
  };

  useEffect(() => {
    const accounts = connectedExtension?.accounts;
    if (accounts) {
      setHeight(accounts?.length * OptionHeight + wordingHeight);
    }
  }, [connectedExtension]);

  const onLogin = (account: Account) => {
    handleLogin(account);
    onClose();
  };

  useEffect(() => {
    setStep(initStep);
    setHeight(initHeight);
  }, [open]);

  const handleClose = () => {
    onClose();
  };

  const accounts = connectedExtension?.accounts;
  return (
    <Modal
      open={open}
      onCancel={handleClose}
      footer={false}
      title={
        <Title style={{ marginTop: 0, marginBottom: 0, textAlign: 'center' }} level={4}>
          {step === STEPS.SELECT_WALLET ? t('selectWallet') : t('selectAccount')}
        </Title>
      }
    >
      <div style={{ height, transition: 'height .15s' }}>
        {step === STEPS.SELECT_WALLET ? (
          <div>
            <Paragraph style={{ textAlign: 'center', marginBottom: 20 }}>{tWording('preferExtension')}</Paragraph>
            <Loading loading={getExtensionsLoading} bordered />
            <WalletList extensionDictionary={installedExtensions} onSelectWallet={onSelectWallet}></WalletList>
          </div>
        ) : (
          <div>
            <Loading loading={connectExtensionLoading} bordered />
            <Paragraph style={{ textAlign: 'center', marginBottom: 20 }}>{tWording('noAccountTitle')}</Paragraph>
            {accounts?.map((account: any, index: number) => (
              <AccountOption key={index} account={account} onSelect={() => onLogin(account)} />
            ))}
          </div>
        )}
        <Row style={{ marginTop: 10, marginBottom: 10 }}></Row>

        {step === STEPS.SELECT_ACCOUNT && (
          <Button
            size="small"
            type="text"
            style={{ marginRight: 10, position: 'absolute', top: 14, left: 18, color: 'rgba(0, 0, 0, 0.45)' }}
            onClick={() => {
              setStep(initStep);
              setHeight(initHeight);
            }}
            icon={<ArrowLeftOutlined />}
          ></Button>
        )}
      </div>
    </Modal>
  );
};

export default ConnectWalletModal;
