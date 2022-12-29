import React from "react";
import { AccountsProvider } from "./account";
import { ExtensionsProvider } from "./extensions";

interface Props {
  children: React.ReactNode;
}

export const Providers = ({ children }: Props) => {
  return (
    <ExtensionsProvider>
      <AccountsProvider>
        { children }
      </AccountsProvider>
    </ExtensionsProvider>
  )
}