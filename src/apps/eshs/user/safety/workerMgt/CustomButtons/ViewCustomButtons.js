import React, { Component } from 'react';
import { Popconfirm } from 'antd';
import StyledButton from 'components/BizBuilder/styled/StyledButton';

class CustomButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  builderModalClose = () => {
    const { changeBuilderModalStateByParent } = this.props;
    changeBuilderModalStateByParent(false, 'INPUT', -1, -1);
  };

  render() {
    // eslint-disable-next-line react/prop-types
    const { sagaKey: id, reloadId, viewPageData, changeViewPage, deleteTask, isBuilderModal } = this.props;
    // console.debug('changeViewPage-체크', changeViewPage);
    // console.debug('isBuilderModal-체크', isBuilderModal);
    // console.debug('viewPageData.taskSeq', viewPageData.taskSeq);
    return (
      <div className="alignRight">
        {viewPageData.taskSeq !== -1 && (
          <>
            <StyledButton className="btn-primary" onClick={() => alert('결재서비스 준비중')}>
              결재
            </StyledButton>
            <Popconfirm
              title="Are you sure delete this task?"
              onConfirm={() => deleteTask(id, reloadId, viewPageData.workSeq, viewPageData.taskSeq, changeViewPage)}
              okText="Yes"
              cancelText="No"
            >
              <StyledButton className="btn-primary">삭제</StyledButton>
            </Popconfirm>
          </>
        )}
      </div>
    );
  }
}

export default CustomButtons;
