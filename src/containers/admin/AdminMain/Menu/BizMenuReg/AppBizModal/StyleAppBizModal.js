import styled from 'styled-components';
import iconSearch from 'images/common/icon-search2.png';

const StyleAppBizModal = styled.div`
  position: relative;
  max-width: 1230px;
  width: 100%;
  margin: 20px auto 0;
  // padding-left: 300px;
  border: 1px solid #d1d2d3;
  background-color: #ffffff;

  @media only screen and (max-width: 1570px) {
    width: calc(100% - 40px);
    margin: 20px 20px 0 20px;
  }

  @media only screen and (max-width: 1024px) {
    width: 100%;
    padding-left: 0;
    margin: 35px 0 0;
    border: none;
  }

  // 탭이 있는 Tree 위치 설정
  .treeWrapper {
    position: absolute;
    top: 0;
    height: 100%;
  }

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

  .storeLayoutContentWrapper {
    display: inline-block;
    width: 100%;
    padding: 0 14px;

    @media only screen and (max-width: 1280px) {
      padding: 0 10px !important;
    }

    @media only screen and (max-width: 1024px) {
      display: flex;
      width: 100%;
      padding: 0;
      padding-top: 0 !important;
    }
  }
`;

export default StyleAppBizModal;
