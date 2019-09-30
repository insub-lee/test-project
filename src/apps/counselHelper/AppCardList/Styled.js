import styled from 'styled-components';

const Styled = styled.div`
  padding: 10px 0px 20px;
  & .app-card-list {
    width: 100%;
    overflow: hidden;
    & .app-card {
      width: 31%;
      margin: 10px 5px 0 5px;
      flex: 0 0 auto;
      float: left;
      .app-card-body {
      }
    }
  }
`;

export default Styled;
