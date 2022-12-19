import styled from "styled-components";
import Preview from "../../components/Preview";
import Checkout from "../../components/Checkout";
import ProductForm from "../../components/LineItemForm";
import { Branding } from "../../types";
import { useState } from "react";
import { LineItem } from "../../types";

const Wrapper = styled.div`
  display: flex;
  padding: 32px;
`;

const ProductFormWrapper = styled.div`
  width: 360px;
`;

const PreviewWrapper = styled.div`
  width: calc(100% - 360px);
  margin-right: 64px;
`;

interface CreateProductProps {
  branding: Branding,
}

export default function CreateProduct({ branding }: CreateProductProps) {
  const [items, setItems] = useState<LineItem[]>([]);

  return (
    <Wrapper>
      <PreviewWrapper>
        <Preview>
          <Checkout branding={branding} items={items}/>
        </Preview>
      </PreviewWrapper>
      <ProductFormWrapper>
        <ProductForm onInput={(value: LineItem) => setItems([value])}/>
      </ProductFormWrapper>
    </Wrapper>
  );
}
