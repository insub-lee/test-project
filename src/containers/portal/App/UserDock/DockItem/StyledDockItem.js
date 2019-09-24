import styled from 'styled-components';
import WithDirection from 'config/withDirection';

const DockItemWrapper = styled.div`
  display: inline-block;
  height: 100%;
  margin: auto;
  position: relative;
  cursor: pointer;
  // border: 1px solid transparent;
  border-radius: 5px;
  box-sizing: border-box;

  // 작은 아이콘의 뱃지
  .ant-badge-not-a-wrapper {
    position: absolute;
  }

  > a {
    display: inline-block;
    width: 100%;
    height: 100%;
  }

  .dockItemDockY,
  .dockItemExec,
  .dockItemLastExec {
    position: relative;
    display: table-cell;
    border-radius: 5px;
    text-align: center;
    word-wrap: break-word;
    vertical-align: middle;
  }

  .dockItemDockY {
    background: transparent;
    box-shadow: none;
    border: 1px solid transparent;
    word-break: break-all;
  }

  .dockItemExec {
    word-break: break-all;

    .dockItemName {
      color: ${props => props.theme.dock.dockExecItem.color};
      white-space: normal !important;
    }
  }

  .dockItemLastExec {
    word-break: break-all;

    .dockItemName {
      width: 60px;
      color: ${props => props.theme.dock.dockExecItem.color};
      white-space: normal !important;
    }
  }

  img {
    display: block;
    cursor: pointer;

    @media only screen and (max-width: 1160px) {
      margin: 3px auto !important;
    }
  }

  .dockItemName {
    display: block;
    width: 60px;
    color: ${props => props.theme.dock.dockitem.color};
    font-family: 'Noto Sans Regular';
    font-size: 11px;
    line-height: 1.1;
    letter-spacing: -0.15px;
    vertical-align: top;
  }

  .dockNotiNum.ant-badge {
    top: 3px;
    right: -15px;
    z-index: 10;
  }
`;

export default WithDirection(DockItemWrapper);
