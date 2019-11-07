import React, { Component } from 'react';

import { Select } from 'antd';

const { Option } = Select;

class SelectComp extends Component {
  componentDidMount() {
    const {
      getExtraApiData,
      id,
      CONFIG: {
        property: { apiArray },
      },
    } = this.props;
    getExtraApiData(id, apiArray);
  }

  onChangeHandler = value => {
    const {
      changeFormData,
      id,
      CONFIG: {
        property: { isRequired, COMP_FIELD, NAME_KOR },
      },
      changeValidationData,
    } = this.props;
    if (isRequired) {
      // 기본값인지 체크
      changeValidationData(id, COMP_FIELD, value !== ' ', value !== ' ' ? '' : `${NAME_KOR}항목은 필수 입력입니다.`);
    }
    changeFormData(id, COMP_FIELD, value);
  };

  render() {
    const {
      CONFIG,
      CONFIG: {
        property: { apiKey, defaultValue, placeholder },
      },
      extraApiData,
      colData,
      readOnly,
    } = this.props;
    const apiData = extraApiData[apiKey];
    return (
      <Select
        value={colData === ' ' || colData === 0 ? undefined : Number(colData)}
        placeholder={placeholder}
        style={{ width: 300, marginRight: 10 }}
        onChange={value => {
          this.onChangeHandler(value);
        }}
        disabled={readOnly || CONFIG.property.readOnly}
      >
        {apiData &&
          apiData.categoryMapList &&
          apiData.categoryMapList
            .filter(x => x.LVL > 0 && x.USE_YN === 'Y')
            .map(item => (
              <Option key={`CategorieMap_${item.NODE_ID}`} value={item.NODE_ID}>
                {item.NAME_KOR}
              </Option>
            ))}
      </Select>
    );
  }
}
export default SelectComp;
