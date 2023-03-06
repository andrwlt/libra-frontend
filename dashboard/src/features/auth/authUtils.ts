import { EXTENSIONS } from 'config';
import { ExtensionConfig, Extension} from './types';

export function hasInjectedWeb3() {
  return !!(window as any).injectedWeb3;
}

export const getExtensions = (): Extension[] => {
  const { injectedWeb3 }: any = window;

  if (!injectedWeb3) {
    return [];
  }

  const extensions: Extension[] = [];

  EXTENSIONS.forEach((extension: ExtensionConfig) => {
    if (injectedWeb3[extension.id]) {
      extensions.push({
        ...extension,
        ...injectedWeb3[extension.id],
      });
    }
  });

  return extensions;
};
