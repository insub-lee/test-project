import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Radio, Input, Button, Icon, Select, message, Modal, Table } from 'antd';

import BizBuilderBase from 'components/BizBuilderBase';
import UserSelect from 'components/UserSelect';

import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledTextarea from 'components/BizBuilder/styled/Form/StyledTextarea';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledTagDraft from 'components/BizBuilder/styled/Tag/StyledTagDraft';

const AntdModal = StyledAntdModal(Modal);
const { Option } = Select;
const { TextArea } = Input;
const AntdTextArea = StyledTextarea(Input.TextArea);
const AntdLineTable = StyledAntdTable(Table);
let timeout;

class MdcsAppvView extends Component {
  state = {
    modalWidth: 800,
    userInfo: [],
    selectedUser: undefined,
    nextApprover: [],
    coverView: {
      visible: false,
      workSeq: undefined,
      taskSeq: undefined,
      viewMetaSeq: undefined,
    },
    isUserSelect: false,
  };

  componentDidMount() {
    const { selectedRow, setSelectedRow, APPV_STATUS } = this.props;
    console.debug('this.props', this.props);
    const appvStatus = selectedRow && selectedRow.CURRENT_STATUS && selectedRow.CURRENT_STATUS == 10 ? 20 : 2;
    const nSelectRow = { ...selectedRow, APPV_STATUS: appvStatus };
    setSelectedRow(nSelectRow);
  }

  onChange = e => {
    const { selectedRow, setSelectedRow, APPV_STATUS } = this.props;
    const nSelectRow = { ...selectedRow, APPV_STATUS: e.target.value };
    setSelectedRow(nSelectRow);
  };

  fetch(value, callback) {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    timeout = this.setTimeout(this.fake, 500);
  }

  fake = (value, callBackFunc) => {
    const { getUserInfo } = this.props;
    const searchInfo = { KEYWORD: value, START: 0, ENDL: 10000 };
    getUserInfo(searchInfo, this.onSearchComplete);
  };

  onSearchComplete = list => {
    console.debug(list);
    this.setState({
      userInfo: list,
    });
  };

