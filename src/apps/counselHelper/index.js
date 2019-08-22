import React, { PureComponent } from 'react';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import reducer from './reducer';
import saga from './saga';
import selectors from './selectors';
import * as actions from './actions';
import Config from './config';
import HelperWidget from './helperWidget';
import StyleWidget from './StyleWidget';

class Widget extends PureComponent {
  constructor(props) {
    super(props);
    this.props.getDetail([2874]);
  }

  searchClick = text => {
    this.props.saveSearchWord(text);
    console.log(this.props.item);
  };
  render() {
    const { detail, searchWord } = this.props;

    return (
      <StyleWidget>
        <HelperWidget detail={detail} searchClick={this.searchClick} searchWord={searchWord} />
      </StyleWidget>
    );
  }
}
Widget.propTypes = {
  getDetail: PropTypes.func,
  saveSearchWord: PropTypes.func,
  detail: PropTypes.array,
  searchWord: PropTypes.string,
};

Widget.defaultProps = {
  detail: [],
};

const mapStateToProps = createStructuredSelector({
  detail: selectors.makeSelectDetail(),
  searchWord: selectors.makeSearchWord(),
});

const mapDispatchToProps = dispatch => ({
  getDetail: PRNT_ID => dispatch(actions.getDetail(PRNT_ID)),
  saveSearchWord: text => dispatch(actions.saveSearchWord(text)),
});

const withReducer = injectReducer({ key: 'apps-Widget', reducer });
const withSaga = injectSaga({ key: 'apps-Widget', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Widget);
