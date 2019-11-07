import React, { Component } from 'react';
import { Radio } from 'antd';
import RadioGroup from 'apps/mdcs/components/RadioButton';
const makeDataSource = apiData => {
  const tempData = [];
  apiData.categoryMapList
    .filter(x => x.LVL > 0 && x.USE_YN === 'Y')
    .map(item =>
      tempData.push({
        value: item.NODE_ID,
        NAME_KOR: item.NAME_KOR,
        NAME_ENG: item.NAME_ENG,
        NAME_CHN: item.NAME_CHN,
        NAME_JPN: item.NAME_JPN,
        NAME_ETC: item.NAME_ETC,
      }),
    );
  return tempData;
};

class RadioComp extends Component {
  state = {
    dataSource: [],
    dataFlag: true,
  };

  componentDidMount() {
    const { getExtraApiData, id, CONFIG } = this.props;
    getExtraApiData(id, CONFIG.property.apiArray);
  }

  onChangeHandler = (changeFormData, id, CONFIG, changeValidationData, value) => {
    const { isRequired, COMP_FIELD, NAME_KOR } = CONFIG.property;
    if (isRequired) {
      changeValidationData(id, COMP_FIELD, value, `${NAME_KOR}항목은 필수 입력입니다.`);
    }

    changeFormData(id, COMP_FIELD, value);
  };

  render() {
    const {
      CONFIG,
      CONFIG: {
        property: { apiKey },
      },
      colData,
      changeFormData,
      id,
      changeValidationData,
      readOnly,
      extraApiData,
    } = this.props;
    if (this.state.dataFlag && extraApiData[apiKey]) {
      const dataSource = makeDataSource(extraApiData[apiKey]);
      this.setState({ dataFlag: false, dataSource });
    }
    return (
      <RadioGroup
        value={colData !== ' ' ? Number(colData) : undefined}
        dataSource={this.state.dataSource}
        onChange={e => this.onChangeHandler(changeFormData, id, CONFIG, changeValidationData, e.target.value)}
        readOnly={readOnly || CONFIG.property.readOnly}
      />
    );
  }
}

export default RadioComp;
