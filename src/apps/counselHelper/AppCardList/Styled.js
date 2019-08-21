import styled from 'styled-components';

const Styled = styled.div`
  padding: 25px 0 0;
  & .app-card-list {
    width: 100%;
    overflow: hidden;
    & .app-card {
      float: left;
      width: 217px;
      margin-top: 20px;
      &:nth-child(odd) {
        margin-right: 20px;
      }
      &:nth-child(1),
      &:nth-child(2) {
        margin-top: 5px;
      }
      .app-card-body {
      }
    }
  }
`;

export default Styled;
