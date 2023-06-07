import { Fragment } from 'react';
import styled from 'styled-components';
import { Typography, Skeleton } from 'antd';
import { Brand } from '../../app/types';

const { Title } = Typography;

const LogoBox = styled.div`
  height: 56px;
  position: fixed;
  top: 0;
`;

const LogoWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 24px;

  .brand-skeleton {
    .ant-skeleton-title {
      width: 50px;
      height: 20px !important;
      margin-left: 0px;
    }
  }
`;

const CheckoutBrand = ({ branding, loading }: { branding: Brand; loading: boolean }) => {
  const { name, logo } = branding;

  const HasNoBrand = !logo && !name;

  return (
    <LogoBox>
      <LogoWrapper>
        <Skeleton className="brand-skeleton" paragraph={false} loading={loading} active>
          {HasNoBrand ? (
            'Brand'
          ) : (
            <Fragment>
              {logo && <img style={{ height: 24, marginRight: 10 }} src={logo} alt="brand logo" />}
              {name && (
                <Title style={{ margin: 0 }} level={5}>
                  {name}
                </Title>
              )}
            </Fragment>
          )}
        </Skeleton>
      </LogoWrapper>
    </LogoBox>
  );
};

export default CheckoutBrand;
