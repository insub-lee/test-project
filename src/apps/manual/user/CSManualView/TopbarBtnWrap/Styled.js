import styled from 'styled-components';

const Styled = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 20px;
  height: auto;
  line-height: normal;
  padding: 0;
  margin: 0;
  & button {
    display: inline-block;
    margin-right: 5px;
    /* &:last-child {
      margin-right: 0;
    } */
  }
  .manualViewTopbarSelect.ant-select {
    height: 23px;
    border: 1px solid #868e96;
    background-color: #fff;
    border-radius: 3px;
    color: #868e96;
    display: inline-block;
    line-height: 20px;
    font-size: 11px;
    vertical-align: top;
    .ant-select-selection {
      border: none;
      height: 20px;
      .ant-select-selection__rendered {
        line-height: 21px;
      }
    }
  }
`;

export default Styled;
