import styled from 'styled-components';

const StyledEquipSelector = styled.div`
  & {
    // padding: 10px;

    & > ul {
      display: inline-block;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      border: 0;
      border-radius: 0;
      background: 0;
      width: calc(100% - 70px);
      border-bottom: 1px solid #d9e0e7;
      font-size: 15px;
      color: #555;
      vertical-align: middle;
      height: auto;
      line-height: inherit;
      min-height: 49px;
      & > li.equipment_tag {
        //width: 150px;
        display: inline-block;
        position: relative;
        padding: 0 !important;
        margin: 3px;
        border: 1px solid #ccc;
        font-size: 14px !important;
        font-weight: 500;
        text-align: left;
        min-height: 0 !important;
        height: 30px;
        line-height: 30px;
        -webkit-border-radius: 30px;
        -moz-border-radius: 30px;
        border-radius: 30px;
        width: auto;

        & > span {
          margin: 0 30px 0 15px;
          font-size: 14px;
          vertical-align: top;
        }

        & > button {
          position: absolute;
          top: 8px;
          right: 10px;

          & > .fa-times:before {
            color: #ccc;
          }

          &.close {
            //color: #ffffff;
            &:hover {
            }
          }
        }
      }
    }

    .btn_wrap {
      display: inline-block;
      vertical-align: bottom;
      width: 70px;
      text-align: right;
    }
  }
`;

export default StyledEquipSelector;
