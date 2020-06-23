import React, { Component } from 'react';
import { Input, Select } from 'antd';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);

class HealthChkResultCodeView extends Component {
  state = {
    detail: {},
    saveType: '',
  };

  componentDidMount() {
    const { sagaKey: id, selectedRow } = this.props;
    if (selectedRow && Object.keys(selectedRow).length > 0) {
      this.setState({
        detail: { ...selectedRow },
        saveType: 'U',
      });
    } else {
      this.setState({
        saveType: 'I',
        detail: {
          CHK_RESULT_ITEM_CD: '',
          CHK_RESULT_ITEM_NM: '',
          CHK_RESULT_ITEM_DESC: '',
          BASE_RESULT: '',
          BASE_HIGH: '',
          BASE_LOW: '',
          ORDER_SEQ: '',
          UNIT: '',
          USE_YN: '',
        },
      });
    }
  }

  onChangeDetail = (key, val) => {
    this.setState(prevState => {
      const { detail } = prevState;
      detail[key] = val;
      return { detail };
    });
  };

  onSaveCode = () => {
    const { sagaKey, submitHandlerBySaga, onSaveAfter, spinningOn, spinningOff } = this.props;
    const submitData = {
      PARAM: {
        ...this.state.detail,
        ORDER_SEQ: Number(this.state.detail.ORDER_SEQ),
      },
    };

    spinningOn();
    submitHandlerBySaga(
      sagaKey,
      this.state.saveType === 'I' ? 'POST' : 'PUT',
      `/api/eshs/v1/common/health/healthChkResultCode/${this.state.detail.CHK_RESULT_ITEM_CD}`,
      submitData,
      (id, response) => {
        if (response && response.result === 1) {
          message.info(<MessageContent>저장하였습니다.</MessageContent>);
          spinningOff();
          onSaveAfter();
        }
      },
    );
  };

  render() {
    const { detail, saveType } = this.state;
    const { onCancelPopup } = this.props;

    return (
      <StyledContentsWrapper>
        <StyledHtmlTable>
          <table>
            <colgroup>
              <col width="40%" />
              <col width="60%" />
            </colgroup>
            <tbody>
              <tr>
                <th>순서</th>
                <td>
                  <AntdInput value={detail.ORDER_SEQ} className="ant-input-sm" onChange={e => this.onChangeDetail('ORDER_SEQ', e.target.value)} />
                </td>
              </tr>
              <tr>
                <th>코드</th>
                <td>
                  <AntdInput
                    value={detail.CHK_RESULT_ITEM_CD}
                    className="ant-input-sm"
                    onChange={e => this.onChangeDetail('CHK_RESULT_ITEM_CD', e.target.value)}
                    readOnly={saveType === 'U'}
                  />
                </td>
              </tr>
              <tr>
                <th>검진결과항목구분</th>
                <td>
                  <AntdInput
                    value={detail.CHK_RESULT_ITEM_NM}
                    className="ant-input-sm"
                    onChange={e => this.onChangeDetail('CHK_RESULT_ITEM_NM', e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <th>검진결과항목명</th>
                <td>
                  <AntdInput
                    value={detail.CHK_RESULT_ITEM_DESC}
                    className="ant-input-sm"
                    onChange={e => this.onChangeDetail('CHK_RESULT_ITEM_DESC', e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <th>기준값</th>
                <td>
                  <AntdInput value={detail.BASE_RESULT} className="ant-input-sm" onChange={e => this.onChangeDetail('BASE_RESULT', e.target.value)} />
                </td>
              </tr>
              <tr>
                <th>최소기준값</th>
                <td>
                  <AntdInput value={detail.BASE_LOW} className="ant-input-sm" onChange={e => this.onChangeDetail('BASE_LOW', e.target.value)} />
                </td>
              </tr>
              <tr>
                <th>최대기준값</th>
                <td>
                  <AntdInput value={detail.BASE_HIGH} className="ant-input-sm" onChange={e => this.onChangeDetail('BASE_HIGH', e.target.value)} />
                </td>
              </tr>
              <tr>
                <th>단위</th>
                <td>
                  <AntdInput value={detail.UNIT} className="ant-input-sm" onChange={e => this.onChangeDetail('UNIT', e.target.value)} />
                </td>
              </tr>
              <tr>
                <th>사용여부</th>
                <td>
                  <AntdSelect value={detail.USE_YN} className="select-sm" onChange={val => this.onChangeDetail('USE_YN', val)} style={{ width: '100%' }}>
                    <AntdSelect.Option value="1">사용</AntdSelect.Option>
                    <AntdSelect.Option value="0">사용안함</AntdSelect.Option>
                  </AntdSelect>
                </td>
              </tr>
            </tbody>
          </table>
        </StyledHtmlTable>
        <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
          <StyledButton className="btn-primary btn-sm mr5" onClick={this.onSaveCode}>
            저장
          </StyledButton>
          <StyledButton className="btn-light btn-sm" onClick={onCancelPopup}>
            닫기
          </StyledButton>
        </StyledButtonWrapper>
      </StyledContentsWrapper>
    );
  }
}

export default HealthChkResultCodeView;
