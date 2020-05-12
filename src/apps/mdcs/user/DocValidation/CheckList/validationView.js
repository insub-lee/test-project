import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Radio, Button } from 'antd';
import BizBuilderBase from 'components/BizBuilderBase';
import StyledHtmlTable from 'commonStyled/MdcsStyled/Table/StyledHtmlTable';

// eslint-disable-next-line react/prefer-stateless-function
class ValidationView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedValue: 1,
      workProcess: {},
    };
  }

  componentDidMount() {
    const { id, submitHandlerBySaga } = this.props;
    const url = '/api/workflow/v1/common/workprocess/defaultPrcRuleHanlder';
    submitHandlerBySaga(id, 'POST', url, { PARAM: { PRC_ID: 105 } }, this.initProcessData);
  }

  initProcessData = (sagaKey, response) => {
    const { WORK_SEQ, TASK_SEQ, TASK_ORIGIN_SEQ, TITLE } = this.props;
    const draftData = { WORK_SEQ, TASK_SEQ, TASK_ORIGIN_SEQ };
    const { DRAFT_PROCESS } = response;
    const tProc = { ...DRAFT_PROCESS, DRAFT_DATA: draftData, REL_TYPE: 2, WORK_SEQ, TASK_SEQ, DRAFT_TITLE: TITLE };
    console.debug(tProc);
    this.setState({ workProcess: { DRAFT_PROCESS: tProc } });
  };

  onSelectRadio = e => {
    this.setState({ selectedValue: e.target.value });
  };

  onClickEvent = () => {
    const { onValidateProcess, WORK_SEQ, TASK_SEQ, TASK_ORIGIN_SEQ } = this.props;
    const { selectedValue, workProcess } = this.state;
    onValidateProcess(selectedValue, workProcess, WORK_SEQ, TASK_SEQ, TASK_ORIGIN_SEQ);
  };

  render() {
    const { WORK_SEQ, TASK_SEQ } = this.props;
    const { selectedValue } = this.state;
    return (
      <>
        <StyledHtmlTable style={{ padding: '20px 20px 0' }}>
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
        <div style={{ textAlign: 'center', marginTop: '10px' }} className="btn-group">
          <Button type="primary" style={{ marginRight: '5px' }} onClick={this.onClickEvent}>
            확인
          </Button>
          <Button>닫기</Button>
        </div>

        <BizBuilderBase sagaKey="validateView" workSeq={WORK_SEQ} taskSeq={TASK_SEQ} viewType="VIEW" ViewCustomButtons={() => false} />
      </>
    );
  }
}

ValidationView.propTypes = {};

ValidationView.defaultProps = {
  selectedValue: 1,
};

export default ValidationView;
