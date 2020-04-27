import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { Input, Popconfirm } from 'antd';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';

import StyledSearchInput from 'commonStyled/Form/StyledSearchInput';

const AntdSearch = StyledSearchInput(Input.Search);

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
        saveTask();
        break;
      case 'MODIFY':
        modifySaveTask();
        break;
      case 'SEARCH':
        if (searchTaskSeq > -1) {
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
      <StyledButtonWrapper className="btn-wrap-mb-10">
        <span>장비코드</span>
        &nbsp;
        <AntdSearch value={modalSelectedRow.EQUIP_CD || ''} readOnly onClick={handleModalVisible} onSearch={handleModalVisible} style={{ width: '8%' }} />
        &nbsp;
        <StyledButton className="btn-primary btn-sm btn-first" onClick={() => this.handleAction('SEARCH')}>
          검색
        </StyledButton>
        <StyledButton className="btn-primary btn-sm btn-first" onClick={() => this.handleAction(viewType)}>
          저장
        </StyledButton>
        {viewType === 'MODIFY' && (
          <>
            <Popconfirm title="정말 삭제하시겠습니까?" onConfirm={() => this.handleAction('DELETE')} okText="확인" cancelText="취소">
              <StyledButton className="btn-primary btn-sm btn-first">삭제</StyledButton>
            </Popconfirm>
            <StyledButton className="btn-primary btn-sm btn-first" onClick={() => this.handleAction('REVISION')}>
              신규등록
            </StyledButton>
            <StyledButton className="btn-primary btn-sm" onClick={() => this.handleAction('RESET')}>
              Reset
            </StyledButton>
            <div align="right">
              <span>{`[등록자] ${SETUP_EMPNO} ${SETUP_PERSON}`} </span>
            </div>
          </>
        )}
      </StyledButtonWrapper>
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
