import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

// For Rev , DocNumber 전용 커스텀 Comp
class ReadOnlyTextComp extends PureComponent {
  componentDidUpdate() {
    const { colData, CONFIG, compProps, id, changeFormData, changeValidationData } = this.props;
    const { valueKey, valueType, defaultValue } = CONFIG.property;
    let initValue = ' ';
    if (colData !== undefined) {
      initValue = colData;
    }
    if (initValue !== undefined && initValue.trim() === '') {
      if (valueType === 'props') {
        changeValidationData(id, CONFIG.property.COMP_FIELD, true, '');
        const propsText = compProps[`${valueKey}`];
        changeValidationData(id, CONFIG.property.COMP_FIELD, propsText !== ' ', `${CONFIG.property.NAME_KOR}항목은 필수 입력입니다.`);
        changeFormData(id, CONFIG.property.COMP_FIELD, propsText);
      }
      if (valueType === 'default') {
        const defaultText = defaultValue;
        changeValidationData(id, CONFIG.property.COMP_FIELD, true, '');
        changeFormData(id, CONFIG.property.COMP_FIELD, defaultText);
      }
    }
  }

  render() {
    const { colData, CONFIG, compProps } = this.props;
    const { valueKey, valueType, defaultValue } = CONFIG.property;
    let initValue = '';
    if (colData !== undefined) {
      initValue = colData;
    }
    if (valueType === 'props' && initValue.trim() === '') {
      const propsText = compProps[`${valueKey}`];
      if (propsText && propsText.length > 0 && propsText !== undefined) {
        initValue = propsText;
      } else {
        initValue = ' ';
      }
    }
    if (valueType === 'default' && initValue.trim() === '') {
      initValue = defaultValue;
    }
    return (
      <>
        {colData === undefined ? (
          <Input placeholder={(valueType === 'props' && '문서번호') || (valueType === 'default' && 'version')} readOnly />
        ) : (
          <Input value={initValue} readOnly />
        )}
      </>
    );
  }
}
ReadOnlyTextComp.propTypes = {
  colData: PropTypes.string,
  id: PropTypes.string,
  changeFormData: PropTypes.func,
  CONFIG: PropTypes.object,
  compProps: PropTypes.object,
  changeValidationData: PropTypes.func,
};
ReadOnlyTextComp.defaultProps = {
  CONFIG: {
    property: {
      // 수정, 삭제에선 아래세개 설정값 없음 colData 를 받아 보여주기만 함
      valueType: 'props', // default    - props = compProp 내의 데이터를 참조 / defualt = 설정한 defaultValue 참조
      valueKey: 'docNumber',
      defaultValue: '1.0',
    },
  },
};
export default ReadOnlyTextComp;
