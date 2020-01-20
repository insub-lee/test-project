import styled from 'styled-components';

const StyledRow = Component => styled(Component)`
  height: 40px;
  line-height: 40px;
  margin-bottom: 10px;
  &.ant-row-textarea {
    height: auto;
    line-height: normal;
  }
  &:last-child {
    margin-bottom: 0;
  }
`;

export default StyledRow;
