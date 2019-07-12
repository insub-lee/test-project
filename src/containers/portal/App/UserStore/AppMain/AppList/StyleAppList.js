import styled from 'styled-components';
import iconSearch from 'images/common/icon-search2.png';

const StyleAppList = styled.div`
  .topPart {
    height: 55px;
    margin: 0 20px;
    padding-top: 14px;
    border-bottom: 1px solid #d1d2d3;

    @media only screen and (max-width: 1280px) {
      margin: 0 15px !important;
    }

    @media only screen and (max-width: 1024px) {
      width: calc(100% - 20px);
      margin: 0 10px;
    }

    .searchInput {
      position: relative;
      float: right;
      width: 200px;
      height: 26px;
      border: 1px solid #d1d2d3;
      border-radius: 3px;

      > .ant-input {
        height: 24px;
        padding: 4px 28px 4px 11px;
        border: none !important;
      }

      > button {
        position: absolute;
        top: 0;
        right: 4px;
        width: 24px;
        height: 24px;
        border: none;
        background: url(${iconSearch}) no-repeat 50% 50%;
      }
    }
  }
`;

export default StyleAppList;