  onSearchHandler = value => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    timeout = setTimeout(this.fake, 500, value, this.onSearchComplete);
  };

  onChangeHandler = (value, option) => {
    this.setState({
      selectedUser: {
        value,
        text: option.props.children,
      },
    });
  };

  onApplyUSer = () => {
    const { selectedRow, setSelectedRow } = this.props;
    const { selectedUser } = this.state;

    if (!selectedUser) {
      message.error('실무자를 선택해 주세요');
      return;
    }
    this.setState(
      prevState => ({
        nextApprover: prevState.selectedUser,
        selectedUser: undefined,
      }),
      () => {
        const nRuleConfig = selectedRow.RULE_CONFIG;
        const nSelectedRow = {
          ...selectedRow,
          RULE_CONFIG: {
            ...nRuleConfig,
            NEXT_APPV_USER_ID: this.state.nextApprover.value,
          },
        };
        setSelectedRow(nSelectedRow);
      },
    );
  };

  handleReqApprove = (e, appvStatus) => {
    e.preventDefault();
    this.props.reqApprove(appvStatus);
    this.props.setOpinionVisible(false);
  };

  onModalClose = () => {
    this.props.setViewVisible(false);
  };

  clearUser = e => {
    this.setState({ selectedUser: undefined, nextApprover: undefined });
  };

  clickCoverView = (workSeq, taskSeq, viewMetaSeq) => {
    const coverView = { workSeq, taskSeq, viewMetaSeq, visible: true, viewType: 'VIEW' };
    this.setState({ coverView });
  };

  onCloseCoverView = () => {
    const { coverView } = this.state;
    const tempCoverView = { ...coverView, visible: false };
    this.setState({ coverView: tempCoverView });
  };

  onClickModify = () => {
    const { selectedRow } = this.props;
    const coverView = { workSeq: selectedRow.WORK_SEQ, taskSeq: selectedRow.TASK_SEQ, visible: true, viewType: 'MODIFY' };
    this.setState({ coverView });
  };

  getTableColumns = () => [
    {
      title: 'Title',
      dataIndex: 'TITLE',
      key: 'TITLE',
      ellipsis: true,
    },
    {
      title: '개정번호',
      dataIndex: 'VERSION',
      key: 'VERSION',
      width: '13%',
      align: 'center',
    },
    {
      title: '작성자',
      dataIndex: 'REG_USER_NAME',
      key: 'REG_USER_NAME',
      width: '12%',
      align: 'center',
    },
    {
      title: '부서',
      dataIndex: 'REG_DEPT_NAME',
      key: 'REG_DEPT_NAME',
      width: '17%',
      align: 'center',
    },
    {
      title: '기안일',
      dataIndex: 'REG_DTTM',
      key: 'REG_DTTM',
      width: '15%',
      align: 'center',
      render: (text, record) => moment(text).format('YYYY-MM-DD'),
    },
  ];

  onUserSelectedComplete = result => {
    this.setState({ nextApprover: result, isUserSelect: false });
  };

  onClickUserSelect = () => {
    this.setState({ isUserSelect: true });
  };

  onCancelUserSelect = () => {
    this.setState({ isUserSelect: false });
  };

  render() {
    const { selectedRow } = this.props;
    const { DRAFT_DATA } = selectedRow;
    const { modalWidth, coverView, isUserSelect, nextApprover } = this.state;
    return (
      <>
        <StyledHtmlTable style={{ padding: '20px 20px 0' }}>
          <table>
            <tbody>
              <tr>
                <th style={{ width: '150px' }}>결재방법 </th>
                <td>
                  <Radio.Group onChange={this.onChange} defaultValue={selectedRow && selectedRow.CURRENT_STATUS && selectedRow.CURRENT_STATUS === 10 ? 20 : 2}>
                    <Radio value={selectedRow && selectedRow.CURRENT_STATUS && selectedRow.CURRENT_STATUS === 10 ? 20 : 2}>승인</Radio>
                    <Radio value={selectedRow && selectedRow.CURRENT_STATUS && selectedRow.CURRENT_STATUS === 10 ? 30 : 3}>Hold</Radio>
                    {selectedRow.NODE_ID === 106 && <Radio value={5}>실무자 검토의뢰</Radio>}
                    {selectedRow.NODE_ID === 106 && <Radio value={10}>실무자 결재 권한위임</Radio>}
                  </Radio.Group>
                </td>
              </tr>
              <tr
                style={{
                  display: (selectedRow && selectedRow.APPV_STATUS && selectedRow.APPV_STATUS === 5) || selectedRow.APPV_STATUS === 10 ? 'table-row' : 'none',
                }}
              >
                <th style={{ width: '150px' }}>선택된 실무자 </th>
                <td>
                  <StyledButton onClick={this.onClickUserSelect} className="btn-light btn-xs">
                    <Icon type="search" style={{ marginRight: '5px' }} />
                    조직도 검색
                  </StyledButton>
                  <div>
                    {nextApprover &&
                      nextApprover.map(user => (
                        <StyledTagDraft>
                          <Icon type="user" />
                          <span className="infoTxt">{`${user.NAME_KOR} (${user.DEPT_NAME_KOR})`}</span>
                        </StyledTagDraft>
                      ))}
                  </div>
                </td>
              </tr>
              <tr>
                <th>의견 </th>
                <td>
                  <AntdTextArea rows={4} onChange={e => this.props.setOpinion(e.target.value)} />
                </td>
              </tr>
            </tbody>
          </table>
          <StyledButtonWrapper className="btn-wrap-center" style={{ marginTop: '10px' }}>
            <StyledButton key="ok" className="btn-primary mr5 btn-sm" onClick={e => false}>
              표지 수정
            </StyledButton>
            <StyledButton key="ok" className="btn-primary mr5 btn-sm" onClick={e => this.handleReqApprove(e, selectedRow.APPV_STATUS)}>
              승인
            </StyledButton>
            <StyledButton key="close" className="btn-light btn-sm" onClick={this.onModalClose}>
              닫기
            </StyledButton>
          </StyledButtonWrapper>
        </StyledHtmlTable>
        {selectedRow && selectedRow.REL_TYPE && selectedRow.REL_TYPE !== 999 ? (
          <BizBuilderBase
            sagaKey="approveBase_approveView"
            viewType="VIEW"
            workSeq={selectedRow && selectedRow.WORK_SEQ}
            taskSeq={selectedRow && selectedRow.TASK_SEQ}
            selectedRow={selectedRow}
            clickCoverView={this.clickCoverView}
            ViewCustomButtons={() => false}
          />
        ) : (
          <StyledHtmlTable style={{ padding: '20px 20px 0' }}>
            <AntdLineTable
              columns={this.getTableColumns()}
              dataSource={DRAFT_DATA.abrogationList !== null ? DRAFT_DATA.abrogationList : []}
              onRow={(record, rowIndex) => ({
                onClick: e => this.onRowClick(record, rowIndex, e),
              })}
              bordered
              className="tableWrapper"
            />
          </StyledHtmlTable>
        )}
        <AntdModal
          className="modalWrapper modalTechDoc modalCustom"
          title="표지 보기"
          width={modalWidth}
          destroyOnClose
          visible={coverView.visible}
          onCancel={this.onCloseCoverView}
          footer={[]}
        >
          <BizBuilderBase
            sagaKey="CoverView"
            viewType={coverView.viewType}
            workSeq={coverView.workSeq}
            taskSeq={coverView.taskSeq}
            viewMetaSeq={coverView.viewMetaSeq}
            onCloseCoverView={this.onCloseCoverView}
            ViewCustomButtons={({ onCloseCoverView }) => (
              <div style={{ textAlign: 'center', marginTop: '12px' }}>
                <StyledButton className="btn-light" onClick={onCloseCoverView}>
                  닫기
                </StyledButton>
              </div>
            )}
          />
        </AntdModal>
        <AntdModal
          className="modalWrapper modalTechDoc modalCustom"
          title="사용자 선택"
          width={1000}
          destroyOnClose
          visible={isUserSelect}
          onCancel={this.onCloseCoverView}
          footer={[]}
        >
          <UserSelect
            initUserList={this.state.nextApprover}
            // treeDataSource={distDeptList}
            // userDataList={result.userList && result.userList.list}
            // onTreeSelect={this.onTreeSelect}
            // onUserSelectHandler={this.onUserSelect}
            onUserSelectedComplete={this.onUserSelectedComplete}
            onCancel={this.onCancelUserSelect}
          />
        </AntdModal>
      </>
    );
  }
}

MdcsAppvView.propTypes = {
  APPV_STATUS: PropTypes.number,
};

MdcsAppvView.defaultProps = {
  APPV_STATUS: 2,
};

export default MdcsAppvView;
