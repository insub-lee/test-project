import React, { Component } from 'react';
import { Popconfirm } from 'antd';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

class CustomButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { sagaKey: id, reloadId, viewPageData, changeViewPage, deleteTask, isLoading, saveBeforeProcess, workSeq } = this.props;

    const customDeleteCallback = () => {
      const { viewPageData, setViewPageData, sagaKey: id, changeViewPage } = this.props;
      message.success(<MessageContent>야외행사 신청 정보를 삭제하였습니다.</MessageContent>);
      setViewPageData(id, workSeq, -1, 'MODIFY');
      changeViewPage(id, workSeq, -1, 'MODIFY');
    };

    return (
      <div className="alignRight">
        {viewPageData.taskSeq !== -1 && (
          <>
            <StyledButton className="btn-primary btn-sm btn-first" onClick={() => saveBeforeProcess(id, reloadId || id)} loading={isLoading}>
              저장
            </StyledButton>
            <Popconfirm
              title="Are you sure delete this task?"
              onConfirm={() => deleteTask(id, reloadId, viewPageData.workSeq, viewPageData.taskSeq, customDeleteCallback)}
              okText="Yes"
              cancelText="No"
            >
              <StyledButton className="btn-light btn-sm btn-first">삭제</StyledButton>
            </Popconfirm>
            <StyledButton className="btn-gray btn-sm" onClick={() => alert('결재선  준비중')}>
              결재선
            </StyledButton>
          </>
        )}
      </div>
    );
  }
}

export default CustomButtons;
