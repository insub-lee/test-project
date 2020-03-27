import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { Input, Button, Popconfirm } from 'antd';
import StyledButton from 'components/BizBuilder/styled/StyledButton';

const { Search } = Input;

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SETUP_EMPNO: '',
      SETUP_PERSON: '',
    };
  }

  componentDidMount() {
    const { modalSelectedRow } = this.props;
    const SETUP_EMPNO = (modalSelectedRow && modalSelectedRow.SETUP_EMPNO) || '';
    const SETUP_PERSON = (modalSelectedRow && modalSelectedRow.SETUP_PERSON) || '';
    this.setState({
      SETUP_EMPNO,
      SETUP_PERSON,
    });
  }

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
    const { SETUP_EMPNO, SETUP_PERSON } = this.state;
    return (
      <div align="left">
        <span>장비코드</span>
        &nbsp;
        <Search value={modalSelectedRow.EQUIP_CD || ''} readOnly onClick={handleModalVisible} style={{ width: '8%' }} />
        &nbsp;
        <StyledButton className="btn-primary" onClick={() => this.handleAction('SEARCH')}>
          검색
        </StyledButton>
        <StyledButton className="btn-primary" onClick={() => this.handleAction(viewType)}>
          저장
        </StyledButton>
        {viewType === 'MODIFY' && (
          <>
            <Popconfirm title="정말 삭제하시겠습니까?" onConfirm={() => this.handleAction('DELETE')} okText="확인" cancelText="취소">
              <StyledButton className="btn-primary">삭제</StyledButton>
            </Popconfirm>
            <StyledButton className="btn-primary" onClick={() => this.handleAction('REVISION')}>
              신규등록
            </StyledButton>
            <StyledButton className="btn-primary" onClick={() => this.handleAction('RESET')}>
              Reset
            </StyledButton>
            <div align="right">
              <span>{`[등록자] ${SETUP_EMPNO} ${SETUP_PERSON}`} </span>
            </div>
          </>
        )}
      </div>
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
