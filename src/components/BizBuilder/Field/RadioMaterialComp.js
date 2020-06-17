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
import LabelComp from './LabelComp';

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
    this.onChangeHandlerText = debounce(this.onChangeHandlerText, 300);
    this.state = {
      mList: [],
      isMeterialView: true,
      isMeterial: 'Y',
      meterialType: undefined,
      meterialText: undefined,
      errorCodeList: undefined,
      isValidation: false,
    };
  }

  componentDidMount() {
    const { fieldSelectData, CONFIG, colData, changeValidationData, COMP_FIELD, sagaKey } = this.props;
    const { isValidation } = this.state;
    if (fieldSelectData && CONFIG.property.compSelectDataKey && CONFIG.property.compSelectDataKey.length > 0) {
      if (fieldSelectData[CONFIG.property.compSelectDataKey] && fieldSelectData[CONFIG.property.compSelectDataKey].length > 0) {
        const isMeterialView = colData === 'Y';
        this.setState({
          mList: fieldSelectData[CONFIG.property.compSelectDataKey]
            .filter(f => f.LVL !== 0 && f.USE_YN === 'Y')
            .map(item => <Option value={item.NODE_ID}>{item.NAME_KOR}</Option>),
          isMeterialView,
        });
      }
    }
    changeValidationData(sagaKey, COMP_FIELD, isValidation, '코드를 입력해주세요');
  }

  componentDidUpdate(prevProps) {
    const { sagaKey, processRule, COMP_FIELD, setProcessRule, formData } = this.props;
    const { processRule: prevProcessRule } = prevProps;

    if (processRule.PRC_ID !== prevProcessRule.PRC_ID) {
      const { DRAFT_DATA } = processRule;
      const tmpDraftData = { ...DRAFT_DATA, material_yn: 'Y' };
      const tmpPrcRule = { ...processRule, DRAFT_DATA: tmpDraftData };
      setProcessRule(sagaKey, tmpPrcRule);
    }
  }

  initDataBind = id => {
    const {
      formData,
      colData,
      extraApiData: { meterialList },
    } = this.props;
    const tempMatList = meterialList.categoryMapList
      .filter(f => f.LVL > 0)
      .map(item => (
        <Option key={item.NODE_ID}>
          {item.CODE}({item.NAME_KOR})
        </Option>
      ));
    const isMeterialView = colData === 'Y';
    this.setState({ mList: tempMatList, isMeterialView });
  };

  onChangeHandler = e => {
    const { changeFormData, sagaKey, COMP_FIELD, setProcessRule, processRule, changeValidationData } = this.props;
    const { DRAFT_DATA } = processRule;
    const tmpDraftData = { ...DRAFT_DATA, material_yn: e.target.value };
    const tmpPrcRule = { ...processRule, DRAFT_DATA: tmpDraftData };
    setProcessRule(sagaKey, tmpPrcRule);
    changeFormData(sagaKey, COMP_FIELD, e.target.value);

    if (e.target.value === 'N') {
      changeFormData(sagaKey, 'MATERIAL_TYPE', ' ');
      changeFormData(sagaKey, 'MATERIAL_TEXT', ' ');
      changeValidationData(sagaKey, COMP_FIELD, true, '유효성 체크를 해주세요');
    }
    changeValidationData(sagaKey, COMP_FIELD, false, '유효성 체크를 해주세요');
    this.setState({ isMeterialView: e.target.value === 'Y' });
  };

  onSelectChange = value => {
    const { changeValidationData, changeFormData, sagaKey, COMP_FIELD } = this.props;
    this.setState({ meterialType: value });
    changeValidationData(sagaKey, COMP_FIELD, false, '유효성 체크를 해주세요');
    changeFormData(sagaKey, 'MATERIAL_TYPE', value);
  };

  onChangeHandlerText = value => {
    const { changeValidationData, changeFormData, sagaKey, COMP_FIELD } = this.props;
    this.setState({ meterialText: value });
    changeValidationData(sagaKey, COMP_FIELD, false, '유효성 체크를 해주세요');
    changeFormData(sagaKey, 'MATERIAL_TEXT', value);
  };

  onClickVaildate = () => {
    const { sagaKey, submitExtraHandler, COMP_FIELD, fieldSelectData, CONFIG } = this.props;
    const codeList = fieldSelectData[CONFIG.property.compSelectDataKey];
    const { meterialType, meterialText, isMeterial } = this.state;
    const prefixUrl = '/api/mdcs/v1/common/SAPCallByMeterialCodeHandler';
    const sfidx = codeList.findIndex(f => f.NODE_ID === meterialType);
    const code = codeList[sfidx] && codeList[sfidx].CODE;

    if (isMeterial === 'Y') {
      if (meterialText && code && meterialText !== '' && code !== '') {
        const param = { MATERIAL_TYPE: code, MATERIAL_TEXT: meterialText };
        submitExtraHandler(sagaKey, 'POST', prefixUrl, param, this.onCallBack, COMP_FIELD);
      } else {
        message.error('자재코드를 입력해주세요');
      }
    }
  };

  onCallBack = (id, response) => {
    const { changeValidationData, COMP_FIELD } = this.props;
    const { matrnList } = response;
    const isCheckList = matrnList.filter(f => f.CHECK !== 'Y');
    const errorCodeList = isCheckList.length > 0 ? isCheckList.map(item => item.MATNR) : [];
    if (errorCodeList.length > 0) {
      changeValidationData(id, COMP_FIELD, false, '미등록 코드가 존재합니다.');
      this.setState({ isValidation: false });
    } else {
      this.setState({ isValidation: true });
      changeValidationData(id, COMP_FIELD, true, '');
    }
    this.setState({ errorCodeList });
  };

  onIsMeterialCheck = e => {
    const { changeFormData, changeValidationData, COMP_FIELD, sagaKey } = this.props;
    this.setState({ isMeterial: e.target.value });
    changeFormData(sagaKey, COMP_FIELD, e.target.value);
    if (e.target.value === 'N') {
      changeValidationData(sagaKey, COMP_FIELD, true, '');
      this.setState({ meterialType: undefined, meterialText: undefined });
    } else {
      changeValidationData(sagaKey, COMP_FIELD, false, '코드를 입력해주세요');
    }
  };

  render() {
    const { formData, colData, processRule } = this.props;

    const { errorCodeList } = this.state;
    return (
      <StyledWrap>
        <div className="validity-check-input">
          <Radio.Group name="radiogroup" value={colData} onChange={this.onIsMeterialCheck}>
            <Radio value="Y">Yes</Radio>
            <Radio value="N">No</Radio>
          </Radio.Group>
          {this.state.isMeterialView && (
            <AntdSelect
              value={formData.MATERIAL_TYPE}
              onChange={this.onSelectChange}
              placeholder="자재코드 선택"
              className="mr5"
              style={{ width: '180px' }}
              dropdownRender={menu => <StyledDropdown>{menu}</StyledDropdown>}
            >
              {this.state.mList}
            </AntdSelect>
          )}
          {this.state.isMeterialView && (
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
          )}{' '}
          {this.state.isMeterialView && (
            <StyledButton className="btn-xs btn-light" onClick={this.onClickVaildate}>
              <SearchOutlined />
              유효성체크
            </StyledButton>
          )}
        </div>
        {errorCodeList && errorCodeList.length > 0 && (
          <div className="unregistered-code">
            <div className="title">미등록 코드</div>
            <div className="code-list">{errorCodeList && errorCodeList.map(item => <div>{item}</div>)}</div>
          </div>
        )}
      </StyledWrap>
    );
  }
}

RadioMaterialComp.propTypes = {
  extraApiData: PropTypes.objectOf(PropTypes.array),
};

RadioMaterialComp.defaultProps = {
  apiArys: [
    {
      key: 'meterialList',
      url: '/api/admin/v1/common/categoryMapList?MAP_ID=28',
      type: 'GET',
      params: {},
    },
  ],
};

export default RadioMaterialComp;
