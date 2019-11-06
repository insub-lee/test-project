import styled from 'styled-components';

const BasedHtml = styled.div`
  position: relative;
  height: auto;
  margin-left: 0;
  margin-right: 0;
  zoom: 1;
  display: flex;
  flex-flow: row wrap;
  box-sizing: border-box;

  :before,
  :after {
    display: table;
    content: '';
    box-sizing: border-box;
  }

  :after {
    clear: both;
  }
`;

export default BasedHtml;
