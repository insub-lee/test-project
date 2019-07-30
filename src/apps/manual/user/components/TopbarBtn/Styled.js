import styled from 'styled-components';

const Styled = styled.button`
  cursor: pointer;
  margin: 0;
  padding: 0;
  outline: 0;
  border: 1px solid #868e96;
  background-color: #fff;
  padding: 0px 8px;
  border-radius: 3px;
  height: 24px;
  line-height: 24px;
  & span {
    color: #868e96;
    font-size: 12px;
    display: block;
  }
`;

export default Styled;
