import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// import { Route } from 'react-router-dom';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import ErrorBoundary from 'containers/common/ErrorBoundary';

import { intlObj, lang } from 'utils/commonUtils';
import * as feed from 'components/Feedback/functions';
import StyledButton from 'components/Button/StyledButton';
import messages from '../messages';

import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';

import { AppIntroduction } from '../../../AppDetail/AppScreenshot/StyleAppScreenShot';
import AppQna from '../../../AppDetail/AppQna/index';

class BizInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      BIZGRP_ID: '',
    };
  }

  componentWillMount() {
    const { match } = this.props;
    const { params } = match;
    const { BIZGRP_ID } = params;

    this.props.handleGetBizInfo(BIZGRP_ID);
    this.props.handleGetBizFeedBackList(BIZGRP_ID, 'F');
    this.props.handleGetBizFeedBackList(BIZGRP_ID, 'Q');

    this.setState({
      BIZGRP_ID,
    });
  }

  componentWillReceiveProps(nextProps) {
    const { match } = nextProps;
    const { params } = match;
    const { BIZGRP_ID } = params;

    if (BIZGRP_ID && this.state.BIZGRP_ID !== BIZGRP_ID) {
      this.props.handleGetBizInfo(BIZGRP_ID);
      this.props.handleGetBizFeedBackList(BIZGRP_ID, 'F');
      this.props.handleGetBizFeedBackList(BIZGRP_ID, 'Q');
      this.setState({
        BIZGRP_ID,
      });
    }
  }

  onClickUserManual = (flag, url) => {
    if (flag === 'L') {
      window.open(url);
    } else if (flag === 'F') {
      window.location.assign(url);
    } else {
      feed.error(`${intlObj.get(messages.noManual)}`);
    }
  };

  render() {
    const { BIZGRP_ID } = this.state;

    const { bizInfo } = this.props;

    // console.log(BIZGRP_ID);

    return (
      <div>
        <ErrorBoundary>
          <AppIntroduction style={{ padding: '0 0 20px 0', border: 'none' }}>
            <div className="title-wrapper">
              <h2 className="adTitle">{intlObj.get(messages.appdscr)}</h2>
              <StyledButton
                type="button"
                className="btn-outline-secondary btn-sm"
                onClick={() => this.onClickUserManual(bizInfo.MANUAL_TYPE, bizInfo.MANUAL_PATH)}
              >
                {intlObj.get(messages.userManual)}
              </StyledButton>
            </div>
            <div className="dscr">{lang.get('DSCR', bizInfo)}</div>
          </AppIntroduction>
        </ErrorBoundary>
        <ErrorBoundary>
          <AppQna appId={BIZGRP_ID} gubun="b" />
        </ErrorBoundary>
      </div>
    );
  }
}

BizInfo.propTypes = {
  match: PropTypes.object.isRequired,
  bizInfo: PropTypes.object.isRequired,

  handleGetBizInfo: PropTypes.func.isRequired,
  handleGetBizFeedBackList: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    handleGetBizInfo: BIZGRP_ID => dispatch(actions.getBizInfo(BIZGRP_ID)),
    handleGetBizFeedBackList: (BIZGRP_ID, BOARD_TYPE) => dispatch(actions.getBizFeedBackList(BIZGRP_ID, BOARD_TYPE)),
  };
}

const mapStateToProps = createStructuredSelector({
  // 테스트
  bizInfo: selectors.makgeBizInfo(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'admin/AdminMain/Menu/BizMenuReg/BizInfo', reducer });
const withSaga = injectSaga({ key: 'admin/AdminMain/Menu/BizMenuReg/BizInfo', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(BizInfo);
