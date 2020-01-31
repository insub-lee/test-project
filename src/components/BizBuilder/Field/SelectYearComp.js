import React, { Component } from 'react';
import { Select } from 'antd';

const { Option } = Select;

class SelectYearComp extends Component {
  state = {
    options: [],
  };

  componentDidMount() {
    const year = new Date().getFullYear();
    const years = [' '];
    for (let i = 2006; i <= year + 1; i++) {
      years.push(String(i));
    }
    this.setState({
      options: years,
    });
  }

  onChangeHandler = value => {
    const {
      changeFormData,
      sagaKey: id,
      CONFIG: {
        property: { isRequired },
      },
      COMP_FIELD,
      NAME_KOR,
      changeValidationData,
    } = this.props;
    if (isRequired) {
      // 기본값인지 체크
      changeValidationData(id, COMP_FIELD, value.trim() !== '', value.trim() !== '' ? '' : `${NAME_KOR}항목은 필수 입력입니다.`);
    }
    changeFormData(id, COMP_FIELD, value);
  };

  render() {
    const { colData, visible, CONFIG } = this.props;
    const { options } = this.state;
<<<<<<< HEAD
    return visible ? (
=======
    return (
>>>>>>> 7af0664134234a46f6e8bb646ad0506035c90470
      <Select
        value={colData || ' '}
        onChange={value => {
          this.onChangeHandler(value);
        }}
<<<<<<< HEAD
        style={{ width: '100%', marginRight: 10 }}
        className={CONFIG.property.className || ''}
      >
        {options.map(o => (
          <Option key={o} value={o} style={{ height: 25 }}>
=======
        className={CONFIG.property.className || ''}
      >
        {options.map(o => (
          <Option key={o} value={o}>
>>>>>>> 7af0664134234a46f6e8bb646ad0506035c90470
            {o}
          </Option>
        ))}
      </Select>
<<<<<<< HEAD
    ) : (
      ''
=======
>>>>>>> 7af0664134234a46f6e8bb646ad0506035c90470
    );
  }
}

export default SelectYearComp;
