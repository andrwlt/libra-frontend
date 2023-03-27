import { useMemo, useState, useEffect, memo, useRef } from 'react';
import { Spin, SpinProps } from 'antd';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Loading = ({
  children,
  size,
  spinning,
  hasDelay = false,
}: {
  children?: ReactNode;
  size?: SpinProps['size'];
  spinning?: boolean;
  hasDelay?: boolean;
}) => {
  const { t } = useTranslation();

  const [delay, setDelay] = useState<any>(200);
  const prevQuoteRef = useRef<any>(null);

  const quote = useMemo(() => {
    if (!spinning) {
      return prevQuoteRef.current;
    }

    const quoteIndex = getRandomInt(0, 17);
    const message = t(`funnyQuotes.${quoteIndex}`);
    prevQuoteRef.current = message;

    return message;
  }, [t, spinning]);

  useEffect(() => {
    if (hasDelay) {
      setDelay(undefined);
    }
  }, [hasDelay]);

  return (
    <Spin size={size} spinning={spinning} tip={quote} delay={delay}>
      {children}
    </Spin>
  );
};

export default memo(Loading);
