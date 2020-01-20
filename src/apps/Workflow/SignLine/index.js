import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Icon, Input } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';

import StyledSignLine from './StyledSignLine';

class SignLine extends Component {
  componentDidMount() {
    const { draftId } = this.props;
    if (draftId !== -1) {
      this.props.getDraftPrcRule(draftId);
    }
  }

  render() {
    const { draftPrcRule } = this.props;
    const { processStep, processStepUsers } = draftPrcRule;

    let signline = [];
    let filterItem = [];

    if (processStepUsers !== undefined) {
      signline = processStepUsers.filter(item => item.VIEW_TYPE === 1);
    }
    if (processStep !== undefined) {
      filterItem = processStep.filter(item => item.VIEW_TYPE === 2);
    }

    return (
      <StyledSignLine>
        <div className="signLineWrapper">
          {signline !== undefined && signline.length > 0 && (
            <React.Fragment>
              <Row gutter={0} type="flex" justify="end" className="table-head">
                {signline.map(item => (
                  <Col span={3} key={`prcHerder_${item.NODE_ID}_${item.USER_INFO.USER_ID}`}>
                    <div>
                      <span>{item.NODE_NAME_KOR}</span>
                    </div>
                  </Col>
                ))}
              </Row>
              <Row gutter={0} type="flex" justify="end">
                {signline.map(item => (
                  <Col span={3} key={`prcBody_${item.NODE_ID}_${item.USER_INFO.USER_ID}`}>
                    <div className="wp_bodyCol">
                      <span>{`${item.USER_INFO.NAME_KOR} ${item.USER_INFO.PSTN_NAME_KOR}`}</span>
                      {item.USER_INFO.STATUS !== undefined && (
                        <div className="sign_img">
                          {item.USER_INFO.STATUS === 1 && (
                            <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" style={{ margin: '5px', fontSize: '65px', opacity: '0.5' }} />
                          )}
                          {item.USER_INFO.STATUS === 9 && (
                            <Icon type="close-circle" theme="twoTone" twoToneColor="#fe0101" style={{ margin: '5px', fontSize: '65px', opacity: '0.5' }} />
                          )}
                        </div>
                      )}
                    </div>
                  </Col>
                ))}
              </Row>
            </React.Fragment>
          )}
        </div>
        <div className="dataWrapper">
          {filterItem.length > 0 &&
            filterItem.map(item => (
              <Row key={`prcItem_${item.NODE_ID}`} type="flex">
                <Col span={4} className="dataLabel">
                  <span>{item.NODE_NAME_KOR}</span>
                </Col>
                <Col span={20} className="dataContents">
                  {item.APPV_MEMBER !== undefined ? (
                    <Input
                      value={item.APPV_MEMBER.map(user => (item.NODE_TYPE === 'ND' ? `${user.DEPT_NAME_KOR}` : `${user.NAME_KOR} ${user.PSTN_NAME_KOR}`))}
                      readOnly
                    />
                  ) : (
                    <Input placeholder={item.NODE_NAME_KOR} readOnly />
                  )}
                </Col>
              </Row>
            ))}
        </div>
      </StyledSignLine>
    );
  }
}

SignLine.propTypes = {
  draftId: PropTypes.number,
  draftPrcRule: PropTypes.object,
  getDraftPrcRule: PropTypes.func,
};

SignLine.defaultProps = {
  draftId: -1,
  draftPrcRule: {},
};

const mapStateToProps = createStructuredSelector({
  draftPrcRule: selectors.makeSelectDraftPrcRule(),
});

const mapDispatchToProps = dispatch => ({
  getDraftPrcRule: draftId => dispatch(actions.getDraftPrcRule(draftId)),
});

const withReducer = injectReducer({
  key: 'apps.WorkFlow.SignLine.reducer',
  reducer,
});

const withSaga = injectSaga({
  key: 'apps.WorkFlow.SignLine.saga',
  saga,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withSaga,
  withReducer,
  withConnect,
)(SignLine);
