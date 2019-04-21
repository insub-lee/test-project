import styled from 'styled-components';

const LayoutContentWrapper = styled.div`
  padding: 0;
  display: block;
  width: 1200px;
  margin: 0 auto;

  .ant-row {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }

  /* 
    DesktopView에는 Sidebar에 Tree(300px)이 있어서 
    아래 값에 +300 해주어야 함.
  */
  @media only screen and (max-width: 1520px) {
    width: 900px;
  }

  // DesktopView
  @media only screen and (max-width: 1220px) {
    width: 600px;
  }

  // TabletView
  @media only screen and (max-width: 1024px) {
    width: 100vw;
  }

  // MobileView
  @media only screen and (max-width: 768px) {
    width: 100vw;
  }
`;

export default LayoutContentWrapper;
