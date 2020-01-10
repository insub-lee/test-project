import styled from 'styled-components';

const StyleCodeAdminForm = styled.div`
  max-width: 1200px;
  min-width: 900px;
  width: 100%;
  margin: 0 auto;
  border-top: 1px solid #222222;

  .codeGroupLngTbl {
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
    }
  }
`;

export default StyleCodeAdminForm;
