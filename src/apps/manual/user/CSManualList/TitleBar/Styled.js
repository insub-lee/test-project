import styled from 'styled-components';

const Styled = styled.div`
  width: 100%;
  padding: 25px 0 20px;
  p {
    position: relative;
    font-size: 18px;
    color: #000;
    padding-left: 10px;
    margin: 0;

    &:before {
      content: '';
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 0;
      display: block;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: #a08ac3;
    }
  }
`;

export default Styled;
