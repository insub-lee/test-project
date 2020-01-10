import styled from 'styled-components';

const Styled = styled.div`
  display: none;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 4;
  //border: 1px solid #8cc8f9;

  &.active {
    display: block;
  }

  input {
    width: 100%;
    height: 100%;
    border: none;
    padding: 0 30% 0 10px;

    :focus {
      outline: 3px solid #8cc8f9;
    }

    :focus.invalid {
      outline-color: orangered;
    }
  }

  input + span {
    position: absolute;
    right: 0;
    width: 20%;
    top: 50%;
    transform: translateY(-50%);
  }

  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .style-guide-width,
  .style-guide-height,
  .style-guide-center {
    position: absolute;
    width: 100px;
    height: 40px;
    border: 1px solid #8cc8f9;
    background-color: #ffffff;
  }

  .style-guide-center {
    background-color: transparent;
  }

  > .style-guide-width {
    top: -15px;
    left: 50%;
    transform: translateX(-50%);
  }

  > .style-guide-height {
    top: 50%;
    left: -50px;
    transform: translateY(-50%);
  }

  > .style-guide-center {
    display: flex;
    justify-content: center;
    align-items: center;
    top: -50px;
    left: -50px;
    border: none;

    .action-buttons {
      button {
        border: 1px solid #d9d9d9;
      }
    }
  }

  .input-action-buttons {
    position: absolute;
    top: 50%;
    right: 30%;
    transform: translateY(-50%) scale(0.5);
  }
`;

export default Styled;
