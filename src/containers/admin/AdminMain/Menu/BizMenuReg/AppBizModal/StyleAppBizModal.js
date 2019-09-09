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
    width: 250px;
  }

  .topPart {
    margin: 0 20px 0 260px;
    padding-top: 15px;
    border-bottom: 0px solid #e5e5e5;
    overflow: hidden;

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

      > .ant-input {
        padding: 4px 28px 4px 11px;
        height: calc(1.47em + 1rem + 2px);
        padding: 0.5rem 0.875rem;
        font-size: 0.8125rem;
        font-weight: 400;
        line-height: 1.47;
        &:focus {
          color: #495057;
          background-color: #fff;
          border-color: #886ab5;
          outline: 0;
        }
      }

      > button {
        position: absolute;
        top: 7px;
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
    padding-left: 260px;

    @media only screen and (max-width: 1280px) {
      padding: 0 10px;
    }

    @media only screen and (max-width: 1024px) {
      display: flex;
      width: 100%;
      padding: 0;
      padding-top: 0;
    }
  }
`;

export default StyleAppBizModal;
