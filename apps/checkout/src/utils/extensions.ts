export const saveConnectedExtension = (extensionId: string): void => {
  localStorage.setItem(extensionId, 'connected');
};

export const isExtensionConnected = (extensionId: string): boolean =>  {
  const isConnected = localStorage.getItem(extensionId) === 'connected';

  return isConnected;
};
