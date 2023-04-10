import { Typography, Modal, Result, Button } from 'antd';
import AccountOption from 'components/SelectAccountModal/AccountOption';
import { AccountType } from 'features/auth/types';
import { useTranslation } from 'react-i18next';
import { useResetConnectedExtension } from 'features/auth/authHooks';

type SelectAccountModalPropsType = {
  open: boolean;
  onClose: () => void;
  onSelectAccount: (account: AccountType) => void;
  connectedExtension: any;
  connectExtensionLoading: boolean;
};

const SelectAccountModal = (props: SelectAccountModalPropsType) => {
  const { t } = useTranslation();
  const { open, onClose, onSelectAccount, connectExtensionLoading, connectedExtension } = props;

  useResetConnectedExtension(open);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={false}
      title={
        <Typography.Title style={{ marginTop: 0, marginBottom: 20 }} level={4}>
          {t('signIn.selectAnAccount')}
        </Typography.Title>
      }
    >
      {connectExtensionLoading && t('loading')}
      {connectedExtension && connectedExtension.accounts.length > 0 && (
        <>
          <div>
            {connectedExtension.accounts.map((account: AccountType) => (
              <AccountOption
                key={account.address}
                account={account}
                onClick={() => {
                  onSelectAccount(account);
                  onClose();
                }}
              />
            ))}
          </div>
        </>
      )}

      {connectedExtension && connectedExtension.accounts.length === 0 && (
        <Result
          status="warning"
          title={t('auth.needCreatePolkadotAccount')}
          extra={
            <Button type="primary" key="console" onClick={onClose}>
              {t('close')}
            </Button>
          }
        />
      )}
    </Modal>
  );
};

export default SelectAccountModal;
