import styled from 'styled-components';
import iconSearch from 'images/common/icon-search2.png';

const StyleSiteList = styled.div`
  width: 920px
  margin: 20px auto;

  .searchBox {
    width: 100%;
    padding: 20px 24px;
    border: 4px solid #efefef;

    .searchWrapper {
      position: relative;
      width: 246px;
      height: 30px;
      float: right;

      > input {
        position: relative;
        padding-right: 30px;
        border: 1px solid #c1c1c1;
        font-size: 13px;
      }

      > .searchBtn {
        position: absolute;
        top: 0;
        right: 0;
        width: 30px;
        height: 30px;
        border: 0;
        background: url(${iconSearch}) no-repeat 50% 50%;
        background-size: 50% 50%;
        cursor: pointer;
      }
    }
  }

  .buttonWrapper {
    width: 100%;
    padding: 20px 0 0;
    text-align: right;
  }
`;

export default StyleSiteList;
