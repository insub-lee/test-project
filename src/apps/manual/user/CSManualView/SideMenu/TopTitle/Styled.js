import styled from 'styled-components';

import iconList from '../../../images/icon-list.png';

const Styled = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 220px;
  height: 50px;
  background-color: #076dac;
  text-align: center;
  & i {
    background: url(${iconList}) no-repeat center;
    display: inline-block;
    width: 15px;
    height: 25px;
    vertical-align: middle;
    margin-right: 8px;
    background-size: 15px;
  }
  & p {
    display: inline-block;
    vertical-align: middle;
    color: #fff;
    font-size: 16px;
    margin: 0;
    padding: 0;
  }
`;

export default Styled;
