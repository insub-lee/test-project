import styled from 'styled-components';
import iconSearch from 'images/common/icon-search2.png';

const StyleBizMenuList = styled.div`
  position: relative;
  margin: 0 auto;
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

  .bizCardListDiv {
    height: calc(100vh - 121px);
  }

  .tree-scrollbar {
    width: 100%;
    height: 100%;
    overflow-x: hidden !important;
  }
`;

export default StyleBizMenuList;
