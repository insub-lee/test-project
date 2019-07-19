import styled from 'styled-components';

const Styled = styled.div`
  display: inline-block;
  position: absolute;
  box-sizing: border-box;
  text-align: center;
  padding: 5px;
  z-index: 3;

  right: 0;
  top: 0;

  .pn-buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .pn-btn {
    box-sizing: border-box;
    min-height: 30px;
    min-width: 30px;
    line-height: 21px;
    background-color: transparent;
    border: none;
    font-size: 18px;
    margin-right: 5px;
    border-radius: 2px;
    padding: 4px;
    position: relative;
    cursor: pointer;

    &:hover {
      background-color: rgba(0, 0, 0, 0.15);
      box-shadow: none;
    }
  }
`;

export default Styled;
