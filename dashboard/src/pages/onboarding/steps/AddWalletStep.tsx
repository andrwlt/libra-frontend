import { useState } from 'react';
import { Input, Divider, Form, Modal, Typography, Button } from 'antd';
import AccountOption from 'components/account/AccountOption';

import { useExtensions } from 'contexts/extensions';

interface AddWalletStepProps {
  value: string;
  onChange: (value: string) => void;
}

export default function AddWalletStep({ value, onChange }: AddWalletStepProps) {
  const { isReady, connectExtension, connectedExtension } = useExtensions();
  const [open, setOpen] = useState(false);
  const [connectingExtension, setConnectingExtension] = useState(false);
  const [hasAccountSelected, setHasAccountSelected] = useState(false);

  const handleConnectExtension = async () => {
    setConnectingExtension(true);

    await connectExtension('polkadot-js');

    setConnectingExtension(false);
    setOpen(true);
  };

  const handleAccountSelected = (account: any) => {
    onChange && onChange(account.address);
    setOpen(false);
    setHasAccountSelected(true);
  };

  const handleChangeAccount = () => {
    setOpen(true);
  };

  return (
    <>
      <Form style={{ width: '440px' }} layout="vertical">
        <Form.Item label="What is your wallet address?">
          <Input
            readOnly={hasAccountSelected}
            disabled={hasAccountSelected}
            value={value}
            onChange={(e) => {
              onChange && onChange(e.target.value);
            }}
          ></Input>
          {hasAccountSelected && (
            <Button style={{ padding: 0 }} type="link" onClick={handleChangeAccount}>
              Change to another account
            </Button>
          )}
        </Form.Item>
        {!hasAccountSelected && (
          <>
            <Divider>or</Divider>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                disabled={!isReady || connectingExtension}
                loading={!isReady || connectingExtension}
                onClick={handleConnectExtension}
              >
                Connect wallet
              </Button>
            </div>
          </>
        )}
      </Form>
      <Modal open={open} onCancel={() => setOpen(false)} footer={false}>
        {connectedExtension && connectedExtension.accounts.length > 0 && (
          <>
            <Typography.Title level={3}>Select an account</Typography.Title>
            <div>
              {connectedExtension.accounts.map((account: any) => (
                <AccountOption key={account.address} account={account} onClick={handleAccountSelected} />
              ))}
            </div>
          </>
        )}
      </Modal>
    </>
  );
}
