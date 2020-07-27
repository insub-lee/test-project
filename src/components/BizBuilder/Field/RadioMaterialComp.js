import React, { Component } from 'react';
import { Radio, Select, Button, Input } from 'antd';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import { SearchOutlined } from '@ant-design/icons';
import message from 'components/Feedback/message';
import styled from 'styled-components';

import StyledDropdown from 'components/BizBuilder/styled/Form/StyledDropdown';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

const { Option } = Select;
const AntdSelect = StyledSelect(Select);
const AntdInput = StyledInput(Input);
const StyledWrap = styled.div`
  .validity-check-input {
    input,
    select {
      width: 150px;
    }

    button {
      vertical-align: middle;
    }
  }

  .unregistered-code {
    border: 1px solid #eee;
    margin-top: 5px;
    display: table;
    width: 100%;

    .title {
      display: table-cell;
      width: 20%;
      text-align: center;
      color: #000;
      background: #f7f7f7;
      vertical-align: middle;
      font-size: 12px;
    }

    .code-list {
      padding: 5px;
      display: table-cell;
      width: auto;

      div {
        margin-bottom: 5px;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
`;

class RadioMaterialComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mList: undefined,
      isUseMeterial: 'Y',
      meterialCode: undefined,
      meterialText: undefined,
      isVaildation: false,
    };
  }

  componentDidMount() {
    const { fieldSelectData, CONFIG, colData, changeValidationData, COMP_FIELD, sagaKey } = this.props;
    if (fieldSelectData && CONFIG.property.compSelectDataKey && CONFIG.property.compSelectDataKey.length > 0) {
      if (fieldSelectData[CONFIG.property.compSelectDataKey] && fieldSelectData[CONFIG.property.compSelectDataKey].length > 0) {
        this.setState({
          mList: fieldSelectData[CONFIG.property.compSelectDataKey]
            .filter(f => f.LVL !== 0 && f.USE_YN === 'Y')
            .map(item => (
              <Option key={item.NODE_ID} value={item.NODE_ID}>
                {item.NAME_KOR}
              </Option>
            )),
        });
      }
    }
    if (colData === 'Y') {
      changeValidationData(sagaKey, COMP_FIELD, false, '원자재코드를 입력해주세요');
    }
    this.setState({ isUseMeterial: colData });
  }

  componentDidUpdate(prevProps, prevState) {
    const { sagaKey, changeValidationData, COMP_FIELD } = this.props;
    const { isUseMeterial, isVaildation, meterialCode, meterialText } = prevState;
    console.debug('state', prevState, this.state);
    if (this.state.isUseMeterial !== isUseMeterial || this.state.meterialCode !== meterialCode || this.state.meterialText !== meterialText) {
      if (this.state.isUseMeterial === 'Y') {
        console.debug('유효성 체크 진행');

        if (!this.state.meterialCode) {
          changeValidationData(sagaKey, COMP_FIELD, false, '자재코드를 선택해주세요');
          return;
        }

        if (!this.state.meterialText) {
          changeValidationData(sagaKey, COMP_FIELD, false, '자재코드를 입력해주세요');
          return;
        }

        if (!isVaildation) {
          changeValidationData(sagaKey, COMP_FIELD, false, '정상적인 자재코드인지 유효성체크를 해주세요.');
          return;
        }

        changeValidationData(sagaKey, COMP_FIELD, false, '원자재코드를 입력해주세요');
      } else {
        console.debug('X 체크 진행');
        changeValidationData(sagaKey, COMP_FIELD, false, '동과');
      }
    }
  }

  onChangeIsMeterial = e => {
    this.setState({ isUseMeterial: e.target.value });
  };

  onSelectMeterialCode = value => {
    this.setState({ meterialCode: value });
  };

  render() {
    const { formData, colData, processRule } = this.props;
    const { mList, isUseMeterial } = this.state;
    return (
      <StyledWrap>
        <div className="validity-check-input">
          <Radio.Group name="radiogroup" value={isUseMeterial} onChange={this.onChangeIsMeterial}>
            <Radio value="Y">Yes</Radio>
            <Radio value="N">No</Radio>
          </Radio.Group>

          <AntdSelect
            onChange={this.onSelectMeterialCode}
            placeholder="자재코드 선택"
            className="mr5"
            style={{ width: '180px' }}
            dropdownRender={menu => <StyledDropdown>{menu}</StyledDropdown>}
          >
            {mList}
          </AntdSelect>

          <AntdInput
            className="mr5"
            defaultValue={formData.MATERIAL_TEXT}
            onChange={e => {
              const reg = /[^0-9,]/gi;
              if (reg.test(e.target.value)) {
                message.success('숫자 ,(comma) 만 사용가능');
                e.target.value = e.target.value.replace(/[^0-9,]/gi, '');
              }
              const vals = e.target.value;
              this.onChangeHandlerText(vals);
            }}
          />

          <StyledButton className="btn-xs btn-light" onClick={this.onClickVaildate}>
            <SearchOutlined />
            유효성체크
          </StyledButton>
        </div>
      </StyledWrap>
    );
  }
}

export default RadioMaterialComp;
