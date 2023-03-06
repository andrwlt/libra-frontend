import { useState, useEffect, useRef } from 'react';
import { Input, Tooltip, Button } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import ClipboardJS from 'clipboard';
import { useTranslation } from 'react-i18next';

export default function CopyableField({ text }: any) {
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
    <Input.Group
      compact
      onMouseLeave={() => {
        setCopied(false);
      }}
    >
      <Input readOnly style={{ width: 'calc(100% - 48px)' }} value={text} defaultValue={text} />
      <Tooltip title={copied ? t<string>('copied') : t<string>('copy')}>
        <Button ref={copyButtonRef} data-clipboard-text={text} icon={<CopyOutlined />} />
      </Tooltip>
    </Input.Group>
  );
}
