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
import HelperWidget from './helperWidget';
import StyleWidget from './StyleWidget';

class Widget extends PureComponent {
  state = {
    toggle: true,
  };

  HandleCategorieChange = (PRNT_ID) => {
    this.props.getDetail(PRNT_ID);

    this.resetKeyword();
  };

  handleToggle = () => {
    const { toggle } = this.state;
    this.setState({
      toggle: !toggle,
    });
    this.props.removeDetail();
    this.resetKeyword();
  };

  resetKeyword = () => {
    this.props.saveSearchWord('');
  };

  searchClick = (text) => {
    if (this.state.toggle) {
      this.props.getSearch({ KEYWORD: text, type: 'group' });
    } else {
      this.props.getSearch({ KEYWORD: text, type: 'menu' });
    }
    this.props.saveSearchWord(text);
  };

  render() {
    const { detail, widgetSize, searchWord } = this.props;

    return (
      <StyleWidget>
        <HelperWidget widgetSize={widgetSize} detail={detail} toggle={this.state.toggle} searchClick={this.searchClick} searchWord={searchWord} />
      </StyleWidget>
    );
  }
}
Widget.propTypes = {
  getDetail: PropTypes.func,
  getSearch: PropTypes.func,
  removeDetail: PropTypes.func,
  saveWidgetSize: PropTypes.func,
  saveSearchWord: PropTypes.func,
  title: PropTypes.object,
  detail: PropTypes.array,
  menu: PropTypes.object,
  widgetSize: PropTypes.object,
  searchWord: PropTypes.string,
};

Widget.defaultProps = {
  detail: [],
  widgetSize: { width: '5', height: '220px' },
};

const mapStateToProps = createStructuredSelector({
  menu: selectors.makeSelectMenu(),
  detail: selectors.makeSelectDetail(),
  widgetSize: selectors.makeSelectwidgetSize(),
  searchWord: selectors.makeSearchWord(),
});

const mapDispatchToProps = dispatch => ({
  getDetail: PRNT_ID => dispatch(actions.getDetail(PRNT_ID)),
  getSearch: payload => dispatch(actions.getSearch(payload)),
  removeDetail: () => dispatch(actions.removeDetail()),
  saveWidgetSize: widgetSize => dispatch(actions.saveWidgetSize(widgetSize)),
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
