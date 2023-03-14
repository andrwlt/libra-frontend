import { Typography, Modal } from 'antd';
import AccountOption from 'components/SelectAccountModal/AccountOption';
import { AccountType } from 'features/auth/types';
import { useTranslation } from 'react-i18next';

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

  return (
    <Modal open={open} onCancel={onClose} footer={false}>
      {connectExtensionLoading && t('loading')}
      {connectedExtension && connectedExtension.accounts.length > 0 && (
        <>
          <Typography.Title level={3}>{t('signIn.selectAnAccount')}</Typography.Title>
          <div>
            {connectedExtension.accounts.map((account: AccountType) => (
              <AccountOption
                key={account.address}
                account={account}
                onClick={() => {
                  onSelectAccount(account);
                }}
              />
            ))}
          </div>
        </>
      )}
    </Modal>
  );
};

export default SelectAccountModal;
