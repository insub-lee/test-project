import React, { Component } from 'react';
import { Select } from 'antd';

const { Option } = Select;

class SelectSiteComp extends Component {
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
    return visible ? (
      <Select
        value={colData === ' ' ? '선택' : colData}
        onChange={value => {
          this.onChangeHandler(value);
        }}
        style={{ width: '100%', marginRight: 10 }}
        className={CONFIG.property.className || ''}
      >
        <Option key="선택" value={' '}>
          선택
        </Option>
        <Option key="청주" value="청주">
          청주
        </Option>
        <Option key="구미" value="구미">
          구미
        </Option>
      </Select>
    ) : (
      ''
    );
  }
}

export default SelectSiteComp;
