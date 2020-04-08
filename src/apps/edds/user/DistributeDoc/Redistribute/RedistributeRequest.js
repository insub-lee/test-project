import React, { Component } from 'react';
import { Input } from 'antd';

import StyledTable from 'commonStyled/MdcsStyled/Table/StyledHtmlTable';
import StyledTextarea from 'commonStyled/Form/StyledTextarea';
import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';
import StyledButton from 'commonStyled/Buttons/StyledButton';

const AntdTextArea = StyledTextarea(Input.TextArea);

class RedistributeRequest extends Component {
  state = {
    reason: '',
  }

  onChangeReason = val => {
    this.setState({ reason: val });
  };

  onClickSendEmail = () => {
    const {id, selectedRow, submitHandlerBySaga, onCancelPopup } = this.props;
    const submitData = {
      ...selectedRow,
      REASON: this.state.reason,
    };
    submitHandlerBySaga(id, 'PUT', '/api/edds/v1/common/distributeDoc', submitData, () => {
      onCancelPopup();
    });
  };

  render() {
    return (
      <>
        <StyledTable>
          <table>
            <colgroup>
              <col width="20%" />
              <col width="80%" />
            </colgroup>
            <tbody>
              <tr>
                <td colSpan={2}>
                  <p>다운로드 횟수를 초과하였을 시 문서 재 배포를 요청하는 곳입니다.</p>
                  <p>이유를 써주시고 send버튼을 눌러주세요.</p>
                </td>
              </tr>
              <tr>
                <th>reason</th>
                <td>
                  <AntdTextArea rows={12} value={this.state.reason} onChange={e => this.onChangeReason(e.target.value)} />
                </td>
              </tr>
            </tbody>
          </table>
        </StyledTable>
        <StyledButtonWrapper className="btn-wrap-center">
          <StyledButton className="btn-light mr5" onClick={this.props.onCancelPopup}>닫기</StyledButton>
          <StyledButton className="btn-primary" onClick={this.onClickSendEmail}>전송</StyledButton>
        </StyledButtonWrapper>
      </>
    );
  }
}

export default RedistributeRequest;