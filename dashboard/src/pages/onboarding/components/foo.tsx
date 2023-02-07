import { Typography, theme } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useState } from 'react';

const { Title } = Typography;

const Wrapper = styled.div`
  position: relative;
`;

const BackButton = styled.div`
  position: absolute;
  left: -24px;
  top: 7px;
  cursor: pointer;

  svg {
    color: rgba(0, 0, 0, 0.45);
  }

  &::hover {
    svg {
      color: rgba(0, 0, 0);
    }
  }
`;

interface StepsProps {
  items: string[];
  current: number;
  onBack?: Function;
}

export default function Steps({ items, current, onBack }: StepsProps) {
  const {
    token: { colorTextHeading, colorTextSecondary },
  } = theme.useToken();

  const [hovered, setHovered] = useState(false);

  const handleOnBack = () => {
    setHovered(false);
    onBack && onBack();
  };

  return (
    <Wrapper>
      {current > 1 && (
        <BackButton
          onClick={handleOnBack}
          onMouseEnter={() => {
            setHovered(true);
          }}
          onMouseLeave={() => {
            setHovered(false);
          }}
        >
          <ArrowLeftOutlined
            style={{
              color: hovered ? colorTextSecondary : colorTextHeading,
              fontSize: '1rem',
              fontWeight: 'bold',
            }}
          />
        </BackButton>
      )}

      {hovered ? (
        <Title style={{ margin: '8px 0 0 0' }} level={4}>
          Back
        </Title>
      ) : (
        <>
          <Title style={{ margin: '8px 0 0 0' }} level={4}>
            {items[current - 1]}
          </Title>
          <Title style={{ margin: '8px 0 0 0' }} level={5} type="secondary">
            Step {current} of {items.length}
          </Title>
        </>
      )}
    </Wrapper>
  );
}
