import * as PropTypes from 'prop-types';
import React from 'react';
import { Input, Button, Modal } from 'antd';
import StyledButton from 'components/BizBuilder/styled/StyledButton';
import BizBuilderBase from 'components/BizBuilderBase';
import CustomList from 'apps/eshs/admin/environment/air/stack/List';

class MsdsHeaderBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }

  componentDidMount() {}

  handleSearch = () => {
    const { sagaKey: id, changeViewPage, formData } = this.props;
    const task_seq = (formData && formData.selectedRowTaskSeq) || 0;
    if (task_seq) {
      console.debug('여기는 handleSearch ', task_seq);
      changeViewPage(id, 3161, task_seq, 'MODIFY');
    }
  };

  onChangeSave = type => {
    const { saveTask, modifyTask, deleteTask, sagaKey: id, changeViewPage, viewPageData } = this.props;
    if (type === 'S') {
      saveTask(id, id, this.saveTaskAfter);
    } else if (type === 'M') {
      modifyTask(id, this.saveTaskAfter);
    } else if (type === 'D') {
      deleteTask(id, id, viewPageData.workSeq, viewPageData.taskSeq, changeViewPage, this.deleteCallBack);
    }
  };

  deleteCallBack = () => {
    const { sagaKey: id, changeViewPage, viewPageData } = this.props;
    changeViewPage(id, viewPageData.workSeq, -1, 'INPUT');
  };

  saveTaskAfter = (id, workSeq, taskSeq, formData) => {
    const { changeViewPage } = this.props;
    changeViewPage(id, workSeq, taskSeq, 'MODIFY');
  };

  isModalChange = record => {
    const { setViewPageData, sagaKey: id, changeViewPage, handleModalVisible } = this.props;
    handleModalVisible();
    if (record) {
      setViewPageData(id, record.WORK_SEQ, record.TASK_SEQ, 'MODIFY');
      changeViewPage(id, record.WORK_SEQ, record.TASK_SEQ, 'MODIFY');
    }
  };

  render() {
    const { viewPageData, sagaKey: id, changeViewPage, formData, handleModalVisible } = this.props;
    const selectedRowItemCode = (formData && formData.selectedRowItemCode) || '';

    return (
      <div>
        <Input value={selectedRowItemCode} style={{ width: 150 }} onClick={() => handleModalVisible()} />
        <Button shape="circle" icon="search" onClick={() => handleModalVisible()} />
        {/* <StyledButton className="btn-primary" onClick={this.handleSearch}>
          검색
        </StyledButton> */}
        {viewPageData.viewType === 'MODIFY' ? (
          <>
            <StyledButton className="btn-primary" onClick={() => this.onChangeSave('M')}>
              저장
            </StyledButton>
            <StyledButton className="btn-primary" onClick={() => this.onChangeSave('D')}>
              삭제
            </StyledButton>
            <StyledButton className="btn-primary" onClick={() => changeViewPage(id, viewPageData.workSeq, viewPageData.taskSeq, 'REVISION')}>
              신규등록
            </StyledButton>
          </>
        ) : (
          <StyledButton className="btn-primary" onClick={() => this.onChangeSave('S')}>
            등록
          </StyledButton>
        )}
        <StyledButton className="btn-primary" onClick={() => changeViewPage(id, viewPageData.workSeq, -1, 'INPUT')}>
          Reset
        </StyledButton>
      </div>
    );
  }
}

MsdsHeaderBar.propTypes = {
  CONFIG: PropTypes.any,
  colData: PropTypes.string,
  sagaKey: PropTypes.string,
  readOnly: PropTypes.bool,
  compProps: PropTypes.any,
  visible: PropTypes.bool,
  viewPageData: PropTypes.func,
  changeViewPage: PropTypes.func,
  setViewPageData: PropTypes.func,
  saveTask: PropTypes.func,
  modifyTask: PropTypes.func,
  deleteTask: PropTypes.func,
};

export default MsdsHeaderBar;
