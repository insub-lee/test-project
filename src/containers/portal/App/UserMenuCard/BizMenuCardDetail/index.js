import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Route, Switch } from 'react-router-dom';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { intlObj, lang } from 'utils/commonUtils';

import messages from './messages';

import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';

import BizInfo from './BizInfo';
import AppInfo from './AppInfo';
import PageInfo from './PageInfo';
import TopMenu from './TopMenu/index';

import StyleBizDetail from './StyleBizDetail';
import StyleBizDetailContent from './StyleBizDetailContent';

import BizMenuTree from '../../UserStore/components/Tree';
import Footer from '../../UserStore/Footer';

class BizMenuCardDetail extends Component {
  componentDidMount() {
    console.debug('>>>>>>>>card detail did mount: ', this.props);
    const {
      history,
      handleGetBizMenu,
      appBizGubun,
      match: {
        params: { BIZGRP_ID },
      },
    } = this.props;
    handleGetBizMenu(Number(BIZGRP_ID), history);
    appBizGubun(4);
  }

  componentDidUpdate(prevProps) {
    console.debug('>>>>>>>>prevProps: ', prevProps);
    console.debug('>>>>>>>>this.props: ', this.props);

    const {
      history,
      handleGetBizMenu,
      match: {
        params: { BIZGRP_ID },
      },
    } = this.props;

    const {
      match: {
        params: { BIZGRP_ID: prevID },
      },
    } = prevProps;
    if (BIZGRP_ID !== prevID) {
      console.debug('>>>>>>ID: ', Number(BIZGRP_ID));
      console.debug('>>>>>>history: ', history);
      handleGetBizMenu(Number(BIZGRP_ID), history);
    }
  }

  /* eslint-disable */
  handleTreeOnClick = node => {
    console.debug('>>>>>>>>here node: ', node);
    const { handleChangeSelectedIndex, history, match } = this.props;
    const preUrl = match.path.substr(0, match.path.indexOf('/:'));

    handleChangeSelectedIndex(node.MENU_ID);

    if (node.TYPE === 'Y') {
      history.push(`/portal/card/bizMenu/detail/app/${node.BIZGRP_ID}/${node.APP_ID}`);
    } else if (node.TYPE === 'N') {
      history.push(`/portal/card/bizMenu/detail/page/${node.BIZGRP_ID}/${node.PAGE_ID}`);
    }
    if (node.NODE_TYPE !== 'F') {
      window.scrollTo(0, 0);
    }
  };

  render() {
    const { bizMenuData, selectedIndex, history, match } = this.props;

    const preUrl = match.path.substr(0, match.path.indexOf('/:'));

    const {
      match: {
        params: { BIZGRP_ID },
      },
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
          <TopMenu history={history} match={match} BIZGRP_ID={Number(BIZGRP_ID)} />
          <StyleBizDetailContent style={{ minHeight: 'calc(100vh - 240px)' }}>
            <ul className="bizDetailContentWrapper">
              <li className="leftContent inPage">
                <h2>
                  <button
                    onClick={() => history.push(`${preUrl}/bizMenu/detail/info/${BIZGRP_ID}`)}
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
                  <Route path={`${preUrl}/bizMenu/detail/info/:BIZGRP_ID`} component={BizInfo} exact />
                  <Route path={`/portal/card/bizMenu/detail/app/:BIZGRP_ID/:appId`} component={AppInfo} exact />
                  <Route path={`/portal/card/bizMenu/detail/page/:BIZGRP_ID/:pageId`} component={PageInfo} exact />
                </Switch>
              </li>
            </ul>
          </StyleBizDetailContent>
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
};

export function mapDispatchToProps(dispatch) {
  return {
    handleGetBizMenu: (key, history) => dispatch(actions.getBizMenu(key, history)),
    handleChangeSelectedIndex: selectedIndex => dispatch(actions.changeSelectedIndex(selectedIndex)),
    appBizGubun: gubun => dispatch(actions.appBizGubun(gubun)),
  };
}

const mapStateToProps = createStructuredSelector({
  bizMenuData: selectors.makgeBizMenuData(),
  selectedIndex: selectors.makeSelectedIndex(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'bizMenuCardDetail', reducer });
const withSaga = injectSaga({ key: 'bizMenuCardDetail', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(BizMenuCardDetail);
