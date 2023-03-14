import styled from 'styled-components';
import { Typography } from 'antd';
import { ReactNode } from 'react';

const Wraper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 32px;
  height: 64px;

  .ant-typography {
    line-height: 32px;
  }
`;

const PageHeader = ({ title, children }: { title: string; children?: ReactNode }) => {
  return (
    <Wraper>
      <Typography.Title style={{ margin: 0 }} level={3}>
        {title}
      </Typography.Title>

      <div>{children}</div>
    </Wraper>
  );
};

export default PageHeader;
