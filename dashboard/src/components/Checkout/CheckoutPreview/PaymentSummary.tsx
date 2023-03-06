import styled from 'styled-components';
import { useState } from 'react';
import { Button, Typography, Space, theme, Form, Input, Col } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import Identicon from '@polkadot/react-identicon';
import { useTranslation } from 'react-i18next';

const { Paragraph } = Typography;

interface AccountProps {
  account: {
    name: string;
    address: string;
  };
  variant?: 'default' | 'select';
}

function PaymentAccount({ account, variant = 'default' }: AccountProps) {
  const { name, address } = account;
  const {
    token: { colorPrimary, colorBorder },
  } = theme.useToken();

  const [hovered, setHovered] = useState(false);

  const shortedAddress = `${account.address.slice(0, 16)}...${account.address.slice(-12)}`;

  let style: any = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 16px',
    borderRadius: '8px',
  };

  if (variant === 'select') {
    style = {
      ...style,
      cursor: 'pointer',
      border: `solid 1px ${hovered ? colorPrimary : colorBorder}`,
    };
  }

  return (
    <div style={style} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <Space align="center" size="middle">
        <Identicon value={address} size={24} theme="substrate"></Identicon>
        <Space direction="vertical" size={4}>
          <Paragraph strong style={{ marginBottom: 0 }}>
            {name}
          </Paragraph>
          <Paragraph style={{ marginBottom: '0', fontSize: '12px' }}>{shortedAddress}</Paragraph>
        </Space>
      </Space>
      {variant === 'select' && (
        <DownOutlined
          style={{
            color: hovered ? colorPrimary : colorBorder,
          }}
        />
      )}
    </div>
  );
}

const PaymentSummaryWrapper = styled.div`
  width: 100%;
  max-width: 460px;
  padding: 32px;
  padding-left: 64px;
`;

export default function PaymentSummary() {
  const { t } = useTranslation();
  const {
    token: { colorBgContainer, colorBorderSecondary },
  } = theme.useToken();

  const [paying, setPaying] = useState(false);

  const handlePay = async () => {
    setPaying(true);

    setTimeout(() => {
      setPaying(false);
    }, 1000);
  };

  return (
    <Col
      style={{
        background: colorBgContainer,
        borderLeft: `solid 1px ${colorBorderSecondary}`,
      }}
      span={12}
    >
      <PaymentSummaryWrapper>
        <Typography.Title level={4}>{t('checkout.contactInformation')}</Typography.Title>
        <Form layout="vertical">
          <Form.Item label="Email" required>
            <Input placeholder="john.doe@example.com" />
          </Form.Item>
        </Form>

        <div>
          <Typography.Title level={4}>{t('checkout.paymentMethod')} </Typography.Title>
          <PaymentAccount
            variant="select"
            account={{
              name: 'Test Account',
              address: '5ERjkQVj8M7v5UVZQ8qTbZ2qb1o5TgNXq9tXt2BsWF9jBpDu',
            }}
          />
          <Button style={{ marginTop: '24px' }} type="primary" size="large" block loading={paying} onClick={handlePay}>
            {t('checkout.pay')}
          </Button>
        </div>
      </PaymentSummaryWrapper>
    </Col>
  );
}
