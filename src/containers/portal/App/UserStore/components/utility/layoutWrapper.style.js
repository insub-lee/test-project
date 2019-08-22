import styled from 'styled-components';

const LayoutContentWrapper = styled.div`
  padding: 0;
  display: block;
  width: 100%;
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
    //max-width: 900px;
  }

  // DesktopView
  @media only screen and (max-width: 1220px) {
    //max-width: 600px;
  }

  // TabletView
  @media only screen and (max-width: 1024px) {
    //max-width: 100%;
  }

  // MobileView
  @media only screen and (max-width: 768px) {
    //max-width: 100%;
  }
`;

export default LayoutContentWrapper;
