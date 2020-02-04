import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'antd';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as routesSelectors from '../../../common/Routes/selectors';

import Styled from './Styled';

const menus = [{ label: 'test1' }, { label: 'test2', children: [{ label: 'children 1' }, { label: 'children 2' }] }, { label: 'test3' }];

const getMenu = data => {
  const { label, children } = data;
  if (children) {
    return <Menu.SubMenu title={label}>{children.map(menu => getMenu(menu))}</Menu.SubMenu>;
  }
  return <Menu.Item>{label}</Menu.Item>;
};

const HeaderMenuCategory = ({ commonMenuTreeData, execMenu, execPage }) => {
  const treeData = commonMenuTreeData.map(data => ({
    ...data,
    icon: 'fa-briefcase',
  }));
  return (
    <Styled>
      <Menu mode="horizontal">
        {console.debug('Tree Menu : ', commonMenuTreeData)}
        {menus.map(data => getMenu(data))}
      </Menu>
    </Styled>
  );
};

HeaderMenuCategory.propTypes = {
  commonMenuTreeData: PropTypes.arrayOf(PropTypes.object),
  execMenu: PropTypes.func,
  execPage: PropTypes.func,
};

HeaderMenuCategory.defaultProps = {
  commonMenuTreeData: [],
  execMenu: () => {},
  execPage: () => {},
};

const mapStateToProps = createStructuredSelector({
  commonMenuTreeData: routesSelectors.makeCommonMenuTree(),
});

const withConnect = connect(mapStateToProps);

export default withConnect(HeaderMenuCategory);
