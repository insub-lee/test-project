import styled from 'styled-components';

const Styled = styled.button`
  cursor: pointer;
  margin: 0;
  padding: 0;
  outline: 0;
  border: 1px solid #868e96;
  background-color: #fff;
  border-radius: 3px;
  & span {
    color: #868e96;
    font-size: 11px;
    display: block;
    height: 22px;
    line-height: 20px;
    padding: 0px 6px;
  }
`;

export default Styled;
