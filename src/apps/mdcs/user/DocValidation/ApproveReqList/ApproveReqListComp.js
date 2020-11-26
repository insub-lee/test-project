import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Table, Modal, message, Spin } from 'antd';
import { fromJS } from 'immutable';
import moment from 'moment';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledHeaderWrapper from 'components/BizBuilder/styled/Wrapper/StyledHeaderWrapper';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import BizBuilderBase from 'components/BizBuilderBase';

import SearchBar from '../SearchBar';
import ApproveView from './approveView';

const AntdTable = StyledAntdTable(Table);
const AntdModal = StyledAntdModal(Modal);

class ApproveReqListComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      workSeq: undefined,
      taskSeq: undefined,
      revDate: undefined,
      checkType: undefined,
      coverView: { workSeq: undefined, taskSeq: undefined, viewMetaSeq: undefined, visible: false, viewType: 'VIEW' },
      searchParam: { CHECKTYPE: 'O' },
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
      title: '점검',
      dataIndex: 'CHECKTYPE',
      key: 'CHECKTYPE',
      width: '6%',
      align: 'center',
      render: text => this.getCheckName(text),
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
    const { getCustomDataBind } = this.props;
    const rtnUrl = '/api/workflow/v1/common/approve/ValidateReqListHandler';
    this.spinningOn();
    // 폐기만 검색 CHECKTYPE : 'O'
    getCustomDataBind('POST', rtnUrl, { PARAM: { ...params, CHECKTYPE: 'O' } }, () =>
      this.setState({ searchParam: { ...params, CHECKTYPE: 'O' } }, this.spinningOff),
    );
  };

  spinningOn = () => this.setState({ loading: true });

  spinningOff = () => this.setState({ loading: false });

  onRowClick = (record, rowIndex, e) => {
    this.props.setSelectedRow(record);
    this.setState({
      visible: true,
      workSeq: record.WORK_SEQ,
      taskSeq: record.TASK_SEQ,
      taskOrginSeq: record.TASK_ORIGIN_SEQ,
      title: record.TITLE,
      revDate: record?.REV_DATE,
      obsoleteOpinion: record?.OBSOLETE_OPINION,
      checkType: record?.CHECKTYPE,
    });
  };

  onModalClose = () => {
    this.setState({ visible: false });
  };

  getCheckName = (type = this.state?.checkType) => {
    switch (type) {
      case 'Y':
        return '유효';
      case 'R':
        return '개정';
      case 'O':
        return '폐기';
      default:
        return '';
    }
  };

  render() {
    const { workSeq, taskSeq, visible, coverView, revDate, checkType, obsoleteOpinion } = this.state;
    const { customDataList } = this.props;
    return (
      <Spin spinning={this.state.loading}>
        <StyledHeaderWrapper>
          <div className="pageTitle">
            <p>
              <Icon type="form" /> 결재요청 LIST
            </p>
          </div>
        </StyledHeaderWrapper>
        <StyledContentsWrapper>
          <SearchBar getList={params => this.getList(params)} onChangePageSize={pageSize => this.setState({ pageSize })} typeSearch={false} />
          <AntdTable
            columns={this.getTableColumns()}
            dataSource={customDataList}
            onRow={(record, rowIndex) => ({
              onClick: e => this.onRowClick(record, rowIndex, e),
            })}
            bordered
            pagination={{ pageSize: this.state?.pageSize }}
          />
          <AntdModal title={`유효성 점검[${this.getCheckName()}]`} visible={visible} width={680} destroyOnClose onCancel={this.onModalClose} footer={[]}>
            <ApproveView
              {...this.props}
              REV_DATE={revDate}
              OBSOLETE_OPINION={obsoleteOpinion}
              WORK_SEQ={workSeq}
              TASK_SEQ={taskSeq}
              CHECKTYPE={checkType}
              onValidateProcess={this.onValidateProcess}
              onModalClose={this.onModalClose}
            />
          </AntdModal>
        </StyledContentsWrapper>
      </Spin>
    );
  }
}

export default ApproveReqListComp;
