import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';
import { lang } from 'utils/commonUtils';
import _ from 'lodash';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import ErrorBoundary from 'containers/common/ErrorBoundary';
import AppSelector from 'components/appSelector/index';
import * as selectors from './selectors';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';

import Page from '../Page';

class PageInfo extends Component {
  constructor(props) {
    super(props);

    const { match } = props;
    const { params } = match;
    const { PAGE_ID } = params;

    this.state = {
      PAGE_ID: Number(PAGE_ID),
      show: false,
    };

    this.props.getWidgetList(Number(PAGE_ID));
  }

  componentWillReceiveProps(nextProps) {
    const { match } = nextProps;
    const { params } = match;
    const { PAGE_ID } = params;

    if (PAGE_ID && this.state.PAGE_ID !== Number(PAGE_ID)) {
      this.setState({
        PAGE_ID: Number(PAGE_ID),
      });
      this.props.getWidgetList(Number(PAGE_ID));
    }
  }

  render() {
    const { PAGE_ID } = this.state;
    const {
      widgetList,
      deleteWidget,
      addWidgets,
      moveMyWidget,
      updateWidget,
      // history,
    } = this.props;

    const handleMoveMyWidget = layout => moveMyWidget(PAGE_ID, layout);

    const openModal = () => {
      this.setState({
        show: true,
      });
    };

    const closeModal = () => {
      this.setState({
        show: false,
      });
    };

    /* widgetList 변경 */
    const cWidgetList = _.clone(widgetList); // 복제
    const { length } = cWidgetList;
    let ord = 1;
    // 1. 각 위젯 삭제함수 부여
    for (let i = 0; i < length; i += 1) {
      cWidgetList[i].title = lang.get('NAME', cWidgetList[i]);
      cWidgetList[i].user.isTitle = true;
      cWidgetList[i].fixed = false;
      cWidgetList[i].updateWidget = updateWidget;
      cWidgetList[i].deleteWidget = deleteWidget;
      cWidgetList[i].basic.functions.push('settings');
      cWidgetList[i].basic.functions.push('delete');
      cWidgetList[i].basic.path = 'AdminMain/AppStore/PageInfo/BasicWidget/index';
      if (i === length - 1) {
        ord = cWidgetList[i].ord + 1;
      }
    }
    // 2. 마지막 순서에 addWidgets Component 추가
    cWidgetList[length] = {
      PAGE_ID,
      title: '',
      id: '0',
      position: [0, 0, 5, 1],
      ord,
      fixed: false,
      isAuth: true,
      // link: 'http://iflowdev.com',
      openModal,
      basic: {
        isTitle: false,
        functions: [],
        path: 'AdminMain/AppStore/PageInfo/AddWidget/index',
      },
      user: {
        isTitle: false,
      },
    };

    const addList = app => {
      const widgetArr = [];
      for (let i = 0; i < app.length; i += 1) {
        widgetArr.push(app[i].APP_ID);
      }

      if (widgetArr.length > 0) {
        addWidgets(PAGE_ID, widgetArr);
      }
    };

    return (
      <div>
        <ErrorBoundary>
          <Page columns={cWidgetList} moveMyWidget={handleMoveMyWidget} />
        </ErrorBoundary>

        <ErrorBoundary>
          <AppSelector type="widget" isAdmin show={this.state.show} closeModal={closeModal} addList={addList} style={{ marginTop: 570 }} />
        </ErrorBoundary>
      </div>
    );
  }
}

PageInfo.propTypes = {
  match: PropTypes.object.isRequired,
  widgetList: PropTypes.arrayOf(PropTypes.object).isRequired,
  getWidgetList: PropTypes.func.isRequired,
  deleteWidget: PropTypes.func.isRequired,
  addWidgets: PropTypes.func.isRequired,
  moveMyWidget: PropTypes.func.isRequired,
  updateWidget: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    getWidgetList: PAGE_ID => dispatch(actions.getWidgetList(PAGE_ID)),
    deleteWidget: WIDGET_ID => dispatch(actions.deleteWidget(WIDGET_ID)),
    addWidgets: (PAGE_ID, APP_IDS) => dispatch(actions.addWidgets(PAGE_ID, APP_IDS)),
    moveMyWidget: (PAGE_ID, layout) => dispatch(actions.moveMyWidget(PAGE_ID, layout)),
    updateWidget: (WIDGET_ID, data) => dispatch(actions.updateWidget(WIDGET_ID, data)),
  };
}

const mapStateToProps = createStructuredSelector({
  // 카테고리
  widgetList: selectors.makeWidgetList(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'admin/AdminMain/AppStore/PageInfo', reducer });
const withSaga = injectSaga({ key: 'admin/AdminMain/AppStore/PageInfo', saga });

export default injectIntl(compose(withReducer, withSaga, withConnect)(PageInfo));
