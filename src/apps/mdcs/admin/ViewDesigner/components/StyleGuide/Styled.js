import styled from 'styled-components';

const Styled = styled.div`
  display: none;
  position: absolute;
  width: 100%;
  height: 100%;
  //border: 1px solid #8cc8f9;
  top: 0;
  left: 0;

  &.active {
    display: block;
  }

  input {
    width: 100%;
    height: 100%;
    border: none;
    padding: 10px 20% 10px 10px;

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

  .style-guide-width,
  .style-guide-height,
  .style-guide-center {
    position: absolute;
    width: 100px;
    height: 30px;
    border: 1px solid #8cc8f9;
    background-color: #ffffff;
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
    top: 50%;
    left: 51px;
    transform: translateY(-50%);
    border: none;

    .action-buttons {
      button {
        border: 1px solid black;
      }
    }
  }
`;

export default Styled;
