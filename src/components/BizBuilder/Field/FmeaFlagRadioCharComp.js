import React, { Component } from 'react';
import { Radio } from 'antd';
import RadioGroup from 'components/RadioButton';

class FmeaFlagRadioCharComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: undefined,
      selectedValue: undefined,
    };
  }

  componentDidMount() {
    const { fieldSelectData, CONFIG, colData } = this.props;
    this.setState({ selectedValue: Number(colData) });
    if (fieldSelectData && CONFIG.property.compSelectDataKey && CONFIG.property.compSelectDataKey.length > 0) {
      if (fieldSelectData[CONFIG.property.compSelectDataKey] && fieldSelectData[CONFIG.property.compSelectDataKey].length > 0) {
        this.setState({
          options: fieldSelectData[CONFIG.property.compSelectDataKey].filter(f => f.LVL !== 0).map(item => ({ label: item.NAME_KOR, value: item.NODE_ID })),
        });
      }
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
    const { changeFormData, sagaKey, CONFIG, changeValidationData, colData } = this.props;
    const { options, selectedValue } = this.state;
    console.debug('selectedValue', options, colData);
    return (
      <Radio.Group
        options={options}
        onChange={e => this.onChangeHandler(changeFormData, sagaKey, CONFIG, changeValidationData, e.target.value)}
        defaultValue={Number(colData)}
      ></Radio.Group>
    );
  }
}

export default FmeaFlagRadioCharComp;
