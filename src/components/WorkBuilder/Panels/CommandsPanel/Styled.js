import styled from 'styled-components';

const primaryColor = 'rgb(88, 68, 117)';

const Styled = styled.div`
  display: inline-block;
  position: absolute;
  box-sizing: border-box;
  text-align: center;
  padding: 5px;
  z-index: 3;

  height: 40px;

  width: 85%;
  left: 15%;
  top: 0;
  //box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  border: 1px solid ${primaryColor};
  border-right: none;

  background-color: ${primaryColor};
`;

export default Styled;
