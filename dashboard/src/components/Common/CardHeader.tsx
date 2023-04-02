import styled from 'styled-components';
import { Typography } from 'antd';
import { ReactNode } from 'react';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0px;
  margin-bottom: 20px;
 
  .ant-typography {
    line-height: 22px;
  }
`;

export const CardHeader = ({ title, children }: { title: string; children?: ReactNode }) => {
  return (
    <Wrapper>
      <Typography.Title style={{ margin: 0, lineHeight: '32px', fontSize: 18 }} level={5}>
        {title}
      </Typography.Title>

      <div>{children}</div>
    </Wrapper>
  );
};

export default CardHeader;
