import { ExtensionId, WalletList } from '@atscale/libra-ui';
import ExtensionContext from 'context';
import { useContext } from 'react';
import { Typography } from 'antd';
import styled from 'styled-components';

const WalletListWrapper = styled.div`
  .ant-row {
    margin-top: 12px !important;
  }
`;

const SelectWallet = () => {
  const { extensions, onConnectExtension } = useContext(ExtensionContext);

  const onSelectWallet = (extensionId: ExtensionId) => {
    const extension = extensions[extensionId];
    onConnectExtension(extension);
  };
  return (
    <WalletListWrapper>
      <Typography.Title level={4} style={{ marginBottom: 15 }}>
        Select Wallet
      </Typography.Title>
      <WalletList onSelectWallet={onSelectWallet} extensionDictionary={extensions}></WalletList>
    </WalletListWrapper>
  );
};

export default SelectWallet;
