import { Extension } from '@atscale/libra-ui';
import { createContext } from 'react';

const ExtensionContext = createContext<{
  extension?: Extension;
  getExtensionFailed: any;
}>({ extension: undefined, getExtensionFailed: undefined });

export default ExtensionContext;
