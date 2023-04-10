import React from "react";
import { ExtensionsProvider } from "./extensions";

interface Props {
  children: React.ReactNode;
}

export const LibraProviders = ({ children }: Props) => {
  return (
    <ExtensionsProvider>
        { children }
    </ExtensionsProvider>
  )
}