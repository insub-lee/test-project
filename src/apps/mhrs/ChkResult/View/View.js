import React, { Component } from 'react';
import { Input, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import moment from 'moment';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledTextarea from 'components/BizBuilder/styled/Form/StyledTextarea';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

const AntdTextarea = StyledTextarea(Input.TextArea);
const AntdInput = StyledInput(Input);
const currentYear = moment(new Date()).format('YYYY');

class View extends Component {
  state = {
    totalResult: {},
    resultItems: [],
  }

  componentDidMount() {
    const {
      sagaKey,
      getCallDataHandler,
      selectedRow,
      spinningOn,
      spinningOff,
    } = this.props;
    const apiAry = [
      {
        key: 'chkResultData',
        type: 'POST',
        url: `/api/eshs/v1/common/MhrsHealthChkResultData`,
        params: {
          PARAM: { ...selectedRow },
        }
      },
    ];
    spinningOn();
    getCallDataHandler(sagaKey, apiAry, this.initData);
  }

  initData = () => {
    const { result, spinningOff } = this.props;
    let currDesc = '';
    let groupCnt = 0;
    this.setState({
      totalResult: result && result.chkResultData && result.chkResultData.data && result.chkResultData.data.totalResult ? result.chkResultData.data.totalResult : null,
      resultItems: result && result.chkResultData && result.chkResultData.data && result.chkResultData.data.resultItems ? result.chkResultData.data.resultItems.map(item => {
        if (currDesc !== item.CHK_RESULT_ITEM_DESC) {
          groupCnt = result.chkResultData.data.resultItems.filter(l => l.CHK_RESULT_ITEM_DESC === item.CHK_RESULT_ITEM_DESC).length;
        } else {
          groupCnt = 0;
        }
        currDesc = item.CHK_RESULT_ITEM_DESC;
        return {
          ...item,
          rowSpan: groupCnt
        }
      }) : null,
    });
    spinningOff();
  };

  onChangeResultItemData = (row, val) => {
    this.setState(prevState => {
      const { resultItems } = prevState;
      return {
        resultItems: resultItems.map(item => {
          if (item.CHK_RESULT_ITEM_CD === row.CHK_RESULT_ITEM_CD) {
            item.RESULT = val;
            item.IS_MODIFY = true;
          }
          return { ...item }
        }),
      }
    });
  };

  onSave = () => {
    const { sagaKey, submitHandlerBySaga, spinningOn, spinningOff, onCancelPopup } = this.props;
    const submitData = {
      PARAM: {
        totalResult: this.state.totalResult,
        resultItems: this.state.resultItems,
      }
    }

    Modal.confirm({
      title: '저장하시겠습니까?',
      icon: <ExclamationCircleOutlined />,
      okText: '저장',
      cancelText: '취소',
      onOk() {
        spinningOn();
        submitHandlerBySaga(sagaKey, 'PUT', '/api/eshs/v1/common/MhrsHealthChkResultData', submitData, (id, res) => {
          spinningOff();
          if (res && res.result > 0) {
            message.success(<MessageContent>저장하였습니다.</MessageContent>);
            onCancelPopup();
          } else {
            message.error(<MessageContent>저장에 실패하였습니다.</MessageContent>);
          }
        });
      }
    });
  };

  render() {
    const { result, selectedRow } = this.props;
    const { totalResult, resultItems } = this.state;

    return (
      <StyledContentsWrapper>

        <StyledHtmlTable>
          <table>
            <colgroup>
              <col width="10%" />
              <col width="20%" />
              <col width="10%" />
              <col width="20%" />
              <col width="10%" />
              <col width="30%" />
            </colgroup>
            <tbody>
              <tr>
                <th>사번</th>
                <td>{selectedRow.EMP_NO}</td>
                <th>이름</th>
                <td>{selectedRow.USER_NAME}</td>
                <th>주민등록번호</th>
                <td>{`${selectedRow.REGNO.substring(0, 6)}-${selectedRow.REGNO.substring(6, 13)}`}</td>
              </tr>
              <tr>
                <th>전화번호</th>
                <td></td>
                <th>검진유형</th>
                <td>{selectedRow.CHK_TYPE && (`${selectedRow.CHK_TYPE}형`) }</td>
                <th>검진항목</th>
                <td>{selectedRow.CHK_ITEMS}</td>
              </tr>
              <tr>
                <th>검진종류</th>
                <td>{selectedRow.CHK_TYPE_NAME}</td>
                <th>검진차수</th>
                <td>{selectedRow.CHK_SEQ === '1' ? `${selectedRow.CHK_SEQ}차` : '재검'}</td>
                <th>검진일</th>
                <td>{selectedRow.CHK_DT}</td>
              </tr>
            </tbody>
          </table>
        </StyledHtmlTable>
        <StyledButtonWrapper className="btn-wrap-inline btn-wrap-mt-20 btn-wrap-mb-10">
          <StyledButton className="btn-primary btn-sm" onClick={this.onSave}>저장</StyledButton>
        </StyledButtonWrapper>
        {totalResult ? (
          <>
            <StyledHtmlTable>
              <table>
                <colgroup>
                  <col width="20%" />
                  <col width="80%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>판정</th>
                    <td>
                      <AntdTextarea
                        rows={4} value={totalResult.DISEASE_DESCS}
                        onChange={e => this.setState({ totalResult : { ...totalResult, DISEASE_DESCS: e.target.value }})}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>종합소견</th>
                    <td>
                      <AntdTextarea
                        rows={8} value={totalResult.TOTAL_COMMENT}
                        onChange={e => this.setState({ totalResult : { ...totalResult, TOTAL_COMMENT: e.target.value }})}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>조치사항</th>
                    <td>
                      <AntdTextarea
                        rows={4} value={totalResult.MEASURE}
                        onChange={e => this.setState({ totalResult : { ...totalResult, MEASURE: e.target.value }})}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </StyledHtmlTable>
            <br />
            <StyledHtmlTable>
              <table>
                <colgroup>
                  <col width="20%" />
                  <col width="30%" />
                  <col width="20%" />
                  <col width="30%" />
                </colgroup>
                <thead>
                  <th>구분</th>
                  <th>검사종목</th>
                  <th>검사결과</th>
                  <th>기준치</th>
                </thead>
                <tbody>
                {resultItems.map(item => (
                  <tr>
                    {item.rowSpan !== 0 && (<td rowSpan={item.rowSpan}>{item.CHK_RESULT_ITEM_DESC}</td>)}
                    <td>{item.CHK_RESULT_ITEM_NM}</td>
                    <td>
                      <AntdInput
                        className="ant-input-xs" style={{ width: '90%' }}
                        value={item.RESULT}
                        onChange={e => this.onChangeResultItemData(item, e.target.value)}
                      />
                    </td>
                    <td>{item.BASE_RESULT}</td>
                  </tr>
                ))}
                </tbody>
              </table>
            </StyledHtmlTable>
          </>
        ) : (
          <StyledHtmlTable>
            <table>
              <tbody>
                <td style={{ width: '100%' }}>검진 결과가 없습니다.</td>
              </tbody>
            </table>
          </StyledHtmlTable>
        )}
        <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
          <StyledButton className="btn-light btn-sm mr5" onClick={this.props.onCancelPopup}>닫기</StyledButton>
          <StyledButton className="btn-primary btn-sm" onClick={this.onSave}>저장</StyledButton>
        </StyledButtonWrapper>
      </StyledContentsWrapper>
    );
  }
}

export default View;
