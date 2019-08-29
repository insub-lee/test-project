import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SideMenu from 'react-sidemenu';

import StlyedDefaultTheme from './StlyedDefaultTheme';

class Tree extends Component {
  /* eslint-disable */
  constructor(props) {
    super(props);

    this.state = {
      activeItem: '',
    };
  }

  handleClick = (value, extas) => {
    console.debug('>>>>>>extas: ', extas);
    console.debug('>>>>>>value: ', value);
    const { execMenu, execPage } = this.props;

    this.setState({
      activeItem: value.toString(),
    });

    if (extas.TARGET === 'NEW') {
      window.open(extas.URL, extas.MENU_ID, 'width=1280, height=720, toolbar=yes, resizable=yes, menubar=yes, status=yes, location=yes');
      execMenu(extas.PAGE_ID, extas.TARGET);
    } else if (extas.NODE_TYPE !== 'F' && extas.APP_YN !== 'F') {
      execPage(extas, 'execMenu');
    }
  };

  render() {
    const { treeData } = this.props;

    return (
      <StlyedDefaultTheme>
        <SideMenu collapse={true} items={treeData} activeItem={this.state.activeItem} onMenuItemClick={this.handleClick} />
      </StlyedDefaultTheme>
    );
  }
}

Tree.propTypes = {
  treeData: PropTypes.array,
  execMenu: PropTypes.func,
  execPage: PropTypes.func,
};

Tree.defaultProps = {
  treeData: [],
  execMenu: () => {},
  execPage: () => {},
};

export default Tree;
