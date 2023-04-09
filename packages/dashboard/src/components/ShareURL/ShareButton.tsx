import { Button } from 'antd';
import getShareUrl from 'utils/getShareUrl';

type OpenWindowPropsType = {
  width?: number;
  height?: number;
  url: string;
};

const openWindow = ({ width = 600, height = 480, url }: OpenWindowPropsType) => {
  const left = window.innerWidth / 2 - width / 2 + window.screenX;
  const top = window.innerHeight / 2 - height / 2 + window.screenY;
  const params = 'scrollbars=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left;
  const openedWindow = window.open(url, '', params);

  openedWindow && openedWindow.focus();
};

interface ShareButtonProps {
  sharer: 'facebook' | 'twitter' | 'linkedin';
  url: string;
  icon: React.ReactNode;
}

export default function ShareButton({ sharer, url, icon }: ShareButtonProps) {
  const handleClick = () => {
    const shareUrl = getShareUrl(sharer, { url, text: 'Buy my product' });
    openWindow({ url: shareUrl });
  };

  return <Button onClick={handleClick} size="large" shape="circle" data-url={url} icon={icon}></Button>;
}
