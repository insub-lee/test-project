import styled from 'styled-components';

const StyleGlobalAdminForm = styled.div`
  max-width: 1200px;
  min-width: 900px;
  width: 100%;
  margin: 0 auto;
  border-top: 1px solid #222222;

  .globalLangTbl {
    td {
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

            .ant-form-item-children {
              display: block;
            }
          }
        }
      }

      textarea.ant-input {
        position: relative;
        top: -3px;
        min-height: 32px !important;
        resize: none;
      }
    }
  }
`;

export default StyleGlobalAdminForm;
