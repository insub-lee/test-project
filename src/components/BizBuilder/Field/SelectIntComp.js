import React, { Component } from 'react';
import { Select } from 'antd';
import SelectReadComp from './SelectReadComp';

const { Option } = Select;

class SelectIntComp extends Component {
  componentDidMount() {
    const {
      getExtraApiData,
      sagaKey: id,
      CONFIG: {
        property: { mapId },
      },
    } = this.props;
    const apiArray = [{ key: `select_${mapId}`, url: `/api/admin/v1/common/categoryMapList?MAP_ID=${mapId}`, type: 'GET' }];
    getExtraApiData(id, apiArray);
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
    changeFormData(id, COMP_FIELD, Number(value));
  };

  render() {
    const {
      CONFIG,
      CONFIG: {
        property: { mapId, defaultValue, placeholder },
      },
      extraApiData,
      colData,
      readOnly,
      visible,
    } = this.props;
    const { categoryMapList } = extraApiData[`select_${mapId}`] ? extraApiData[`select_${mapId}`] : [];
    let labelValue = '';
    if (colData && categoryMapList) {
      categoryMapList.forEach(c => {
        if (Number(c.NODE_ID) === Number(colData)) {
          labelValue = c.NAME_KOR;
        }
      });
    }
    const apiData = extraApiData[`select_${mapId}`];
    return visible ? (
      <>
        {colData !== undefined ? (
          readOnly || CONFIG.property.readOnly ? (
            <SelectReadComp value={labelValue} />
          ) : (
            <Select
              value={!colData || colData === 0 || (typeof colData === 'string' && colData.trim() === '') ? undefined : Number(colData)}
              placeholder={placeholder}
              style={{ width: 300, marginRight: 10 }}
              onChange={value => {
                this.onChangeHandler(value);
              }}
              disabled={readOnly || CONFIG.property.readOnly}
              className={CONFIG.property.className || ''}
            >
              {apiData &&
                apiData.categoryMapList &&
                apiData.categoryMapList
                  .filter(x => x.LVL > 0 && x.USE_YN === 'Y')
                  .map(item => (
                    <Option key={`selectMap_${item.NODE_ID}`} value={item.NODE_ID}>
                      {item.NAME_KOR}
                    </Option>
                  ))}
            </Select>
          )
        ) : (
          <Select value={undefined} placeholder="Select" style={{ width: '100%' }} className={CONFIG.property.className || ''} />
        )}
      </>
    ) : (
      ''
    );
  }
}
export default SelectIntComp;
