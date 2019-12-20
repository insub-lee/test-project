import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// import { Route } from 'react-router-dom';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { intlObj, lang } from 'utils/commonUtils';
import * as feed from 'components/Feedback/functions';
import StyledButton from 'components/Button/StyledButton';
import messages from '../messages';

import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';

import { AppIntroduction } from '../../../UserStore/AppMain/AppDetail/AppScreenshot/StyleAppScreenShot';
import AppQna from '../../../UserStore/AppMain/AppDetail/AppQna';
import GroupRating from '../../../UserStore/AppMain/AppDetail/BizGroupRating';
class BizInfo extends Component {
  componentDidMount() {
    const {
      match: {
        params: { BIZGRP_ID },
      },
      handleGetBizInfo,
      handleGetBizFeedBackList,
    } = this.props;

    handleGetBizInfo(BIZGRP_ID);
    handleGetBizFeedBackList(BIZGRP_ID, 'F');
    handleGetBizFeedBackList(BIZGRP_ID, 'Q');
  }

  componentDidUpdate(prevProps) {
    const {
      match: {
        params: { BIZGRP_ID },
      },
      handleGetBizInfo,
      handleGetBizFeedBackList,
    } = this.props;
    const {
      match: {
        params: { BIZGRP_ID: prevBizGrpID },
      },
    } = prevProps;

    if (BIZGRP_ID !== prevBizGrpID) {
      handleGetBizInfo(BIZGRP_ID);
      handleGetBizFeedBackList(BIZGRP_ID, 'F');
      handleGetBizFeedBackList(BIZGRP_ID, 'Q');
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
    const {
      bizInfo,
      match: {
        params: { BIZGRP_ID },
      },
    } = this.props;

    return (
      <div>
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
        <AppQna appId={BIZGRP_ID} gubun="b" />
        <GroupRating appId={BIZGRP_ID}></GroupRating>
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
  bizInfo: selectors.makgeBizInfo(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'bizCardDetailInfo', reducer });
const withSaga = injectSaga({ key: 'bizCardDetailInfo', saga });

export default compose(withReducer, withSaga, withConnect)(BizInfo);
