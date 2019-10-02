import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import saga from './saga';
import reducer from './reducer';
import * as actions from './actions';
import Styled from './Styled';

class Counsel extends Component {
  componentDidMount() {}

  render() {
    return (
      <Styled>
        <div className="listWrap">
          <div className="listForm">
            <div className="item item01">
              <button type="button" onClick={() => this.props.pushCounselHelperKeyword('')}>
                <span className="item-deco">
                  <span className="icon" />
                  <span className="txt">전체</span>
                </span>
                <span className="item-tit">
                  <strong className="txt">전체</strong>
                  {/* <span className="num">1</span> */}
                </span>
              </button>
            </div>
            <div className="item item01">
              <button type="button" onClick={() => this.props.pushCounselHelperKeyword('신용대출')}>
                <span className="item-deco">
                  <span className="icon" />
                  <span className="txt">대출</span>
                </span>
                <span className="item-tit">
                  <strong className="txt">신용대출</strong>
                  {/* <span className="num">1</span> */}
                </span>
              </button>
            </div>
            <div className="item item02">
              <button type="button" onClick={() => this.props.pushCounselHelperKeyword('적금')}>
                <span className="item-deco">
                  <span className="icon" />
                  <span className="txt">예금</span>
                </span>
                <span className="item-tit">
                  <strong className="txt">적금</strong>
                  {/* <span className="num">2</span> */}
                </span>
              </button>
            </div>
            <div className="item item03">
              <button type="button" onClick={() => this.props.pushCounselHelperKeyword('담보대출')}>
                <span className="item-deco">
                  <span className="icon" />
                  <span className="txt">전자금융</span>
                </span>
                <span className="item-tit">
                  <strong className="txt">담보대출</strong>
                  {/* <span className="num">3</span> */}
                </span>
              </button>
            </div>
            <div className="item item04">
              <button type="button" onClick={() => this.props.pushCounselHelperKeyword('업무그룹명')}>
                <span className="item-deco">
                  <span className="icon" />
                  <span className="txt">기타</span>
                </span>
                <span className="item-tit">
                  <strong className="txt">업무그룹명</strong>
                  {/* <span className="num">4</span> */}
                </span>
              </button>
            </div>
          </div>
        </div>
      </Styled>
    );
  }
}

Counsel.propTypes = {
  pushCounselHelperKeyword: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = dispatch => ({
  pushCounselHelperKeyword: keyword => dispatch(actions.pushCounselHelperKeyword(keyword)),
});

const withSaga = injectSaga({ key: 'apps.manual.user.Counsel', saga });
const withReducer = injectReducer({ key: 'apps.manual.user.Counsel', reducer });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withSaga,
  withReducer,
  withConnect,
)(Counsel);
