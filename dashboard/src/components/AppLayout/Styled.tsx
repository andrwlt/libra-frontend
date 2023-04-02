import styled from 'styled-components';
import { breakpoints } from 'config';

export const Container = styled.div`
  max-width: ${breakpoints.size.xl}px;
  margin: 0 auto;
  padding: 0px 16px;
`;

export const InnerContainer = styled.div`
  width: 83.3333%;
  padding: 0px 16px;

  @media only screen and ${breakpoints.device.lg} {
    width: 100%;
  }
`;

export const MenuInnerContainer = styled(InnerContainer)`
  padding-left: 0;
  display: flex;

  @media only screen and ${breakpoints.device.lg} {
    padding-left: 16px;
  }
`;

const LogoWrapper = styled.div`
  width: 8.33333%;
  padding-left: 16.5px;
  padding-right: 16.5px;
  cursor: pointer;
`;

export const LogoWrapperXlOnly = styled(LogoWrapper)`
  @media only screen and ${breakpoints.device.lg} {
    display: none;
  }
`;

export const LogoWrapperLgOnly = styled(LogoWrapper)`
  display: none;

  @media only screen and ${breakpoints.device.lg} {
    display: flex;
    padding-left: 0;
    padding-right: 32px;
    width: auto;
  }
`;

export const MenuWrapper = styled.div`
  .ant-menu-item:has(.active-link) {
    color: #1677ff;
    background-color: transparent;

    &::after {
      border-width: 2px;
      border-bottom-color: #1677ff;
    }

    &:hover {
      color: #1677ff !important;
    }
  }

  .ant-menu-item:has(.not-active-link) {
    color: rgba(0, 0, 0, 0.88);

    &::after {
      border-width: 2px;
      border-bottom-color: transparent;
    }
  }

  margin-right: auto;
`;
