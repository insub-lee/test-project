import styled from 'styled-components';
import iconHome from '../../images/icon_home.png';

const TitleWrap = styled.div`
  overflow: hidden;
  //padding: 15px;
  padding: 0 18px;
  margin-bottom: 15px;

  & .big {
    font-weight: 800;
    font-size: 27px;
    float: left;
  }

  & .navigation {
    float: right;
    font-size: 13px;
    color: #777;
    margin-top: 15px;

    .icon.icon_home {
      text-indent: -9999px;
      display: inline-block;
      vertical-align: middle;
      width: 13px;
      height: 12px;
      background: url(${iconHome}) no-repeat center;
    }

    & .here {
      font-weight: 500;
      color: #444;
    }
  }
`;

export default TitleWrap;
