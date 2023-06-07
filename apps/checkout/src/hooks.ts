import { Asset, Extension, extensionAPI } from '@atscale/libra-ui';
import { useEffect, useState } from 'react';
import { getExtensionId } from '@atscale/libra-ui';

export const useExtension = (asset: Asset) => {
  const [extension, setExtension] = useState<Extension | undefined>(undefined);
  const [getExtensionLoading, setGetExtensionLoading] = useState(true);
  const [getExtensionFailed, setGetExtensionFailed] = useState('');
  
  useEffect(() => {
    const extensionId = getExtensionId(asset);
    if (extensionId) {
      setGetExtensionLoading(true);
      extensionAPI
        .getExtension(extensionId)
        .then((extension) => {
          if (extension) {
            setExtension(extension);
          }
        })
        .catch((err) => {
          setGetExtensionFailed(err);
        })
        .finally(() => {
          setGetExtensionLoading(false);
        });
    }
  }, [asset]);

  return {
    extension,
    getExtensionLoading,
    getExtensionFailed,
  };
};
