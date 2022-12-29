import { Input, InputNumber, Select } from "antd";
import ImageUploader from "components/ImageUploader";
import styled from "styled-components";
import { Asset, LineItem } from "../../types";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ImageUploaderWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const FormWrapper = styled.div`
  width: 360px;
  padding: 16px 48px;
`;

const Field = styled.div`
  margin-bottom: 1rem;
`;

const FieldLabel = styled.div`
  margin-bottom: 8px;
  font-weight: 600;
`;

interface Props {
  onChange?: Function;
  value: LineItem;
  assets: Asset[];
}

export default function ProductFrom({ value, onChange, assets }: Props) {

  const handleChange = (e: any) => {
    if (onChange) {
      onChange({
        ...value,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleProductImage = (e: any) => {
    onChange && onChange({ ...value, image: e });
  };

  const handleCurrencyChange = (e: any) => {
    console.log('Currency changes: ', e);
  };

  return (
    <Wrapper>
      <ImageUploaderWrapper>
        <ImageUploader size={240} name="Product image" onChange={handleProductImage}/>
      </ImageUploaderWrapper>
      <FormWrapper>
        <Field>
          <FieldLabel>
            What product do you want to sell?
          </FieldLabel>
          <Input
            placeholder="Eg. Meditation course, a book, ..."
            name="name"
            value={value.name}
            onChange={handleChange}
          ></Input>
        </Field>
        <Field>
          <FieldLabel>
            What is price of your product? 
          </FieldLabel>
          <Input.Group compact>
            <InputNumber
              name='price'
              placeholder="Eg. 1 DOT, 10 USDT, ..."
              value={value.price}
              onChange={handleChange}
              style={ { width: 'calc(100% - 60px)'}}
            />
            <Select value='dot' onChange={handleCurrencyChange} style={ { width: '60px'}}>
              { assets.map((asset) => <Select.Option key={asset} value={asset}>{asset}</Select.Option>)}
            </Select>
          </Input.Group>
        </Field>
      </FormWrapper>
    </Wrapper>
  );
}