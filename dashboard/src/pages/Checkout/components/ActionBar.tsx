import { Button, Space, Typography, Modal, theme } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { confirm } = Modal;

interface ActionBarProps {
  onSave?: () => Promise<void>;
  loading?: boolean;
}

export function ActionBar({ onSave, loading }: ActionBarProps) {
  const {
    token: { colorBgBase, colorBorder },
  } = theme.useToken();

  const navigate = useNavigate();

  const handleBack = () => {
    confirm({
      title: 'Leave page with unsaved changes?',
      content: 'Leaving this page will delete all unsaved changes.',
      okText: 'Leave Page',
      cancelText: 'Stay',
      onOk() {
        navigate(-1);
      },
      onCancel() {},
    });
  };

  const handleSave = () => {
    onSave && onSave();
  };

  return (
    <div
      style={{
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 64px',
        background: colorBgBase,
        justifyContent: 'space-between',
        borderBottom: `solid 1px ${colorBorder}`,
      }}
    >
      <Space align="center">
        <Button onClick={handleBack} icon={<ArrowLeftOutlined />}></Button>
        <Typography.Title style={{ margin: 0 }} level={5}>
          Create checkout
        </Typography.Title>
      </Space>
      <Button loading={loading} type="primary" onClick={handleSave}>
        Save
      </Button>
    </div>
  );
}
