import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Route, Switch } from 'react-router-dom';
// import { Button } from 'antd';
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
  constructor(props) {
    super(props);
    const { match, history } = props;
    const { params } = match;
    const { BIZGRP_ID } = params;

    this.state = {
      BIZGRP_ID: Number(BIZGRP_ID),
    };

    props.handleGetBizMenu(Number(BIZGRP_ID), history);
    this.props.appBizGubun(4);
  }

  componentWillReceiveProps(nextProps) {
    const { match, history } = nextProps;
    const { params } = match;
    const { BIZGRP_ID } = params;

    if (BIZGRP_ID && this.state.BIZGRP_ID !== Number(BIZGRP_ID)) {
      this.setState({
        BIZGRP_ID: Number(BIZGRP_ID),
      });
      this.props.handleGetBizMenu(Number(BIZGRP_ID), history);
    }
  }

  render() {
    const {
      bizMenuData,
      selectedIndex,
      handleChangeSelectedIndex,

      history,
      match,
    } = this.props;

    // /store/appMain/myPage/biz/detail
    // /store/appMain/bizStore/biz/detail
    const preUrl = match.path.substr(0, match.path.indexOf('/:'));

    // eslint-disable-next-line arrow-parens
    const handleTreeOnClick = node => {
      handleChangeSelectedIndex(node.MENU_ID);
      if (node.TYPE === 'Y') {
        history.push(`${preUrl}/app/${node.BIZGRP_ID}/${node.APP_ID}`);
      } else if (node.TYPE === 'N') {
        history.push(`${preUrl}/page/${node.BIZGRP_ID}/${node.PAGE_ID}`);
      }
      if (node.NODE_TYPE !== 'F') {
        window.scrollTo(0, 0);
      }
    };
    console.debug('>>>>>>>>>>>여기로 와야하는데.....', preUrl);
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
          <TopMenu history={history} match={match} BIZGRP_ID={this.state.BIZGRP_ID} />
          <StyleBizDetailContent style={{ minHeight: 'calc(100vh - 240px)' }}>
            <ul className="bizDetailContentWrapper">
              <li className="leftContent inPage">
                <h2>
                  <button
                    onClick={() => history.push(`${preUrl}/info/${this.state.BIZGRP_ID}`)}
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
                  onClick={handleTreeOnClick}
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
                  <Route path={`${preUrl}/info/:BIZGRP_ID`} component={BizInfo} />
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
  handleChangeSelectedIndex: PropTypes.func.isRequired,
  appBizGubun: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    // 테스트
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
