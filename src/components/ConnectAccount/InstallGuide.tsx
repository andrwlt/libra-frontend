import styled from "styled-components";
import { Typography, Button } from "antd";

const { Title, Paragraph } = Typography;

const Wrapper = styled.div`
  width: 100%;
  min-height: 240px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 8px 16px;
`;

export default () => {
  return (
    <Wrapper>
      <div>
        <Title level={4}>Install extension wallet</Title>
        <Paragraph>
          There is no extension wallet detected on the browser. Please install PolkadotJs extension and deposit your crypto currency to process the payment.
        </Paragraph>
      </div>
      <Footer>
        <a target='_blank' href='https://polkadot.js.org/extension/' rel="noreferrer">
          <Button size="large" type="primary">Install</Button>
        </a>
      </Footer>
    </Wrapper>
  );
};