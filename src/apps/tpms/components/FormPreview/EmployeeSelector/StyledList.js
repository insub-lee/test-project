import styled from 'styled-components';

const StyledList = styled.div`
  .title {
    position: absolute;
    left: 0;
    top: 0;
    height: 48px;
    line-height: 48px;
  }

  @media screen and (max-width: 1260px) {
    .title {
      position: relative;
      display: block;
      line-height: 80px;
    }
  }
`;

export default StyledList;
