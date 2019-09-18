import styled from 'styled-components';

const StyleManualMenu = styled.div`
  display: block;
  text-align: center;
  & > ul {
    border: 1px solid #ddd;
    width: auto;
    display: inline-block;
    border-right: 0;
    line-height: 38px;
    margin: 20px 0 30px;
    &.ant-menu-horizontal > .ant-menu-item,
    &.ant-menu-horizontal > .ant-menu-submenu {
      border-bottom: 0;
      background: #f2f2f2;
      border-right: 1px solid #ddd;
      top: 0;
      border-color: #ddd !important;
      color: #222;
      padding: 0 25px;
    }
    &.ant-menu-horizontal > .ant-menu-item-active,
    &.ant-menu-horizontal > .ant-menu-item-open,
    &.ant-menu-horizontal > .ant-menu-item-selected,
    &.ant-menu-horizontal > .ant-menu-item:hover,
    &.ant-menu-horizontal > .ant-menu-submenu-active,
    &.ant-menu-horizontal > .ant-menu-submenu-open,
    &.ant-menu-horizontal > .ant-menu-submenu-selected,
    &.ant-menu-horizontal > .ant-menu-submenu:hover {
      color: #fff;
      border-bottom: 0;
      background: #886ab5;
      border-color: transparent !important;
    }
  }
`;

export default StyleManualMenu;
