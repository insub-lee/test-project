import styled from 'styled-components';

const StyledRow = Component => styled(Component)`
  &.ant-row-textarea {
    height: auto;
    line-height: normal;
  }
  &:last-child {
    margin-bottom: 0;
  }
`;

export default StyledRow;
