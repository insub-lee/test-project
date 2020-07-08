import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Modal, Icon, Button, Input, message, Popconfirm } from 'antd';
import moment from 'moment';

import BizBuilderBase from 'components/BizBuilderBase';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledHeaderWrapper from 'components/BizBuilder/styled/Wrapper/StyledHeaderWrapper';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledInputView from 'apps/mdcs/styled/StyledInput';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import { isJSON } from 'utils/helpers';
import WorkProcessModal from 'apps/Workflow/WorkProcess/WorkProcessModal';

const AntdTable = StyledAntdTable(Table);
const AntdModal = StyledAntdModal(Modal);

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      selectedRowKeys: [],
      selectedRows: [],
      selectedRow: {},
      isModifyView: false,
      workPrcProps: {},
      tempProcessRule: {},
      relType: 1,
    };
  }

  componentDidMount() {
    this.getListData();
  }

  getListData() {
    const { sagaKey, submitHandlerBySaga } = this.props;
    const url = '/api/mdcs/v1/common/tempSaveTaskList';
    submitHandlerBySaga(sagaKey, 'POST', url, {}, this.initListDataBind);
  }

  initListDataBind = (sagaKey, response) => {
    if (response) {
      const { list: dataList } = response;
      this.setState({ dataList });
    }
  };

  getTableColumns = () => [
    // {
    //   title: 'No',
    //   dataIndex: 'RNUM',
    //   key: 'rnum',
    //   width: '8%',
    //   align: 'center',
    // },
    {
      title: '종류',
      dataIndex: 'ROOT_NODE_NAME',
      key: 'ROOT_NODE_NAME',
      width: '8%',
      align: 'center',
    },
    {
      title: '표준번호',
      dataIndex: 'DOCNUMBER',
      key: 'DOCNUMBER',
      width: '8%',
      align: 'center',
      ellipsis: true,
    },
    {
      title: 'Rev',
      dataIndex: 'VERSION',
      key: 'VERSION',
      width: '5%',
      align: 'center',
      render: (text, record) => (text && text.indexOf('.') > -1 ? text.split('.')[0] : text),
    },
    {
      title: '표준제목',
      dataIndex: 'TITLE',
      key: 'TITLE',
      ellipsis: true,
    },
    {
      title: '기안일',
      dataIndex: 'REG_DTTM',
      key: 'REG_DTTM',
      width: '8%',
      align: 'center',
      render: (text, record) => moment(text).format('YYYY-MM-DD'),
    },
    {
      title: '기안자',
      dataIndex: 'REG_USER_NAME',
      key: 'REG_USER_NAME',
      width: '10%',
      align: 'center',
    },
  ];

  onRowClick = (record, rowIndex, e) => {
    const { sagaKey, submitHandlerBySaga } = this.props;
    const url = '/api/workflow/v1/common/workprocess/getTempSaveProcess';

    submitHandlerBySaga(sagaKey, 'POST', url, { PARAM: { ...record } }, this.initDataBind);
  };

  initDataBind = (sagaKey, response) => {
    if (response && response.result) {
      const { result } = response;
      const { PROCESS_RULE, WORK_PRC_PROPS, REL_TYPE } = result;
      if (PROCESS_RULE && PROCESS_RULE.length > 0 && isJSON(PROCESS_RULE) && WORK_PRC_PROPS && WORK_PRC_PROPS.length > 0 && isJSON(WORK_PRC_PROPS)) {
        const tempProcessRule = JSON.parse(PROCESS_RULE);
        const workPrcProps = JSON.parse(WORK_PRC_PROPS);
        this.setState({
          selectedRow: { WORK_SEQ: result.WORK_SEQ, TASK_SEQ: result.TASK_SEQ },
          tempProcessRule,
          workPrcProps,
          relType: REL_TYPE || 1,
          isModifyView: true,
        });
      }
    }
  };

  onResizeModal = modalWidth => {
    this.setState({ modalWidth });
  };

  onCloseModalHandler = () => {
    this.setState({ selectedRow: {}, tempProcessRule: {}, workPrcProps: {}, relType: 1, isModifyView: false }, () => this.getListData());
  };

  onCloseModal = () => {
    this.setState({ selectedRow: {}, tempProcessRule: {}, workPrcProps: {}, relType: 1, isModifyView: false });
  };

  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRowKeys, selectedRows });
  };

  removeMultiTask = () => {
    const { sagaKey, submitHandlerBySaga } = this.props;
    const { selectedRows } = this.state;
    const url = '/api/builder/v1/work/removeTempSaveTask';

    submitHandlerBySaga(sagaKey, 'POST', url, { PARAM: { removeList: selectedRows } }, this.removeComplete);
  };

  removeComplete = (sagaKey, response) => {
    this.getListData();
  };

  render() {
    const { profile } = this.props;
    const { dataList, selectedRowKeys, isModifyView, selectedRow, workPrcProps, tempProcessRule, relType } = this.state;
    const isLoading = false;
    return (
      <>
        <StyledHeaderWrapper>
          <div className="pageTitle">
            <p>
              <Icon type="form" /> 임시저장함
            </p>
          </div>
        </StyledHeaderWrapper>
        <StyledContentsWrapper>
          <AntdTable
            columns={this.getTableColumns()}
            dataSource={dataList}
            onRow={(record, rowIndex) => ({
              onClick: e => this.onRowClick(record, rowIndex, e),
            })}
            rowSelection={{
              selectedRowKeys,
              onChange: this.onSelectChange,
            }}
            bordered
          />
          <StyledButtonWrapper className="btn-wrap-right">
            <Popconfirm title="Are you sure delete this task?" onConfirm={this.removeMultiTask} okText="Yes" cancelText="No">
              <StyledButton className="btn-light btn-sm">삭제</StyledButton>
            </Popconfirm>
          </StyledButtonWrapper>
        </StyledContentsWrapper>
        <AntdModal destroyOnClose style={{ top: '50px' }} width={900} visible={isModifyView} onCancel={this.onCloseModal} footer={null} maskClosable={false}>
          <StyledInputView>
            <div className="pop_tit">임시저장 표준</div>

            <div style={{ display: !isLoading ? 'block' : 'none' }}>
              <BizBuilderBase
                sagaKey={`BizDoc_${selectedRow.WORK_SEQ}`}
                workSeq={selectedRow.WORK_SEQ}
                taskSeq={selectedRow.TASK_SEQ}
                // viewChangeSeq={viewChangeSeq}
                CustomWorkProcessModal={WorkProcessModal}
                viewType="MODIFY"
                workPrcProps={workPrcProps}
                tempProcessRule={tempProcessRule}
                relType={relType}
                onCloseModalHandler={this.onCloseModalHandler}
                onCloseModal={this.onCloseModal}
                // compProps={{ docNumber, NODE_ID: selectedNodeId }}
                ModifyCustomButtons={({ saveBeforeProcess, onCloseModal, sagaKey, reloadId, tempSaveBeforeProcess }) => (
                  <div style={{ textAlign: 'center', marginTop: '12px' }}>
                    <StyledButton className="btn-primary btn-sm btn-first" onClick={() => tempSaveBeforeProcess(sagaKey, reloadId)}>
                      임시저장
                    </StyledButton>
                    <StyledButton className="btn-primary btn-sm btn-first" onClick={() => saveBeforeProcess(sagaKey, reloadId)}>
                      상신
                    </StyledButton>
                    <StyledButton className="btn-light btn-sm" onClick={() => onCloseModal()}>
                      닫기
                    </StyledButton>
                  </div>
                )}
              />
            </div>
          </StyledInputView>
        </AntdModal>
      </>
    );
  }
}

List.propTypes = {
  draftList: PropTypes.array,
  getDraftList: PropTypes.func,
  selectedRow: PropTypes.object,
  setSelectedRow: PropTypes.func,
  setViewVisible: PropTypes.func,
};

List.defaultProps = {
  draftList: [],
  getDraftList: () => {},
  selectedRow: {},
};

export default List;
