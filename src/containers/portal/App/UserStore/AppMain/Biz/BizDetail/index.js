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
import BizMenuTree from '../../../components/Tree';
import Footer from '../../../Footer';

class BizDetail extends Component {
  componentDidMount() {
    const {
      handleGetBizMenu,
      appBizGubun,
      match: {
        params: { BIZGRP_ID },
      },
      history,
    } = this.props;
    handleGetBizMenu(Number(BIZGRP_ID), history);
    appBizGubun(4);
  }

  componentDidUpdate(prevProps) {
    const {
      match: {
        params: { BIZGRP_ID: prevBizgrpId },
      },
    } = prevProps;
    const {
      match: {
        params: { BIZGRP_ID: currentBizgrpId },
      },
      history,
      handleGetBizMenu,
    } = this.props;
    if (currentBizgrpId && currentBizgrpId !== prevBizgrpId) {
      handleGetBizMenu(Number(currentBizgrpId), history);
    }
  }

  render() {
    const {
      bizMenuData,
      selectedIndex,
      // handleChangeSelectedIndex,
      history,
      match,
      handleTreeOnClick,
    } = this.props;

    // /store/appMain/myPage/biz/detail
    // /store/appMain/bizStore/biz/detail
    const preUrl = match.path.substr(0, match.path.indexOf('/:'));

    return (
      <div
        style={{
          display: 'flex',
          flexFlow: 'column',
          // minHeight: 'calc(100vh - 42px)',
          backgroundColor: '#f7f8f9',
        }}
      >
        <StyleBizDetail>
          <TopMenu history={history} match={match} BIZGRP_ID={match.params.BIZGRP_ID} />
          <StyleBizDetailContent style={{ minHeight: 'calc(100vh - 240px)' }}>
            <ul className="bizDetailContentWrapper">
              <li className="leftContent inPage">
                <h2>
                  <button
                    onClick={() => history.push(`${preUrl}/info/${match.params.BIZGRP_ID}`)}
                    // className="currentTreeLevel ellipsis"
                    className="ellipsis"
                    style={{ color: `${history.location.pathname.indexOf('/info') > -1 ? '#f85023' : 'inherit'}`, paddingLeft: 10 }}
                  >
                    {lang.get('NAME', bizMenuData)}
                  </button>
                </h2>
                {bizMenuData.children ? '' : <p style={{ paddingLeft: 12 }}>{intlObj.get(messages.noMenu)}</p>}
                <BizMenuTree
                  treeData={bizMenuData.children ? bizMenuData.children : []}
                  onClick={node => handleTreeOnClick(node, history, preUrl)}
                  selectedIndex={history.location.pathname.indexOf('/info') > -1 ? -1 : selectedIndex}
                  // generateNodeProps={({ node: node2 }) => {
                  //   const node = node2;
                  //   node.IS_FOLDER = node.NODE_TYPE === 'F';
                  // }}
                  generateNodeProps={() => ({})}
                />
              </li>
              <li className="rightContent">
                <Switch>
                  <Route exact path={`${preUrl}/info/:BIZGRP_ID`} component={BizInfo} />
                  <Route path={`${preUrl}/app/:BIZGRP_ID/:appId`} component={AppInfo} />
                  <Route path={`${preUrl}/page/:BIZGRP_ID/:pageId`} component={PageInfo} />
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

BizDetail.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  // BIZGRP_ID: PropTypes.number.isRequired,
  bizMenuData: PropTypes.object.isRequired,
  handleGetBizMenu: PropTypes.func.isRequired,
  // handleChangeSelectedIndex: PropTypes.func.isRequired,
  appBizGubun: PropTypes.func.isRequired,
  handleTreeOnClick: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    // 테스트
    handleTreeOnClick: (node, history, preUrl) => {
      dispatch(actions.changeSelectedIndex(node.MENU_ID));
      if (node.TYPE === 'Y') {
        history.push(`${preUrl}/app/${node.BIZGRP_ID}/${node.APP_ID}`);
      } else if (node.TYPE === 'N') {
        history.push(`${preUrl}/page/${node.BIZGRP_ID}/${node.PAGE_ID}`);
      }
      if (node.NODE_TYPE !== 'F') {
        window.scrollTo(0, 0);
      }
    },
    handleGetBizMenu: (key, history) => dispatch(actions.getBizMenu(key, history)),
    handleChangeSelectedIndex: selectedIndex => dispatch(actions.changeSelectedIndex(selectedIndex)),
    appBizGubun: gubun => dispatch(actions.appBizGubun(gubun)),
  };
}

const mapStateToProps = createStructuredSelector({
  // 테스트
  bizMenuData: selectors.makgeBizMenuData(),
  selectedIndex: selectors.makeSelectedIndex(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'bizDetail', reducer });
const withSaga = injectSaga({ key: 'bizDetail', saga });

export default compose(
  withReducer,
  withConnect,
  withSaga,
)(BizDetail);
