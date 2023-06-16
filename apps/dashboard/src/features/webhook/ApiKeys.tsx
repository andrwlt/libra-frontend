import { useFirstLoad, useGetSecretKey } from 'features/webhook/webhookHooks';
import { useEffect } from 'react';
import { StyledContainer } from 'components/Common/Styled';
import CardHeader from 'components/Common/CardHeader';
import { useTranslation } from 'react-i18next';
import { LOCALE_WORKSPACE } from 'app/i18n';
import styled from 'styled-components';
import { Table, Typography, Button, theme } from 'antd';
import { formatCreatedDate } from 'utils/format/formatText';
import secretImage from 'assets/secret.png';
import { Loading3QuartersOutlined } from '@ant-design/icons';

const TableWrapper = styled.div`
  border-radius: 6px;
  box-shadow: rgb(235, 238, 241) 0px 0px 0px 1px;
  overflow: hidden;
  background: transparent;
`;

const TableHeader = styled.div`
  padding: 16px 20px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  border-bottom: 1px solid rgb(235, 238, 241);
`;

const RevealKeyContainer = styled.div`
  height: 24px;
  width: 240px;
  background-image: url(${secretImage});
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: 240px 24px;
  margin: -2px 0;
  display: flex;
  justify-content: center;
`;

const { Title, Text } = Typography;

const ApiKeys = () => {
  const { updateFirstLoad } = useFirstLoad();
  const { t: tLayout } = useTranslation(LOCALE_WORKSPACE.LAYOUT);
  const { t } = useTranslation(LOCALE_WORKSPACE.WEBHOOK);
  const { handleGetSecretKey, getSecretKeyLoading, secretKey, hideSecretKey } = useGetSecretKey();

  useEffect(() => {
    updateFirstLoad(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    token: { colorTextTertiary },
  } = theme.useToken();

  const columns: any[] = [
    { title: 'Name', key: 'name', dataIndex: 'name', width: 250 },
    {
      title: 'Token',
      key: 'token',
      dataIndex: 'token',
      render: (token: string) => {
        if (!token) {
          return (
            <RevealKeyContainer>
              {getSecretKeyLoading ? (
                <Loading3QuartersOutlined spin size={20} style={{ color: colorTextTertiary }} />
              ) : (
                <Button onClick={handleGetSecretKey} size="small">
                  {t('revealSecretKey')}
                </Button>
              )}
            </RevealKeyContainer>
          );
        }

        return (
          <div style={{ maxWidth: 400 }}>
            <div>{token}</div>
            <Button style={{ marginTop: 5, marginLeft: -4 }} onClick={hideSecretKey} size="small">
              {t('hideSecretKey')}
            </Button>
          </div>
        );
      },
    },
    {
      title: 'Last used',
      key: 'lastUsed',
      dataIndex: 'lastUsed',
      width: 250,
      render: (date: string) => formatCreatedDate(date),
    },
    {
      title: 'Created',
      key: 'created',
      dataIndex: 'created',
      width: 250,
      render: (date: string) => formatCreatedDate(date),
    },
  ];

  const dataSource = [
    {
      name: t('secretKey'),
      token: secretKey,
      lastUsed: '2023-06-11T11:54:35.361Z',
      created: '2023-06-11T11:54:35.361Z',
    },
  ];

  return (
    <StyledContainer>
      {' '}
      <div style={{ padding: 20 }}>
        <CardHeader title={tLayout('apiKeys')}> </CardHeader>
        <TableWrapper className="transparent-table">
          <TableHeader>
            <Title style={{ margin: 0, display: 'block' }} level={5}>
              {t('standardKey')}
            </Title>
            <Text type="secondary" style={{ margin: 0, display: 'block' }}>
              {t('standardKeyDescription')}
            </Text>
          </TableHeader>
          <div style={{ paddingLeft: 5 }}>
            <Table pagination={false} columns={columns} rowKey="key" dataSource={dataSource}></Table>
          </div>
        </TableWrapper>
      </div>
    </StyledContainer>
  );
};

export default ApiKeys;
