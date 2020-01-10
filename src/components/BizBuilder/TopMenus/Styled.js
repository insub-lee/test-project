import styled from 'styled-components';

const Styled = styled.div`
  display: inline-block;
  text-align: right;
  > button {
    background: transparent;
    color: rgba(255,255,255,0.7);
    border: 0;
    padding: 0 8px;
    &:focus,
    &:hover {
      background: #4d396b;
      color: #fff;
    }
    > i {
      margin-left: 5px;
    }
  }
`;

export default Styled;
