import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import BizStorePage from 'containers/store/components/BizStorePage';
import { lang } from 'utils/commonUtils';
import _ from 'lodash';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';

class PageInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      PAGE_ID: props.match.params.pageId,
    };
    this.props.getWidgetList(Number(this.state.PAGE_ID));
  }

  componentWillReceiveProps(nextProps) {
    const { match } = nextProps;
    const { params } = match;
    const { pageId } = params;

    if (pageId && this.state.PAGE_ID !== pageId) {
      this.setState({
        PAGE_ID: pageId,
      });
      this.props.getWidgetList(Number(pageId));
    }
  }

  render() {
    const { widgetList } = this.props;

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
        <BizStorePage columns={this.props.widgetList} />
      </div>
    );
  }
}

PageInfo.propTypes = {
  match: PropTypes.object.isRequired,
  getWidgetList: PropTypes.func.isRequired,
  widgetList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    getWidgetList: PAGE_ID => dispatch(actions.getWidgetList(PAGE_ID)),
  };
}

const mapStateToProps = createStructuredSelector({
  widgetList: selectors.makeWidgetList(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'bizPage', reducer });
const withSaga = injectSaga({ key: 'bizPage', saga });

export default compose(withReducer, withSaga, withConnect)(PageInfo);
