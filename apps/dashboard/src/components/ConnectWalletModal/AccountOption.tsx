import { Fragment } from 'react';
import { Typography, Row } from 'antd';
import styled from 'styled-components';
import Identicon from '@polkadot/react-identicon';
import { Account } from 'features/auth/types';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';

const AccountOptionWrapper = styled(Row)`
  height: 50px;
  border: 1px solid rgb(217, 217, 217);
  border-radius: 8px;
  padding: 10px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: rgb(11, 119, 255);
  }

  &:not(:first-child) {
    margin-top: 10px;
  }
`;
const AccountOption = ({ account, onSelect }: { account: Account; onSelect: Function }) => {
  return (
    <AccountOptionWrapper onClick={() => onSelect(account)} align="middle">
      {account.type === 'polkadot-js' ? (
        <Fragment>
          <Identicon value={account.address} style={{ margin: '0 5px' }} size={20} theme="polkadot"></Identicon>
          <Typography.Paragraph style={{ marginBottom: 0 }} strong>
            {account.name}
          </Typography.Paragraph>
        </Fragment>
      ) : (
        <Fragment>
          <Jazzicon paperStyles={{ margin: '0 5px' }} diameter={20} seed={jsNumberForAddress(account.address)} />
          <Typography.Paragraph style={{ marginBottom: 0 }}>{account.name}</Typography.Paragraph>
        </Fragment>
      )}
    </AccountOptionWrapper>
  );
};

export default AccountOption;
