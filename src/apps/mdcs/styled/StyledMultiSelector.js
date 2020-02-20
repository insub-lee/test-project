import styled from 'styled-components';

const StyledMultiSelector = styled.div`
  .wrapper {
    position: relative;
    font-size: 0;
    width: 100%;
  }

  .draftWrapper {
    padding: 0px;
    display: inline-block;
    width: calc(100% - 100px);
  }
  .draftInfoBox {
    background: #fff;
    border: 1px solid #dadada;
    border-radius: 5px;
    text-align: center;
    padding: 3px 10px;
    display: inline-block;
    margin-left: 2px;
    box-sizing: border-box;
    margin-bottom: 2px;
  }
  .draftInfoBox span.infoTxt {
    display: inline-block;
    margin-left: 4px;
    font-size: 12px;
    vertical-align: middle;
  }
  .ant-btn {
    line-height: 1.499;
    position: absolute;
    /* display: inline-block; */
    font-weight: 400;
    white-space: nowrap;
    text-align: center;
    background-image: none;
    -webkit-box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
    cursor: pointer;
    -webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    -webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    height: 30px;
    padding: 0 15px;
    font-size: 12px;
    border-radius: 4px;
    color: rgba(0, 0, 0, 0.65);
    background-color: #fff;
    border: 1px solid #d9d9d9;
  }
  .btnSearch {
    background: transparent;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 10px;
    display: inline-block;
    margin-left: 10px;
    vertical-align: middle;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 20px;
  }
  .btnSearch span.infoTxt {
    font-size: 12px;
    color: #999;
    display: inline-block;
    vertical-align: middle;
  }
`;

export default StyledMultiSelector;
