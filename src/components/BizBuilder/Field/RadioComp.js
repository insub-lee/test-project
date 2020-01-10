import React, { Component } from 'react';
import { Radio } from 'antd';
import RadioGroup from 'components/RadioButton';

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
    const {
      getExtraApiData,
      sagaKey: id,
      CONFIG: {
        property: { mapId },
      },
    } = this.props;
    const apiArray = [{ key: `radio_${mapId}`, url: `/api/admin/v1/common/categoryMapList?MAP_ID=${mapId}`, type: 'GET' }];
    getExtraApiData(id, apiArray);
  }

  onChangeHandler = (changeFormData, id, CONFIG, changeValidationData, value) => {
    const { isRequired } = CONFIG.property;
    const { COMP_FIELD, NAME_KOR } = this.props;
    if (isRequired) {
      changeValidationData(id, COMP_FIELD, value, `${NAME_KOR}항목은 필수 입력입니다.`);
    }

    changeFormData(id, COMP_FIELD, value);
  };

  render() {
    const {
      CONFIG,
      CONFIG: {
        property: { mapId },
      },
      colData,
      changeFormData,
      sagaKey: id,
      changeValidationData,
      readOnly,
      extraApiData,
      visible,
    } = this.props;
    if (this.state.dataFlag && extraApiData[`radio_${mapId}`]) {
      const dataSource = makeDataSource(extraApiData[`radio_${mapId}`]);
      this.setState({ dataFlag: false, dataSource });
    }

    return visible ? (
      <>
        {colData !== undefined ? (
          <RadioGroup
            value={colData !== ' ' ? Number(colData) : undefined}
            dataSource={this.state.dataSource}
            onChange={e => this.onChangeHandler(changeFormData, id, CONFIG, changeValidationData, e.target.value)}
            readOnly={readOnly || CONFIG.property.readOnly}
          />
        ) : (
          <RadioGroup value={1} dataSource={this.props.defaultDataSource} />
        )}
      </>
    ) : (
      ''
    );
  }
}

export default RadioComp;

RadioComp.defaultProps = {
  defaultDataSource: [
    { value: 1, NAME_KOR: '라디오버튼' },
    { value: 2, NAME_KOR: '라디오버튼' },
  ],
};
