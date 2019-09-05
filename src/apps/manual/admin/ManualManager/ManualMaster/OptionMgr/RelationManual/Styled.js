import styled from 'styled-components';

const Styled = styled.div`
  .ant-pagination-item {
    min-width: 30px;
  }

  .ant-pagination-item,
  .ant-pagination-total-text {
    height: 30px;
    margin-right: 5px;
    line-height: 30px;
  }

  .ant-pagination-jump-next,
  .ant-pagination-jump-prev,
  .ant-pagination-prev {
    margin-right: 5px;
  }

  .ant-pagination-jump-next,
  .ant-pagination-jump-prev,
  .ant-pagination-next,
  .ant-pagination-prev {
    min-width: 30px;
    height: 30px;
    line-height: 30px;
  }
`;

export default Styled;
