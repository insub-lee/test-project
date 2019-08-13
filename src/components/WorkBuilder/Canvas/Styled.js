import styled from 'styled-components';

const Styled = styled.div`
  background-color: rgba(0, 0, 0, 0.15);
  box-sizing: border-box;
  width: 70%;
  height: calc(100% - 40px);
  bottom: 0;
  overflow: auto;
  z-index: 1;
  position: absolute;
  left: 15%;
  top: 40px;
  padding: 3rem;
  //min-height: 800px;

  .canvas__frame {
    position: relative;
    width: 100%;
    height: 100%;
    //max-width: 800px;
    min-width: 800px;
    margin: auto;
  }

  .canvas * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
`;

export default Styled;
