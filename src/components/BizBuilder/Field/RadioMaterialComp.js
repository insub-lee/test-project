import React, { Component } from 'react';
import { Radio, Select, Input } from 'antd';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import LabelComp from './LabelComp';

const { Option } = Select;

class RadioMaterialComp extends Component {
  state = {
    mList: [],
  };

  componentDidMount() {
    const { sagaKey, getExtraApiData, apiArys } = this.props;
    getExtraApiData(sagaKey, apiArys, this.initDataBind);
  }

  initDataBind = id => {
    console.debug('init', this.props);
    const {
      extraApiData: { meterialList },
    } = this.props;
    const tempMatList = meterialList.categoryMapList.filter(f => f.LVL > 0).map(item => <Option key={item.NODE_ID}>{item.NAME_KOR}</Option>);
    this.setState({ mList: tempMatList });
  };

  onChangeHandler = value => {
    console.debug(value);
  };

  render() {
    const { formData, colData } = this.props;
    return (
      <table>
        <tr>
          <td>
            <Radio.Group name="radiogroup" value={colData} onChange={this.onChangeHanlder}>
              <Radio value="Y">Yes</Radio>
              <Radio value="N">No</Radio>
            </Radio.Group>
          </td>
          <td>
            <Select placeholder="자재코드 선택" style={{ width: '180px' }}>
              {this.state.mList}
            </Select>
          </td>
          <td>
            <Input></Input>
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
