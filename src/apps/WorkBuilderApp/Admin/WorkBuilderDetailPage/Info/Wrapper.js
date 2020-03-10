import styled from 'styled-components';

const Wrapper = styled.div`
  margin: auto;
  .item {
    width: 100%;
    margin-bottom: 15px;
    .item-title {
      font-size: 14px;
      font-weight: 600;
      color: #000;
      margin-bottom: 5px;
    }
    .item-cont {
      > ul {
        overflow: hidden;
        border: 1px solid #e7e7e7;
        padding: 10px;
        li {
          float: left;
          width: 33.33%;
          > div {
            > button.ant-switch {
              margin-right: 5px;
            }
            .ant-select {
              margin-top: 12px;
              width: 90%;
            }
          }
        }
      }
      &.cont-row-wrapper {
        border: 1px solid #e7e7e7;
        > .ant-row {
          position: relative;
          min-height: 45px;
          line-height: 45px;
          clear: both;
          margin: 0 !important;
          border-bottom: 1px solid #e7e7e7;
          &:last-child {
            border-bottom: 0;
          }
          .ant-col {
            padding: 5px 0;
            &.ant-col-bgcolor {
              background-color: #f6f6f6;
              text-align: center;
            }
            .ant-select {
              width: 100%;
            }
          }
          /* .ant-col */
        }
        /* .ant-row */
      }
      /* cont-row-wrapper */
    }
    /* item-cont */
  }

  .button-wrapper {
    text-align: center;
    margin-top: 30px;
  }

  .ant-descriptions-item-content {
    .ant-row.ant-form-item {
      margin: 0;
    }
  }
`;

export default Wrapper;
