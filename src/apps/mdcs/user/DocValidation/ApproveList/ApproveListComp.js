import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Table, Modal, message, Spin } from 'antd';
import moment from 'moment';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledHeaderWrapper from 'components/BizBuilder/styled/Wrapper/StyledHeaderWrapper';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import BizBuilderBase from 'components/BizBuilderBase';
import SearchBar from '../SearchBar';

const AntdTable = StyledAntdTable(Table);
const AntdModal = StyledAntdModal(Modal);

class ApproveListComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      visible: false,
      workSeq: undefined,
      taskSeq: undefined,
      coverView: { workSeq: undefined, taskSeq: undefined, viewMetaSeq: undefined, visible: false, viewType: 'VIEW' },
      searchParam: {
        REL_TYPE: 2,
      },
      loading: false,
      pageSize: 10,
    };
  }

  getTableColumns = () => [
    {
      title: 'No',
      dataIndex: 'DOCNUMBER',
      key: 'DOCNUMBER',
      width: '10%',
      align: 'center',
    },
    {
      title: 'Rev',
      dataIndex: 'VERSION',
      key: 'VERSION',
      width: '6%',
      align: 'center',
    },
    {
      title: '제목',
      dataIndex: 'DRAFT_TITLE',
      key: 'DRAFT_TITLE',
    },

    {
      title: 'Effect Date',
      dataIndex: 'END_DTTM',
      key: 'END_DTTM',
      width: '10%',
      align: 'center',
      render: (text, record) => moment(text).format('YYYY-MM-DD'),
    },
    {
      title: '기안부서',
      dataIndex: 'DRAFT_DEPT_NAME',
      key: 'REG_DEPT_NAME',
      width: '16%',
      align: 'center',
    },
    {
      title: '기안자',
      dataIndex: 'NAME_KOR',
      key: 'NAME_KOR',
      width: '10%',
      align: 'center',
    },
    {
      title: '결재요청일',
      dataIndex: 'REG_DTTM',
      key: 'REG_DTTM',
      width: '10%',
      align: 'center',
      render: (text, record) => moment(text).format('YYYY-MM-DD'),
    },
  ];

  componentDidMount() {
    this.getList();
  }

  getList = (params = this.state?.searchParam) => {
    const { id, submitHandlerBySaga } = this.props;
    const rtnUrl = '/api/workflow/v1/common/approve/ValidateCompleteListHandler';
    this.spinningOn();
    submitHandlerBySaga(id, 'POST', rtnUrl, { PARAM: { REL_TYPE: 2, ...params } }, (_, res) =>
      this.setState({ list: res?.list, searchParam: { REL_TYPE: 2, ...params } }, this.spinningOff),
    );
  };

  spinningOn = () => this.setState({ loading: true });

  spinningOff = () => this.setState({ loading: false });

  onRowClick = (record, rowIndex, e) => {
    this.setState({ visible: true, workSeq: record.WORK_SEQ, taskSeq: record.TASK_SEQ, taskOrginSeq: record.TASK_ORIGIN_SEQ, title: record.TITLE });
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

  onModalClose = () => {
    this.setState({ visible: false });
  };

  render() {
    const { list, workSeq, taskSeq, visible, coverView } = this.state;
    return (
      <Spin spinning={this.state.loading}>
        <StyledHeaderWrapper>
          <div className="pageTitle">
            <p>
              <Icon type="form" /> 결재완료 LIST
            </p>
          </div>
        </StyledHeaderWrapper>
        <StyledContentsWrapper>
          <SearchBar getList={params => this.getList(params)} onChangePageSize={pageSize => this.setState({ pageSize })} />
          <AntdTable
            columns={this.getTableColumns()}
            dataSource={list}
            onRow={(record, rowIndex) => ({
              onClick: e => this.onRowClick(record, rowIndex, e),
            })}
            bordered
            pagination={{ pageSize: this.state?.pageSize }}
          />
          <AntdModal title="유효성 점검" visible={visible} width={680} destroyOnClose onCancel={this.onModalClose} footer={[]}>
            <BizBuilderBase
              sagaKey="approveReqView"
              workSeq={workSeq}
              taskSeq={taskSeq}
              viewType="VIEW"
              clickCoverView={this.clickCoverView}
              ViewCustomButtons={() => false}
            />
          </AntdModal>
          <AntdModal
            className="modalWrapper modalTechDoc modalCustom"
            title="표지 보기"
            width={800}
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
              onCloseModalHandler={this.onClickModifyDoCoverView}
              ViewCustomButtons={({ onCloseCoverView }) => (
                <div style={{ textAlign: 'center', marginTop: '12px' }}>
                  <StyledButton className="btn-primary" onClick={onCloseCoverView}>
                    닫기
                  </StyledButton>
                </div>
              )}
            />
          </AntdModal>
        </StyledContentsWrapper>
      </Spin>
    );
  }
}

export default ApproveListComp;
