import { Input, InputNumber, Typography } from "antd";
import ImageUploader from "components/ImageUploader";
import styled from "styled-components";
import { LineItem } from "../../types";

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
  onChange: Function;
  formData: LineItem;
  asset: string;
  errors: Record<string, string>;
}

export default function ProductFrom({ formData, asset, onChange, errors }: Props) {
  const updateForm = (field: string, value: any) => {
    onChange({
      ...formData,
      [field]: value,
    });
  };

  const handleProductImage = (e: any) => {
    onChange && onChange({ ...formData, images: [...formData.images, e] });
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
            status={ errors.name ? 'error' : undefined }
            value={formData.name}
            onChange={(e) => updateForm('name', e.target.value)}
          ></Input>
          { errors.name && <Typography.Text type="danger">{errors.name}</Typography.Text>}
        </Field>
        <Field>
          <FieldLabel>
            What is price of your product? 
          </FieldLabel>
          <Input.Group compact>
            <InputNumber
              name='price'
              placeholder="Eg. 1 DOT, 10 USDT, ..."
              status={ errors.price ? 'error' : undefined }
              value={formData.price}
              onChange={(value) => updateForm('price', value)}
              style={ { width: 'calc(100% - 60px)'}}
            />
            <Input value={asset} readOnly style={{ width: '60px' }} status={ errors.price ? 'error' : undefined }></Input>
          </Input.Group>
          { errors.price && <Typography.Text type="danger">{errors.price}</Typography.Text>}
        </Field>
      </FormWrapper>
    </Wrapper>
  );
}