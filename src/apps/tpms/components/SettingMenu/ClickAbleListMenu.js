import React from 'react';
import PropTypes from 'prop-types';
import StyledSettingMenu from './StyledSettingMenu';
import StyledButton from './StyledButton';

class SettingMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: true,
    };
    this.toggleShowMenu = this.toggleShowMenu.bind(this);
  }

  toggleShowMenu() {
    this.setState(prevState => ({ isShow: !prevState.isShow }));
  }

  render() {
    const { isShow } = this.state;
    const { title, items } = this.props;
    return (
      <StyledSettingMenu className="menu_option">
        <div className="menu_option-title">
          {title}
          <button type="button" className="toggle_show" onClick={this.toggleShowMenu}>
            {isShow ? <i className="fas fa-caret-down" /> : <i className="fas fa-caret-up" />}
          </button>
        </div>
        <ul className="menu_option-container">
          {isShow &&
            items.map(item => (
              <li className="menu_option-item" key={item.key}>
                <StyledButton type="button" className={`${item.isActive ? 'active' : ''}`} onClick={() => item.onClick()}>
                  <div className="icon_box">
                    <i className={item.icon} />
                  </div>
                  <p className="text">{item.text}</p>
                </StyledButton>
              </li>
            ))}
        </ul>
      </StyledSettingMenu>
    );
  }
}

SettingMenu.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object),
};

SettingMenu.defaultProps = {
  title: '',
  items: [],
};

export default SettingMenu;
