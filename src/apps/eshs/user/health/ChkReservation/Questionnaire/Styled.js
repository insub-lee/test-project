import styled from 'styled-components';

const Styled = styled.div`
  overflow: hidden;

  .text-area {
    border-bottom: 1px solid #cccccc;
    padding-bottom: 10px;

    p {
      font-size: 14px;
      color: #555555;
    }
  }

  .examination-area {
    margin-top: 20px;

    .examinaion-title {
      font-size: 18px;
      color: #fff;
      background: #45c1bb;
      padding: 6px 8px;
      text-align: left;
    }

    .question-item {
      position: relative;
      margin-top: 15px;

      .add-title {
        font-weight: 600;
        font-size: 15px;
        margin-bottom: 5px;
        color: #333;
      }

      .question-txt {
        position: relative;
        color: #555555;
        font-size: 15px;
        margin-bottom: 5px;
        padding-left: 20px;

        .question-num {
          position: absolute;
          top: 0;
          left: 0;
        }

        &.pad-none {
          padding-left: 0;
        }
      }

      .question-table {
        border-top: 1px solid #333;
        width: 100%;
        table-layout: fixed;
        border-collapse: collapse;
        border-spacing: 0;

        thead tr th {
          background: #f4f4f4;
          border-bottom: 1px solid #e2e4e8;
          border-right: 1px solid #e2e4e8;
          color: #333;
          font-weight: 500;
          text-align: center;
          font-size: 14px;
          padding: 6px 8px;

          &.bg-lightgray {
            background: #fbfbfb;
          }
        }

        tbody tr {
          th {
            background: #f4f4f4;
            border-bottom: 1px solid #e2e4e8;
            border-right: 1px solid #e2e4e8;
            color: #333;
            font-weight: 500;
            text-align: center;
            font-size: 14px;
            padding: 6px 8px;

            &.bg-lightgray {
              background: #fbfbfb;
            }
          }
          td {
            border-bottom: 1px solid #e2e4e8;
            border-right: 1px solid #e2e4e8;
            color: #666;
            font-weight: 500;
            text-align: center;
            font-size: 14px;
            padding: 6px 8px;

            &.td-left {
              text-align: left;
            }

            &.td-pad-none {
              padding: 0;
            }

            &.td-num {
              position: relative;
              padding-left: 25px;

              &.extend {
                padding-left: 30px;
              }

              span.num {
                position: absolute;
                top: 6px;
                left: 8px;
              }
            }

            &.radio-td {
              padding: 0;

              &.td-2rows .ant-radio-group-solid .ant-radio-button-wrapper {
                height: 54px;
                line-height: 54px;
              }
            }
          }
        }
      }

      .question-article {
        padding-left: 20px;

        &.article-absolute {
          position: absolute;
          top: 0;
          right: 0;
        }
      }

      &.pad-extend {
        .question-txt {
          padding-left: 30px;
        }
      }
    }

    .ant-input-inline {
      vertical-align: inherit;
    }
  }

  .point {
    color: #fa0000 !important;
  }

  .point2 {
    color: #ff8100 !important;
  }

  span.span-block {
    display: block;
  }

  span.span-sm {
    font-size: 13px;
  }

  span.span-gray {
    color: #999 !important;
  }

  .ant-radio-group-solid {
    display: block;

    .ant-radio-button-wrapper {
      border-radius: 0;
      height: 33px;
      line-height: 33px;
      border: 0;
      width: 50%;

      &.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
        z-index: 1;
        color: #fff;
        background: #45c1bb;
        border-color: #45c1bb;
        box-shadow: none;

        &:first-child {
          border-color: #45c1bb;
        }

        &:hover {
          color: #fff;
          background: #45c1bb;
          border-color: #45c1bb;
        }
      }

      &.ant-radio-button-wrapper:not(:first-child):before {
        left: 0;
      }

      &:hover {
        color: #45c1bb;
      }
    }

    &.w25 {
      .ant-radio-button-wrapper {
        width: 25%;
      }
    }
  }
`;

export default Styled;
