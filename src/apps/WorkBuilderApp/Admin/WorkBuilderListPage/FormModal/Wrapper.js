import styled from 'styled-components';

const Wrapper = styled.div`
  max-width: 800px;
  margin: auto;

  .ant-descriptions-item-content {
    .ant-row.ant-form-item {
      margin: 0;
    }
  }

  .handler-options {
    .ant-row.ant-form-item {
      margin: 0;
    }
  }

  .form-title {
    display: inline-block;
    -ms-flex: 1;
    flex: 1 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export default Wrapper;
