import styled from 'styled-components';

const Styled = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 20px;
  height: auto;
  line-height: normal;
  padding: 0;
  margin: 0;
  & button {
    display: inline-block;
    margin-right: 5px;
    &:last-child {
      margin-right: 0;
    }
  }
`;

export default Styled;
