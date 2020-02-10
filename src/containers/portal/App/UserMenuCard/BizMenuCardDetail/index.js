import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Route, Switch } from 'react-router-dom';
import { Icon, Spin } from 'antd';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { intlObj, lang } from 'utils/commonUtils';
import Loadable from 'components/Loadable';

import messages from './messages';

import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';

// import BizInfo from './BizInfo';
// import AppInfo from './AppInfo';
// import PageInfo from './PageInfo';
import TopMenu from './TopMenu/index';

import StyleBizDetail from './StyleBizDetail';
import StyleBizDetailContent from './StyleBizDetailContent';

import BizMenuTree from '../../UserStore/components/Tree';
import Footer from '../../UserStore/Footer';

const BizInfo = Loadable({ loader: () => import('./BizInfo') });
const AppInfo = Loadable({ loader: () => import('./AppInfo') });
const PageInfo = Loadable({ loader: () => import('./PageInfo') });

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class BizMenuCardDetail extends Component {
  componentDidMount() {
    const {
      history,
      handleGetBizMenu,
      appBizGubun,
      match: {
        params: { BIZGRP_ID, TYPE },
      },
    } = this.props;
    handleGetBizMenu(Number(BIZGRP_ID), history, TYPE);
    appBizGubun(4);
  }

  componentDidUpdate(prevProps) {
    const {
      history,
      handleGetBizMenu,
      match: {
        params: { BIZGRP_ID, TYPE },
      },
    } = this.props;

    const {
      match: {
        params: { BIZGRP_ID: prevID },
      },
    } = prevProps;
    if (BIZGRP_ID !== prevID) {
      handleGetBizMenu(Number(BIZGRP_ID), history, TYPE);
    }
  }

  handleTreeOnClick = node => {
    const {
      handleChangeSelectedIndex,
      history,
      match,
      match: {
        params: { TYPE },
      },
    } = this.props;
    const preUrl = match.path.substr(0, match.path.indexOf('/:TYPE'));
    handleChangeSelectedIndex(node.MENU_ID);

    if (node.TYPE === 'Y') {
      history.push(`${preUrl}/${TYPE}/detail/app/${node.BIZGRP_ID}/${node.APP_ID}`);
    } else if (node.TYPE === 'N') {
      history.push(`${preUrl}/${TYPE}/detail/page/${node.BIZGRP_ID}/${node.PAGE_ID}`);
    }
    if (node.NODE_TYPE !== 'F') {
      window.scrollTo(0, 0);
    }
  };

  render() {
    const { bizMenuData, selectedIndex, history, match, execMenu, execPage } = this.props;
    const preUrl = match.path.substr(0, match.path.indexOf('/detail'));
    const buttonPreUrl = match.url.substr(0, match.url.indexOf('/detail'));

    const {
      match: {
        params: { BIZGRP_ID },
      },
      loading,
    } = this.props;

    return (
      <div
        style={{
          display: 'flex',
          flexFlow: 'column',
          backgroundColor: '#f7f8f9',
        }}
      >
        <StyleBizDetail>
          <Spin size="large" indicator={antIcon} spinning={loading}>
            <TopMenu history={history} match={match} BIZGRP_ID={Number(BIZGRP_ID)} execMenu={execMenu} execPage={execPage} />
            <StyleBizDetailContent style={{ minHeight: 'calc(100vh - 240px)' }}>
              <ul className="bizDetailContentWrapper">
                <li className="leftContent inPage">
                  <h2>
                    <button
                      type="button"
                      onClick={() => history.push(`${buttonPreUrl}/detail/info/${BIZGRP_ID}`)}
                      className="ellipsis"
                      style={{ color: `${history.location.pathname.indexOf('/info') > -1 ? '#886ab5' : 'inherit'}`, paddingLeft: 10 }}
                    >
                      {lang.get('NAME', bizMenuData)}
                    </button>
                  </h2>
                  {bizMenuData.children ? '' : <p style={{ paddingLeft: 12 }}>{intlObj.get(messages.noMenu)}</p>}
                  <BizMenuTree
                    treeData={bizMenuData.children ? bizMenuData.children : []}
                    onClick={this.handleTreeOnClick}
                    selectedIndex={history.location.pathname.indexOf('/info') > -1 ? -1 : selectedIndex}
                    generateNodeProps={() => ({})}
                  />
                </li>
                <li className="rightContent">
                  <Switch>
                    <Route path={`${preUrl}/detail/info/:BIZGRP_ID`} render={props => <BizInfo {...props} />} exact />
                    <Route
                      path={`${preUrl}/detail/app/:BIZGRP_ID/:appId`}
                      render={props => <AppInfo {...props} execMenu={execMenu} execPage={execPage} />}
                      exact
                    />
                    <Route
                      path={`${preUrl}/detail/page/:BIZGRP_ID/:pageId`}
                      render={props => <PageInfo {...props} execMenu={execMenu} execPage={execPage} />}
                      exact
                    />
                  </Switch>
                </li>
              </ul>
            </StyleBizDetailContent>
          </Spin>
        </StyleBizDetail>
        {preUrl.indexOf('myPage') > -1 ? '' : <Footer />}
      </div>
    );
  }
}

BizMenuCardDetail.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  bizMenuData: PropTypes.object.isRequired,
  handleGetBizMenu: PropTypes.func.isRequired,
  handleChangeSelectedIndex: PropTypes.func.isRequired,
  appBizGubun: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    handleGetBizMenu: (key, history, pageType) => dispatch(actions.getBizMenu(key, history, pageType)),
    handleChangeSelectedIndex: selectedIndex => dispatch(actions.changeSelectedIndex(selectedIndex)),
    appBizGubun: gubun => dispatch(actions.appBizGubun(gubun)),
  };
}

const mapStateToProps = createStructuredSelector({
  bizMenuData: selectors.makgeBizMenuData(),
  selectedIndex: selectors.makeSelectedIndex(),
  loading: selectors.makeSelectLoading(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'bizMenuCardDetail', reducer });
const withSaga = injectSaga({ key: 'bizMenuCardDetail', saga });

export default compose(withReducer, withSaga, withConnect)(BizMenuCardDetail);
