import styled from 'styled-components';

const primaryColor = 'rgb(88, 68, 117)';

const Styled = styled.div`
  display: inline-block;
  position: absolute;
  box-sizing: border-box;
  text-align: center;
  //padding: 5px;
  z-index: 3;

  //height: 100%;
  padding: 39px 0 0;
  right: 0;
  width: 15%;
  overflow: auto;

  border: 1px solid ${primaryColor};
  height: 100%;
  background-color: ${primaryColor};
`;

export default Styled;
