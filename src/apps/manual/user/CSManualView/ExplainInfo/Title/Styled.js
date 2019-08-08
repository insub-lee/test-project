import styled from 'styled-components';
import iconPen from '../images/icon-pen.png';

const Styled = styled.div`
  position: relative;
  width: 100%;
  background-color: #eef8fe;
  height: 40px;
  line-height: 40px;
  border-top: 1px solid #076dac;
  border-bottom: 1px solid #dcdcdc;
  padding: 0 15px;

  & p {
    position: relative;
    display: inline-block;
    color: #076dac;
    font-size: 15px;
    margin: 0;
    padding: 0;
    font-weight: 600;
    padding-left: 15px;
    &:before {
      content: '';
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #fff;
      border: 3px solid #076dac;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 0px;
    }
  }

  & button {
    position: absolute;
    cursor: pointer;
    margin: 0;
    padding: 0;
    outline: 0;
    display: inline-block;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    background: #ffffff;
    color: #666666;
    border: 1px solid #ccc;
    border-radius: 3px;
    height: 28px;
    line-height: 26px;
    padding: 0 10px;
    font-size: 12px;
  }
  p.manualCompIndexLink {
    cursor: pointer;
  }
`;

export default Styled;
