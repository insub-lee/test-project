import React, { Component } from 'react';

class ProcessView extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { id, submitHandlerBySaga, selectedRow } = this.props;
    const { DRAFT_ID, WORK_SEQ, TASK_SEQ } = selectedRow;
    const fixUrl = `/api/builder/v1/work/task/${WORK_SEQ}/${TASK_SEQ}`;
    // const fixUrl = '/api/workflow/v1/common/process/ProcessPreviewHandler';

    submitHandlerBySaga(id, 'POST', fixUrl, {}, this.initDataBind);
  }

  initDataBind = response => {
    console.debug('initDAtaBViux', response);
  };

  render() {
    return 'view';
  }
}

export default ProcessView;
