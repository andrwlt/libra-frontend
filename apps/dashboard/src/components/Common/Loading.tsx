import { useMemo, memo, useRef } from 'react';
import styled from 'styled-components';
import { Loading3QuartersOutlined } from '@ant-design/icons';
import { Space, Spin, Typography, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import { LOCALE_WORKSPACE } from 'app/i18n/index';

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

interface LoadingProps {
  message?: string;
  loading?: boolean;
  isFullPage?: boolean;
  isContentPage?: boolean;
  bordered?: boolean;
}

const FullPageWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  z-index: 1000;
  align-items: center;
`;

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  display: flex;
  justify-content: center;
  z-index: 1000;
  align-items: center;
`;

const PageContentLoadingWrapper = styled(FullPageWrapper)`
  height: calc(100vh - 56px);
  top: 56px;

  .ant-space {
    margin-bottom: 100px;
  }
`;

const LoaderContainer = styled.div`
  .ant-spin-spinning {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const useFunnyQuote = (loading: boolean) => {
  const prevQuoteRef = useRef<any>();
  const { t } = useTranslation(LOCALE_WORKSPACE.FUNNY_QUOTES);

  const quote = useMemo(() => {
    const getFunnyQuote = () => {
      const quoteIndex = getRandomInt(0, 17);
      return t(`${quoteIndex}`);
    };

    if (!loading) {
      return prevQuoteRef.current;
    }

    prevQuoteRef.current = getFunnyQuote();
    return prevQuoteRef.current;
  }, [loading, t]);

  return quote;
};

const NORMAL_ICON_SIZE = 20;
const FULL_PAGE_ICON_SIZE = 25;

const NORMAL_TEXT_FONT_SIZE = 15;
const FULL_PAGE_TEXT_FONT_SIZE = 17;

const Loading = ({ loading = true, isFullPage, isContentPage, message, bordered }: LoadingProps) => {
  const {
    token: { colorBgBase, colorTextTertiary },
  } = theme.useToken();
  const quote = useFunnyQuote(loading);

  const style = { background: colorBgBase, borderRadius: bordered ? 8 : 0 };

  const loadingContent = (
    <LoaderContainer>
      <Space align="center">
        <Spin
          indicator={
            <Loading3QuartersOutlined
              style={{
                fontSize: isFullPage || isContentPage ? FULL_PAGE_ICON_SIZE : NORMAL_ICON_SIZE,
                color: colorTextTertiary,
              }}
              spin
            />
          }
        />
        <Typography.Paragraph
          style={{
            margin: 0,
            marginLeft: 7,
            fontSize: isFullPage || isContentPage ? FULL_PAGE_TEXT_FONT_SIZE : NORMAL_TEXT_FONT_SIZE,
          }}
          type="secondary"
        >
          {message ?? quote}
        </Typography.Paragraph>
      </Space>
    </LoaderContainer>
  );

  if (!loading) {
    return null;
  }

  if (isContentPage) {
    return <PageContentLoadingWrapper style={style}>{loadingContent}</PageContentLoadingWrapper>;
  }

  return isFullPage ? (
    <FullPageWrapper style={style}>{loadingContent}</FullPageWrapper>
  ) : (
    <LoadingWrapper style={style}>{loadingContent}</LoadingWrapper>
  );
};

export default memo(Loading, (oldProps: LoadingProps, newProps: LoadingProps) => {
  return oldProps.loading === newProps.loading;
});

export const TableLoader = ({ children }: any) => {
  return (
    <tbody className="relative-container ant-table-tbody">
      {children}
      <Loading loading={true} />
    </tbody>
  );
};
