import styled from 'styled-components';

const primaryColor = 'rgb(88, 68, 117)';

const Styled = styled.div`
  display: inline-block;
  position: absolute;
  box-sizing: border-box;
  text-align: center;

  left: 0;
  width: 15%;
  z-index: 4;

  padding: 0;
  height: 40px;
  border-left: 2px solid rgba(0, 0, 0, 0.2);
  border-bottom: 2px solid rgba(0, 0, 0, 0.2);
  background-color: ${primaryColor};

  .buttons {
    align-items: center;
    display: flex;
    justify-content: space-between;

    & > .panel-btn {
      margin: 0;
      height: 40px;
      padding: 10px;
      width: calc(100% / 3);
      //border-bottom: 2px solid ${primaryColor};
      background-color: transparent;
      cursor: pointer;

      &:hover {
        background-color: rgba(0, 0, 0, 0.2);
      }

      &.panel-btn-active {
        background-color: rgba(0, 0, 0, 0.2);
      }
    }
  }
`;

export default Styled;
