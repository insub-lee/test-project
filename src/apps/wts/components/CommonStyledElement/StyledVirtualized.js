import styled, { css } from 'styled-components';

const defaultHover = css`
  &:hover {
    background-color: #f6f8fa;
    color: #555;

    button {
      color: #555555;
    }
  }
`;

const liteHover = css`
  &:hover {
    background-color: #f6f8fa;
    color: #555555;
  }
`;

const StyledVirtualized = styled.div`
  min-height: ${({ minHeight = 300 }) => `${minHeight}px`};
  .ReactVirtualized__Table__headerRow.virtualized_row {
    background: #6e7b95;
  }

  .virtualized_header {
    margin: 0 !important;
    border-right: 1px solid #5a6885;
    color: white;
    background: #6e7b95;
    font-weight: 400;
    //padding: 8px 10px;
    text-align: center;
    word-break: break-all;
    font-size: 15px;
    //height: 100%;
    height: ${({ headerHeight = 39 }) => `${headerHeight}px`};
    line-height: ${({ headerHeight = 39 }) => `${headerHeight}px`};

    &:first-child {
      border-left: 1px solid #5a6885;
    }

    &:last-child {
      border-right: none;
    }
    & > ul {
      width: 100%;
      height: 100%;

      & > li {
        width: 100%;
        border-bottom: 1px solid #5a6885;

        &:last-child {
          border: none;
        }
      }
    }

    ul.row {
      //display: table;
      //width: 100%;
      //height: 100%;
      margin: 0;
      display: flex;
      flex-direction: row;
      align-items: center;

      & > li {
        //display: table-cell;
        border-right: 1px solid #5a6885;
        word-break: break-word;
        overflow: hidden;
        flexgrow: 0;
        flexshrink: 1;

        &:last-child {
          border-right: none;
        }
      }
    }
  }

  .ReactVirtualized__Grid__innerScrollContainer {
    // border-right: 1px solid #eaecee;
    border-right: none;
  }

  .virtualized_grid {
    border-bottom: 1px solid #eaecee;
  }

  .virtualized_row {
    border-bottom: 1px solid #eaecee !important;

    &:last-child {
      border-bottom: none !important;
    }

    &.ReactVirtualized__Table__row {
      // cursor: pointer;
      ${({ disableDefaultHover, disableHover }) => {
        if (disableHover) return '';
        return disableDefaultHover ? liteHover : defaultHover;
      }}

      &.clickable_row {
        cursor: pointer;
      }

      .virtualized_normal_data {
        width: 100%;
        height: 100%;
        background-color: #f6f8fa;
        display: flex;
        justify-content: center;
      }

      &:hover .virtualized_normal_data {
        background-color: #f0f5fb;
        color: #555555;
      }
    }

    &.ReactVirtualized__Table__headerRow {
      border: none !important;
      // border-right: 1px solid #5a6885 !important;
    }

    .ReactVirtualized__Table__rowColumn {
      border-right: 1px solid #eaecee;
      //border-right: 1px solid #5a6885;
      border-right: none;
      height: 100%;
      // line-height: 39px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0;
      text-align: center;
      //display: table;

      & > span,
      > div {
        display: table-cell;
        vertical-align: middle;
      }

      & > ul {
        //display: table;
        width: 100%;
        height: 100%;

        & > li {
          border-bottom: 1px solid #eaecee;

          &:last-child {
            border-bottom: none;
          }
          //display: table-cell;
          //vertical-align: middle;
        }
      }

      ul.row {
        //display: table;
        width: 100%;
        //height: 100%;
        margin: 0;
        display: flex;
        flex-direction: row;
        align-items: center;

        & > li {
          //display: table-cell;
          border: none;
          //border-right: 1px solid #eaecee;
          //border-right: 1px solid #5a6885;
          border-right: none;
          vertical-align: middle;
          overflow: hidden;
          flex-grow: 0;
          flex-shrink: 1;

          &:last-child {
            border-right: none;
          }
        }
      }

      &:first-child {
        //border-left: 1px solid #eaecee;
        border-left: none;
      }

      &:last-child {
        border-right: none;
      }
    }
  }

  .virtualized_noData {
    display: table;
    text-align: center;
    width: 100%;
    height: 100%;
    //border-left: 1px solid #eaecee;
    //border-right: 1px solid #eaecee;
    border-left: none;
    border-right: none;
    & > span {
      display: table-cell;
      vertical-align: middle;
    }
  }

  button.hoverable-button {
    background-color: white;
    color: black;
    &:hover {
      color: white;
      background-color: rgba(31, 181, 173, 0.8);
      span {
        color: white !important;
      }
    }
  }

  button.popable-button {
    width: 100%;
    height: 100%;
    font-weight: 600;

    &:hover {
      //background-color: rgba(31, 181, 173, 0.8);
      background-color: #d9e4f1;
      color: #555555;
    }
  }

  div.spinner-box {
    height: 100%;
    & > .ant-spin-nested-loading {
      height: 100%;
    }
  }
`;

export default StyledVirtualized;
