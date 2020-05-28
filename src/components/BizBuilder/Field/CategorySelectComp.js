import React, { Component } from 'react';
import { Select } from 'antd';
const { Option } = Select;
class CategorySelectComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: undefined,
    };
  }

  componentDidMount() {
    const { fieldSelectData, CONFIG, colData } = this.props;
    if (fieldSelectData && CONFIG.property.compSelectDataKey && CONFIG.property.compSelectDataKey.length > 0) {
      if (fieldSelectData[CONFIG.property.compSelectDataKey] && fieldSelectData[CONFIG.property.compSelectDataKey].length > 0) {
        console.debug('field', fieldSelectData);
        this.setState({
          options: fieldSelectData[CONFIG.property.compSelectDataKey]
            .filter(f => f.LVL !== 0)
            .map(item => <Option value={item.NODE_ID}>{item.NAME_KOR}</Option>),
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
    const { changeFormData, sagaKey, CONFIG, changeValidationData } = this.props;
    const { options } = this.state;
    return (
      <Select style={{ width: '100%' }} onChange={value => this.onChangeHandler(changeFormData, sagaKey, CONFIG, changeValidationData, value)}>
        {options}
      </Select>
    );
  }
}

export default CategorySelectComp;
