import styled from 'styled-components';

const StyledCustomSearchWrapper = styled.div`
  padding: 15px;
  margin-bottom: 20px;
  background: #f2f4f7;
  border-radius: 5px;
  border: 2px solid #b5bdcb;

  .search-input-area {
    .text-label {
      display: inline-block;
      vertical-align: middle;
      padding: 0 12px;
      font-size: 12px;
    }

    .ant-select {
      vertical-align: middle;
    }
  }

  .btn-area {
    text-align: center;
    margin-top: 15px;
  }

  &.search-wrapper-right {
    text-align: right;
  }

  &.search-wrapper-modal {
    padding: 0;
  }

  &.search-wrapper-inline {
    padding: 10px;

    .search-input-area,
    .btn-area {
      display: inline-block;
      vertical-align: middle;
    }

    .btn-area {
      margin-top: 0;
      margin-left: 5px;
    }
  }
`;

export default StyledCustomSearchWrapper;
