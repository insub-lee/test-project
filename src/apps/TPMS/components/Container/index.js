import styled, { css } from 'styled-components';

const selectContainerColorBySystemId = () => {
  const systemId = process.env.REACT_APP_SYSTEM_ID;
  switch (systemId) {
    case 'MDCS':
      return '#ebf0f6';
    default:
      return 'white';
  }
};

function selectFlexDirection(position) {
  switch (position) {
    case 'right':
      return 'row-reverse';
    case 'top':
      return 'column';
    case 'left':
    default:
      return 'row';
  }
}

const defaultContainerColor = css`
  background: ${selectContainerColorBySystemId()};
`;

const Container = styled.div`
  display: flex;
  flex: 1 1 0;
  min-height: 100vh;
  //height: 100%;
  position: absolute;
  outline: none;
  //overflow: hidden;
  user-select: text;
  flex-direction: ${({ position }) => selectFlexDirection(position)};
  left: 0;
  right: 0;
  ${defaultContainerColor};

  @media screen and (max-width: 736px) {
    flex-direction: column;
  }
`;

export default Container;
