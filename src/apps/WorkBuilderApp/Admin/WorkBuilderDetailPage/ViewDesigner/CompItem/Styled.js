import styled from 'styled-components';

const Styled = styled.div`
  display: inline-block;
  width: 100%;
  .compConfigDiv {
    display: inline-block;
    &.compConfigRow {
      width: 100%;
    }
    &.compConfigCol {
      &.wid100 {
        width: calc(100% - 14px);
      }
      &.wid100-28 {
        width: calc(100% - 28px);
      }
      &.wid50 {
        width: calc(50% - 14px);
      }
      &.wid28px {
        width: 28px;
      }
      &.wid14px {
        width: 14px;
      }
      .toolbar-item {
        margin: 1px;
        cursor: pointer;
      }
    }
  }
`;

export default Styled;
