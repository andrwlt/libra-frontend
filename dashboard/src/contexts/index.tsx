import React from 'react';
import { AccountsProvider } from './account';
import { ExtensionsProvider } from './extensions';
import { ApiProvider } from './api';

interface Props {
  children: React.ReactNode;
}

export const Providers = ({ children }: Props) => {
  return (
    <ExtensionsProvider>
      <AccountsProvider>
        <ApiProvider>{children}</ApiProvider>
      </AccountsProvider>
    </ExtensionsProvider>
  );
};
