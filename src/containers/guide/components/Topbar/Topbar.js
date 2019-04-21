import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import PropTypes from 'prop-types';
import TopbarWrapper from './topbar.style';

const { Header } = Layout;
// const { firstLevelSelected } = appActions;

class Topbar extends Component {
  handleClick = (e) => {
    this.props.firstLevelSelected(e.key);
  }

  render() {
    const styling = {
      position: 'fixed',
      width: '100%',
      height: 87,
    };
    const styling2 = {
      textAlign: 'right',
      width: '100%',
      paddingTop: 19,
    };

    return (
      <TopbarWrapper>
        <Header
          style={styling}
          className="devguideTopbar"
        >
          <Menu
            onClick={this.handleClick}
            defaultSelectedKeys={['1']}
            mode="horizontal"
            style={styling2}
          >
            <Menu.Item key="1">
              개발자 가이드
            </Menu.Item>
            <Menu.Item key="2">
              컴포넌트
            </Menu.Item>
            <Menu.Item key="3">
              API
            </Menu.Item>
            <Menu.Item key="4">
              TEST
            </Menu.Item>
          </Menu>
        </Header>
      </TopbarWrapper>
    );
  }
}

Topbar.propTypes = {
  firstLevelSelected: PropTypes.func.isRequired,
};

export default Topbar;
