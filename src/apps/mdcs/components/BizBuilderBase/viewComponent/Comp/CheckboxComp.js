import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Input } from 'antd';

class CheckboxComp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      init: true,
      checkValue: undefined,
      etcValue: '',
    };
  }

  componentDidMount() {
    const { id, CONFIG, getExtraApiData } = this.props;
    const { mapId, META_SEQ } = CONFIG.property;
    const apiArray = [{ key: `checkBoxData_${META_SEQ}`, url: `/api/admin/v1/common/categoryMapList?MAP_ID=${mapId}`, type: 'GET' }];
    getExtraApiData(id, apiArray);
  }

  setInitState = checkboxData => {
    const { CONFIG, colData, formData } = this.props;
    const { returnType, etcIndex, etcField } = CONFIG.property;
    const retrunTypeUpper = returnType.toUpperCase();

    if (retrunTypeUpper === 'STRINGNUM' || retrunTypeUpper === 'ARRAYNUM') {
      let dfaultInitValue = '';
      if (checkboxData !== undefined && checkboxData.length > 0) {
        checkboxData.forEach(() => {
          dfaultInitValue += '0';
        });
      }

      if (colData !== '' || colData !== undefined) {
        let commonValue = '';
        if (typeof colData === 'object') {
          commonValue = colData.join(',');
        }
        if (typeof colData === 'string') {
          commonValue = colData.trim();
        }

        const initFlag = checkboxData.length - commonValue.length;
        if (initFlag > 0 && dfaultInitValue !== '') {
          this.setState({
            checkValue: commonValue.concat(dfaultInitValue.slice(-initFlag)),
          });
        }
        if (initFlag === 0) {
          this.setState({
            checkValue: commonValue,
          });
        }
        if (initFlag < 0) {
          this.setState({
            checkValue: commonValue.slice(0, initFlag),
          });
        }
      }

      if (colData === '' || colData === undefined || colData === []) {
        this.setState({
          checkValue: dfaultInitValue,
        });
      }
    }

    if (retrunTypeUpper === 'STRINGVALUE' || retrunTypeUpper === 'ARRAYVALUE') {
      if (colData !== '' && colData !== undefined) {
        let checkboxDataList;
        if (typeof checkboxData[0] === 'object') {
          checkboxDataList = checkboxData.map(item => item[`${CONFIG.property.valueKey}`]);
        } else {
          checkboxDataList = checkboxData;
        }

        if (typeof colData === 'string') {
          const defaultValues = colData.split(',');
          const initDefaultValues = defaultValues.filter(item => checkboxDataList.includes(item));
          this.setState({
            checkValue: initDefaultValues,
          });
        } else {
          const initDefaultValues = colData.filter(item => checkboxDataList.includes(item));
          this.setState({
            checkValue: initDefaultValues,
          });
        }
      } else {
        this.setState({
          checkValue: [],
        });
      }
    }

    if (etcIndex !== undefined && etcIndex > -1 && etcField !== undefined) {
      const initEtcValue = formData[`${etcField}`];
      if (initEtcValue !== undefined) {
        this.setState({
          etcValue: initEtcValue,
        });
      }
    }

    this.setState({
      init: false,
    });
  };

  onChangeValue = e => {
    const { CONFIG } = this.props;
    const { checkValue } = this.state;
    const { returnType } = CONFIG.property;
    const { formDataChange } = this;

    const retrunTypeUpper = returnType.toUpperCase();

    if (retrunTypeUpper === 'STRINGNUM' || retrunTypeUpper === 'ARRAYNUM') {
      const nextCheckValue = checkValue.split('');
      if (nextCheckValue[e] === '0') {
        nextCheckValue.splice(e, 1, '1');
      } else {
        nextCheckValue.splice(e, 1, '0');
      }

      this.setState(
        {
          checkValue: nextCheckValue.join(''),
        },
        () => {
          if (returnType.toUpperCase() === 'STRINGNUM') {
            formDataChange(this.state.checkValue);
          } else if (returnType.toUpperCase() === 'ARRAYNUM') {
            formDataChange(this.state.checkValue.split(''));
          }
        },
      );
    } else if (checkValue.includes(e)) {
      this.setState(
        {
          checkValue: checkValue.filter(item => item !== e),
        },
        () => {
          if (returnType.toUpperCase() === 'STRINGVALUE') {
            formDataChange(this.state.checkValue.join(','));
          } else if (returnType.toUpperCase() === 'ARRAYVALUE') {
            formDataChange(this.state.checkValue);
          }
        },
      );
    } else {
      this.setState(
        {
          checkValue: checkValue.concat(e),
        },
        () => {
          if (returnType.toUpperCase() === 'STRINGVALUE') {
            formDataChange(this.state.checkValue.join(','));
          } else if (returnType.toUpperCase() === 'ARRAYVALUE') {
            formDataChange(this.state.checkValue);
          }
        },
      );
    }
  };

  // 체크박스 폼데이터 체인지
  formDataChange = value => {
    const { id, CONFIG, changeFormData, changeValidationData } = this.props;
    if (CONFIG.property.isRequired) {
      changeValidationData(id, CONFIG.property.COMP_FIELD, value.length > 0, value.length > 0 ? '' : `${CONFIG.property.NAME_KOR}항목은 필수 입력입니다.`);
    }
    changeFormData(id, CONFIG.property.COMP_FIELD, value);
  };

  // 기타 인풋박스 폼데이터 체인지
  etcInputFormDataChange = (value, field) => {
    const { changeFormData, id } = this.props;
    this.setState(
      {
        etcValue: value,
      },
      () => changeFormData(id, field, this.state.etcValue),
    );
  };

  // 기타 (INPUT태그 사용시)
  etcInputTag = readOnly => {
    const { id, CONFIG, changeFormData, extraApiData } = this.props;
    const { etcIndex, returnType, etcField, valueKey, META_SEQ } = CONFIG.property;
    const { checkValue } = this.state;
    const { etcInputFormDataChange } = this;

    let checkboxData = [];
    if (extraApiData && extraApiData[`checkBoxData_${META_SEQ}`] && extraApiData[`checkBoxData_${META_SEQ}`].categoryMapList) {
      checkboxData = extraApiData[`checkBoxData_${META_SEQ}`].categoryMapList;
    }

    if (readOnly) {
      return (
        <div style={{ width: '300px', display: 'inline-block' }}>
          <Input value={this.state.etcValue} readOnly></Input>
        </div>
      );
    }

    if (returnType === 'StringNum' || returnType === 'ArrayNum') {
      let tempvalue = '';
      if (checkValue !== undefined) {
        tempvalue = checkValue;
      }
      const checkYn = tempvalue.charAt(etcIndex) === '0';
      if (checkYn) {
        changeFormData(id, etcField, ' '); // 체크해제시 etcField 초기화
      }
      return (
        <div style={{ width: '300px', display: 'inline-block' }}>
          <Input value={this.state.etcValue} onChange={e => etcInputFormDataChange(e.target.value, etcField)} disabled={checkYn}></Input>
        </div>
      );
    }

    if (returnType === 'StringValue' || returnType === 'ArrayValue') {
      const dataType = checkboxData[0];
      if (typeof dataType === 'object') {
        let checkKey = Object.keys(dataType)[0];
        if (valueKey !== undefined && valueKey !== '') {
          checkKey = valueKey;
        }
        const etcTargetValue = checkboxData.map(item => item[`${checkKey}`])[etcIndex];
        let disableYn = true;
        if (checkValue !== undefined) {
          disableYn = checkValue.includes(etcTargetValue);
        }
        if (!disableYn) {
          changeFormData(id, etcField, ' '); // 체크해제시 etcField 초기화
        }
        return (
          <div style={{ width: '300px', display: 'inline-block' }}>
            <Input value={this.state.etcValue} onChange={e => etcInputFormDataChange(e.target.value, etcField)} disabled={!disableYn}></Input>
          </div>
        );
      }

      if (typeof dataType === 'string' || typeof dataType === 'number') {
        const etcTargetValue = checkboxData[etcIndex];
        let disableYn = true;
        if (checkValue !== undefined) {
          disableYn = checkValue.includes(etcTargetValue);
        }
        if (!disableYn) {
          changeFormData(id, etcField, ' '); // 체크해제시 etcField 초기화
        }
        return (
          <div style={{ width: '300px', display: 'inline-block' }}>
            <Input value={this.state.etcValue} onChange={e => etcInputFormDataChange(e.target.value, etcField)} disabled={!disableYn}></Input>
          </div>
        );
      }
    }

    return '';
  };

  render() {
    const { CONFIG, readOnly, extraApiData } = this.props;
    const { returnType, etcIndex, META_SEQ } = CONFIG.property;
    const { checkValue, init } = this.state;
    const { onChangeValue, etcInputTag, setInitState } = this;

    let view = false;
    if (readOnly !== undefined && readOnly) {
      view = readOnly;
    }

    const dataKey = `checkBoxData_${META_SEQ}`;
    let checkboxData = [];
    if (extraApiData && extraApiData[dataKey] && extraApiData[dataKey].categoryMapList) {
      checkboxData = extraApiData[dataKey].categoryMapList;
      setInitState(checkboxData);
    }

    return (
      <React.Fragment>
        {checkboxData && checkboxData.length > 0 ? (
          checkboxData.map((item, index) => {
            if (typeof item === 'object') {
              if (returnType.toUpperCase() === 'STRINGNUM' || returnType.toUpperCase() === 'ARRAYNUM' || returnType === undefined || returnType === '') {
                if (CONFIG.property.labelKey !== '' && CONFIG.property.valueKey !== '') {
                  const checked = String(checkValue).charAt(index);
                  return (
                    <Checkbox value={item[`${CONFIG.property.valueKey}`]} checked={checked === '1'} onChange={() => onChangeValue(index)} disabled={view}>
                      {item[`${CONFIG.property.labelKey}`]}
                    </Checkbox>
                  );
                }
                const defaultCheckData = Object.values(item);
                const checked = String(checkValue).charAt(index);
                return (
                  <Checkbox value={defaultCheckData[0]} checked={checked === '1'} onChange={() => onChangeValue(index)} disabled={view}>
                    {defaultCheckData[0]}
                  </Checkbox>
                );
              }

              if (returnType.toUpperCase() === 'STRINGVALUE' || returnType.toUpperCase() === 'ARRAYVALUE') {
                if (CONFIG.property.labelKey !== '' && CONFIG.property.valueKey !== '') {
                  let checked = false;
                  if (checkValue !== undefined) {
                    checked = checkValue.includes(item[`${CONFIG.property.valueKey}`]);
                  }
                  return (
                    <Checkbox value={item[`${CONFIG.property.valueKey}`]} checked={checked} onChange={e => onChangeValue(e.target.value)} disabled={view}>
                      {item[`${CONFIG.property.labelKey}`]}
                    </Checkbox>
                  );
                }
                const tempKey = Object.keys(item)[0];
                let checked = false;
                if (checkValue !== undefined) {
                  checked = checkValue.includes(item[tempKey]);
                }
                return (
                  <Checkbox value={item[tempKey]} checked={checked} onChange={e => onChangeValue(e.target.value)} disabled={view}>
                    {item[tempKey]}
                  </Checkbox>
                );
              }
            }

            if (typeof item === 'string' || typeof item === 'number') {
              if (returnType.toUpperCase() === 'STRINGNUM' || returnType.toUpperCase() === 'ARRAYNUM' || returnType === undefined || returnType === '') {
                const checked = String(checkValue).charAt(index);
                return (
                  <Checkbox value={index} checked={checked === '1'} onChange={() => onChangeValue(index)} disabled={view}>
                    {item}
                  </Checkbox>
                );
              }

              if (returnType.toUpperCase() === 'STRINGVALUE' || returnType.toUpperCase() === 'ARRAYVALUE') {
                let checked = false;
                if (checkValue !== undefined) {
                  checked = checkValue.includes(item);
                }
                return (
                  <Checkbox value={item} checked={checked} onChange={e => onChangeValue(e.target.value)} disabled={view}>
                    {item}
                  </Checkbox>
                );
              }
            }
            return '';
          })
        ) : (
          <div>체크박스 컴포넌트에 사용될 데이터가 없습니다.</div>
        )}
        {checkboxData.length - 1 >= etcIndex && etcInputTag(view)}
      </React.Fragment>
    );
  }
}

CheckboxComp.propTypes = {
  id: PropTypes.string,
  changeFormData: PropTypes.func,
  changeValidationData: PropTypes.func,
  CONFIG: PropTypes.object,
  readOnly: PropTypes.bool,
  colData: PropTypes.any,
  formData: PropTypes.object,
  getExtraApiData: PropTypes.func,
  extraApiData: PropTypes.object,
};

CheckboxComp.defaultProps = {
  readOnly: false,
  colData: '',
  id: 'checkbox_testComp',
  changeFormData: () => false,
  changeValidationData: () => false,
  getExtraApiData: () => false,
  extraApiData: {},
  CONFIG: {
    property: {
      isRequired: true,
      returnType: 'StringNum', // StringNum, ArrayNum,  StringValue, ArrayValue
      mapId: 15, // 분류체계 ID
      etcIndex: 3, // -1 = 사용않함
      etcField: 'TestFiled',
      labelKey: 'NAME_KOR',
      valueKey: 'NODE_ID',
    },
  },
};

export default CheckboxComp;
