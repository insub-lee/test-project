import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'antd';

import SubMenuItem from './SubMenuItem';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.linkTo = this.linkTo.bind(this);
  }

  linkTo(menu) {
    this.props.historyPush(menu.item.props.link);
  }

  render() {
    return (
      <Menu mode="inline" theme="dark" defaultSelectedKeys={['1']} style={{ height: '100%', borderRight: 0 }} onClick={this.linkTo}>
        {this.props.menus.map(nav => {
          if (nav.subs.length > 0) {
            return <SubMenuItem key={nav.key} title={nav.name} subs={nav.subs} />;
          }
          return (
            <Menu.Item key={nav.key} link={nav.link}>
              <Icon type="user" />
              <span>{nav.name}</span>
            </Menu.Item>
          );
        })}
      </Menu>
    );
  }
}

Sidebar.propTypes = {
  menus: PropTypes.array.isRequired,
  historyPush: PropTypes.func.isRequired,
};

export default Sidebar;
