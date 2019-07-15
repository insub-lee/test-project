import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import SideMenu from 'react-sidemenu';

import './app.css';
import StlyedDefaultTheme from './StlyedDefaultTheme';

class Tree extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.treeData.length > 0;
  }

  /* eslint-disable */
  handleClick = node => {
    console.debug('>>>>>>>>>node: ', node);
    if (node.TARGET === 'NEW') {
      window.open(node.URL, node.MENU_ID, 'width=1280, height=720, toolbar=yes, resizable=yes, menubar=yes, status=yes, location=yes');
      this.props.execMenu(node.PAGE_ID, node.TARGET);
    } else {
      if (node.NODE_TYPE !== 'F' && node.APP_YN !== 'F') {
        this.props.execPage(node, 'execMenu');
      }
    }
  };

  render() {
    const { treeData } = this.props;

    let newTreeData = [];
    treeData.map(value => {
      value['icon'] = 'fa-briefcase';
      newTreeData.push(value);
    });

    return (
      <StlyedDefaultTheme>
        <SideMenu collapse={true} items={newTreeData} onMenuItemClick={this.handleClick} />
      </StlyedDefaultTheme>
    );
  }
}

Tree.propTypes = {
  treeData: PropTypes.array,
  execMenu: PropTypes.func.isRequired,
  execPage: PropTypes.func.isRequired,
};

Tree.defaultProps = {
  treeData: [],
};

export default Tree;
