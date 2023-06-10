import { Typography, Row } from 'antd';
import styled from 'styled-components';
import { ExtensionConfig, ExtensionDictionary, ExtensionId } from 'app/types';
import { EXTENSIONS } from 'config';

const ExtensionOptionWrapper = styled(Row)`
  height: 50px;
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
  extension,
  onSelect,
  installed,
}: {
  installed: boolean;
  onSelect?: (id: ExtensionId) => void;
  extension: ExtensionConfig;
}) => {
  const { name } = extension;
  return (
    <ExtensionOptionWrapper
      align="middle"
      onClick={
        installed
          ? () => onSelect?.(extension.id)
          : () => {
              window.open(extension.installURL);
            }
      }
    >
      <img src={extension.logo} alt="icon" style={{ width: 20, objectFit: 'contain', marginRight: 10, marginLeft: 5 }} />
      <Text>{name}</Text>
    </ExtensionOptionWrapper>
  );
};

interface WalletListProps {
  onSelectWallet: (id: ExtensionId) => void;
  extensionDictionary: ExtensionDictionary;
}

const WalletList = ({ extensionDictionary, onSelectWallet }: WalletListProps) => {
  return (
    <div>
      {EXTENSIONS.map((extension) => (
        <ExtensionOption
          key={extension.id}
          extension={extension}
          onSelect={onSelectWallet}
          installed={!!extensionDictionary[extension.id]}
        />
      ))}
    </div>
  );
};

export default WalletList;
