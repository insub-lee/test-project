import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { debounce } from 'lodash';
import StyledTop from './StyledTop';
import NoticeBox from '../../NoticeBox';

class Top extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNotifications: false,
      showOptions: false,
      searchKeyword: '',
    };
    this.toggleNotiButton = this.toggleNotiButton.bind(this);
    this.toggleOptionButton = this.toggleOptionButton.bind(this);
    this.handleNotiOutsideClick = this.handleNotiOutsideClick.bind(this);
    this.handleOptionsOutsideClick = this.handleOptionsOutsideClick.bind(this);
    this.handleReadNotification = this.handleReadNotification.bind(this);
    this.submit = this.onSubmit.bind(this);
    this.handleChangeSearchKey = debounce(this.handleChangeSearchKey.bind(this), 500);
    this.handleKeydown = this.handleKeydown.bind(this);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleNotiOutsideClick, false);
    document.removeEventListener('click', this.handleOptionsOutsideClick, false);
  }

  toggleNotiButton() {
    if (!this.state.showNotifications) {
      document.addEventListener('click', this.handleNotiOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleNotiOutsideClick, false);
    }
    const { action } = this.props;
    this.setState(
      prevState => ({
        showNotifications: !prevState.showNotifications,
      }),
      () => {
        const { showNotifications } = this.state;
        if (showNotifications) {
          action.toggleNotifications();
        }
      },
    );
  }

  handleChangeSearchKey(searchKeyword) {
    this.setState({ searchKeyword });
  }

  handleKeydown(e) {
    const { history } = this.props;
    if (e.key === 'Enter') {
      history.push(`/search?keyword=${e.target.value}`);
    } else {
      this.handleChangeSearchKey(e.target.value);
    }
  }

  onSubmit(e) {
    e.preventDefault();
    // const { callback } = this.state;
    // const formData = new FormData(e.target);
    // const payload = {};
    // formData.forEach((value, key) => {
    //   payload[key] = value;
    // });
    // Todo - Need Common Api handler
    // Success - callback();
    // Fail - alert message
    // callback(payload);
  }

  toggleOptionButton() {
    if (!this.state.showOptions) {
      document.addEventListener('click', this.handleOptionsOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOptionsOutsideClick, false);
    }
    this.setState(prevState => ({
      showOptions: !prevState.showOptions,
    }));
  }

  handleOptionsOutsideClick(e) {
    if (this.optionsButtonNode && !this.optionsButtonNode.contains(e.target)) {
      this.toggleOptionButton();
    }
  }

  handleNotiOutsideClick(e) {
    if (this.notiButtonNode && !this.notiButtonNode.contains(e.target)) {
      this.toggleNotiButton();
    }
  }

  handleReadNotification(noticeid) {
    // actions.readNotification(noticeid);
    this.props.action.readNotification(noticeid);
  }

  render() {
    const { showNotifications, showOptions, searchKeyword } = this.state;
    const { useSearch, notifications, options, action, unreadCount, readNotification, history, useNotification } = this.props;
    return (
      <StyledTop>
        {useSearch && (
          <form
            action=""
            className="header_search"
            // onSubmit={e => {
            // e.preventDefault();
            // return false;
            // }}
            onSubmit={this.onSubmit}
            autoComplete="off"
          >
            <fieldset>
              <legend className="none">검색</legend>
              <Link
                className="submit"
                to={{
                  pathname: '/search',
                  search: `?keyword=${searchKeyword}`,
                }}
              >
                <i className="fas fa-search fa-lg" />
              </Link>
              {/* 
              <button type="submit">
                <i className="fas fa-search fa-lg" />
              </button>
              */}
              <input
                type="text"
                placeholder="검색어를 입력"
                defaultValue=""
                onChange={e => this.handleChangeSearchKey(e.target.value)}
                onKeyDown={this.handleKeydown}
              />
            </fieldset>
          </form>
        )}
        <ul className="header_menu">
          {/*
          <li>
            <button type="button">
              <i className="fas fa-file-alt fa-lg" />
            </button>
          </li>
          */}
          {useNotification && (
            <li>
              <button type="button" onClick={this.toggleNotiButton}>
                <i className="far fa-bell fa-lg" />
                {unreadCount > 0 && <span className="num">{unreadCount}</span>}
              </button>
            </li>
          )}
          <li>
            <button type="button" onClick={this.toggleOptionButton}>
              <i className="fas fa-cog fa-lg" />
            </button>
          </li>
        </ul>
        <div
          className={`gnb_menu_sub ${showNotifications ? 'active' : ''}`}
          style={{ width: '300px' }}
          ref={node => {
            this.notiButtonNode = node;
          }}
        >
          <span className="icon icon_arr_gnb2" />
          <NoticeBox notices={notifications} action={action} history={history} toggleNotiButton={this.toggleNotiButton} />
        </div>
        <div
          className={`gnb_menu_sub_options ${showOptions ? 'active' : ''}`}
          style={{ width: '170px' }}
          ref={node => {
            this.optionsButtonNode = node;
          }}
        >
          <span className="icon icon_arr_gnb2" />
          <div className="logoutBox">
            <ul>
              <li>
                <button type="button" onClick={() => action.logout()}>
                  · 로그아웃
                </button>
              </li>
              <li>
                <button type="button" onClick={() => action.handlePwdChangeModal()}>
                  · 비밀번호 변경
                </button>
              </li>
            </ul>
          </div>
        </div>
      </StyledTop>
    );
  }
}

Top.propTypes = {
  useSearch: PropTypes.bool,
  useNotification: PropTypes.bool,
  notifications: PropTypes.arrayOf(PropTypes.object),
  options: PropTypes.arrayOf(PropTypes.object),
  action: PropTypes.shape({
    logout: PropTypes.func,
    toggleNotifications: PropTypes.func,
    readNotification: PropTypes.func,
    removeNotification: PropTypes.func,
    handlePwdChangeModal: PropTypes.func,
  }),
  unreadCount: PropTypes.number,
  history: PropTypes.object,
};

Top.defaultProps = {
  useSearch: false,
  useNotification: false,
  notifications: [],
  options: [],
  action: {
    logout: () => false,
    toggleNotifications: () => false,
    readNotification: () => false,
    removeNotification: () => false,
    handlePwdChangeModal: () => false,
  },
  unreadCount: 0,
  history: {},
};

export default Top;
