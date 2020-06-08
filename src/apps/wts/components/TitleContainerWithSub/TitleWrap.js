import styled from 'styled-components';
import iconHome from 'apps/wts/images/icon_home.png';

const TitleWrap = styled.div`
  overflow: hidden;
  padding: 15px;

  & .big {
    font-weight: 500;
    font-size: 24px;
    float: left;
  }

  & .navigation {
    float: right;
    font-size: 13px;
    color: #777;

    .icon.icon_home {
      text-indent: -9999px;
      display: inline-block;
      vertical-align: middle;
      width: 13px;
      height: 12px;
      background: url(${iconHome}) no-repeat center;
    }

    & .here > span {
      font-weight: 500;
      color: #444;
    }
  }
`;

export default TitleWrap;
