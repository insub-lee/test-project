import React, { Component } from 'react';
import { Radio, Select, Button } from 'antd';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import { SearchOutlined } from '@ant-design/icons';
import message from 'components/Feedback/message';
import styled from 'styled-components';
import uuid from 'uuid/v1';

import StyledDropdown from 'components/BizBuilder/styled/Form/StyledDropdown';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

const { Option } = Select;
const AntdSelect = StyledSelect(Select);
//const AntdInput = StyledInput(Input);

const StyledWrap = styled.div`
  .validity-check-input {
    input,
    select {
      width: 150px;
    }

    .input {
      display: inline-block;
      height: calc(1.47em + 1rem + 2px);
      padding: 0.5rem 0.875rem;
      font-size: 0.8125rem;
      font-weight: 400;
      line-height: 1.47;
      color: #495057;
      background-clip: padding-box;
      border: 1px solid #ddd;
      border-radius: 4px;
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
      vertical-align: middle;
      padding: 0.2rem 0.5rem;
      font-size: 0.75rem;
      height: auto;
      margin-right: 5px;

      &:hover,
      &:focus {
        color: #495057;
        border-color: #636a78;
        outline: 0;
        box-shadow: 0 0 0 0.2rem transparent;
      }

      &:disabled {
        background: #f5f5f5;
      }
    }

    button {
      vertical-align: middle;
    }

    input[type='radio'] {
      width: 0px;
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

const getNewKey = () => uuid();

class RadioMaterialComp extends Component {
  constructor(props) {
    super(props);
    this.onChangeHandlerText = debounce(this.onChangeHandlerText, 300);
    this.state = {
      mList: [],
      isUseMeterial: 'Y',
      initMeterialCode: '',
      initMeterialText: '',
      meterialCode: '',
      meterialText: '',
      isVaildation: false,
      errorCodeList: [],
      compKey: '',
    };
  }

  componentDidMount() {
    const { fieldSelectData, CONFIG, colData, changeValidationData, COMP_FIELD, sagaKey, formData } = this.props;
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
          compKey: `biz-builder-field-radio-material-comp-${getNewKey()}`,
        });
      }
    }
    if (colData === 'Y') {
      changeValidationData(sagaKey, COMP_FIELD, false, '원자재코드를 입력해주세요');
    }
    const { MATERIAL_YN, MATERIAL_TYPE, MATERIAL_TEXT } = formData;
    // console.debug(formData, 'MATERIAL_TYPE:', MATERIAL_TYPE, 'MATERIAL_TEXT:', MATERIAL_TEXT);
    this.setState(
      {
        isUseMeterial: colData,
        initMeterialCode: MATERIAL_TYPE && Number(MATERIAL_TYPE),
        initMeterialText: MATERIAL_TEXT,
        meterialCode: MATERIAL_TYPE !== '' ? Number(MATERIAL_TYPE) : undefined,
        meterialText: MATERIAL_TEXT,
      },
      () => {
        this.onVaildationCheck();
      },
    );
  }

  onVaildationCheck = () => {
    const { changeValidationData, COMP_FIELD, sagaKey } = this.props;

    if (this.state.isUseMeterial === 'Y') {
      if (!this.state.meterialCode) {
        changeValidationData(sagaKey, COMP_FIELD, false, '자재코드를 선택해주세요');
        return;
      }

      if (!this.state.meterialText) {
        changeValidationData(sagaKey, COMP_FIELD, false, '자재코드를 입력해주세요');
        return;
      }

      if (!this.state.isVaildation) {
        changeValidationData(sagaKey, COMP_FIELD, false, '유효성체크버튼을 클릭해 주세요.');
        return;
      }
      changeValidationData(sagaKey, COMP_FIELD, true, '');
    } else {
      changeValidationData(sagaKey, COMP_FIELD, true, '');
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const { sagaKey, changeValidationData, COMP_FIELD, formData, viewType } = this.props;
    const { isUseMeterial, isVaildation, meterialCode, meterialText } = prevState;
    // console.debug('state', prevState, this.state);
    if (
      this.state.isUseMeterial !== isUseMeterial ||
      this.state.meterialCode !== meterialCode ||
      this.state.meterialText !== meterialText ||
      this.state.isVaildation !== isVaildation
    ) {
      this.onVaildationCheck();
    }

    if (
      viewType === 'MODIFY' &&
      prevProps.formData &&
      prevProps.formData.MATERIAL_TEXT !== undefined &&
      formData.MATERIAL_TEXT &&
      prevProps.formData.MATERIAL_TEXT !== formData.MATERIAL_TEXT
    ) {
      this.setState({ compKey: `biz-builder-field-radio-material-comp-${getNewKey()}` });
    }
  }

  onChangeIsMeterial = e => {
    const { sagaKey, changeValidationData, COMP_FIELD, changeFormData } = this.props;
    console.debug('COMP_FIELD', COMP_FIELD);
    const { initMeterialCode, initMeterialText } = this.state;
    this.setState({ isUseMeterial: e.target.value });
    if (e.target.value === 'N') {
      changeFormData(sagaKey, 'MATERIAL_TYPE', '');
      changeFormData(sagaKey, 'MATERIAL_TEXT', '');
      changeValidationData(sagaKey, COMP_FIELD, true, '');
    } else {
      // console.debug(initMeterialCode, initMeterialText);
      changeFormData(sagaKey, 'MATERIAL_TYPE', initMeterialCode);
      changeFormData(sagaKey, 'MATERIAL_TEXT', initMeterialText);
      this.setState({ meterialCode: initMeterialCode, meterialText: initMeterialText });
    }
    changeFormData(sagaKey, COMP_FIELD, e.target.value);
  };

  onSelectMeterialCode = value => {
    const { changeFormData, sagaKey, COMP_FIELD } = this.props;
    this.setState({ meterialCode: value });
    changeFormData(sagaKey, 'MATERIAL_TYPE', value);
  };

  onChangeHandlerText = value => {
    const { changeFormData, sagaKey, COMP_FIELD } = this.props;
    this.setState({ meterialText: value });
    changeFormData(sagaKey, 'MATERIAL_TEXT', value);
  };

  onClickVaildate = () => {
    const { sagaKey, submitExtraHandler, COMP_FIELD, fieldSelectData, CONFIG } = this.props;
    const codeList = fieldSelectData[CONFIG.property.compSelectDataKey];
    const { meterialCode, meterialText, isUseMeterial, isPass } = this.state;
    const prefixUrl = '/api/mdcs/v1/common/SAPCallByMeterialCodeHandler';
    const sfidx = codeList.findIndex(f => f.NODE_ID === meterialCode);
    const code = codeList[sfidx] && codeList[sfidx].CODE;

    if (isUseMeterial && meterialText && meterialCode && isUseMeterial === 'Y' && meterialText !== '' && meterialCode !== '') {
      const param = { MATERIAL_TYPE: code, MATERIAL_TEXT: meterialText };
      submitExtraHandler(sagaKey, 'POST', prefixUrl, param, this.onCallBack, COMP_FIELD);
    } else {
      message.error('자재코드를 입력해주세요');
    }
  };

  onCallBack = (id, response) => {
    const { changeValidationData, COMP_FIELD } = this.props;
    const { matrnList } = response;

    if (matrnList.length > 0) {
      const isCheckList = matrnList.filter(f => f.CHECK !== 'Y');
      const errorCodeList = isCheckList.length > 0 ? isCheckList.map(item => item.MATNR) : [];
      if (errorCodeList.length > 0) {
        changeValidationData(id, COMP_FIELD, false, '미등록 코드가 존재합니다.');
        this.setState({ isValidation: false });
      } else {
        this.setState({ isValidation: true });
        message.success('사용 가능한 코드 입니다.');
        changeValidationData(id, COMP_FIELD, true, '');
      }
      this.setState({ errorCodeList });
    } else {
      message.error('코드 확인 불가');
    }
  };

  render() {
    const { formData, colData, processRule, viewType } = this.props;
    const { mList, isUseMeterial, initMeterialCode, initMeterialText, meterialCode, meterialText, compKey, errorCodeList } = this.state;
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
            className="mr5 select-xs"
            style={{ width: '180px', display: `${isUseMeterial === 'Y' ? '' : 'none'}` }}
            dropdownRender={menu => <StyledDropdown>{menu}</StyledDropdown>}
            defaultValue={initMeterialCode}
            value={meterialCode === '' ? undefined : meterialCode}
          >
            {mList}
          </AntdSelect>

          {viewType === 'INPUT' ? (
            <input
              className="input"
              defaultValue={formData.MATERIAL_TEXT}
              style={{ display: `${isUseMeterial === 'Y' ? '' : 'none'}` }}
              onChange={e => {
                const reg = /[^0-9,]/gi;
                if (reg.test(e.target.value)) {
                  message.info('숫자 ,(comma) 만 사용가능');
                  e.target.value = e.target.value.replace(/[^0-9,]/gi, '');
                }
                const vals = e.target.value;
                this.onChangeHandlerText(vals);
              }}
            />
          ) : (
            <input
              className="input"
              key={compKey}
              style={{ display: `${isUseMeterial === 'Y' ? '' : 'none'}` }}
              defaultValue={formData.MATERIAL_TEXT}
              onChange={e => {
                const reg = /[^0-9,]/gi;
                if (reg.test(e.target.value)) {
                  message.info('숫자 ,(comma) 만 사용가능');
                  e.target.value = e.target.value.replace(/[^0-9,]/gi, '');
                }
                const vals = e.target.value;
                this.onChangeHandlerText(vals);
              }}
            />
          )}
          <StyledButton className="btn-xs btn-light" style={{ display: `${isUseMeterial === 'Y' ? '' : 'none'}` }} onClick={this.onClickVaildate}>
            <SearchOutlined />
            유효성체크
          </StyledButton>
          {isUseMeterial === 'Y' && errorCodeList && errorCodeList.length > 0 && (
            <div className="unregistered-code">
              <div className="title">미등록 코드</div>
              <div className="code-list">{errorCodeList && errorCodeList.map(item => <div>{item}</div>)}</div>
            </div>
          )}
        </div>
      </StyledWrap>
    );
  }
}

export default RadioMaterialComp;
