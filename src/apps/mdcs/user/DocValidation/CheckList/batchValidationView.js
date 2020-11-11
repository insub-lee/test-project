import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Radio, Button, Popconfirm, Table, Spin } from 'antd';
import StyledHtmlTable from 'commonStyled/MdcsStyled/Table/StyledHtmlTable';
import BuilderProcessModal from 'apps/Workflow/WorkProcess/BuilderProcessModal';
import WorkProcess from 'apps/Workflow/WorkProcess';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';

const AntdTable = StyledAntdTable(Table);

// eslint-disable-next-line react/prefer-stateless-function
class batchValidationView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedValue: 1,
      workProcess: {},
      selectedRows: this.props?.selectedRows,
      loading: false,
    };
  }

  componentDidMount() {
    const { id, submitHandlerBySaga } = this.props;
    const url = '/api/workflow/v1/common/workprocess/defaultPrcRuleHanlder';
    this.spinningOn();
    submitHandlerBySaga(id, 'POST', url, { PARAM: { PRC_ID: 105 } }, this.initProcessData);
  }

  initProcessData = (sagaKey, response) => {
    // const { WORK_SEQ, TASK_SEQ, TASK_ORIGIN_SEQ, TITLE } = this.props;
    // const draftData = { WORK_SEQ, TASK_SEQ, TASK_ORIGIN_SEQ };
    const { DRAFT_PROCESS } = response;
    // const tProc = { ...DRAFT_PROCESS, DRAFT_DATA: draftData, REL_TYPE: 2, WORK_SEQ, TASK_SEQ, DRAFT_TITLE: TITLE };
    const tProc = { ...DRAFT_PROCESS, REL_TYPE: 2 };
    this.setState({ workProcess: { DRAFT_PROCESS: tProc } }, this.spinningOff);
  };

  onSelectRadio = e => {
    this.setState({ selectedValue: e.target.value });
  };

  onClickEvent = () => {
    const { onValidateProcess, onCompleteProc } = this.props;
    const { selectedValue, selectedRows, workProcess } = this.state;
    this.spinningOn();

    const lastIdx = selectedRows.lastIndex;
    let draftProcess = workProcess?.DRAFT_PROCESS || {};

    selectedRows.forEach(({ WORK_SEQ, TASK_SEQ, TASK_ORIGIN_SEQ, TITLE }, index) => {
      const draftData = { WORK_SEQ, TASK_SEQ, TASK_ORIGIN_SEQ };
      draftProcess = { ...draftProcess, DRAFT_DATA: draftData, WORK_SEQ, TASK_SEQ, DRAFT_TITLE: TITLE };

      if (index === lastIdx) {
        this.spinningOff();
        return onValidateProcess(selectedValue, { DRAFT_PROCESS: draftProcess }, onCompleteProc);
      }
      return onValidateProcess(selectedValue, { DRAFT_PROCESS: draftProcess }, () => undefined);
    });
  };

  setProcessRule = (id, processRule) => {
    this.setState({ workProcess: { DRAFT_PROCESS: { ...processRule } } });
  };

  getValueName = () => {
    switch (this.state?.selectedValue) {
      case 1:
        return '유효';
      case 2:
        return '개정';
      case 3:
        return '폐기';
      default:
        return '';
    }
  };

  columns = [
    {
      title: 'No',
      dataIndex: 'DOCNUMBER',
      key: 'DOCNUMBER',
      width: '15%',
      align: 'center',
    },
    {
      title: 'Rev',
      dataIndex: 'VERSION',
      key: 'VERSION',
      width: '10%',
      align: 'center',
    },
    {
      title: '제목',
      dataIndex: 'TITLE',
      width: '75%',
      key: 'TITLE',
      ellipsis: true,
    },
  ];

  spinningOn = () => this.setState({ loading: true });

  spinningOff = () => this.setState({ loading: false });

  render() {
    const { onModalClose } = this.props;
    const { selectedValue, workProcess, selectedRows } = this.state;

    return (
      <Spin spinning={this.state.loading}>
        <StyledContentsWrapper>
          <StyledHtmlTable>
            {selectedValue === 1 && workProcess && workProcess.DRAFT_PROCESS && (
              <WorkProcess
                id="work"
                CustomWorkProcessModal={BuilderProcessModal}
                setProcessRule={this.setProcessRule}
                processRule={workProcess.DRAFT_PROCESS ? workProcess.DRAFT_PROCESS : {}}
                PRC_ID={105}
              />
            )}
            <table>
              <tbody>
                <tr>
                  <th style={{ width: '150px' }}>유효성 점검 </th>
                  <td>
                    <Radio.Group defaultValue={selectedValue} onChange={this.onSelectRadio}>
                      <Radio value={1}>유효</Radio>
                      <Radio value={2}>개정</Radio>
                      <Radio value={3}>폐기</Radio>
                    </Radio.Group>
                  </td>
                </tr>
              </tbody>
            </table>
          </StyledHtmlTable>
          <div style={{ textAlign: 'center', marginTop: '10px', marginBottom: '10px' }} className="btn-group">
            <Popconfirm
              title={`유효성 점검 ${selectedRows.length}건 [${this.getValueName()}] 상신하시겠습니까?`}
              onConfirm={this.onClickEvent}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" style={{ marginRight: '5px' }}>
                확인
              </Button>
            </Popconfirm>

            <Button onClick={() => onModalClose()}>닫기</Button>
          </div>

          <AntdTable columns={this.columns} dataSource={selectedRows} pagination={false} scroll={{ y: 250 }} rowKey="TASK_SEQ" bordered />
        </StyledContentsWrapper>
      </Spin>
    );
  }
}

batchValidationView.propTypes = {
  onModalClose: PropTypes.func,
  selectedRows: PropTypes.array,
  onValidateProcess: PropTypes.func,
  onCompleteProc: PropTypes.func,
};

batchValidationView.defaultProps = {
  onModalClose: () => false,
  selectedRows: [],
  onValidateProcess: () => undefined,
  onCompleteProc: () => undefined,
};

export default batchValidationView;
