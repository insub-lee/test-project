import React from 'react';
import PropTypes from 'prop-types';
import { Button, Dropdown, Menu, Icon } from 'antd';

const DropDownMenu = ({ menus, title, onClick }) => (
  <Dropdown
    overlay={
      <Menu>
        {menus.map(menu => (
          <Menu.Item key={menu.key} onClick={() => onClick(menu.key)}>
            {menu.title}
          </Menu.Item>
        ))}
        <Menu.Item key={menus.key} onClick={() => onClick(0)}>
          추가
        </Menu.Item>
      </Menu>
    }
    trigger={['click']}
    placement="bottomLeft"
  >
    <Button>
      {title} <Icon type="down" />
    </Button>
  </Dropdown>
);
DropDownMenu.propTypes = {
  menus: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
  onClick: PropTypes.func,
};

DropDownMenu.defaultProps = {
  menus: [],
  title: '',
  onClick: () => {},
};

export default DropDownMenu;
