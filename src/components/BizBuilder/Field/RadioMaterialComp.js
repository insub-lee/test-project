import React, { Component } from 'react';
import { Radio, Select, Input } from 'antd';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

const { Option } = Select;
class RadioMaterialComp extends Component {
  constructor(props) {
    super(props);
    this.onChangeHandlerText = debounce(this.onChangeHandlerText, 300);
  }

  componentDidMount() {
    const { sagaKey: id, getExtraApiData, changeFormData } = this.props;
    const apiArray = [{ key: 'material_28', url: '/api/admin/v1/common/categoryMapList?MAP_ID=28', type: 'GET' }];
    getExtraApiData(id, apiArray);
    changeFormData(id, 'MATERIAL_TEXT', '');
    changeFormData(id, 'MATERIAL_TYPE', '');
  }

  onChangeHandlerText = value => {
    const { changeFormData, sagaKey: id } = this.props;
    changeFormData(id, 'MATERIAL_TEXT', value);
  };

  onChangeHandlerSelect = value => {
    const { changeFormData, sagaKey: id } = this.props;
    changeFormData(id, 'MATERIAL_TYPE', value);
  };

  onChangeHandlerRadio = value => {
    const { COMP_FIELD, changeFormData, sagaKey: id } = this.props;
    changeFormData(id, COMP_FIELD, value);
    changeFormData(id, 'MATERIAL_TEXT', '');
    changeFormData(id, 'MATERIAL_TYPE', '');
  };

  render() {
    const { formData, colData, visible, readOnly, extraApiData, isManage } = this.props;
    let materialTypes = [];
    if (extraApiData && extraApiData.material_28 && extraApiData.material_28.categoryMapList) {
      materialTypes = extraApiData.material_28.categoryMapList.filter(t => t.LVL > 0);
    }
    const materialTypesOption = materialTypes ? (
      materialTypes.map(m => (
        <Option key={m.CODE} value={m.CODE}>
          {m.NAME_KOR}
        </Option>
      ))
    ) : (
      <Option key="0" value="0">
        데이터가 없습니다.
      </Option>
    );
    return isManage ||
      (visible && formData && formData.DOCNUMBER && (formData.DOCNUMBER.substr(0, 4) === 'MBDA' || formData.DOCNUMBER.substr(0, 4) === 'MBKE')) ? (
      <div style={{ float: 'left' }}>
        <div></div>
        <Radio.Group
          name="radiogroup"
          defaultValue={colData || 'Y'}
          style={{ float: 'left' }}
          onChange={e => {
            this.onChangeHandlerRadio(e.target.value);
          }}
          disabled={readOnly}
        >
          <Radio value="Y">Yes</Radio>
          <Radio value="N">No</Radio>
        </Radio.Group>
        {colData === 'Y' || colData === '' ? (
          <div style={{ float: 'left' }}>
            <div style={{ float: 'left' }}>
              &nbsp;자제코드&nbsp;
              <Select
                defaultValue={formData.MATERIAL_TYPE ? formData.MATERIAL_TYPE : ' '}
                style={{ width: 180 }}
                onChange={value => {
                  this.onChangeHandlerSelect(value);
                }}
                disabled={readOnly}
              >
                <Option value=" " disabled>
                  선택
                </Option>
                {materialTypesOption}
              </Select>
            </div>
            <div style={{ float: 'left' }}>
              <input
                type="text"
                defaultValue={formData.MATERIAL_TEXT}
                onChange={e => {
                  const value = e.target.value.replace(/[^0-9,]/gi, '');
                  e.target.value = value;
                  this.onChangeHandlerText(value);
                }}
                disabled={readOnly}
              />
              &nbsp;(콤마(,)로 구분하여 입력하여 주세요.)
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    ) : (
      ''
    );
  }
}

RadioMaterialComp.propTypes = {
  changeFormData: PropTypes.func,
  sagaKey: PropTypes.string,
  formData: PropTypes.object,
  colData: PropTypes.any,
  COMP_FIELD: PropTypes.string,
  visible: PropTypes.any,
  readOnly: PropTypes.bool,
  extraApiData: PropTypes.any,
  getExtraApiData: PropTypes.func,
  isManage: PropTypes.any,
};

export default RadioMaterialComp;
