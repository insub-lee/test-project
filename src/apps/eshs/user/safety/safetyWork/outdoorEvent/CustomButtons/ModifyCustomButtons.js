import React, { Component } from 'react';
import { Popconfirm } from 'antd';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

class CustomButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { sagaKey: id, reloadId, viewPageData, changeViewPage, deleteTask, isLoading, saveBeforeProcess } = this.props;
    return (
      <div className="alignRight">
        {viewPageData.taskSeq !== -1 && (
          <>
            <StyledButton className="btn-primary" onClick={() => saveBeforeProcess(id, reloadId || id)} loading={isLoading}>
              저장
            </StyledButton>
            <Popconfirm
              title="Are you sure delete this task?"
              onConfirm={() => deleteTask(id, reloadId, viewPageData.workSeq, viewPageData.taskSeq, changeViewPage)}
              okText="Yes"
              cancelText="No"
            >
              <StyledButton className="btn-primary">삭제</StyledButton>
            </Popconfirm>
            <StyledButton className="btn-primary" onClick={() => alert('결재선  준비중')}>
              결재선
            </StyledButton>
          </>
        )}
      </div>
    );
  }
}

export default CustomButtons;
