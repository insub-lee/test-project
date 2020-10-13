import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import StyledGNB from './StyledGNB';
import StyledMenuList from './StyledMenuList';
import Button from '../../Button';

class GNB extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openedKey: -1,
      showSearch: false,
      showNotices: false,
      showOptions: false,
      showMenuNotices: true,
      showAlrimpan: true,
      showSitemap: true,
      showPassword: true,
      showDrm: true,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.disableToggled = this.disableToggled.bind(this);
    this.toggleShowNotices = this.toggleShowNotices.bind(this);
    this.toggleShowOptions = this.toggleShowOptions.bind(this);
    this.toggleShowSearch = this.toggleShowSearch.bind(this);
    this.disableToggled = this.disableToggled.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handleOutsideSearchClick = this.handleOutsideSearchClick.bind(this);
    this.handleOutsideNoticesClick = this.handleOutsideNoticesClick.bind(this);
    this.handleOutsideOptionsClick = this.handleOutsideOptionsClick.bind(this);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideClick, false);
  }

  componentDidMount() {
    const sysId = process.env.REACT_APP_SYSTEM_ID;
    switch (sysId) {
      case 'JEM':
        this.setState({
          showMenuNotices: false,
          showAlrimpan: false,
          showSitemap: false,
          showPassword: false,
          showDrm: false,
        });
        break;
      default:
        break;
    }
  }

  toggleMenu(key) {
    if (this.state.openedKey === -1) {
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }
    this.setState(prevState => ({
      openedKey: prevState.openedKey === key ? -1 : key,
    }));
  }

  toggleShowSearch() {
    if (!this.state.showSearch) {
      document.addEventListener('click', this.handleOutsideSearchClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideSearchClick, false);
    }
    this.setState(prevState => ({
      showSearch: !prevState.showSearch,
    }));
  }

  toggleShowNotices() {
    if (!this.state.showNotices) {
      document.addEventListener('click', this.handleOutsideNoticesClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideNoticesClick, false);
    }
    this.setState(prevState => ({
      showNotices: !prevState.showNotices,
    }));
  }

  toggleShowOptions() {
    if (!this.state.showOptions) {
      document.addEventListener('click', this.handleOutsideOptionsClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideOptionsClick, false);
    }
    this.setState(prevState => ({
      showOptions: !prevState.showOptions,
    }));
  }

  disableToggled() {
    this.setState({ openedKey: -1 });
  }

  handleOutsideClick(e) {
    if (this.menusNode && !this.menusNode.contains(e.target)) {
      this.disableToggled();
    }
  }

  handleOutsideSearchClick(e) {
    if (this.searchNode && !this.searchNode.contains(e.target)) {
      this.setState({ showSearch: false });
    }
  }

  handleOutsideNoticesClick(e) {
    if (this.noticesNode && !this.noticesNode.contains(e.target)) {
      this.setState({ showNotices: false });
    }
  }

  handleOutsideOptionsClick(e) {
    if (this.optionsNode && !this.optionsNode.contains(e.target)) {
      this.setState({ showOptions: false });
    }
  }

  render() {
    const { openedKey, showNotices, showOptions, showSearch, showMenuNotices, showAlrimpan, showSitemap, showPassword, showDrm } = this.state;
    const { menus, useSearch, action } = this.props;
    return (
      <StyledGNB className="gnb_wrap">
        <div className="bg" />
        <div
          className="gnb_slide"
          ref={node => {
            this.menusNode = node;
          }}
        >
          <ul className="gnb">
            {menus.map(menu => (
              <li key={menu.seq} className={`${menu.seq === openedKey ? 'on' : ''}`}>
                {menu.mnuFnc === 'P' ? (
                  <Link to={`/${menu.mnuId}`} onClick={this.disableToggled}>
                    <button type="button">
                      {menu.title}
                      <span className="line" />
                    </button>
                  </Link>
                ) : (
                  <React.Fragment>
                    {menu.children && menu.children.length > 0 ? (
                      <Link to={`/${menu.children[0].mnuId}`}>
                        <button type="button">
                          {menu.title}
                          <span className="line" />
                        </button>
                      </Link>
                    ) : (
                      <button type="button">
                        {menu.title}
                        <span className="line" />
                      </button>
                    )}
                    <div className="gnb_sub gnb_sub1">
                      <span className="icon icon_arr_gnb" />
                      <ul>
                        {menu.children.map(subMenu => (
                          <li key={subMenu.seq}>
                            <Link to={`/${subMenu.mnuId}`} onClick={this.disableToggled}>
                              <button type="button">{`· ${subMenu.title}`}</button>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </React.Fragment>
                )}
              </li>
            ))}
          </ul>
        </div>
        <StyledMenuList className="gnb_menu">
          {showMenuNotices && (
            <li>
              <button type="button" className="icon icon_alarm" onClick={this.toggleShowNotices}>
                알람<span className="num">99</span>
              </button>
            </li>
          )}
          <li>
            <button type="button" className="icon icon_setting" onClick={this.toggleShowOptions}>
              설정
            </button>
          </li>
          {useSearch && (
            <li>
              <button type="button" className="icon icon_search">
                검색
              </button>
              <form autoComplete="off" onSubmit={e => e.preventDefault()}>
                <div className={`gnb_menu_search ${showSearch ? 'on' : ''}`}>
                  <input type="text" />
                  <button type="button" className="icon icon_search_g">
                    검색
                  </button>
                </div>
              </form>
            </li>
          )}
        </StyledMenuList>
        <div className={`gnb_menu_sub gnb_menu_sub1 ${showOptions ? 'on' : ''}`}>
          <span className="icon icon_arr_gnb" />
          <ul>
            {showAlrimpan && (
              <li>
                <button type="button" onClick={() => false}>
                  · 알림판
                </button>
              </li>
            )}
            {showSitemap && (
              <li>
                <button type="button" onClick={() => false}>
                  · 사이트맵
                </button>
              </li>
            )}
            {showPassword && (
              <li>
                <button type="button" onClick={() => false}>
                  · Password
                </button>
              </li>
            )}
            {showDrm && (
              <li className="last">
                <button type="button" className="button_drm">
                  DRM 도움말
                </button>
                <button type="button" className="button_drm">
                  DRM FAQ
                </button>
              </li>
            )}
            <li>
              <button type="button" onClick={() => action.logout()}>
                · 로그아웃
              </button>
            </li>
            <li>
              <button type="button" onClick={() => action.logout()}>
                · 비밀번호 변경
              </button>
            </li>
          </ul>
        </div>
        <div className={`gnb_menu_sub gnb_menu_sub2 ${showNotices ? 'on' : ''}`}>
          <span className="icon icon_arr_gnb" />
          <ul>
            <li>
              <button type="button" onClick={() => false}>
                · 알림항목입니다. 알림항목입니다. 알림항목입니다.림항목입니다.
              </button>
            </li>
            <li>
              <button type="button" onClick={() => false}>
                · 알림항목입니다. 알림항목입니다. 알림항목입니다.림항목입니다.
              </button>
            </li>
            <li>
              <button type="button" onClick={() => false}>
                · 알림항목입니다. 알림항목입니다. 알림항목입니다.림항목입니다.
              </button>
            </li>
            <li>
              <button type="button" onClick={() => false}>
                · 알림항목입니다. 알림항목입니다. 알림항목입니다.림항목입니다.
              </button>
            </li>
            <li>
              <button type="button" onClick={() => false}>
                · 알림항목입니다. 알림항목입니다. 알림항목입니다.림항목입니다.
              </button>
            </li>
          </ul>
        </div>
      </StyledGNB>
    );
  }
}

GNB.propTypes = {
  menus: PropTypes.arrayOf(PropTypes.object),
  useSearch: PropTypes.bool,
  action: PropTypes.shape({
    logout: PropTypes.func,
  }),
};

GNB.defaultProps = {
  menus: [],
  useSearch: false,
  action: {
    logout: () => false,
  },
};

export default GNB;
