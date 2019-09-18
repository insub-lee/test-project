import styled from 'styled-components';

const StyleDefaultMgr = styled.div`
  > table {
    width: 100%;
    .defaultMgrButtonWarp {
      text-align: right;
      > button {
        margin: 0px 2px;
      }
    }
    & td,
    & td input,
    & td .ant-select,
    & td .ant-checkbox-wrapper,
    .ant-select-selection--multiple .ant-select-selection__choice {
      font-size: 13px;
      color: #222;
    }
    & td > div {
      vertical-align: middle;
    }
  }
  .btn-add {
    margin-left: 5px;
    height: 32px;
    padding: 0 0.644rem;
  }
`;

export default StyleDefaultMgr;
