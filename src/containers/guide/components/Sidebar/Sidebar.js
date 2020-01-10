import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import PropTypes from 'prop-types';
import SidebarWrapper from './sidebar.style';

// import appActions from '../../App/actions';
import Logo from '../../config/logo';
import { rtl } from '../../config/withDirection';

import ArticleList from './ArticleList.js';

const { SubMenu } = Menu;
const { Sider } = Layout;

const stripTrailingSlash = str => {
  if (str.substr(-1) === '/') {
    return str.substr(0, str.length - 1);
  }
  return str;
};
class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  getAncestorKeys = key => {
    const map = {
      sub3: ['sub2'],
    };
    return map[key] || [];
  };

  handleClick(e) {
    this.props.articleSelected(e.key);
  }

  static renderView({ style, ...props }) {
    const viewStyle = {
      marginRight: rtl === 'rtl' ? '0' : '-17px',
      paddingRight: rtl === 'rtl' ? '0' : '9px',
      marginLeft: rtl === 'rtl' ? '-17px' : '0',
      paddingLeft: rtl === 'rtl' ? '9px' : '0',
    };
    return <div className="box" style={{ ...style, ...viewStyle }} {...props} />;
  }

  render() {
    const url = stripTrailingSlash(this.props.url);
    const scrollheight = this.props.height;
    return (
      <SidebarWrapper>
        <Sider
          trigger={null}
          collapsible
          width="240"
          className="devguideSidebar"
          // style={styling}
        >
          <Logo />
          <Scrollbars renderView={this.renderView} style={{ height: scrollheight - 70 }}>
            <Menu
              onClick={this.handleClick}
              theme="dark"
              selectedKeys={[this.props.selectedIndex]}
              mode="inline"
              // onOpenChange={this.onOpenChange}
              className="devDashboardMenu"
            >
              {ArticleList[this.props.selectedIndex - 1].map(line => {
                if (line.hasChild === 0) {
                  return (
                    <Menu.Item key={line.keyUrl}>
                      <Link to={`${url}/${line.keyUrl}`}>
                        <span className="devguideMenuHolder">
                          <span className="nav-text">{line.title}</span>
                        </span>
                      </Link>
                    </Menu.Item>
                  );
                }
                return (
                  <SubMenu
                    key={line.keyUrl}
                    title={
                      <span className="devguideMenuHolder">
                        <span className="nav-text">{line.title}</span>
                      </span>
                    }
                  >
                    {line.children.map(child => (
                      <Menu.Item key={child.keyUrl}>
                        <Link to={`${url}/${child.keyUrl}`}>
                          <span>{child.title}</span>
                        </Link>
                      </Menu.Item>
                    ))}
                  </SubMenu>
                );
              })}
            </Menu>
          </Scrollbars>
        </Sider>
      </SidebarWrapper>
    );
  }
}

Sidebar.propTypes = {
  selectedIndex: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  articleSelected: PropTypes.func.isRequired,
};

export default Sidebar;
