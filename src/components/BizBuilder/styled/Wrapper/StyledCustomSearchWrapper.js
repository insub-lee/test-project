import styled from 'styled-components';

const StyledCustomSearchWrapper = styled.div`
  padding: 20px 20px 0 20px;

  .text-label {
    display: inline-block;
    vertical-align: middle;
    padding: 0 12px;
    font-size: 12px;
  }

  .ant-select {
    vertical-align: middle;
  }

  &.search-wrapper-right {
    text-align: right;
  }

  &.search-wrapper-modal {
    padding: 0;
  }
`;

export default StyledCustomSearchWrapper;
