import { Typography, Row, Tag } from 'antd';
import styled from 'styled-components';
import { EXTENSIONS, ExtensionId } from '@atscale/libra-ui';
import polkadotJsLogo from 'assets/polkadot-js.svg';
import metamaskLogo from 'assets/metamask.svg';

export const getExtensionLogo = (id: 'polkadot-js' | 'METAMASK') => {
  return id === 'polkadot-js' ? polkadotJsLogo : metamaskLogo;
};

const ExtensionOptionWrapper = styled(Row)`
  height: 62px;
  border: 1px solid rgb(217, 217, 217);
  border-radius: 8px;
  padding: 10px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: rgb(11, 119, 255);
  }

  &:not(:first-child) {
    margin-top: 10px;
  }
`;

const { Text } = Typography;

const ExtensionOption = ({
  extensionId,
  connected,
  hasInstallBtn,
}: {
  extensionId: ExtensionId;
  connected?: boolean;
  hasInstallBtn?: boolean;
}) => {
  const extension = EXTENSIONS.find(({ id }) => id === extensionId);

  if (!extension) {
    return null;
  }

  const { name } = extension;
  return (
    <ExtensionOptionWrapper
      align="middle"
      onClick={() => {
        if (!connected) {
          window.open(extension.installURL);
        }
      }}
    >
      <img
        src={getExtensionLogo(extension.id)}
        alt="icon"
        style={{ width: 20, objectFit: 'contain', marginRight: 7, marginLeft: 5 }}
      />
      <Text>{name}</Text>

      {hasInstallBtn && (
        <Tag color="#1677ff" style={{ marginLeft: 'auto' }}>
          Install
        </Tag>
      )}
    </ExtensionOptionWrapper>
  );
};

export default ExtensionOption;
