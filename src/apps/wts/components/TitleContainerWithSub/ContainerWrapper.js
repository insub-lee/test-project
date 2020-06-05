import styled from 'styled-components';

const ContainerWrapper = styled.div`
  min-height: calc(100vh - 93px);
  padding: 13px 20px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  overflow: hidden;
  //margin-bottom: 50px;

  &.only_body {
    padding: 0 20px;
    margin-top: 10px;
    margin-bottom: 0;
  }
`;

export default ContainerWrapper;
