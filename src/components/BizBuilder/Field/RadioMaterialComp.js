import React, { Component } from 'react';
import { Radio, Select, Button } from 'antd';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import { SearchOutlined } from '@ant-design/icons';
import message from 'components/Feedback/message';
import StyledSelect from 'commonStyled/MdcsStyled/Select/StyledSelect';
import LabelComp from './LabelComp';

const { Option } = Select;

class RadioMaterialComp extends Component {
  constructor(props) {
    super(props);
    this.onChangeHandlerText = debounce(this.onChangeHandlerText, 300);
    this.state = {
      mList: [],
      isMeterialView: true,
      meterialType: undefined,
      meterialText: undefined,
      errorCodeList: undefined,
    };
  }

  componentDidMount() {
    const { fieldSelectData, CONFIG, colData, changeValidationData, COMP_FIELD, sagaKey } = this.props;
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
    changeValidationData(sagaKey, COMP_FIELD, false, '코드를 입력해주세요');
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
    const { changeFormData, sagaKey, COMP_FIELD, setProcessRule, processRule } = this.props;
    const { DRAFT_DATA } = processRule;
    const tmpDraftData = { ...DRAFT_DATA, material_yn: e.target.value };
    const tmpPrcRule = { ...processRule, DRAFT_DATA: tmpDraftData };
    setProcessRule(sagaKey, tmpPrcRule);
    changeFormData(sagaKey, COMP_FIELD, e.target.value);

    if (e.target.value === 'N') {
      changeFormData(sagaKey, 'MATERIAL_TYPE', ' ');
      changeFormData(sagaKey, 'MATERIAL_TEXT', ' ');
    }
    this.setState({ isMeterialView: e.target.value === 'Y' });
  };

  onSelectChange = value => {
    const { changeFormData, sagaKey } = this.props;
    this.setState({ meterialType: value });
    changeFormData(sagaKey, 'MATERIAL_TYPE', value);
  };

  onChangeHandlerText = value => {
    const { changeFormData, sagaKey } = this.props;
    this.setState({ meterialText: value });
    changeFormData(sagaKey, 'MATERIAL_TEXT', value);
  };

  onClickVaildate = () => {
    console.debug('this.props', this.props);
    const { sagaKey, submitExtraHandler, COMP_FIELD, fieldSelectData, CONFIG } = this.props;
    const codeList = fieldSelectData[CONFIG.property.compSelectDataKey];
    const { meterialType, meterialText } = this.state;
    const prefixUrl = '/api/mdcs/v1/common/SAPCallByMeterialCodeHandler';
    const sfidx = codeList.findIndex(f => f.NODE_ID === meterialType);
    const code = codeList[sfidx] && codeList[sfidx].CODE;
    const param = { MATERIAL_TYPE: code, MATERIAL_TEXT: meterialText };
    submitExtraHandler(sagaKey, 'POST', prefixUrl, param, this.onCallBack, COMP_FIELD);
  };

  onCallBack = (id, response) => {
    const { changeValidationData, COMP_FIELD } = this.props;
    const { matrnList } = response;
    const isCheckList = matrnList.filter(f => f.CHECK !== 'Y');

    const errorCodeList = isCheckList.length > 0 ? isCheckList.map(item => item.MATNR) : [];
    if (errorCodeList.length > 0) {
      changeValidationData(id, COMP_FIELD, false, '미등록 코드가 존재합니다.');
    }
    this.setState({ errorCodeList });
  };

  onIsMeterialCheck = value => {
    const { changeValidationData, COMP_FIELD, sagaKey } = this.props;
    console.debug('code', value);
    if (value === 'N') {
      changeValidationData(sagaKey, COMP_FIELD, true, '');
    } else {
      changeValidationData(sagaKey, COMP_FIELD, false, '코드를 입력해주세요');
      this.setState({ meterialType: undefined, meterialText: undefined });
    }
  };

  render() {
    const { formData, colData, processRule } = this.props;

    const { errorCodeList } = this.state;
    return (
      <table>
        <tr>
          <td style={{ width: '120px' }}>
            <Radio.Group name="radiogroup" value={colData} onChange={this.onIsMeterialCheck}>
              <Radio value="Y">Yes</Radio>
              <Radio value="N">No</Radio>
            </Radio.Group>
          </td>
          <td>
            <div style={{ width: '30%' }}>
              {this.state.isMeterialView && (
                <Select
                  value={formData.MATERIAL_TYPE}
                  onChange={this.onSelectChange}
                  placeholder="자재코드 선택"
                  className="mdcsSelect"
                  style={{ width: '180px' }}
                  dropdownRender={menu => <StyledSelect>{menu}</StyledSelect>}
                >
                  {this.state.mList}
                </Select>
              )}
            </div>
          </td>
          <td>
            {this.state.isMeterialView && (
              <input
                className="ant-input"
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
          </td>
          <td>
            {this.state.isMeterialView && (
              <Button type="primary" onClick={this.onClickVaildate}>
                <SearchOutlined />
                유효성체크
              </Button>
            )}
          </td>
        </tr>
        {errorCodeList && errorCodeList.length > 0 && (
          <tr>
            <th>미등록 코드</th>
            <td colSpan={3}>{errorCodeList && errorCodeList.map(item => <div>{item}</div>)}</td>
          </tr>
        )}
      </table>
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
