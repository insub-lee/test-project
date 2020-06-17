import React, { Component } from 'react';
import { Input, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledTextarea from 'components/BizBuilder/styled/Form/StyledTextarea';

const AntdTextArea = StyledTextarea(Input.TextArea);

class RedistributeRequest extends Component {
  state = {
    reason: '',
  }

  onChangeReason = val => {
    this.setState({ reason: val });
  };

  onClickSendEmail = () => {
    const {id, selectedRow, submitHandlerBySaga, onCancelPopup, spinningOn, spinningOff } = this.props;
    const submitData = {
      PARAM: {
        ...selectedRow,
        REASON: this.state.reason,
      }
    };

    Modal.confirm({
      title: '재배포 요청 메일을 발송하시겠습니까?',
      icon: <ExclamationCircleOutlined />,
      okText: '발송',
      cancelText: '취소',
      onOk() {
        spinningOn();
        submitHandlerBySaga(id, 'PUT', '/api/edds/v1/common/distributeDoc', submitData, () => {
          spinningOff();
          onCancelPopup();
        });
      }
    });
  };

  render() {
    return (
      <StyledContentsWrapper>
        <StyledHtmlTable>
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
                <th>Reason</th>
                <td>
                  <AntdTextArea rows={12} value={this.state.reason} onChange={e => this.onChangeReason(e.target.value)} />
                </td>
              </tr>
            </tbody>
          </table>
        </StyledHtmlTable>
        <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
          <StyledButton className="btn-light btn-sm mr5" onClick={this.props.onCancelPopup}>닫기</StyledButton>
          <StyledButton className="btn-primary btn-sm" onClick={this.onClickSendEmail}>전송</StyledButton>
        </StyledButtonWrapper>
      </StyledContentsWrapper>
    );
  }
}

export default RedistributeRequest;