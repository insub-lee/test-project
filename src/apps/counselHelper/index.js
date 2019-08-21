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
    this.props.getWidgetInfo();
  }

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
      this.props.getSearch({ KEYWORD: text });
    } else {
      this.props.getSearch({ KEYWORD: text });
    }
    this.props.saveSearchWord(text);
  };

  changeSize = (param) => {
    const size = param;
    let width = 5;
    let height = '220px';
    switch (size) {
      case '1x1':
        break;
      case '1x2':
        height = '440px';
        break;
      case '2x1':
        width = 10;
        break;
      default:
        break;
    }
    this.props.saveWidgetSize({ width, height });
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
  getWidgetInfo: PropTypes.func,
  getDetail: PropTypes.func,
  getSearch: PropTypes.func,
  removeDetail: PropTypes.func,
  saveWidgetSize: PropTypes.func,
  saveSearchWord: PropTypes.func,
  categorie: PropTypes.array,
  detail: PropTypes.array,

  searchWord: PropTypes.string,
};

Widget.defaultProps = {
  detail: [],
};

const mapStateToProps = createStructuredSelector({
  categorie: selectors.makeSelectWidget(),
  menu: selectors.makeSelectMenu(),
  detail: selectors.makeSelectDetail(),
  widgetSize: selectors.makeSelectwidgetSize(),
  searchWord: selectors.makeSearchWord(),
});

const mapDispatchToProps = dispatch => ({
  getWidgetInfo: () => dispatch(actions.getWidgetInfo()),
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
