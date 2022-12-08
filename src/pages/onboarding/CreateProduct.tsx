import styled from "styled-components";

import Preview from "../../components/Preview";
import Checkout from "../../components/Checkout";

const Wrapper = styled.div`
  display: flex;
  padding: 32px;
`;

export default function CreateProduct() {
  return (
    <Wrapper>
      <Preview content={<Checkout/>}/>
    </Wrapper>
  );
}
