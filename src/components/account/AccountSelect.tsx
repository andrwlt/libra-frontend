import Account from "components/account/Account";
import { Button, Dropdown, Skeleton } from "antd";
import styled from "styled-components";
import { useEffect, useState } from "react";
import type { MenuProps } from "antd";

function getItems(accounts: any[]): MenuProps['items'] {
  return accounts.map((account) => ({
    key: account.address,
    label: (<Account account={account}/>)
  }));
}

export default function AccountSelect({ accounts, onChange }: any) {
  const [selected, setSelected] = useState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setSelected(accounts[0]);
  }, [accounts]);

  useEffect(() => {
    onChange && onChange(selected);
  }, [selected]);

  if (accounts.length === 0) {
    return <Skeleton.Input active></Skeleton.Input>
  }

  const items = getItems(accounts);

  const handleSelect: MenuProps['onClick'] = ({ key }) => {
    const account = accounts.find((account: any) => account.address === key);
    setSelected(account);
    setOpen(false);
  };

  return (
    <Dropdown open={open} trigger={['click']} onOpenChange={(e) => { setOpen(e) }} menu={{
      items,
      onClick: handleSelect,
    }}>
      {
        !selected ? <Button size="large" block> Select an account</Button>
        : <Account variant="select" onClick={() => setOpen(!open)} account={selected}/>
      }
    </Dropdown>
  )
}