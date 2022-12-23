import styled from 'styled-components';
import SelectAccounts from './SelectAccounts';
import InstallGuide from './InstallGuide';
import { useExtensions } from 'contexts/extensions';

const Wrapper = styled.div`
  width: 100%;
`;

export default () => {
  const { extensions } = useExtensions();

  if (extensions && extensions.length === 0) {
    return (
      <Wrapper>
        <InstallGuide/>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
     <SelectAccounts extensionId='polkadot-js'/>
    </Wrapper>
  );
};