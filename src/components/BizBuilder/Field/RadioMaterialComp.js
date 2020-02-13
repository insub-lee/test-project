import React, { Component } from 'react';
import { Radio, Select, Input } from 'antd';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

import message from 'components/Feedback/message';
import LabelComp from './LabelComp';

const { Option } = Select;

class RadioMaterialComp extends Component {
  constructor(props) {
    super(props);
    this.onChangeHandlerText = debounce(this.onChangeHandlerText, 300);
  }

  state = {
    mList: [],
    isMeterialView: true,
  };

  componentDidMount() {
    const { sagaKey, getExtraApiData, apiArys } = this.props;
    getExtraApiData(sagaKey, apiArys, this.initDataBind);
  }

  componentDidUpdate(prevProps) {
    const { sagaKey, processRule, COMP_FIELD, setProcessRule, formData } = this.props;
    const { formData: prevFormData } = prevProps;
    if (formData.MATERIAL_YN !== prevFormData.MATERIAL_YN) {
      const { DRAFT_DATA } = processRule;
      const tmpDraftData = { ...DRAFT_DATA, material_yn: 'Y' };
      const tmpPrcRule = { ...processRule, DRAFT_DATA: tmpDraftData };
      setProcessRule(sagaKey, tmpPrcRule);
    }
  }

  initDataBind = id => {
    const {
      extraApiData: { meterialList },
    } = this.props;
    const tempMatList = meterialList.categoryMapList
      .filter(f => f.LVL > 0)
      .map(item => (
        <Option key={item.NODE_ID}>
          {item.CODE}({item.NAME_KOR})
        </Option>
      ));
    this.setState({ mList: tempMatList });
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
    changeFormData(sagaKey, 'MATERIAL_TYPE', value);
  };

  onChangeHandlerText = vals => {
    const { changeFormData, sagaKey } = this.props;
    changeFormData(sagaKey, 'MATERIAL_TEXT', vals);
  };

  render() {
    const { formData, colData, processRule } = this.props;
    console.debug('render', processRule);
    return (
      <table>
        <tr>
          <td>
            <Radio.Group name="radiogroup" value={colData} onChange={this.onChangeHandler}>
              <Radio value="Y">Yes</Radio>
              <Radio value="N">No</Radio>
            </Radio.Group>
          </td>
          <td>
            {this.state.isMeterialView && (
              <Select onChange={this.onSelectChange} placeholder="자재코드 선택" style={{ width: '180px' }}>
                {this.state.mList}
              </Select>
            )}
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
        </tr>
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
