import { useState, useEffect } from "react";
import { Space, Button, Modal, Typography, theme } from "antd";
import Identicon from "@polkadot/react-identicon";
import { useAccount } from "contexts/account";
import { useExtensions } from "contexts/extensions";
import InstallationGuide from "components/ConnectAccount/InstallGuide";
import { saveConnectedExtension, isExtensionConnected } from "utils/extensions";
import { APP_NAME } from "config";

function AccountOption({ account, onClick }: any) {
  const [hovered, setHovered] = useState(false);

  const { token: { colorPrimary, colorBorder, colorPrimaryBgHover, borderRadius }} = theme.useToken();

  return <div 
    style={{
      borderRadius,
      border: `solid 1px ${hovered ? colorPrimary : colorBorder }`,
      background: `${hovered ? colorPrimaryBgHover : ''}`,
      cursor: 'pointer',
      padding: '16px 8px',
      margin: '8px 0',
    }}
    onMouseEnter={() => { setHovered(true) }}
    onMouseLeave={() => { setHovered(false) }}
    onClick={() => { onClick && onClick(account) }}
  >
    <Space align="center">
      <Identicon value={account.address} size={24} theme='polkadot'></Identicon>
      <Typography.Paragraph style={{ marginBottom: '4px' }} strong>{ account.name }</Typography.Paragraph>
    </Space>
  </div>
}



export default function ConnectAccountButton() {
  const { account, setAccount } = useAccount();
  const { extensions, isReady } = useExtensions();
  const [extension, setExtension] = useState<any>(null);
  const [signer, setSigner] = useState<any>(null);
  const [accounts, setAccounts] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const connectExtension = async () => {
    setLoading(true);
    if (extension) {
      const result = await extension.enable(APP_NAME);
      setSigner(result.signer);
      setAccounts(await result.accounts.get());
      saveConnectedExtension(extension.id);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isReady) {
      const polkadotJs = extensions.find(item => item.id === 'polkadot-js');
      setExtension(polkadotJs);
    }
  }, [isReady]);

  useEffect(() => {
    if (extension && isExtensionConnected(extension.id)) {
      connectExtension();
    }
  }, [extension])

  // useEffect(() => {
  //   if (accounts.length > 0) {
  //     setAccount({
  //       ...accounts[0],
  //       signer,
  //     });
  //   }
  // }, [accounts]);
  
  const handleAccountSelected = (selected: any) => {
    setAccount({
      ...selected,
      signer,
    });
    setOpen(false);
  };

  return <>
    {
      account ? <Button onClick={() => setOpen(true)} style={{ padding: '0px 32px'}}>
        <Space align="center">
          <Identicon style={{ marginTop: '4px' }} value={account.address} size={16} theme='polkadot'></Identicon>
          <Typography.Paragraph style={{ margin: 0 }}>{ account.name }</Typography.Paragraph>
        </Space>
      </Button> :
      <Button type="primary" onClick={() => setOpen(true)}>Connect wallet</Button>
    }
    <Modal
      open ={open}
      onCancel={() => setOpen(false)}
      footer={false}
    >
      {
        extensions.length === 0 && <InstallationGuide/>
      }
      {
        accounts.length > 0 && <>
          <Typography.Title level={3}>Select account</Typography.Title>
          <div>
            {
              accounts.map((account: any) => <AccountOption key={account.address} account={account} onClick={handleAccountSelected}/>)
            }
          </div>
        </>
      }
    </Modal>
  </>
}