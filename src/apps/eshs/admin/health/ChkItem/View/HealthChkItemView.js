import React, { Component } from 'react';
import { Input, Select } from 'antd';

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

class HealthChkItemView extends Component {
  state = {
    detail: {},
    saveType: '',
  }

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
          ITEM_CODE: '',
          ITEM_NAME: '',
          ITEM_CLASS: '',
          ITEM_DESC: '',
          ITEM_GENDER: 'C',
          ITEM_REQUIRE: 'Y',
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
  }

  onSaveCode = () => {
    const { sagaKey, submitHandlerBySaga, onSaveAfter } = this.props;
    const submitData = {
      PARAM: {
        ...this.state.detail,
      }
    };
    
    submitHandlerBySaga(sagaKey, (this.state.saveType === 'I' ? 'POST' : 'PUT'), `/api/eshs/v1/common/health/healthChkItem`, submitData, (id, response) => {
      if (response) {
        if (response.result === 1) {
          message.info(<MessageContent>저장되었습니다.</MessageContent>);
          onSaveAfter();
        } else if (response.result === -1) {
          message.warn(<MessageContent>동일한 코드가 존재합니다.</MessageContent>);
        }
      } else {
        message.error(<MessageContent>검진항목 등록에 실패하였습니다.</MessageContent>);
      }
    });
  };
  
  render() {
    const { detail, saveType } = this.state;
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
                <th>검진항목코드</th>
                <td>
                  <AntdInput value={detail.ITEM_CODE} onChange={e => this.onChangeDetail('ITEM_CODE', e.target.value)} readOnly={saveType === 'U'} />
                </td>
              </tr>
              <tr>
                <th>검진항목명</th>
                <td>
                  <AntdInput value={detail.ITEM_NAME} onChange={e => this.onChangeDetail('ITEM_NAME', e.target.value)} />
                </td>
              </tr>
              <tr>
                <th>검진항목분류</th>
                <td>
                  <AntdInput value={detail.ITEM_CLASS} onChange={e => this.onChangeDetail('ITEM_CLASS', e.target.value)} />
                </td>
              </tr>
              <tr>
                <th>임상적의의</th>
                <td>
                  <AntdTextarea value={detail.ITEM_DESC} onChange={e => this.onChangeDetail('ITEM_DESC', e.target.value)} />
                </td>
              </tr>
              <tr>
                <th>검진 성별</th>
                <td>
                  <AntdSelect value={detail.ITEM_GENDER} onChange={val => this.onChangeDetail('ITEM_GENDER', val)}>
                    <AntdSelect.Option value="C">공통</AntdSelect.Option>
                    <AntdSelect.Option value="M">남자만</AntdSelect.Option>
                    <AntdSelect.Option value="F">여자만</AntdSelect.Option>
                  </AntdSelect>
                </td>
              </tr>
              <tr>
                <th>필수검진여부</th>
                <td>
                  <AntdSelect value={detail.ITEM_REQUIRE} onChange={val => this.onChangeDetail('ITEM_REQUIRE', val)}>
                    <AntdSelect.Option value="Y">필수검진</AntdSelect.Option>
                    <AntdSelect.Option value="N">추가검진</AntdSelect.Option>
                  </AntdSelect>
                </td>
              </tr>
            </tbody>
          </table>
        </StyledHtmlTable>
        <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
          <StyledButton className="btn-light mr5" onClick={this.props.onCancelPopup}>닫기</StyledButton>
          <StyledButton className="btn-primary" onClick={this.onSaveCode}>저장</StyledButton>
        </StyledButtonWrapper>
      </>
    );
  }
}

export default HealthChkItemView;