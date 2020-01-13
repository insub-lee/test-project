import React, { Component } from 'react';
import PropTypes from 'prop-types';

import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';
import StyledRow from 'commonStyled/Form/StyledRow';
import StyledCol from 'commonStyled/Form/StyledCol';
import StyledInput from 'commonStyled/Form/StyledInput';
import StyledSelect from 'commonStyled/Form/StyledSelect';
import { Button, Input, Select, Row, Col } from 'antd';

const AntdRow = StyledRow(Row);
const AntdCol = StyledCol(Col);
const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);
const { Option } = Select;

class ProcessInput extends Component {
  componentDidMount() {}

  render() {
    console.debug(this.props);
    return (
      <div>
        <AntdRow>
          <AntdCol>프로세스</AntdCol>
          <AntdCol>
            <AntdInput value={this.props.processInfo.NAME_KOR} onChange={e => this.props.onChangeValue('NAME_KOR', e.target.value)} />
          </AntdCol>
        </AntdRow>
        <AntdRow>
          <AntdCol>프로세스 클래스</AntdCol>
          <AntdCol>
            <AntdSelect
              value={this.props.processInfo.PROCESS_SVRNAME}
              onChange={e => this.props.onChangeValue('PROCESS_SVRNAME', e)}
              style={{ width: '300px' }}
              placeholder="클래스를 선택해주세요"
            >
              <Option value="linearProcessService">선형 프로세스</Option>
              <Option value="ruleProcessService">사용자 정의</Option>
            </AntdSelect>
          </AntdCol>
          <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
            <StyledButton
              className="btn-primary"
              onClick={this.props.onSaveProcess}
              style={{ display: this.props.processInfo.actionType === 'I' ? 'inline ' : 'none' }}
            >
              프로세스 입력
            </StyledButton>
            <StyledButton
              className="btn-primary"
              onClick={this.props.onUpdateProcess}
              style={{ display: this.props.processInfo.actionType === 'U' ? 'inline ' : 'none' }}
            >
              프로세스 수정
            </StyledButton>
          </StyledButtonWrapper>
        </AntdRow>
      </div>
    );
  }
}

export default ProcessInput;
