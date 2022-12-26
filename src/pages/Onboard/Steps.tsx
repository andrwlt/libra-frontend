import { Typography, Button, theme } from "antd";
import { ArrowLeftOutlined } from '@ant-design/icons';
import styled from "styled-components";

const { Title } = Typography;

const Wrapper = styled.div`
  position: relative;
`;

const BackButton = styled.div`
  position: absolute;
  left: -36px;
  top: -4px;
  cursor: pointer;

  svg {
    color: #f0f0f0;
  }

  &::hover {
    svg {
      color: #000;
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
    token: { colorTextBase },
  } = theme.useToken();

  const handleOnBack = () => {

  };

  return <Wrapper>
    {
      current !== 1 && <BackButton>
        <ArrowLeftOutlined size={32}/>
      </BackButton>
    }

    <Title style={{ margin: '8px 0 0 0'}} level={4}>{ items[current -1] }</Title>
    <Title style={{ margin: '8px 0 0 0'}} level={5} type="secondary" >Step {current} of {items.length}</Title>
  </Wrapper>
}