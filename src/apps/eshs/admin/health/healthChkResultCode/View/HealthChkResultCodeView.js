import React, { Component } from 'react';
import { Input, InputNumber } from 'antd';

import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

const AntdInput = StyledInput(Input);

class HealthChkResultCodeView extends Component {
  state = {
    codeInfo: {},
    saveType: '',
  }

  componentDidMount() {
    const { sagaKey: id, selectedRow } = this.props;
    if (selectedRow && Object.keys(selectedRow).length > 0) {
      this.setState({
        codeInfo: { ...selectedRow },
        saveType: 'U',
      });
    } else {
      this.setState({
        saveType: 'I',
        codeInfo: {
          CHK_RESULT_ITEM_CD: '',
          CHK_RESULT_ITEM_NM: '',
          CHK_RESULT_ITEM_DESC: '',
          BASE_RESULT: '',
          BASE_HIGH: '',
          BASE_LOW: '',
          ORDER_SEQ: '',
          UNIT: ''
        }
      });
    }
  }

  onChangeCodeInfo = (key, val) =>  {
    this.setState(prevState => {
      let { codeInfo } = prevState;
      codeInfo[key] = val;
      return { codeInfo }
    });
  }

  onSaveCode = () => {
    const { sagaKey, submitHandlerBySaga, onSaveAfter } = this.props;
    const submitData = {
      PARAM: {
        ...this.state.codeInfo,
        ORDER_SEQ: Number(this.state.codeInfo.ORDER_SEQ)
      }
    };
    
    submitHandlerBySaga(sagaKey, (this.state.saveType === 'I' ? 'POST' : 'PUT'), `/api/eshs/v1/common/health/healthChkResultCode/${this.state.codeInfo.CHK_RESULT_ITEM_CD}`, submitData, (id, response) => {
      if (response && response.result === 1) {
        onSaveAfter();
      }
    });
  };

  render() {
    const { codeInfo, saveType } = this.state;
    const { onCancelPopup } = this.props;

    return (
      <>
        <StyledHtmlTable>
          <table>
            <colgroup>
              <col width="30%" />
              <col width="70%" />
            </colgroup>
            <tbody>
              <tr>
                <th>순서</th>
                <td>
                  <AntdInput value={codeInfo.ORDER_SEQ} onChange={e => this.onChangeCodeInfo('ORDER_SEQ', e.target.value)} />
                </td>
              </tr>
              <tr>
                <th>코드</th>
                <td>
                  <AntdInput value={codeInfo.CHK_RESULT_ITEM_CD} onChange={e => this.onChangeCodeInfo('CHK_RESULT_ITEM_CD', e.target.value)} readOnly={saveType === 'U'} />
                </td>
              </tr>
              <tr>
                <th>검진결과항목구분</th>
                <td>
                  <AntdInput value={codeInfo.CHK_RESULT_ITEM_NM} onChange={e => this.onChangeCodeInfo('CHK_RESULT_ITEM_NM', e.target.value)} />
                </td>
              </tr>
              <tr>
                <th>검진결과항목명</th>
                <td>
                  <AntdInput value={codeInfo.CHK_RESULT_ITEM_DESC} onChange={e => this.onChangeCodeInfo('CHK_RESULT_ITEM_DESC', e.target.value)} />
                </td>
              </tr>
              <tr>
                <th>기준값</th>
                <td>
                  <AntdInput value={codeInfo.BASE_RESULT} onChange={e => this.onChangeCodeInfo('BASE_RESULT', e.target.value)} />
                </td>
              </tr>
              <tr>
                <th>최소기준값</th>
                <td>
                  <AntdInput value={codeInfo.BASE_LOW} onChange={e => this.onChangeCodeInfo('BASE_LOW', e.target.value)} />
                </td>
              </tr>
              <tr>
                <th>최대기준값</th>
                <td>
                  <AntdInput value={codeInfo.BASE_HIGH} onChange={e => this.onChangeCodeInfo('BASE_HIGH', e.target.value)} />
                </td>
              </tr>
              <tr>
                <th>단위</th>
                <td>
                  <AntdInput value={codeInfo.UNIT} onChange={e => this.onChangeCodeInfo('UNIT', e.target.value)} />
                </td>
              </tr>
            </tbody>
          </table>
        </StyledHtmlTable>
        <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
          <StyledButton className="btn-light mr5" onClick={onCancelPopup}>닫기</StyledButton>
          <StyledButton className="btn-primary" onClick={this.onSaveCode}>저장</StyledButton>
        </StyledButtonWrapper>
      </>
    );
  }
}

export default HealthChkResultCodeView;