import styled from 'styled-components';

const Styled = styled.div`
  display: flex;
  .addManualTypeTreeWrap {
    width: 312px;
    height: calc(100vh - 160px);
    padding: 10px;
    background: #ece3f1;
    display: inline-block;
  }
  .addManualTypeContentsWrap {
    display: inline-block;
    width: calc(100% - 312px);
    height: calc(100vh - 160px);
    padding: 10px;
  }
`;

export default Styled;
