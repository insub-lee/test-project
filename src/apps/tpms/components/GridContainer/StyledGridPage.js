import styled from 'styled-components';

const StyledGridPage = styled.div`
  &.grid {
    &.df {
      display: flex;
    }

    & > div {
      float: left;
      background: white;
      position: relative;
      margin: 0 0.5% 14px 0.5%;
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      border-radius: 5px;
    }

    & > .grid6 {
      width: calc(100% - 1%);
    }
    & > .grid5 {
      width: 81.16%;
    }
    & > .grid4 {
      width: 65.66%;
    }
    & > .grid3 {
      width: calc((100% / 2) - 1%);
    }
    & > .grid2 {
      width: calc((100% / 3) - 1%);
    }
    & > .grid1 {
      width: calc((100% / 6) - 1%);
    }
    & > .grid1_2 {
      width: calc((100% / 8) - 1%);
    }
    & > .grid1_5 {
      width: calc((100% / 5));
    }
    & > .grid4_5 {
      width: calc((66.66% / 5) - 1%);
    }
  }

  .sub_con {
    padding: 30px;
  }

  @media screen and (max-width: 1260px) {
    &.grid {
      .grid6,
      .grid5,
      .grid4,
      .grid3,
      .grid2 {
        width: 100%;
        // margin: 0;
      }
      .grid1_5 {
        width: 50%;
        margin: 0;
      }
      .grid4_5 {
        width: calc(50% - 1%);
        //margin: 0;
      }
    }
  }

  @media screen and (max-width: 860px) {
  }

  @media screen and (max-width: 736px) {
  }
`;

export default StyledGridPage;
