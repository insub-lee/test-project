import React, { Component } from 'react';
import { Select, DatePicker, Input, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';

const AntdSelect = StyledSelect(Select);
const AntdDatePicker = StyledDatePicker(DatePicker);
const AntdInput = StyledInput(Input);

class TargetRegForm extends Component {
  state = {
    saveData: {}
  };

  componentDidMount() {
    const { sagaKey, getCallDataHandler, spinningOn, spinningOff } = this.props;
    const apiAry = [
      {
        key: 'workAreaList',
        url: '/api/admin/v1/common/categoryMapList',
        type: 'POST',
        params: {
          PARAM: { NODE_ID: 316 }
        },
      },
      {
        key: 'hireGroupList',
        url: '/api/admin/v1/common/categoryMapList',
        type: 'POST',
        params: {
          PARAM: { NODE_ID: 688 }
        },
      },
      {
        key: 'hospitalList',
        url: `/api/eshs/v1/common/health/healthChkHospital`,
        type: 'GET',
      },
    ];
    spinningOn();
    getCallDataHandler(sagaKey, apiAry, () => {
      spinningOff();
    });
  };

  onChangeSaveData = (key, val) => {
    this.setState(prevState => {
      const { saveData } = prevState;
      saveData[key] = val;
      return { saveData }
    });
  };

  onSave = () => {
    const { saveData } = this.state;
    if (!saveData.SSN1 || saveData.SSN1 === '' || !saveData.SSN2 || saveData.SSN2 === '') {
      message.info(<MessageContent>주민번호를 입력해주세요.</MessageContent>);
      return false;
    }

    const regExt = /^(?:[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0-9]|3[0,1]))-[1-4][0-9]{6}$/;
    const SSN = `${saveData.SSN1}-${saveData.SSN2}`;
    if (!regExt.test(SSN)) {
      message.info(<MessageContent>주민번호 형식이 올바르지 않습니다.</MessageContent>);
      return false;
    }

    const { sagaKey, submitHandlerBySaga, spinningOn, spinningOff, onCancelPopup } = this.props;
    const submitData = {
      PARAM: {
        ...saveData,
        SSN: `${saveData.SSN1}${saveData.SSN2}`,
      }
    }

    Modal.confirm({
      title: '저장하시겠습니까?',
      icon: <ExclamationCircleOutlined />,
      okText: '저장',
      cancelText: '취소',
      onOk() {
        spinningOn();
        submitHandlerBySaga(sagaKey, 'POST', `/api/eshs/v1/common/health/helathHireChk`, submitData, (id, res) => {
          spinningOff();
          if (res && res.result > 0) {
            message.info(<MessageContent>저장하였습니다.</MessageContent>);
            onCancelPopup();
          } else {
            message.info(<MessageContent>저장에 실패하였습니다..</MessageContent>);
          }
        });
      }
    });
  };

  render() {
    const { result } = this.props;
    
    return (
      <StyledContentsWrapper>
        <StyledHtmlTable>
          <colgroup>
            <col width="15%" />
            <col width="35%" />
            <col width="15%" />
            <col width="35%" />
          </colgroup>
          <table>
            <tbody>
              <tr>
                <th>지역</th>
                <td>
                  <AntdSelect
                    className="select-xs" allowClear placeholder="지역" style={{ width: 110 }}
                    onChange={val => this.onChangeSaveData('WORK_AREA_CD_NODE_ID', val)}
                  >
                  {result && result.workAreaList && result.workAreaList.categoryMapList && (
                    result.workAreaList.categoryMapList.filter(cate => cate.LVL === 1).map(cate => (
                      <AntdSelect.Option value={cate.NODE_ID}>{cate.NAME_KOR}</AntdSelect.Option>
                    ))
                  )}
                  </AntdSelect>
                </td>
                <th>직군</th>
                <td>
                  <AntdSelect
                    className="select-xs mr5" allowClear placeholder="직군" style={{ width: 120 }}
                    onChange={val => this.onChangeSaveData('HIRE_GROUP_CD_NODE_ID', val)}
                  >
                  {result && result.hireGroupList && result.hireGroupList.categoryMapList && (
                    result.hireGroupList.categoryMapList.filter(cate => cate.LVL === 3).map(cate => (
                      <AntdSelect.Option value={cate.NODE_ID}>{cate.NAME_KOR}</AntdSelect.Option>
                    ))
                  )}
                  </AntdSelect>
                </td>
              </tr>
              <tr>
                <th>이름</th>
                <td>
                  <AntdInput
                    className="ant-input-xs" allowClear style={{ width: 120 }}
                    onChange={e => this.onChangeSaveData('NAME', e.target.value)}
                  />
                </td>
                <th>주민번호</th>
                <td>
                  <AntdInput className="ant-input-xs" style={{ width: 90 }} allowClear maxLength={6} onChange={e => this.onChangeSaveData('SSN1', e.target.value)} />&nbsp;-&nbsp;
                  <AntdInput className="ant-input-xs" style={{ width: 90 }} allowClear maxLength={7} onChange={e => this.onChangeSaveData('SSN2', e.target.value)} />
                </td>
              </tr>
              <tr>
                <th>학교</th>
                <td>
                  <AntdInput className="ant-input-xs" allowClear onChange={e => this.onChangeSaveData('SCHOOL', e.target.value)} />
                </td>
                <th>검진구분</th>
                <td>
                  <AntdSelect
                    className="select-xs" allowClear placeholder="검진구분" style={{ width: 120 }}
                    onChange={val => this.onChangeSaveData('IS_PRECHK', val)}
                  >
                    <AntdSelect.Option value="0">채용</AntdSelect.Option>
                    <AntdSelect.Option value="1">배치전</AntdSelect.Option>
                  </AntdSelect>
                </td>
              </tr>
              <tr>
                <th>검진기관</th>
                <td>
                  <AntdSelect
                    className="select-xs" allowClear placeholder="검진기관" style={{ width: '100%' }}
                    onChange={val => this.onChangeSaveData('HOSPITAL_CODE', val)}
                  >
                  {result && result.hospitalList && result.hospitalList.list && (
                    result.hospitalList.list.map(item => (
                      <AntdSelect.Option value={item.HOSPITAL_CODE}>{item.HOSPITAL_NAME}</AntdSelect.Option>
                    ))
                  )}
                  </AntdSelect>
                </td>
                <th>예약일</th>
                <td>
                  <AntdDatePicker className="ant-picker-xs" style={{ width: 110 }} onChange={(val1, val2) => this.onChangeSaveData('APP_DT', val2)} />
                </td>
              </tr>
            </tbody>
          </table>
        </StyledHtmlTable>
        <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
          <StyledButton className="btn-light btn-sm mr5" onClick={this.props.onCancelPopup}>취소</StyledButton>
          <StyledButton className="btn-primary btn-sm" onClick={this.onSave}>저장</StyledButton>
        </StyledButtonWrapper>
      </StyledContentsWrapper>
    )
  }
}

export default TargetRegForm;