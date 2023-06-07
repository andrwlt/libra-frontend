import { useState } from 'react';
import { Typography, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

const ContactInformation = ({
  productName,
  value,
  onChange,
  error,
  resetError,
}: {
  productName: string;
  value: string;
  onChange: Function;
  error?: string;
  resetError?: Function;
}) => {
  const { t } = useTranslation();
  const [emailHovered, setEmailHovered] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);

  const hasEmailHelpText = !error && (emailFocused || emailHovered);

  const getHelpText = () => {
    if (error) {
      return error;
    }

    if (hasEmailHelpText) {
      return t('emailHelpText', { productName: productName || 'The Product' });
    }

    return '';
  };

  return (
    <div>
      <Typography.Title level={4} style={{ marginBottom: 12 }}>
        {t('contactInformation')}
      </Typography.Title>

      <Form
        layout="vertical"
        requiredMark={false}
        onMouseEnter={() => {
          setEmailHovered(true);
        }}
        onMouseLeave={() => {
          setEmailHovered(false);
        }}
        onFocus={() => {
          setEmailFocused(true);
          resetError?.();
        }}
        onBlur={() => setEmailFocused(false)}
      >
        <Form.Item
          label="Email"
          validateStatus={error ? 'error' : undefined}
          help={getHelpText()}
          style={{ height: 88 }}
        >
          <Input
            value={value}
            onInput={(e: any) => {
              onChange(e.target.value);
            }}
            placeholder="john.doe@example.com"
          ></Input>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ContactInformation;
