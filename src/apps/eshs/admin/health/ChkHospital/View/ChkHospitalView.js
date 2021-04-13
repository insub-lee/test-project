import React, { Component } from 'react';
import { Input, Select } from 'antd';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledTextarea from 'components/BizBuilder/styled/Form/StyledTextarea';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

const AntdInput = StyledInput(Input);
const AntdTextarea = StyledTextarea(Input.TextArea);
const AntdSelect = StyledSelect(Select);

class ChkHospitalView extends Component {
  state = {
    codeList: [],
    detail: {},
    saveType: '',
  }

  componentWillMount() {
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
          HOSPITAL_CODE: '',
          HOSPITAL_NAME: '',
          HOSPITAL_SITE: '',
          HOSPITAL_DESC: '',
          EQUIP_ENDOSCOPE: '',
          EQUIP_ULTRASONIC_WAVE: '',
          EQUIP_CT: '',
          EQUIP_MRI: '',
          CALENDAR_PERSONNEL: '',
          CHECK_TIME: '',
          FAMILY_CHECK_COST: '',
          MANAGER_NAME: '',
          MANAGER_TEL: '',
          USE_YN: ''
        }
      });
    }
  }

  onChangeDetail = (key, val) =>  {
    this.setState(prevState => {
      let { detail } = prevState;
      detail[key] = val;
      return { detail }
    });
  };

  onSaveCode = () => {
    const { sagaKey, submitHandlerBySaga, onSaveAfter } = this.props;
    const submitData = {
      PARAM: {
        ...this.state.detail,
      }
    };
    
    submitHandlerBySaga(sagaKey, (this.state.saveType === 'I' ? 'POST' : 'PUT'), `/api/eshs/v1/common/health/healthChkHospital?CODE=Y`, submitData, (id, response) => {
      if (response) {
        if (response.result === 1) {
          message.success(<MessageContent>저장되었습니다.</MessageContent>);
          onSaveAfter();
        } else if (response.result === -1) {
          message.warn(<MessageContent>동일한 코드가 존재합니다.</MessageContent>);
        }
      } else {
        message.error(<MessageContent>검진기관 등록에 실패하였습니다.</MessageContent>);
      }
    });
  };
  
  render() {
    const { saveType } = this.state;
    const { selectedRow: detail } = this.props;
    return (
      <StyledContentsWrapper>
        <StyledHtmlTable>
          <table>
            <colgroup>
              <col width="15%" />
              <col width="25%" />
              <col width="60%" />
            </colgroup>
            <tbody>
              <tr>
                <th colSpan={2}>검진기관코드</th>
                <td>
                  <AntdInput defaultValue={detail.HOSPITAL_CODE} className="ant-input-sm" onChange={e => this.onChangeDetail('HOSPITAL_CODE', e.target.value)} readOnly={saveType === 'U'} />
                </td>
              </tr>
              <tr>
                <th colSpan={2}>검진기관명</th>
                <td>
                  <AntdInput defaultValue={detail.HOSPITAL_NAME} className="ant-input-sm" onChange={e => this.onChangeDetail('HOSPITAL_NAME', e.target.value)} />
                </td>
              </tr>
              <tr>
                <th colSpan={2}>검진기관지역</th>
                <td>
                  <AntdInput defaultValue={detail.HOSPITAL_SITE} className="ant-input-sm" onChange={e => this.onChangeDetail('HOSPITAL_SITE', e.target.value)} />
                </td>
              </tr>
              <tr>
                <th colSpan={2}>기타사항</th>
                <td>
                  <AntdTextarea defaultValue={detail.HOSPITAL_DESC} rows={6} onChange={e => this.onChangeDetail('HOSPITAL_DESC', e.target.value)} />
                </td>
              </tr>
              <tr>
                <th rowSpan={4}>장비사항</th>
                <th>대장내시경</th>
                <td>
                  <AntdInput defaultValue={detail.EQUIP_ENDOSCOPE} className="ant-input-sm" onChange={e => this.onChangeDetail('EQUIP_ENDOSCOPE', e.target.value)} />
                </td>
              </tr>
              <tr>
                <th>초음파</th>
                <td>
                  <AntdInput defaultValue={detail.EQUIP_ULTRASONIC_WAVE} className="ant-input-sm" onChange={e => this.onChangeDetail('EQUIP_ULTRASONIC_WAVE', e.target.value)} />
                </td>
              </tr>
              <tr>
                <th>CT</th>
                <td>
                  <AntdInput defaultValue={detail.EQUIP_CT} className="ant-input-sm" onChange={e => this.onChangeDetail('EQUIP_CT', e.target.value)} />
                </td>
              </tr>
              <tr>
                <th>MRI, MRA</th>
                <td>
                  <AntdInput defaultValue={detail.EQUIP_MRI} className="ant-input-sm" onChange={e => this.onChangeDetail('EQUIP_MRI', e.target.value)} />
                </td>
              </tr>
              <tr>
                <th colSpan={2}>검진일정(인원)</th>
                <td>
                  <AntdTextarea defaultValue={detail.CALENDAR_PERSONNEL} onChange={e => this.onChangeDetail('CALENDAR_PERSONNEL', e.target.value)} />
                </td>
              </tr>
              <tr>
                <th colSpan={2}>검진소요시간</th>
                <td>
                  <AntdInput defaultValue={detail.CHECK_TIME} className="ant-input-sm" onChange={e => this.onChangeDetail('CHECK_TIME', e.target.value)} />
                </td>
              </tr>
              <tr>
                <th colSpan={2}>가족검진비용</th>
                <td>
                  <AntdInput defaultValue={detail.FAMILY_CHECK_COST} className="ant-input-sm" onChange={e => this.onChangeDetail('FAMILY_CHECK_COST', e.target.value)} />
                </td>
              </tr>
              <tr>
                <th colSpan={2}>담당자명</th>
                <td>
                  <AntdInput defaultValue={detail.MANAGER_NAME} className="ant-input-sm" onChange={e => this.onChangeDetail('MANAGER_NAME', e.target.value)} />
                </td>
              </tr>
              <tr>
                <th colSpan={2}>담당자연락처</th>
                <td>
                  <AntdInput defaultValue={detail.MANAGER_TEL} className="ant-input-sm" onChange={e => this.onChangeDetail('MANAGER_TEL', e.target.value)} />
                </td>
              </tr>
              <tr>
                <th colSpan={2}>검진기관사용여부</th>
                <td>
                  <AntdSelect defaultValue={detail.USE_YN} className="select-sm" style={{ width: '100px' }} onChange={val => this.onChangeDetail('USE_YN', val)}>
                    <AntdSelect.Option value="Y">사용</AntdSelect.Option>
                    <AntdSelect.Option value="N">미사용</AntdSelect.Option>
                  </AntdSelect>
                </td>
              </tr>
            </tbody>
          </table>
        </StyledHtmlTable>
        <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
          <StyledButton className="btn-light btn-sm mr5" onClick={this.props.onCancelPopup}>닫기</StyledButton>
          <StyledButton className="btn-primary btn-sm" onClick={this.onSaveCode}>저장</StyledButton>
        </StyledButtonWrapper>
      </StyledContentsWrapper>
    );
  }
}

export default ChkHospitalView;