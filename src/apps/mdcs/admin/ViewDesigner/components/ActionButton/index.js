import styled from 'styled-components';

const ActionButton = styled.button`
  background: #fff;
  border: none;
  cursor: pointer;

  :hover {
    background: #8cc8f9;
  }

  :disabled {
    color: #9c9c9c;
    background: #fff;
  }
`;

const CircleActionButton = styled.button`
  height: 25px;
  background: #fff;
  border: 1px solid #9c9797;
  border-radius: 50%;
  color: #9c9797;
  cursor: pointer;
  text-align: center;

  :hover {
    background: #9c9797;
    color: #ffffff;
  }
`;

export default ActionButton;
export { CircleActionButton };
