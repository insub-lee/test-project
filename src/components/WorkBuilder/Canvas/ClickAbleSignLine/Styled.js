import styled from 'styled-components';

const Styled = styled.div`
  display: flex;
  -webkit-box-align: start;
  align-items: start;
  justify-content: flex-end;
  position: relative;
  //min-width: 100px;

  .sign-box {
    background-color: #eeeeee;
    //width: 100%;
    .title {
      min-width: 100px;
      border: 1px solid #696969;
      text-align: center;
      height: 20px;
    }

    .sign-user {
      height: 50px;
      border: 1px solid #696969;
      text-align: center;
    }
  }

  .sign-liner {
    display: flex;
  }

  .sign-liner > .layout-option-layer {
    position: absolute;
    width: 100%;
    top: -21px;
    outline: transparent;

    .layout-option-title {
      pointer-events: none;
      background-color: #3b97e3;
      color: #fff;
      padding: 2px 5px;
      position: absolute;
      z-index: 1;
      font-size: 12px;
      outline: none;
      display: none;
      left: -3px;
    }

    .layout-option-toolbar {
      position: absolute;
      display: none;
      //padding: 0.3rem;
      top: 0;
      right: 0;
      background-color: #3b97e3;
      color: #ffffff;

      .toolbar-item {
        padding: 5px 7px;
        font-size: 12px;
        cursor: pointer;
        width: 26px;
        vertical-align: middle;
        display: inline-block;
      }
    }
  }

  .sign-liner.active-layer,
  .sign-liner.active-layer:hover {
    outline: 3px solid #3b97e3 !important;

    .layout-option-title,
    .layout-option-toolbar {
      display: inline-block;
    }
  }

  .sign-liner:hover {
    outline: 3px dashed #3b97e3 !important;

    .layout-option-title,
    .layout-option-toolbar {
      display: inline-block;
    }
  }
`;

export default Styled;
