import React, { Component } from 'react';
import { Select, Input, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledTextarea from 'components/BizBuilder/styled/Form/StyledTextarea';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

const AntdSelect = StyledSelect(Select);
const AntdTextarea = StyledTextarea(Input.TextArea);

class InputForm extends Component {
  state = {
    data: {
      CHK_CD: '',
      N_CHK_REASON_CD_NODE_ID: '',
      REASON_DETAIL: '',
      REASON_GUBUN: 2,  // 고정(미검진신청)
      REQUEST_EMP_NO: '',
      REQUEST_USER_ID: ''
    }
  };

  componentWillMount() {
    const { selectedRow } = this.props;
    this.setState(prevState => {
      const { data } = prevState;
      data.CHK_CD = selectedRow.CHK_CD;
      data.REQUEST_EMP_NO = selectedRow.EMP_NO;
      data.REQUEST_USER_ID = selectedRow.USER_ID;
      return { data }
    });
  };

  componentDidMount() {
    const { sagaKey, getCallDataHandlerReturnRes, spinningOn, spinningOff } = this.props;
    const apiInfo = {
      key: 'nChkReasonList',
      url: '/api/admin/v1/common/categoryMapList',
      type: 'POST',
      params: {
        PARAM: { NODE_ID: 687 }
      },
    }
    spinningOn();
    getCallDataHandlerReturnRes(sagaKey, apiInfo, (id, res) => {
      spinningOff();
    });
  };

  onChangeData = (key, val) => {
    this.setState(prevState => {
      const { data } = prevState;
      data[key] = val;
      return { data }
    });
  }

  onSave = () => {
    if (this.state.data.N_CHK_REASON_CD === '') {
      message.info(<MessageContent>미검진사유를 선택해주세요.</MessageContent>);
      return false;
    }

    const { sagaKey, submitHandlerBySaga, spinningOn, spinningOff, onCancelPopup } = this.props;
    const submitData = {
      PARAM: {
        ...this.state.data,
      }
    };

    Modal.confirm({
      title: '저장하시겠습니까?',
      icon: <ExclamationCircleOutlined />,
      okText: '저장',
      cancelText: '취소',
      onOk() {
        spinningOn();
        submitHandlerBySaga(sagaKey, 'POST', '/api/eshs/v1/common/health/healthNChkReason', submitData, (id, res) => {
          if (res && res.result > 0) {
            message.info(<MessageContent>저장하였습니다.</MessageContent>);
          } else {
            message.info(<MessageContent>저장에 실패하였습니다.</MessageContent>);
          }
          spinningOff();
          onCancelPopup();
        });
      }
    });
  }

  render() {
    const { result, selectedRow } = this.props;

    return (
      <StyledContentsWrapper>
        <StyledHtmlTable>
          <table>
            <colgroup>
              <col width="30%" />
              <col width="70%" />
            </colgroup>
            <tbody>
              <tr>
                <th>이름</th>
                <td>{selectedRow.NAME_KOR}</td>
              </tr>
              <tr>
                <th>미검진사유</th>
                <td>
                  <AntdSelect className="select-sm" style={{ width: 170 }} placeholder="미검진사유" onChange={val => this.onChangeData('N_CHK_REASON_CD_NODE_ID', val)}>
                  {result && result.nChkReasonList && result.nChkReasonList.categoryMapList && result.nChkReasonList.categoryMapList.filter(cate => cate.LVL === 3).map(cate => (
                    <AntdSelect.Option value={cate.NODE_ID}>{cate.NAME_KOR}</AntdSelect.Option>
                  ))}
                  </AntdSelect>
                </td>
              </tr>
              <tr>
                <th>상세사유</th>
                <td>
                  <AntdTextarea rows={8} onChange={e => this.onChangeData('REASON_DETAIL', e.target.value)} />
                </td>
              </tr>
            </tbody>
          </table>
        </StyledHtmlTable>
        <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
          <StyledButton className="btn-light btn-sm mr5" onClick={this.props.onCancelPopup}>닫기</StyledButton>
          <StyledButton className="btn-primary btn-sm" onClick={this.onSave}>저장</StyledButton>
        </StyledButtonWrapper>
      </StyledContentsWrapper>
    );
  }
}

export default InputForm;