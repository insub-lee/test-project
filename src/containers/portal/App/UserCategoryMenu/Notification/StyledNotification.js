import styled from 'styled-components';

const StyledNotification = styled.div`
  width: 340px;
  height: 35px;
  line-height: 35px;
  background: #edeff2;
  color: #404040;
  font-size: 14px;
  cursor: pointer;
  text-align: left;
  margin: 10px 10px 0px 10px;

  @media only screen and (max-width: 320px) {width: 250px !important;}

  .registNotNoti {
    margin-right: 16px;
    background: transparent;
  }

  .unreadTotalNumTxt {
    float: left;
  }

  .ant-badge {
    position: relative;
    float: right;

    .ant-badge-count {
      top: 9px;
      right: 0;
      transform: none;
    }
  }

  img {
    margin: 0 6px 4px 6px;
    vertical-align: middle;
  }
`;

export default StyledNotification;
