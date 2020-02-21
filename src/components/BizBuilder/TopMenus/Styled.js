import styled from 'styled-components';

const Styled = styled.div`
  display: inline-block;
  text-align: right;

  > button {
    background: transparent;
    color: rgba(255, 255, 255, 0.7);
    padding: 0 8px;

    &:focus,
    &:hover,
    &:active {
      background: #4d396b;
      color: #fff;
      border: 1px solid rgb(217, 217, 217);
    }

    > span {
      width: 100px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    > i {
      margin-left: 5px;
    }
  }
`;

export default Styled;
