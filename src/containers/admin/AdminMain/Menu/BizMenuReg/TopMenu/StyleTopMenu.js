import styled from 'styled-components';
// import { palette } from 'styled-theme';

const StyleTopMenu = styled.div`
  height: 80px;
  padding: 25px 20px;
  border-bottom: 1px solid #dcdcdd;
  letter-spacing: -0.5px;

  .bizGrpTitle {
    color: #000000;
    font-size: 18px;
    font-weight: 600;
    text-align: center;
  }

  .openDate {
    display: inline-block;
    margin-left: 10px;
    color: #404040;
    font-size: 14px;
  }

  @media (min-width: 576px) {
    .ant-col-sm-24 {
      width: auto;
    }
  }
`;

export default StyleTopMenu;
