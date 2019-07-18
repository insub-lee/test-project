import styled from 'styled-components';
import iconSearch from 'images/common/icon-search2.png';
// import iconEdit from 'images/bizstore/mp-menu06.png';
import iconEdit from 'images/common/icon-edit.png';

const TreeWrapper = styled.div`
  .searchWrapper {
    position: relative;
    display: inline-block;
    width: 280px;
    margin-top: 9px;
    margin-bottom: 9px;
    margin-left: 9px;
    height: 32px;
  
    > Input {
      position: relative;
      float: left;
      padding-right: 30px;
      border: 1px solid #c1c1c1;
      border-radius: 4px;
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

  .searchResult {
    color: #ea002c;
    font-size: 12px;
  }

  .searchResultMessage {
    margin-left: 9px;
    margin-top: 3px;
  }

  .myMenuEdit {
    
    // position: absolute;
    top: 0;
    right: 0;
    width: 50px;
    margin-top: 3px;
    margin-left: 280px;

    // position: absolute;
    // top: 0;
    // right: 0;
    // width: 50px;
    // height: 22px;
    // // border: 1px solid #c1c1c1;
    // margin-left: 3px;
    // margin-top: 4px;
    // // margin-right: 9px;
    // // background: url(${iconEdit}) no-repeat 50% 50%;
    // // background-size: 50% 50%;
  }

  .ant-switch-checked {
    background-color: #1f8c02;
  }

}
`;

export default TreeWrapper;
