import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

const { Option } = Select;

class SelectYearComp extends Component {
  state = {
    options: [],
    currentYear: '',
  };

  componentWillMount() {
    const { defaultValueForSelectYearComp } = this.props;
    const year = new Date().getFullYear();
    const years = [];
    for (let i = 2006; i <= year + 1; i++) {
      years.push(String(i));
    }
    if (defaultValueForSelectYearComp) {
      years.pop();
    }
    this.setState({
      options: years,
      currentYear: String(year),
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
    const { colData, visible, CONFIG, defaultValueForSelectYearComp } = this.props;
    const { options, currentYear } = this.state;
    return visible ? (
      <Select
        defaultValue={colData || defaultValueForSelectYearComp ? currentYear : ' '}
        onChange={value => {
          this.onChangeHandler(value);
        }}
        style={{ width: '100%', marginRight: 10 }}
        className={CONFIG.property.className || ''}
      >
        {options.map(o => (
          <Option key={o} value={o} style={{ height: 30 }}>
            {o}
          </Option>
        ))}
      </Select>
    ) : (
      ''
    );
  }
}

SelectYearComp.propTypes = {
  defaultValueForSelectYearComp: PropTypes.bool,
};
SelectYearComp.defaultProps = {
  defaultValueForSelectYearComp: false,
};
export default SelectYearComp;
