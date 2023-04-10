import styled from 'styled-components';
import { Typography } from 'antd';
import { ReactNode } from 'react';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 28px 0;

  .ant-typography {
    line-height: 32px;
  }
`;

const PageHeader = ({ title, children }: { title: string; children?: ReactNode }) => {
  return (
    <Wrapper>
      <Typography.Title style={{ margin: 0, lineHeight: '32px', fontSize: 22 }} level={4}>
        {title}
      </Typography.Title>

      <div>{children}</div>
    </Wrapper>
  );
};

export default PageHeader;
