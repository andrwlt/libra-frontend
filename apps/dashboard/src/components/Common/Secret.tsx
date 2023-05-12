import { useState, useEffect, useRef } from 'react';
import { Button, Modal, Row, Space, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { LOCALE_WORKSPACE } from 'app/i18n';
import { KeyOutlined, CheckOutlined, CopyOutlined } from '@ant-design/icons';
import ClipboardJS from 'clipboard';

const Secret = ({ value }: any) => {
  const { t } = useTranslation(LOCALE_WORKSPACE.LAYOUT);
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyButtonRef = useRef<any>(null);

  useEffect(() => {
    if (!isOpen) {
      setCopied(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (copyButtonRef.current) {
      const clipboard = new ClipboardJS(copyButtonRef.current);
      clipboard.on('success', () => {
        setCopied(true);
      });
    }
  }, [copyButtonRef, isOpen]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', lineHeight: '24px' }}>
      <Button size="small" onClick={() => setIsOpen(true)}>
        {t('reveal')}
      </Button>

      <Modal width={480} open={isOpen} onCancel={() => setIsOpen(false)} footer={false}>
        <div>
          <Space align="center" size={12}>
            <KeyOutlined style={{ fontSize: 19, position: 'relative', top: '1.5px', color: '#1677ff' }} />
            <Typography.Title style={{ margin: 0, fontSize: 16 }} level={5}>
              {t('secret')}
            </Typography.Title>
          </Space>

          <Row style={{ marginTop: 8, paddingLeft: 33 }}>
            <Typography.Paragraph style={{ margin: 0 }}>
              <pre style={{ margin: 0 }}>{value}</pre>
            </Typography.Paragraph>
          </Row>

          <Row justify="end" style={{ marginTop: 12 }}>
            <Space size="middle">
              <Button
                style={{ display: 'flex', alignItems: 'center' }}
                type="primary"
                ref={copyButtonRef}
                data-clipboard-text={value}
              >
                {copied ? t('copied') : t('copy')}
                {copied ? <CheckOutlined /> : <CopyOutlined />}
              </Button>
              <Button type="primary" onClick={() => setIsOpen(false)}>
                {t('close')}
              </Button>
            </Space>
          </Row>
        </div>
      </Modal>
    </div>
  );
};

export default Secret;
