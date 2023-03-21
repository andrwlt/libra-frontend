import styled from 'styled-components';
import { Typography } from 'antd';
import { ReactNode } from 'react';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px 16px 24px;
  background-color: #fff;
  // margin-bottom: 12px;
  // border-radius: 6px;

  .ant-typography {
    line-height: 32px;
  }
`;

const PageHeader = ({ title, children }: { title: string; children?: ReactNode }) => {
  return (
    <Wrapper>
      <Typography.Title style={{ margin: 0, lineHeight: '40px' }} level={4}>
        {title}
      </Typography.Title>

      <div>{children}</div>
    </Wrapper>
  );
};

export default PageHeader;
