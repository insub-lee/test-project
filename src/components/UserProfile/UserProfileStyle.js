import styled from 'styled-components';
import { borderRadius } from '../../config/style-util';

const UserProfileStyle = styled.div`
height: 20px;
display: inline-block;

.userInfo {
    min-width: 270px;
    height: 100%;
    float: left;
    margin-left: 30px;
    line-height: 29px;

    .myPicture {
      display: inline-block;
      width: 30px;
      height: 30px;
      float: left;
      margin-right: 8px;
      ${borderRadius('15px')};
      overflow:hidden;

      > img {
        width: 100%;
        // height: 100%;
      }

      &:after {
        content: "";
        display: table;
        clear: both;
      }
    }

    .myInfo {
      display: inline-block;
      height: 30px;
      float: left;
      color: #404040;
      font-size: 13px;
      line-height: 29px;
      letter-spacing: -0.5px;

      @media only screen and (max-width: 1599px) {
        font-size: 12px;
      }

      .myPosition {
        display: inline-block;
        margin-left: 10px;

        .iconDiv {
          display: inline-block;
          padding: 0 10px;
          color: #cccccc;
        }
      }
    }
  }
`;

export default UserProfileStyle;
