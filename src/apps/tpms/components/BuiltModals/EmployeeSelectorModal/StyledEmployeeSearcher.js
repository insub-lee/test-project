import styled from 'styled-components';

const StyledEmployeeSearcher = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  max-width: 824px;
  margin: auto;
  height: auto;

  .child {
    //padding: 5px;
    margin: 5px;
    height: 400px;
    background-color: #ffffff;
    border: 1px solid #dadada;

    &.dept_tree {
      width: 250px;
      overflow-y: auto;

      .tree-view_arrow:after {
        font-family: 'Font Awesome 5 Free';
        font-weight: 900;
        content: '\\F056';
      }

      .tree-view_arrow-collapsed.tree-view_arrow:after {
        -webkit-transform: none;
        -moz-transform: none;
        -ms-transform: none;
        -o-transform: none;
        transform: none !important;
        content: '\\F055';
      }

      p.node_title {
        max-width: 100px;
        display: inline-block;
        text-align: left;
        -ms-text-overflow: ellipsis;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        vertical-align: bottom;
      }

      .no_children_target {
        padding: 5px 10px;

        .no_children_arrow {
          cursor: pointer;
          margin-right: 6px;
          display: inline-block;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        .no_children_arrow:after {
          //font-family: 'Font Awesome 5 Free';
          //font-weight: 900;
          content: '·';
        }
      }

      .tree-view_item {
        padding: 5px 10px;
      }
    }

    &.selector_view {
      display: flex;
      width: 550px;

      & > .selectable_table {
        display: inline-block;
        width: calc(100% - 150px);

        .ReactVirtualized__Table__headerRow {
          border-bottom: 2px solid #dadada;
        }

        .ReactVirtualized__Table__row {
          cursor: pointer;

          &:nth-child(even) {
            background: #f6f8fa;
          }

          &:hover {
            background: #e3e3e3;
          }
        }

        .ReactVirtualized__Table__headerColumn {
          height: 20px;
          font-weight: 400;
        }
      }

      & > .selected_list {
        display: inline-block;
        width: 150px;
        border-left: 1px solid #dadada;

        .column {
          height: 20px;
          text-align: center;
          border-bottom: 2px solid #dadada;
        }

        ul {
          width: 100%;
          border: 0;
          border-radius: 0;
          background: 0;
          font-size: 15px;
          min-height: 45px;
          height: 380px;
          color: #555;
          vertical-align: middle;
          text-align: left;
          align-items: center;
          overflow-y: auto;

          & > li {
            position: relative;
            margin: 10px;
            font-weight: 500;
            text-align: left;
            min-height: 0;
            width: auto;
            line-height: 1.2;
            padding: 10px;
            background-color: #f0f0f0;

            & > span {
              font-size: 13px;
              vertical-align: top;
            }

            & > button {
              position: absolute;
              // top: 5px;
              right: 5px;

              & .fa-times:before {
                color: #666;
              }

              &.close {
                //color: #ffffff;
                &:hover {
                }
              }
            }
          }
        }
      }
    }
  }

  /* @media screen and (max-width: 1500px) {
    // height: 400px;
    // overflow-y: auto;

    .child {
      &.dept_tree {
        width: 100%;
        height: 200px;

        p.node_title {
          max-width: none;
        }
      }

      &.selector_view {
        width: 100%;
      }
    }
  } */
`;

export default StyledEmployeeSearcher;
