import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Scrollbars from 'react-custom-scrollbars';
import { intlObj, lang } from 'utils/commonUtils';
import { Button, Popover } from 'antd';
import { Table, Dimmer, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import Organization from 'containers/portal/components/Organization';
import injectReducer from '../../../../utils/injectReducer';
import { makeSelectSearch, makeSearchProfile } from './selectors';
import reducer from './reducer';
import {
  handleUserSearch,
  handleDisableSearchResultView,
  handleUserSearchHistory,
  handleClickToHistoryDelete,
  handleClickToHistoryDeleteAll,
  handleClickToHistoryInsert,
  handleGetProfileData,
} from './actions';
import injectSaga from '../../../../utils/injectSaga';
import saga from './saga';
import messages from './messages';
import UserSearchWrapper from './userSearch.style';
import deleteIcon from '../../../../images/portal/icon-delete.png';

const RenderSearchHistoryView = (props, t) => {
  if (props.search.searchedUserHistory.length > 0) {
    return (
      <div align="left" className="message">
        <Scrollbars
          className="custom-scrollbar"
          style={{ width: 'auto' }}
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
          autoHeight
          autoHeightMax={342}
        >
          <div className="historyTableWrapper">
            <Table size="small" style={{ width: '100%' }}>
              <Table.Body>
                {props.search.searchedUserHistory.map(history => (
                  <Table.Row key={history.EMP_NO} style={{ cursor: 'pointer' }}>
                    <Table.Cell style={{ width: 25 }}>
                      <Popover
                        placement="rightTop"
                        content={
                          <div>
                            {props.search.searchedUserHistory !== '' ? (
                              <ul className="userProfileMenuList">
                                <li>
                                  <Button onClick={() => props.handleClickToMoveToSite(history, t, 'org')} type="button" className="highlight icon-info">
                                    {intlObj.get(messages.userProfile)}
                                  </Button>
                                </li>
                                {/* <li>
                                  <Button onClick={() => props.handleClickToMoveToSite(history, t, 'talk')} type="button" className="icon-talk">
                                    {intlObj.get(messages.sendToCube)}
                                  </Button>
                                </li>
                                <li>
                                  <Button onClick={() => props.handleClickToMoveToSite(history, t, 'mail')} type="button" className="icon-mail">
                                    {intlObj.get(messages.sendToMail)}
                                  </Button>
                                </li>
                                <li>
                                  <Button onClick={() => props.handleClickToMoveToSite(history, t, 'todo')} type="button" className="icon-todo">
                                    {intlObj.get(messages.todoRegist)}
                                  </Button>
                                </li>
                                <li><Button onClick={() => props.handleClickToMoveToSite(history, t, 'hithanks')} type="button" className="icon-hithanks">{intlObj.get(messages.hyThanks)}</Button></li> */}
                              </ul>
                            ) : (
                              <div />
                            )}
                          </div>
                        }
                        trigger="hover"
                        overlayClassName="userProfileMenu"
                      >
                        <div
                          className="listDivImg"
                          role="presentation"
                          onError={e => {
                            e.target.src = '/no_img_pro.jpg';
                          }}
                        >
                          <img className="listImg" src={`/img/thumb/200x200/${history.PHOTO}`} alt={lang.get('NAME', history)} />
                        </div>
                      </Popover>
                    </Table.Cell>
                    <Table.Cell
                      style={{ width: 180, paddingLeft: 10, paddingTop: 6 }}
                      textAlign="left"
                      className="ellipsis"
                      onClick={() => props.handleClickToMoveToSite(history, t, 'org')}
                    >
                      {lang.get('NAME', history)}({history.EMP_NO})<br />
                      {lang.get('DEPT_NAME', history)}&nbsp;/&nbsp;
                      {lang.get('PSTN_NAME', history)}
                    </Table.Cell>
                    <Table.Cell textAlign="left">{history.REG_DTTM}</Table.Cell>
                    <Table.Cell textAlign="right">
                      <Button type="button" className="delRow" onClick={() => props.handleClickToHistoryDelete(history)}>
                        <img src={deleteIcon} className="deleteIcon" alt={intlObj.get(messages.delete)} />
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </Scrollbars>

        <div align="right" className="controlBtns">
          <Button className="deleteHistoryAllBtn" onClick={() => props.handleClickToHistoryDeleteAll()} type="button">
            <FormattedMessage {...messages.userSearchDelete} />
          </Button>
          <span className="divBar">|</span>
          <Button className="closeBtn" onClick={() => props.handleOnClose(t)} type="button">
            <FormattedMessage {...messages.close} />
          </Button>
        </div>
      </div>
    );
  }
  // 추후 확인
  return false;
};
const RenderSearchView = (props, t) => {
  if (props.search.isLoading) {
    return (
      <div className="message empty">
        <div className="header" style={{ position: 'relative', height: 50 }}>
          <Dimmer active inverted>
            <Loader>Loading</Loader>
          </Dimmer>
        </div>
      </div>
    );
  }

  if (props.search.searchedUser.length > 0) {
    return (
      <div className="message">
        <Scrollbars className="custom-scrollbar" autoHide autoHideTimeout={1000} autoHideDuration={200} autoHeight autoHeightMax={342}>
          <div className="resultsTableWrapper">
            <Table size="small" style={{ width: '100%' }}>
              <Table.Body>
                {props.search.searchedUser.map(user => (
                  <Table.Row key={user.EMP_NO} style={{ cursor: 'pointer' }}>
                    <Table.Cell style={{ width: 25 }}>
                      <Popover
                        placement="rightTop"
                        content={
                          <ul className="userProfileMenuList">
                            <li>
                              <Button onClick={() => props.handleClickToHistoryInsert(user, t, 'org')} type="button" className="highlight icon-info">
                                <FormattedMessage {...messages.userProfile} />
                              </Button>
                            </li>
                            {/* <li>
                              <Button onClick={() => props.handleClickToHistoryInsert(user, t, 'talk')} type="button" className="icon-talk">
                                <FormattedMessage {...messages.sendToCube} />
                              </Button>
                            </li>
                            <li>
                              <Button onClick={() => props.handleClickToHistoryInsert(user, t, 'mail')} type="button" className="icon-mail">
                                <FormattedMessage {...messages.sendToMail} />
                              </Button>
                            </li>
                            <li>
                              <Button onClick={() => props.handleClickToHistoryInsert(user, t, 'todo')} type="button" className="icon-todo">
                                <FormattedMessage {...messages.todoRegist} />
                              </Button>
                            </li>
                            <li>
                              <Button onClick={() => props.handleClickToHistoryInsert(user, t, 'hithanks')} type="button" className="icon-hithanks">
                                <FormattedMessage {...messages.hyThanks} />
                              </Button>
                            </li> */}
                          </ul>
                        }
                        trigger="hover"
                        overlayClassName="userProfileMenu"
                      >
                        <div
                          className="listDivImg"
                          role="presentation"
                          onError={e => {
                            e.target.src = '/no_img_pro.jpg';
                          }}
                        >
                          <img className="listImg" src={`/img/thumb/200x200/${user.PHOTO}`} alt={lang.get('NAME', user)} />
                        </div>
                      </Popover>
                    </Table.Cell>
                    <Table.Cell textAlign="left" onClick={() => props.handleClickToHistoryInsert(user, t, 'org')}>
                      <p style={{ width: 250, marginLeft: 10 }} className="ellipsis">
                        {lang.get('NAME', user)}({user.EMP_NO})<br />
                        {lang.get('DEPT_NAME', user)}&nbsp;/&nbsp;
                        {lang.get('PSTN_NAME', user)}
                      </p>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </Scrollbars>
        <div align="right" className="controlBtns">
          <Button type="button" className="closeBtn" onClick={() => props.handleOnClose(t)}>
            <FormattedMessage {...messages.close} />
          </Button>
        </div>
      </div>
    );
  }
  return false;
};

class UserSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      inputBoxShow: false,
      userProfile: {},
    };
  }

  onModal = () => {
    this.setState({
      show: true,
    });
  };

  onModalButton = () => {
    this.setState({ show: true });
  };

  onSearchButton = () => {
    const { inputBoxShow } = this.state;
    this.setState(
      {
        inputBoxShow: !inputBoxShow,
      },
      function() {
        if (this.state.inputBoxShow === false) {
          this.props.handleFocusOut();
        } else {
          this.focusInput.focus();
        }
      },
    );

    this.closeAll();
  };

  setUserProfile = user => {
    this.setState({
      userProfile: user,
    });
  };

  closeAll = () => {
    if (this.state.inputBoxShow === false) {
      this.props.handleFocusOut();
    }
  };

  moveToSite = (user, type) => { //eslint-disable-line
    switch (type) {
      case 'org':
        this.onModal();
        break;
      // case 'talk':
      //   window.open(`http://www.kb-sys.co.kr/solutions#solutions-link-4`);
      //   break;
      // case 'mail':
      //   window.open(`http://www.kb-sys.co.kr/solutions#solutions-link-4`);
      //   break;
      // case 'todo':
      //   window.open(`http://www.kb-sys.co.kr/solutions#solutions-link-4`);
      //   break;
      default:
        alert('준비중입니다.');
        return false;
    }
  };

  valueClear = () => {
    this.searchInputUser.firstChild.value = '';
  };

  closeModal = () => {
    this.setState({ show: false });
  };

  render() {
    const { userProfile, show } = this.state;
    return (
      <div align="left">
        <UserSearchWrapper>
          <div className="mSearchWrapper" style={{ position: 'relative', padding: 0, margin: 0 }}>
            <div
              className={this.props.search.isLoading ? 'ui icon fluid input mini loading' : 'ui icon fluid input mini'}
              style={{ paddingRight: 0 }}
              ref={ref => this.searchInputUser = ref} //eslint-disable-line
            >
              <input
                style={{ height: 27 }}
                type={this.state.inputBoxShow === true ? 'text' : 'hidden'}
                placeholder={intlObj.get(messages.userNameSearch)}
                onFocus={e => this.props.handleFocusOn(e.target.value)}
                // onBlur={e => this.props.handleFocusOut(e.target.value)}
                // onChange={e => this.props.handleUserSearch(e.target.value)}
                onKeyUp={e => this.props.handleUserSearch(e.target.value)}
                autoComplete="off"
                tabIndex="0"
                id="searchInput"
                className="mInputBox"
                ref={f => this.focusInput = f} //eslint-disable-line
              />
              <Button className="mSearchButton" onClick={this.onSearchButton}>
                <span className="icon icon-search" />
              </Button>
            </div>
            <div
              className={this.props.search.isShow ? 'results transition visible' : 'results transition'}
              style={{
                display: this.props.search.isShow ? 'block' : 'none',
              }}
            >
              {RenderSearchView(this.props, this)}
            </div>
            <div
              className={this.props.search.isHistoryShow ? 'history transition visible' : 'history results transition'}
              style={{
                display: this.props.search.isHistoryShow ? 'block' : 'none',
              }}
            >
              {RenderSearchHistoryView(this.props, this)}
            </div>
          </div>
        </UserSearchWrapper>
        <Organization isModal show={show} closeModal={this.closeModal} userProfile={userProfile} isProfile orgName="구성원검색" searchOnly />
      </div>
    );
  }
}

RenderSearchView.propTypes = {
  search: PropTypes.shape({
    value: PropTypes.string,
    isShow: PropTypes.bool,
    isShowHistory: PropTypes.bool,
    isLoading: PropTypes.bool,
    searchedUserProfile: PropTypes.array,
    searchedUser: PropTypes.string,
    searchedUserHistory: PropTypes.array,
  }).isRequired,
};

UserSearch.propTypes = {
  handleFocusOn: PropTypes.func.isRequired,
  handleFocusOut: PropTypes.func.isRequired,
  handleUserSearch: PropTypes.func.isRequired,
  search: PropTypes.shape({
    value: PropTypes.string,
    isShow: PropTypes.bool,
    isShowHistory: PropTypes.bool,
    isLoading: PropTypes.bool,
    isHistoryShow: PropTypes.bool,
  }).isRequired,
};

const mapDispatchToProps = dispatch => ({
  handleUserSearch: value => {
    if (value.trim().length === 0) {
      dispatch(handleDisableSearchResultView());
      dispatch(handleUserSearchHistory());
    } else if (value.trim().length > 1) {
      dispatch(handleDisableSearchResultView());
      dispatch(handleUserSearch(value));
    } else if (value.trim().length > 2) {
      dispatch(handleDisableSearchResultView());
      dispatch(handleUserSearch(value));
    }
  },
  handleFocusOn: value => {
    if (value.trim().length === 0) {
      dispatch(handleUserSearchHistory());
    }
  },
  handleFocusOut: value => {
    dispatch(handleDisableSearchResultView(value));
  },
  handleClickToHistoryDelete: history => {
    dispatch(handleClickToHistoryDelete(history));
  },
  handleClickToHistoryDeleteAll: history => {
    dispatch(handleClickToHistoryDeleteAll(history));
  },
  handleClickToHistoryInsert: (user, t, type) => {
    dispatch(handleClickToHistoryInsert(user));
    t.valueClear();
    t.moveToSite(user, type);
    t.setUserProfile(user);
  },
  handleClickToMoveToSite: (history, t, type) => {
    dispatch(handleGetProfileData(history.USER_ID));
    t.moveToSite(history, type);
    t.setUserProfile(history);
  },
  handleOnClose: t => {
    dispatch(handleDisableSearchResultView());
    t.valueClear();
  },
});

const mapStateToProps = createStructuredSelector({
  search: makeSelectSearch(),
  searchProfile: makeSearchProfile(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'userSearch', reducer });

const withSaga = injectSaga({ key: 'userSearch', saga });

export default compose(withReducer, withSaga, withConnect)(UserSearch);
