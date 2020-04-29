import styled from 'styled-components';

const StyledChkHospitalItemView = styled.div`
  .ant-col {
    height: 500px;

    &.col-btn-wrapper {
      height: 510px;
      text-align: center;
      display: flex;
      align-items: center;
    }

    &.right-wrapper {
      
      .btn-add-area {
        text-align: left;
        padding: 10px 10px 10px 0;
      }

      .collapse-wrapper {
        height: 450px;
        overflow-y: scroll;

        .ant-collapse .ant-collapse-item {
          &.active {
            border: 1px solid #636a78;
          }
        }

        .ant-collapse-content > .ant-collapse-content-box {
          padding: 0;
        }
      }
    }
  }
`;

export default StyledChkHospitalItemView;