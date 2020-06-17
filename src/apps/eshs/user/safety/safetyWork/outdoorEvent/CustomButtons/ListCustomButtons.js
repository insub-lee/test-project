import React, { Component } from 'react';
import { Popconfirm } from 'antd';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

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
        {viewPageData.taskSeq !== -1 && viewPageData.viewType === 'VIEW' && (
          <>
            <StyledButton className="btn-primary" onClick={() => changeViewPage(id, viewPageData.workSeq, viewPageData.taskSeq, 'MODIFY')}>
              수정
            </StyledButton>
            <Popconfirm
              title="Are you sure delete this task?"
              onConfirm={() => deleteTask(id, reloadId, viewPageData.workSeq, viewPageData.taskSeq, !isBuilderModal ? changeViewPage : this.builderModalClose)}
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
