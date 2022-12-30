import styled from "styled-components";
import { Typography, Space } from "antd";
import logo from 'assets/logo.svg';

const { Paragraph, Link } = Typography;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
`;

const FooterLink = styled(Link)`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5) !important;
  &:hover {
    color: rgba(0, 0, 0, 0.8) !important;
  }
`;

export default function FooterLinks() {
  return <Wrapper>
    <Space align="center">
      <Paragraph style={{ margin: 0 }} strong>Powered by </Paragraph>
      <img src={logo} height={16} alt="Libra Logo"/>
    </Space>
    <Space>
      <FooterLink>Privacy</FooterLink>
      <FooterLink>Terms</FooterLink>
    </Space>
  </Wrapper>
}