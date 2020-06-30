import React, { Component } from 'react';
import { Radio } from 'antd';
import RadioGroup from 'components/RadioButton';

class RadioMdcsChangeComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: undefined,
      selectedValue: undefined,
    };
  }

  componentDidMount() {
    const { fieldSelectData, CONFIG, formData, colData, viewType } = this.props;
    const { VERSION } = formData;
    console.debug('colData', colData, VERSION, viewType);
    this.setState({ selectedValue: Number(colData) });
    if (fieldSelectData && CONFIG.property.compSelectDataKey && CONFIG.property.compSelectDataKey.length > 0) {
      if (fieldSelectData[CONFIG.property.compSelectDataKey] && fieldSelectData[CONFIG.property.compSelectDataKey].length > 0) {
        this.setState({
          options: fieldSelectData[CONFIG.property.compSelectDataKey]
            .filter(f => f.LVL !== 0)
            .map(item => ({
              label: item.NAME_KOR,
              value: item.NODE_ID,
              disabled: viewType === 'REVISION' ? false : item.NODE_ID !== Number(colData) && Number(VERSION) <= 1,
            })),
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
    const { options, selectedValue } = this.state;
    return <div>{selectedValue && <Radio.Group options={options} defaultValue={selectedValue}></Radio.Group>}</div>;
  }
}

export default RadioMdcsChangeComp;
