import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Select, DatePicker, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import moment from 'moment';

import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';

const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);
const AntdDatePicker = StyledDatePicker(DatePicker);

class TargetView extends Component {
  state = {
    detail: {},
  }

  componentDidMount() {
    const { sagaKey, getCallDataHandler, spinningOn, selectedRow } = this.props;
    const apiAry = [
      {
        key: 'workAreaList',
        url: '/api/admin/v1/common/categoryMapList',
        type: 'POST',
        params: {
          PARAM: { NODE_ID: 235 },
        },
      },
      {
        key: 'hireGroupList',
        url: '/api/admin/v1/common/categoryMapList',
        type: 'POST',
        params: {
          PARAM: { NODE_ID: 688 },
        },
      },
      {
        key: 'hospitalList',
        url: `/api/eshs/v1/common/health/healthChkHospital`,
        type: 'GET',
      },
      {
        key: 'hireChkDetail',
        url: `/api/eshs/v1/common/health/helathHireChk?COMP_CD=${selectedRow.COMP_CD}&SSN=${selectedRow.SSN}&CHK_SEQ=${selectedRow.CHK_SEQ}`,
        type: 'GET',
      },
    ];
    spinningOn();
    getCallDataHandler(sagaKey, apiAry, this.initData);
  }

  initData = () => {
    const { result, spinningOff } = this.props;
    this.setState({
      detail: result && result.hireChkDetail && result.hireChkDetail.detail ? result.hireChkDetail.detail : {}
    });
    spinningOff();
  };

  onChangeDetail = (key, val) => {
    this.setState(prevState => {
      const { detail } = prevState;
      detail[key] = val;
      return { detail }
    });
  };

  onSave = () => {
    const { sagaKey, submitHandlerBySaga, spinningOn, spinningOff, onCancelPopup } = this.props;
    const submitData = {
      PARAM: {
        ...this.state.detail,
      }
    }

    Modal.confirm({
      title: '저장하시겠습니까?',
      icon: <ExclamationCircleOutlined />,
      okText: '저장',
      cancelText: '취소',
      onOk() {
        spinningOn();
        submitHandlerBySaga(sagaKey, 'PUT', `/api/eshs/v1/common/health/helathHireChk`, submitData, (id, res) => {
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
    const { detail } = this.state;
    const { result } = this.props;

    return (
      <StyledContentsWrapper>
        <StyledHtmlTable>
          <table>
            <colgroup>
              <col width="11%" />
              <col width="23%" />
              <col width="10%" />
              <col width="23%" />
              <col width="10%" />
              <col width="23%" />
            </colgroup>
            <tbody>
              <tr>
                <th>이름</th>
                <td>{detail.NAME}</td>
                <th>검진기관</th>
                <td>
                  <AntdSelect
                    value={detail.HOSPITAL_CODE}
                    className="select-xs" allowClear placeholder="검진기관" style={{ width: '100%' }}
                    onChange={val => this.onChangeDetail('HOSPITAL_CODE', val)}
                  >
                  {result && result.hospitalList && result.hospitalList.list && (
                    result.hospitalList.list.map(item => (
                      <AntdSelect.Option value={item.HOSPITAL_CODE}>{item.HOSPITAL_NAME}</AntdSelect.Option>
                    ))
                  )}
                  </AntdSelect>
                </td>
                <th>검진예약일</th>
                <td>
                  <AntdDatePicker
                    value={moment(detail.APP_DT)} className="ant-picker-xs" format="YYYY-MM-DD" style={{ width: 110 }}
                    onChange={(val1, val2) => this.onChangeDetail('APP_DT', val2)}
                  />
                </td>
              </tr>
              <tr>
                <th>검진구분</th>
                <td>
                  <AntdSelect
                    value={detail.IS_PRECHK}
                    className="select-xs" allowClear placeholder="검진구분" style={{ width: 120 }}
                    onChange={val => this.onChangeDetail('IS_PRECHK', val)}
                  >
                    <AntdSelect.Option value="0">채용</AntdSelect.Option>
                    <AntdSelect.Option value="1">배치전</AntdSelect.Option>
                  </AntdSelect>
                </td>
                <th>검진차수</th>
                <td>
                  {detail.CHK_SEQ === '1' ? '1차' : '재검'}
                </td>
                <th>적합여부</th>
                <td>
                  <AntdSelect
                    value={detail.IS_GOOD}
                    className="select-xs" allowClear placeholder="적합여부" style={{ width: 100 }}
                    onChange={val => this.onChangeDetail('IS_GOOD', val)}
                  >
                    <AntdSelect.Option value="0">부적합</AntdSelect.Option>
                    <AntdSelect.Option value="1">적합</AntdSelect.Option>
                    <AntdSelect.Option value="2">미수검</AntdSelect.Option>
                  </AntdSelect>
                </td>
              </tr>
              <tr>
                <th>조치사항</th>
                <td>
                  <AntdInput
                    value={detail.MEASURE}
                    className="ant-input-xs" style={{ width: '100%' }}
                    onChange={e => this.onChange('MEASURE', e.target.value)}
                  />
                </td>
                <th>주민등록번호</th>
                <td>{detail.SSN && (`${detail.SSN.substring(0, 6)}-${detail.SSN.substring(6, 13)}`)}</td>
                <th>직군</th>
                <td>
                  <AntdSelect
                    value={detail.HIRE_GROUP_CD_NODE_ID}
                    className="select-xs mr5" allowClear placeholder="직군" style={{ width: 120 }}
                    onChange={val => this.onChangeDetail('HIRE_GROUP_CD_NODE_ID', val)}
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
                <th>근무지</th>
                <td>
                  <AntdSelect
                    value={detail.WORK_AREA_CD_NODE_ID}
                    className="select-xs" allowClear placeholder="지역" style={{ width: 110 }}
                    onChange={val => this.onChangeDetail('WORK_AREA_CD_NODE_ID', val)}
                  >
                  {result && result.workAreaList && result.workAreaList.categoryMapList && (
                    result.workAreaList.categoryMapList.filter(cate => cate.LVL === 1).map(cate => (
                      <AntdSelect.Option value={cate.NODE_ID}>{cate.NAME_KOR}</AntdSelect.Option>
                    ))
                  )}
                  </AntdSelect>
                </td>
                <th>상태</th>
                <td>
                  <AntdSelect
                    value={detail.STATUS}
                    className="select-sm mr5" allowClear placeholder="상태" style={{ width: 110 }}
                    onChange={val => this.onChangeDetail('STATUS', val)}>
                    <AntdSelect.Option value="0">작성중</AntdSelect.Option>
                    <AntdSelect.Option value="1">의뢰중</AntdSelect.Option>
                    <AntdSelect.Option value="2">검진완료</AntdSelect.Option>
                  </AntdSelect>
                </td>
                <th>비고</th>
                <td>
                  <AntdInput className="ant-input-xs" style={{ width: '100%' }} />
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
    );
  }
}

TargetView.propTypes = {
  sagaKey: PropTypes.string,
  result: PropTypes.object,
  selectedRow: PropTypes.object,
  getCallDataHandler: PropTypes.func,
  spinningOn: PropTypes.func,
  spinningOff: PropTypes.func,
};

TargetView.defaultProps = {
  getCallDataHandler: () => {},
  spinningOn: () => {},
  spinningOff: () => {},
};

export default TargetView;
