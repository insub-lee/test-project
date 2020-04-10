import React, { Component } from 'react';
import RadioGroup from 'components/RadioButton';

const makeDataSource = ({ categoryMapList, PARAM }) => {
  const rootData = categoryMapList.find(c => c.NODE_ID === PARAM.NODE_ID) || {};

  return categoryMapList
    .filter(x => rootData && rootData.LVL + 1 === x.LVL && x.USE_YN === 'Y')
    .map(item => ({
      value: item.NODE_ID,
      NAME_KOR: item.NAME_KOR,
      NAME_ENG: item.NAME_ENG,
      NAME_CHN: item.NAME_CHN,
      NAME_JPN: item.NAME_JPN,
      NAME_ETC: item.NAME_ETC,
    }));
};

class RootKeyRadioComp extends Component {
  state = {
    dataSource: [],
    dataFlag: true,
  };

  componentDidMount() {
    const {
      getExtraApiData,
      sagaKey: id,
      CONFIG: {
        property: { mapId, rootKey },
      },
    } = this.props;
    console.debug('rootKey', rootKey);
    console.debug('getExtraApiData', getExtraApiData);
    if (rootKey) {
      const apiArray = [{ key: `radio_${rootKey}`, type: 'POST', url: `/api/admin/v1/common/categoryMapList`, params: { PARAM: { NODE_ID: rootKey } } }];
      getExtraApiData(id, apiArray);
    }
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
        property: { mapId, rootKey },
      },
      colData,
      changeFormData,
      sagaKey: id,
      changeValidationData,
      readOnly,
      extraApiData,
      visible,
    } = this.props;
    if (this.state.dataFlag && extraApiData[`radio_${rootKey}`]) {
      const dataSource = makeDataSource(extraApiData[`radio_${rootKey}`]);
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
            className={CONFIG.property.className || ''}
          />
        ) : (
          <RadioGroup value={1} dataSource={this.props.defaultDataSource} className={CONFIG.property.className || ''} />
        )}
      </>
    ) : (
      ''
    );
  }
}

export default RootKeyRadioComp;

RootKeyRadioComp.defaultProps = {
  defaultDataSource: [],
};
