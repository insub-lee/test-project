import styled from 'styled-components';

const ContainerWrapper = styled.div`
  min-height: calc(100vh - 93px);
  padding: 13px 20px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  overflow: hidden;
  //margin-bottom: 50px;
  background-color: rgb(239, 243, 248);

  &.only_body {
    //min-height: 0;
    //padding: 0;
    padding: 0 20px;
    margin-top: 10px;
    margin-bottom: 0;
  }
`;

export default ContainerWrapper;
