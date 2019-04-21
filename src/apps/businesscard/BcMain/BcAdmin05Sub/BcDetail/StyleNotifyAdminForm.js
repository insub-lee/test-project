import styled from 'styled-components';

const StyleNotifyAdminForm = styled.div`
  max-width: 1200px;
  min-width: 900px;
  width: 100%;
  margin: 0 auto;
  border-top: 1px solid #222222;

  .globalLangTbl {
    width: 100%;

    th {
      width: 140px;
      padding: 9px 0 10px 11px;
      border-bottom: 1px solid #dadbdb;
      color: #404040;
      font-size: 13px;
      font-weight: 400;
      text-align: left;
      background-color: #f5f5f5;

      &.required {
        label:before {
          content: '';
          position: relative;
          top: -2px;
          left: -3px;
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #f85023;
        }
      }
    }

    td {
      padding: 9px 163px 10px 20px;
      border-bottom: 1px solid #dadbdb;

      .ant-form-item {
        margin-bottom: 0;

        .ant-form-item-control-wrapper {
          width: 100%;

          .ant-form-item-control {
            &.has-error {
              .ant-input:hover {
                border-color: #cccccc;
              }
            }

            //상세 내용
            .ant-input:read-only {
              padding-left: 0;
              background: #ffffff;
              border-color: #ffffff;
              resize: none;

              &:hover {
                border-color: #ffffff;
              }
            }

            .ant-form-item-children {
              display: block;

              &:after {
                top: 21px;
              }
            }
          }
        }
      }

      //Input 스타일 (나중에 빼기)
      .ant-input {
        width: 100%;
        border: 1px solid #cccccc;
        border-radius: 0;
        font-size: 13px;

        &:focus {
          border-color: #cccccc;
        }

        &:read-only {
          background: #f5f5f5;
          cursor: default;
        }
      }

      textarea.ant-input {
        position: relative;
        top: -3px;
        min-height: 10px !important;
      }
    }
  }
`;

export default StyleNotifyAdminForm;
