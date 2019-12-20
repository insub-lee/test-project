import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'antd';

const { SubMenu } = Menu;

const SubMenuItem = props => (
  <SubMenu
    key={props.key}
    title={
      <span>
        <Icon type="user" />
        <span>{props.title}</span>
      </span>
    }
  >
    {props.subs.map(sub => (
      <Menu.Item key={sub.key}>sub.name</Menu.Item>
    ))}
  </SubMenu>
);

SubMenuItem.propTypes = {
  key: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subs: PropTypes.array.isRequired, //eslint-disable-line
};

export default SubMenuItem;
