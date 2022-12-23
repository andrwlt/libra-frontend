import { Typography } from 'antd';
import Select from 'components/Select';
import styled from 'styled-components';
import { useExtensions } from 'contexts/extensions';

const { Title } = Typography;

const Wrapper = styled.div`
  width: 100%;
`;

export default () => {
  const { extensions } = useExtensions();

  const items = extensions.map((item) => ({
    title: item.name,
    value: item.id,
    image: item.logo,
  }));

  const handleExtensionSelected = (event: any) => {
    console.log(event);
  };
  
  return <>
    return <Wrapper>
      <Select
        label='Select your wallet'
        onChange={handleExtensionSelected}
        items={items}
      />
    </Wrapper>;
  </>
};
