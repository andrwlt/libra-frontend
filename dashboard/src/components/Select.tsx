import { Typography, Card, Avatar, Space } from "antd";
import styled from "styled-components";

const { Title, Paragraph } = Typography;


interface SelectOption {
  title: string;
  description?: string;
  image?: string;
  value: string;
}

interface SelectOptionEvents {
  onSelected: Function;
}

function Option({
  title,
  description,
  image,
  value,
  onSelected
}: SelectOption & SelectOptionEvents) {
  const handleClick = () => {
    onSelected && onSelected({ value });
  };

  return <Card hoverable onClick={handleClick} style={{ marginTop: '16px' }}>
    <Space align="center" size='middle'>
      <Avatar src={image}>{ title }</Avatar>
      <Space direction="vertical" size={4}>
        <Paragraph strong style={{ marginBottom: 0 }}>{title}</Paragraph>
        { description && <Paragraph style={{ marginBottom: '0', fontSize: '12px'}}>{description}</Paragraph>}
      </Space>
    </Space>
  </Card>
}

const Wrapper = styled.div`
  width: 100%;
`;

const Options = styled.div`

`;

interface SelectProps {
  label?: string;
  items: SelectOption[];
  onChange?: Function;
}

export default function Select({ label, items, onChange}: SelectProps) {
  const handleItemSelected = ({ value }: any) => {
    onChange && onChange({ value });
  };

  return (
    <Wrapper>
      { label && <Title level={4}>{label}</Title>}

      <Options>
        { items.map((item) => <Option
          key={item.value}
          title={item.title}
          description={item.description}
          value={item.value}
          image={item.image}
          onSelected={handleItemSelected}
        />)}
      </Options>
    </Wrapper>
  );
}