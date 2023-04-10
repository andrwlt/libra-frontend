import AccountInfo from './AccountInfo';
import { Button, Dropdown, Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import type { MenuProps } from 'antd';

function getItems(accounts: any[]): MenuProps['items'] {
  return accounts.map((account) => ({
    key: account.address,
    label: <AccountInfo account={account} />,
  }));
}

export default function AccountSelect({ accounts, onChange }: any) {
  const [selected, setSelected] = useState();

  useEffect(() => {
    setSelected(accounts[0]);
  }, [accounts]);

  useEffect(() => {
    onChange && onChange(selected);
  }, [selected]);

  if (accounts.length === 0) {
    return <Skeleton.Input active></Skeleton.Input>;
  }

  const items = getItems(accounts);

  const handleSelect: MenuProps['onClick'] = ({ key }) => {
    const account = accounts.find((account: any) => account.address === key);
    setSelected(account);
  };

  return (
    <Dropdown
      trigger={['click']}
      menu={{
        items,
        onClick: handleSelect,
      }}
    >
      <a onClick={(e) => e.preventDefault()}>
        {!selected ? (
          <Button size="large" block>
            {' '}
            Select an account
          </Button>
        ) : (
          <AccountInfo variant="select" account={selected} />
        )}
      </a>
    </Dropdown>
  );
}
