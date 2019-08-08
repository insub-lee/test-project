import styled from 'styled-components';

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
