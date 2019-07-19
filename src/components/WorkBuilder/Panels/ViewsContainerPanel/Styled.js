import styled from 'styled-components';

const primaryColor = 'rgb(88, 68, 117)';

const selectDirection = direction => (direction === 'right' ? 'right: 0' : 'left: 0');

const Styled = styled.div`
  display: inline-block;
  position: absolute;
  box-sizing: border-box;
  text-align: center;
  //padding: 5px;
  z-index: 3;

  //height: 100%;
  padding: 39px 0 0;
  
  ${({ direction = 'left' }) => selectDirection(direction)};
  
  width: 15%;
  overflow: auto;

  border: 1px solid ${primaryColor};
  height: 100%;
  background-color: ${primaryColor};
  
  &.combine {
    #style-manager {
      height: 60%;
    }

    #layers {
      height: 40%;
    }
  }
`;

export default Styled;
