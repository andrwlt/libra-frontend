import { Typography, Modal, Result, Button } from 'antd';
import AccountOption from 'components/SelectAccountModal/AccountOption';
import { Account } from '@atscale/libra-ui';
import { useTranslation } from 'react-i18next';
import { useResetConnectedExtension } from 'features/auth/authHooks';
import { SmileOutlined } from '@ant-design/icons';
import { LOCALE_WORKSPACE } from 'app/i18n';

type SelectAccountModalPropsType = {
  open: boolean;
  onClose: () => void;
  onSelectAccount: (account: Account) => void;
  connectedExtension: any;
  connectExtensionLoading: boolean;
};

const SelectAccountModal = (props: SelectAccountModalPropsType) => {
  const { t } = useTranslation(LOCALE_WORKSPACE.AUTH);
  const { open, onClose, onSelectAccount, connectExtensionLoading, connectedExtension } = props;

  useResetConnectedExtension(open);

  const hasNoAccount = connectedExtension && connectedExtension.accounts.length === 0;

  const { t: tWording } = useTranslation(LOCALE_WORKSPACE.WORDING);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={false}
      title={
        !hasNoAccount && (
          <Typography.Title style={{ marginTop: 0, marginBottom: 20 }} level={4}>
            {t('selectAnAccount')}
          </Typography.Title>
        )
      }
    >
      {connectExtensionLoading && t('loading')}
      {connectedExtension && connectedExtension.accounts.length > 0 && (
        <>
          <div>
            {connectedExtension.accounts.map((account: Account) => (
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
          icon={<SmileOutlined />}
          title={tWording('noAccountTitle')}
          extra={
            <Button type="primary" key="console" onClick={onClose}>
              {tWording('noAccountBtnText')}
            </Button>
          }
        />
      )}
    </Modal>
  );
};

export default SelectAccountModal;
