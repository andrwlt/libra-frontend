import styled from "styled-components";
import SharableURL from "../../components/SharableURL";
import { Typography } from "antd";

const { Title } = Typography;

const Wrapper = styled.div`
  max-width: 540px;
  margin-left: auto;
  margin-right: auto;
`;

export default function Congratulation() {
  return (
    <Wrapper>
      <Title level={2} style={{ marginTop: 0 }}>Congratulation! Your checkout page is ready now!</Title>
      <Title level={5}>Please use the url bellow to start selling your product.</Title>
      <SharableURL url="https://golibra.xyz/checkout/john-doe/cjhje"/>
    </Wrapper>
  );
}