import styled from 'styled-components';

const StyledTagWrapper = styled.div`
  position: relative;
  .ant-tag-inner {
    width: calc(100% - 100px);
  }
  button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 20px;
  }
`;

export default StyledTagWrapper;