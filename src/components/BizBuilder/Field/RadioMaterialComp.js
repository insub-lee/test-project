import React, { Component } from 'react';
import { Radio, Select, Input } from 'antd';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
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
    const { changeFormData, sagaKey, COMP_FIELD } = this.props;
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

  onChangeHandlerText = value => {
    const { changeFormData, sagaKey } = this.props;
    changeFormData(sagaKey, 'MATERIAL_TEXT', value);
  };

  render() {
    const { formData, colData } = this.props;
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
              <Input
                onChange={e => {
                  const value = e.target.value.replace(/[^0-9,]/gi, '');
                  e.target.value = value;
                  this.onChangeHandlerText(value);
                }}
              ></Input>
            )}
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
