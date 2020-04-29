import styled from 'styled-components';

const StyledTag = Component => styled(Component)`
  margin: 4px 8px 4px 0;
  padding: 2px 4px 2px 8px;
  background-color: #fff;
  font-size: 13px;
  
  i {
    font-size: 12px;
    margin-left: 10px;
    color: #666;
  }

  &.ant-tag-sm {
    margin: 0 8px 0 0;
    padding: 0px 8px;
    font-size: 12px;
  }

  &.ant-tag-click {
    cursor: pointer;
  }

  &:hover {
    opacity: 1;
    background: #636a78;
    color: #fff;
    border: 1px solid #636a78;
  }
`;

export default StyledTag;