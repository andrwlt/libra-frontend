import { Input } from 'antd';
import ImageUploader from 'components/ImageUploader';
import styled from 'styled-components';
import { Brand } from '../../types';

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

interface BrandingProps {
  onChange?: Function;
  value: Brand;
}

export default function BrandingStep({ value, onChange }: BrandingProps) {
  const handleChange = (e: any) => {
    if (onChange) {
      onChange({
        ...value,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleLogoChange = (e: any) => {
    onChange && onChange({ ...value, logo: e });
  };

  return (
    <Wrapper>
      <ImageUploaderWrapper>
        <ImageUploader name="Brand logo" onChange={handleLogoChange} />
      </ImageUploaderWrapper>
      <FormWrapper>
        <Field>
          <FieldLabel>What is your brand name?</FieldLabel>
          <Input
            name="name"
            placeholder="Eg. John Brand, Libra, ..."
            value={value.name}
            onChange={handleChange}
          />
        </Field>
      </FormWrapper>
    </Wrapper>
  );
}
