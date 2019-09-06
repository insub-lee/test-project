import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import { /* intlObj, */ lang } from 'utils/commonUtils';

class MenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: true };
  }

  handleClick = item => {
    const { isOpen } = this.state;
    if (item.child) {
      this.setState({ isOpen: !isOpen });
    } else if (item.URL) {
      this.props.classChange(item.URL);
    }

    /*
    const { openMenuCode, setOpenMenuCode } = this.props;
    if (!item.child) this.props.classChange(item.URL);
    else {
      const code = openMenuCode === item.SCR_CD ? '' : item.SCR_CD;
      setOpenMenuCode(code);
    }
    */
  };

  subMenuOpen = item => {
    return item.child && this.state.isOpen;
    /*
    const { openMenuCode } = this.props;
    return item.child && openMenuCode === item.SCR_CD;
    */
  };

  render() {
    const { menuItem, classString, classChange, setIcon } = this.props;

    return (
      <li className={`${classString(menuItem.URL)}${this.subMenuOpen(menuItem) ? ' open' : ''}`}>
        <a onClick={() => this.handleClick(menuItem)} onKeyPress={() => this.handleClick(menuItem)}>
          <Icon type={setIcon(menuItem.SCR_CD)} />
          <span className="nav-link-text">{lang.get('NAME', menuItem)}</span>
          {menuItem.child && (
            <b className="collapse-sign">
              <em className={`fa${this.subMenuOpen(menuItem) ? ' fa-angle-down' : ' fa-angle-up'}`}></em>
            </b>
          )}
        </a>
        {menuItem.child && (
          <ul>
            {menuItem.child.map(s => (
              <li className={classString(s.URL)}>
                <a onClick={() => classChange(s.URL)} onKeyPress={() => classChange(s.URL)}>
                  <span className="nav-link-text">{lang.get('NAME', s)}</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  }
}

MenuItem.propTypes = {
  menuItem: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  classString: PropTypes.func.isRequired,
  classChange: PropTypes.func.isRequired,
  setIcon: PropTypes.func.isRequired,
  // setOpenMenuCode: PropTypes.func.isRequired,
  openMenuCode: PropTypes.string.isRequired,
};

export default MenuItem;
