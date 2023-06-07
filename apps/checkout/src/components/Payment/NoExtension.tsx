import { Asset, EXTENSIONS } from '@atscale/libra-ui';
import ExtensionOption from 'components/Common/ExtensionOption';
import { Button, Typography } from 'antd';
import { getExtensionId } from '@atscale/libra-ui';
import { useState } from 'react';
import { ReloadOutlined } from '@ant-design/icons';

const { Title } = Typography;

const NoExtension = ({ asset }: { asset: Asset }) => {
  const extensionId = getExtensionId(asset);
  const extension = EXTENSIONS.find(({ id }) => id === extensionId);
  const [installed, setInstalled] = useState(false);
  return (
    <div>
      <Title level={3} style={{ textAlign: 'start' }}>
        Extension Not Found
      </Title>
      <Title
        style={{ textAlign: 'start' }}
        level={5}
      >{`You need to install ${extension?.name} extension to interact with this page`}</Title>
      {extensionId && (
        <div onClick={() => setInstalled(true)} style={{ marginTop: 20 }}>
          {installed ? (
            <Button
              onClick={() => window.location.reload()}
              icon={<ReloadOutlined />}
              style={{ height: 40, width: '100%', fontSize: 16 }}
              type="primary"
            >
              Reload
            </Button>
          ) : (
            <ExtensionOption extensionId={extensionId} hasInstallBtn />
          )}
        </div>
      )}
    </div>
  );
};

export default NoExtension;
