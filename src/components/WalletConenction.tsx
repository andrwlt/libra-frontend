import { Modal, Button, Typography, Avatar } from 'antd';
import { useState } from 'react';
import styled from 'styled-components';

import polkadotJsLogo from '../assets/polkadot-js.svg';
import subwalletLogo from '../assets/subwallet.svg'

const { Title } = Typography;

const wallets = [
  {
    title: 'Polkadot.{Js}',
    name: 'polkadot-js',
    logoUrl: polkadotJsLogo,
    installUrl: 'https://polkadot.js.org/extension/',
  },
  {
    title: 'SubWallet',
    name: 'subwallet',
    logoUrl: subwalletLogo,
    installUrl: 'https://subwallet.app/download.html',
  }
]

const WalletOptionWrapper = styled.div`
  display: flex;
  cursor: pointer;
  &:hover {
    background: #f7f7f7;
  }
`;

interface WalletOptionProps {
  title: string;
  name: string;
  logoUrl: string;
  onSelected?: Function;
}

function WalletOption({ title, name, logoUrl, onSelected }: WalletOptionProps) {
  const handleClick = () => {
    onSelected && onSelected({ title, name });
  };

  return <WalletOptionWrapper onClick={handleClick}>
    <Avatar src={logoUrl}>{title}</Avatar>
    <Title level={4}>{title}</Title>
  </WalletOptionWrapper>
}

export default function WalletConnection() {
  const [isOpened, setIsOpened] = useState(false);

  return <>
    <Button type='primary' size='large' onClick={() => { setIsOpened(true) }}>Connect Wallet</Button>
    <Modal open={isOpened}>
      { wallets.map(({ title, name, logoUrl }) => <WalletOption title={title} name={name} logoUrl={logoUrl} />)}
    </Modal>
  </>
}