import styled from 'styled-components';

const ContainerBody = styled.div`
  //flex: 1 1 0;
  flex: 1 1;
  width: ${({ isTopHeader }) => (isTopHeader ? '100%' : 'calc(100% - 210px)')};
  height: ${({ hasExpandedView }) => (hasExpandedView ? '100vh' : 'auto')};
  overflow: ${({ hasExpandedView }) => (hasExpandedView ? 'hidden' : 'visible')};
  min-height: ${({ hasExpandedView }) => (hasExpandedView ? '0' : '960px')};
  position: relative;
  outline: none;
  //background-color: ${({ isTopHeader }) => (isTopHeader ? 'white' : 'rgb(239, 243, 248)')};
  background-color: rgb(239, 243, 248);

  @media screen and (max-width: 736px) {
    width: 100%;
  }
`;

export default ContainerBody;
