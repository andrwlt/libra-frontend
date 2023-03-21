import { useState, useEffect, useRef } from 'react';
import { Input, Tooltip, Button, Space } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import ClipboardJS from 'clipboard';
import { useTranslation } from 'react-i18next';

export default function CopyableField({ text, style = { minWidth: 540 }, size = 'middle' }: any) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const copyButtonRef = useRef<any>(null);

  useEffect(() => {
    if (copyButtonRef.current) {
      const clipboard = new ClipboardJS(copyButtonRef.current);

      clipboard.on('success', () => {
        setCopied(true);
      });
    }
  }, [copyButtonRef]);

  return (
    <Space.Compact size={size} style={style}>
      <Input
        size={size}
        readOnly
        style={{ width: 'calc(100% - 48px)', background: 'rgb(247, 250, 252)' }}
        value={text}
        defaultValue={text}
      />
      <Tooltip title={copied ? t<string>('copied') : t<string>('copy')}>
        <Button
          size={size}
          ref={copyButtonRef}
          data-clipboard-text={text}
          icon={<CopyOutlined />}
          onMouseLeave={() => {
            setTimeout(() => {
              setCopied(false);
            }, 300);
          }}
        />
      </Tooltip>
    </Space.Compact>
  );
}
