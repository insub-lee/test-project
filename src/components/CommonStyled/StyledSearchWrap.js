import styled from 'styled-components';

const StyledSearchWrap = styled.div`
  padding: 20px 20px 0 20px;

  .search-inner {
    .input-label {
      padding: 0 10px;
    }
  }

  .search-group-layer {
    margin: 10px 0;

    &:first-child {
      margin-top: 0px;
    }

    > .search-item {
      margin-left: 10px;

      &:first-child {
        margin-left: 0;
      }
    }

    &.mb0 {
      margin-bottom: 0;
    }
  }

  .use-label {
    margin-left: 10px;
  }

  .input-first {
    margin-right: 5px;
  }

  .input-width100 {
    width: 100px;
  }

  .input-width120 {
    width: 120px;
  }

  .input-width140 {
    width: 140px;
  }

  .input-width160 {
    width: 160px;
  }

  .input-width180 {
    width: 180px;
  }

  .input-width200 {
    width: 200px;
  }

  .margin-term {
    margin-left: 10px;
  }

  .ant-input-group {
    display: inline-block;
    vertical-align: top;
    width: 300px;

    &.search-input-group {
      .ant-select {
        width: 30%;
      }

      .ant-input-search {
        width: 70%;
      }
    }

    .ant-input {
      display: inline-block;
      vertical-align: top;
      width: 100%;
    }
  }
`;

export default StyledSearchWrap;
