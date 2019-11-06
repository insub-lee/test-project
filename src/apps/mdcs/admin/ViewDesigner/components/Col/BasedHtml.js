import styled from 'styled-components';

const BasedHtml = styled.div`
  position: relative;
  min-width: 10%;
  width: ${({ width }) => width || '10%'};
  /* min-height: 60px; */
  height: 100%;
  padding-right: 0;
  padding-left: 0;
  flex: 0 0 auto;
  float: left;
  display: block;
  box-sizing: border-box;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ selected }) => (selected ? '#8cc8f9' : '#e3e3e3')};
  background-color: #ffffff;

  //:hover {
  //  background-color: #eaeaea;
  //}
`;

export default BasedHtml;
