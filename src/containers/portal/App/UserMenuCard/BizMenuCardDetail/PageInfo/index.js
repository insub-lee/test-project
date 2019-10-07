import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { lang } from 'utils/commonUtils';
import _ from 'lodash';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';

import BizStorePage from '../../../UserStore/components/BizStorePage';

class PageInfo extends PureComponent {
  componentDidMount() {
    const {
      match: {
        params: { TYPE, pageId },
      },
    } = this.props;
    const params = {
      pageType: TYPE,
      PAGE_ID: pageId,
    };
    this.props.getWidgetList(params);
  }

  componentWillReceiveProps(nextProps) {
    const {
      match: {
        params: { TYPE, pageId },
      },
    } = nextProps;
    const {
      match: {
        params: {
          pageId: { propsPageId },
        },
      },
    } = this.props;
    const params = {
      pageType: TYPE,
      PAGE_ID: pageId,
    };
    if (propsPageId && propsPageId !== pageId) {
      this.props.getWidgetList(params);
    } else if (!propsPageId) {
      this.props.getWidgetList(params);
    }
  }

  render() {
    const { widgetList, pageInfoData, execPage, execMenu } = this.props;
    /* widgetList를 미리보기용으로 변경 */
    const cWidgetList = _.clone(widgetList); // 복제
    const { length } = cWidgetList;

    for (let i = 0; i < length; i += 1) {
      cWidgetList[i].title = lang.get('NAME', cWidgetList[i]);
      // cWidgetList[i].isTitle = true;
      cWidgetList[i].user.isTitle = true;
      cWidgetList[i].fixed = false;
      cWidgetList[i].basic.path = 'AppMain/Biz/BizDetail/PageInfo/BasicWidget/index';
    }

    return (
      <div>
        <BizStorePage columns={this.props.widgetList} pageInfoData={pageInfoData} execPage={execPage} execMenu={execMenu} />
      </div>
    );
  }
}

PageInfo.propTypes = {
  match: PropTypes.object.isRequired,
  getWidgetList: PropTypes.func.isRequired,
  widgetList: PropTypes.arrayOf(PropTypes.object).isRequired,
  pageInfoData: PropTypes.object.isRequired,
  execPage: PropTypes.func.isRequired,
  execMenu: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    getWidgetList: params => dispatch(actions.getWidgetList(params)),
  };
}

const mapStateToProps = createStructuredSelector({
  widgetList: selectors.makeWidgetList(),
  pageInfoData: selectors.makePageInfoData(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({ key: 'portal_bizMenuCard_PageInfo', reducer });
const withSaga = injectSaga({ key: 'portal_bizMenuCard_PageInfo', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PageInfo);
