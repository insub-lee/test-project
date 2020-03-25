import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { Input, Button } from 'antd';
import StyledButton from 'components/BizBuilder/styled/StyledButton';

const { Search } = Input;

class Header extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  handleAction = type => {
    const { saveTask, modifySaveTask, changeViewPage, viewPageData, modalSelectedRow, id, deleteTask, setModalRowSelected } = this.props;
    const { workSeq, taskSeq } = viewPageData;
    const searchTaskSeq = (modalSelectedRow && modalSelectedRow.TASK_SEQ) || -1;
    switch (type) {
      case 'INPUT':
        console.debug('여기는 INPUT', saveTask);
        saveTask();
        break;
      case 'MODIFY':
        console.debug('여기는 MODIFY', modifySaveTask);
        modifySaveTask();
        break;
      case 'SEARCH':
        if (searchTaskSeq > -1) {
          console.debug('여기는 changeViewPage');
          changeViewPage(id, workSeq, searchTaskSeq, 'MODIFY');
        }
        break;
      case 'DELETE':
        deleteTask(id, id, workSeq, taskSeq, changeViewPage, this.handleInitPageData);
        break;
      case 'REVISION':
        changeViewPage(id, workSeq, taskSeq, 'REVISION');
        break;
      case 'RESET':
        this.handleInitPageData();
        break;

      default:
        break;
    }
  };

  handleInitPageData = () => {
    const { id, setModalRowSelected, changeViewPage, viewPageData } = this.props;
    setModalRowSelected({});
    changeViewPage(id, viewPageData.workSeq, -1, 'INPUT');
  };

  render() {
    const { handleModalVisible, modalSelectedRow, viewPageData } = this.props;
    const viewType = (viewPageData && viewPageData.viewType) || '';
    return (
      <>
        <Search value={modalSelectedRow.EQUIP_CD || ''} readOnly onClick={handleModalVisible} />
        <StyledButton className="btn-primary" onClick={() => this.handleAction('SEARCH')}>
          검색
        </StyledButton>
        <StyledButton className="btn-primary" onClick={() => this.handleAction(viewType)}>
          저장
        </StyledButton>
        {viewType === 'MODIFY' && (
          <>
            <StyledButton className="btn-primary" onClick={() => this.handleAction('DELETE')}>
              삭제
            </StyledButton>
            <StyledButton className="btn-primary" onClick={() => this.handleAction('REVISION')}>
              신규등록
            </StyledButton>
            <StyledButton className="btn-primary" onClick={() => this.handleAction('RESET')}>
              Reset
            </StyledButton>
          </>
        )}
      </>
    );
  }
}

Header.propTypes = {
  handleModalVisible: PropTypes.func,
  modalSelectedRow: PropTypes.object,
  viewPageData: PropTypes.object,
  saveTask: PropTypes.func,
  modifySaveTask: PropTypes.func,
  deleteTask: PropTypes.func,
  setModalRowSelected: PropTypes.func,
  changeViewPage: PropTypes.func,
};

Header.defaultProps = {
  handleModalVisible: () => {},
  saveTask: () => {},
  modifySaveTask: () => {},
  deleteTask: () => {},
  setModalRowSelected: () => {},
  changeViewPage: () => {},
  viewPageData: {},
  modalSelectedRow: {},
};
export default Header;
