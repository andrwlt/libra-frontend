import { Typography, Row } from 'antd';
import styled from 'styled-components';
import { ExtensionConfig } from '@atscale/libra-ui';
import { getExtensionLogo } from 'utils';

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
  onSelect: Function;
  extension: ExtensionConfig;
}) => {
  const { name } = extension;
  return (
    <ExtensionOptionWrapper
      align="middle"
      onClick={
        installed
          ? () => onSelect()
          : () => {
              window.open(extension.installURL);
            }
      }
    >
      <img
        src={getExtensionLogo(extension.id)}
        alt="icon"
        style={{ width: 20, objectFit: 'contain', marginRight: 7, marginLeft: 5 }}
      />
      <Text>{name}</Text>
    </ExtensionOptionWrapper>
  );
};

export default ExtensionOption;
