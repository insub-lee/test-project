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
`;

export default StyledTag;