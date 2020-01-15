import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';
import MdcsContentView from 'components/MdcsContentView';

// import Viewer from './viewer';

class SearchViewer extends Component {
  render() {
    // return <BizBuilderBase sagaKey="SearchViewer" component={MdcsContentView} viewType="VIEW" {...this.props} />;
    console.debug(this.props);
    const { workSeq, taskSeq, draftId } = this.props;
    return (
      <BizBuilderBase
        sagaKey="SearchView"
        viewType="VIEW"
        CustomViewPage={MdcsContentView}
        workSeq={workSeq}
        taskSeq={taskSeq}
        draftId={draftId}
        // metaSeq={selectedRow && selectedRow.RULE_CONFIG.META_SEQ}
        selectedRow={{ WORK_SEQ: workSeq, TASK_SEQ: taskSeq, DRAFT_ID: draftId, RULE_CONFIG: {} }}
        // changeWorkflowFormData={this.changeWorkflowFormData}
      />
    );
  }
}

SearchViewer.propTypes = {
  workSeq: PropTypes.number, // 뷰 필수
  taskSeq: PropTypes.number, // 뷰 필수
  closeBtnUseYn: PropTypes.bool, // 하단 버튼 사용여부
  closeBtnFunc: PropTypes.func, // closeBtn Func
};

SearchViewer.defaultProps = {
  workSeq: 913,
  taskSeq: 10678,
  closeBtnFunc: () => false,
  closeBtnUseYn: true,
};

export default SearchViewer;
