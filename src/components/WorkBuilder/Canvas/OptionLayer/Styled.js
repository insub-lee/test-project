import styled from 'styled-components';

const Styled = styled.div`
  &.layout-option-layer {
    position: absolute;
    width: 100%;
    top: -23px;
    //top: 0;
    outline: transparent;
    line-height: 1.5;

    &.layout-option-table-layer {
      top: 0;
    }

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
      left: -2.5px;
    }

    .layout-option-toolbar {
      position: absolute;
      display: none;
      //padding: 0.3rem;
      top: 0;
      right: -2.5px;
      //background-color: #3b97e3;
      //color: #ffffff;

      .toolbar-item {
        padding: 5px 7px;
        font-size: 0.8rem;
        cursor: pointer;
        width: 26px;
        vertical-align: middle;
        display: inline-block;
        background-color: #3b97e3;
        color: #ffffff;
        
        &:last-child {
          margin: 0;
        }
      }
    }

    > .layout-option-title,
    > .layout-option-toolbar {
      display: inline-block;
    }

    //> .layout-option-title,
    //> .layout-option-toolbar {
    //  display: inline-block;
    //}
  }
`;

export default Styled;
