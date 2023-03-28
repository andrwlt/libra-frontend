import { useMemo, memo, useRef } from 'react';
import { Spin, SpinProps } from 'antd';
import { ReactNode } from 'react';
import i18next from 'app/i18n';

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

interface LoadingProps {
  children?: ReactNode;
  size?: SpinProps['size'];
  spinning?: boolean;
  hasDelay?: boolean;
}

const getFunnyQuote = () => {
  const quoteIndex = getRandomInt(0, 17);
  return i18next.t(`funnyQuotes.${quoteIndex}`);
};

const Loading = ({ children, size, spinning = true }: LoadingProps) => {
  const prevQuoteRef = useRef<any>();

  const quote = useMemo(() => {
    if (!spinning) {
      return prevQuoteRef.current;
    }

    prevQuoteRef.current = getFunnyQuote();
    return prevQuoteRef.current;
  }, [spinning]);

  return (
    <Spin size={size} spinning={spinning} tip={quote}>
      {children}
    </Spin>
  );
};

export default memo(Loading, (oldProps: LoadingProps, newProps: LoadingProps) => {
  return oldProps.spinning === newProps.spinning;
});
