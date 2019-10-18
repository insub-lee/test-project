import styled from 'styled-components';

const Styled = styled.div`
  padding: 10px;
  margin: 10px;

  & .titleArea {
    text-align: center;
    & span {
      font-weight: 600;
      color: black;
    }
  }

  & .tableArea {
    width: 100%;
    height: 100%;
    color: black;
    font-weight: 600;
    font-size: 20px;
  }
`;

export default Styled;
