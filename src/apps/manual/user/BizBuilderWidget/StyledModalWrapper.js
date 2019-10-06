import styled from 'styled-components';

const StyledModalWrapper = Component => styled(Component)`
  .ant-modal-content {
    background-color: #666;
    .ant-modal-close-x {
      width: 30px;
      height: 30px;
      line-height: 30px;
      > i {
        color: #fff;
      }
    }
  }
`;
export default StyledModalWrapper;
