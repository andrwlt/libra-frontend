import React from 'react';
import { ExtensionsProvider } from './extensions';
import { AccountsProvider } from './account';
import { AuthProvider } from './auth';
import { ApiProvider } from './api';

interface Props {
  children: React.ReactNode;
}

export const Providers = ({ children }: Props) => {
  return (
    <ExtensionsProvider>
      <AccountsProvider>
        <AuthProvider>
          <ApiProvider>{children}</ApiProvider>
        </AuthProvider>
      </AccountsProvider>
    </ExtensionsProvider>
  );
};
