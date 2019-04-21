import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';

class Sample extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
    };
    this.props.getStart('1');
  }

  render() {
    const loopTest = data =>
      data.map(item => (
        <li key={item.key}>
          {item.appstate}/{item.bizgroup}/{item.apps}/{item.appver}/{item.updatedata}/{item.state}
        </li>
      ));
    return (
      <div>
        <h2>sample</h2>
        <h3>string 타입 결과값</h3>
        <p>{this.props.setStart}</p>
        {/* {this.props.setFakelist1} */}
        <h3>배열 타입 결과값</h3>
        <ui>
          {loopTest(this.props.setFakelist1)}
        </ui>
        <hr />
        <h2>개발에 도움이 되는 문서들</h2>
        <p><a href="http://portalloc.skhynix.com/guide/Button" target="_blank" rel="noopener noreferrer">개발자 가이드 클릭</a></p>
        <p><a href="http://adazzle.github.io/react-data-grid/docs/examples/simple-grid" target="_blank" rel="noopener noreferrer">React Data Grid 예시 클릭</a></p>
        <p><a href="https://isomorphic.redq.io/dashboard" target="_blank" rel="noopener noreferrer">antd component 예시 클릭</a></p>
        <p><a href="http://portaldev.skhynix.com/store/appMain/MyApp" target="_blank" rel="noopener noreferrer">그리드 이용 개발 예시 클릭</a></p>
      </div>
    );
  }
}

Sample.propTypes = {
  getStart: PropTypes.func, //eslint-disable-line
  setStart: PropTypes.string, //eslint-disable-line
  setFakelist1: PropTypes.array, //eslint-disable-line
};

const mapDispatchToProps = dispatch => (
  {
    getStart: (num) => { dispatch(actions.getStart(num)); },
  }
);

const mapStateToProps = createStructuredSelector({
  setStart: selectors.makeSelectSetStart(),
  setFakelist1: selectors.makeSelectSetFakelist1(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'sample', saga });
const withReducer = injectReducer({ key: 'sample', reducer });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Sample);
