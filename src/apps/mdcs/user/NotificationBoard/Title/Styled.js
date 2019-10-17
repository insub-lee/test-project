import styled from 'styled-components';

const Styled = styled.div`
  position: relative;
  width: 100%;
  margin: 0 0 15px;

  & > p {
    display: inline-block;
    color: #fff;
    font-size: 25px;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 600;
  }
  & i {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    font-size: 30px;
    color: #fff;
    cursor: pointer;
  }
`;

export default Styled;
