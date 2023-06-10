import { ConnectedExtension, Extension } from '@atscale/libra-ui';
import { createContext } from 'react';
import { ExtensionDictionary } from 'types';

const ExtensionContext = createContext<{
  extensions: ExtensionDictionary;
  onConnectExtension: (extension: Extension) => void;
  connectedExtension?: ConnectedExtension;
}>({
  extensions: {},
  onConnectExtension: (id) => {},
  connectedExtension: undefined,
});

export default ExtensionContext;
