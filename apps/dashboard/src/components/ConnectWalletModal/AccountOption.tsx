import { Fragment } from 'react';
import { Typography, Row } from 'antd';
import styled from 'styled-components';
import Identicon from '@polkadot/react-identicon';
import { Account } from '@atscale/libra-ui';

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
      <Fragment>
        <Identicon value={account.address} style={{ margin: '0 5px' }} size={20} theme="polkadot"></Identicon>
        <Typography.Paragraph style={{ marginBottom: 0 }} strong>
          {account.name}
        </Typography.Paragraph>
      </Fragment>
    </AccountOptionWrapper>
  );
};

export default AccountOption;
