import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import BizBuilderBase from '../../components/BizBuilderBase';

import reducer from './reducer';
import saga from './saga';
import selectors from './selectors';
import * as actions from './actions';
import Edit from './Edit';
import List from './List';

class DocApproverManage extends Component {
  componentDidMount() {
    const { getCategoryMapList, categoryMapId, draftMapId, degreeMapId, approverMapId } = this.props;
    getCategoryMapList(categoryMapId, draftMapId, degreeMapId, approverMapId);
  }

  render() {
    const { item, categoryMapInfo, draftMapInfo, degreeMapInfo, approverMapInfo, taskSeq, setTaskSeq } = this.props;
    const widgetId = item && item.WIDGET_ID ? item.WIDGET_ID : -1;
    const WORK_SEQ = item && item.data && item.data.WORK_SEQ ? item.data.WORK_SEQ : 1030; // 779
    return (
      <div>
        <BizBuilderBase
          id={`${widgetId}_Edit`}
          component={Edit}
          workSeq={WORK_SEQ}
          viewType="INPUT"
          categoryMapInfo={categoryMapInfo}
          draftMapInfo={draftMapInfo}
          degreeMapInfo={degreeMapInfo}
          approverMapInfo={approverMapInfo}
          reload_id={`${widgetId}_List`}
        />
        {/* <List id={`${widgetId}_List`} /> */}
        <BizBuilderBase
          id={`${widgetId}_List`}
          viewType="LIST"
          component={List}
          workSeq={WORK_SEQ}
          categoryMapInfo={categoryMapInfo}
          apiInfo={{
            url: '/api/mdcs/v1/common/DocApproverManageList',
            type: 'GET',
            params: {},
          }}
          setFormDataId={`${widgetId}_Edit`}
        />
      </div>
    );
  }
}

DocApproverManage.propTypes = {
  categoryMapId: PropTypes.number,
  draftMapId: PropTypes.number,
  degreeMapId: PropTypes.number,
  approverMapId: PropTypes.number,
  categoryMapInfo: PropTypes.object,
  draftMapInfo: PropTypes.object,
  degreeMapInfo: PropTypes.object,
  approverMapInfo: PropTypes.object,
  getCategoryMapList: PropTypes.func,
  item: PropTypes.object,
  taskSeq: PropTypes.number,
};

DocApproverManage.defaultProps = {
  categoryMapId: 3,
  draftMapId: 4,
  degreeMapId: 5,
  approverMapId: 6,
  categoryMapInfo: fromJS([]),
  draftMapInfo: fromJS([]),
  degreeMapInfo: fromJS([]),
  approverMapInfo: fromJS([]),
  getCategoryMapList: () => false,
  item: {},
  taskSeq: -1,
};

const mapStateToProps = createStructuredSelector({
  categoryMapInfo: selectors.makeSelectCategoryMapList(),
  draftMapInfo: selectors.makeSelectDraftMapList(),
  degreeMapInfo: selectors.makeSelectDegreeMapList(),
  approverMapInfo: selectors.makeSelectApproverMapList(),
  taskSeq: selectors.makeSelectedTaskSeq(),
});

const mapDispatchToProps = dispatch => ({
  getCategoryMapList: (mapId, draftMapId, degreeMapId, approverMapId) =>
    dispatch(actions.getCategoryMapListBySaga(mapId, draftMapId, degreeMapId, approverMapId)),
  // getListData: (key, workSeq) => dispatch(actions.getDocApproverListBySaga(key, workSeq)),
  setTaskSeq: taskSeq => dispatch(actions.setTaskSeqByReducr(taskSeq)),
});

const withReducer = injectReducer({ key: 'apps-mdcs-admin-DocApproverManage-reducer', reducer });
const withSaga = injectSaga({ key: 'apps-mdcs-admin-DocApproverManage-saga', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withSaga,
  withReducer,
  withConnect,
)(DocApproverManage);
