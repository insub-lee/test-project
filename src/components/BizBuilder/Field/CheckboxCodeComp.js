import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';
import CheckboxLabelComp from './CheckboxLabelComp';
const CheckboxGroup = Checkbox.Group;

class CheckboxCodeComp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      categoryMapList: [],
      checkedList: [],
      labelValue: '',
    };
  }

  componentDidMount() {
    const { sagaKey: id, CONFIG, getExtraApiData } = this.props;
    const { mapId } = CONFIG.property;
    const apiArray = [{ key: `checkBoxData_${mapId}`, url: `/api/admin/v1/common/categoryMapList?MAP_ID=${mapId}`, type: 'GET' }];
    getExtraApiData(id, apiArray, this.setCheckList);
  }

  setCheckList = sagaKey => {
    const {
      CONFIG: {
        property: { mapId },
      },
      extraApiData,
    } = this.props;

    const apiData = extraApiData[`checkBoxData_${mapId}`];
    const categoryMapList = (apiData && apiData.categoryMapList && apiData.categoryMapList.filter(x => x.LVL > 0 && x.USE_YN === 'Y')) || [];

    const colData = (this.props && this.props.colData) || '0';
    let checkedList = [];
    let labelValue = '';
    if (colData !== '0') {
      checkedList = colData.split(',');
      categoryMapList.forEach(c => {
        if (checkedList.indexOf(c.CODE) >= 0) {
          if (!labelValue) {
            labelValue = c.NAME_KOE;
          } else {
            labelValue += `, ${c.NAME_KOR}`;
          }
        }
      });
    }

    this.setState({
      categoryMapList,
      checkedList,
      labelValue,
    });
  };

  HandleOnChange = checkedList => {
    const { sagaKey: id, CONFIG, changeFormData, changeValidationData, NAME_KOR, COMP_FIELD } = this.props;
    let value = '';
    checkedList.forEach((c, index) => {
      if (!index) {
        value = `${c}`;
      } else {
        value += `,${c}`;
      }
    });

    if (CONFIG.property.isRequired) {
      changeValidationData(id, COMP_FIELD, value.length > 0, value.length > 0 ? '' : `${NAME_KOR}항목은 필수 입력입니다.`);
    }
    changeFormData(id, COMP_FIELD, value);

    this.setState({
      checkedList,
    });
  };

  render() {
    const { visible, CONFIG, readOnly } = this.props;
    const { categoryMapList, checkedList } = this.state;
    return visible ? (
      <>
        {!readOnly || !CONFIG.property.readOnly ? (
          <CheckboxGroup onChange={this.HandleOnChange} value={checkedList}>
            {categoryMapList.map(c => (
              <Checkbox value={`${c.CODE}`}>{c.NAME_KOR}</Checkbox>
            ))}
          </CheckboxGroup>
        ) : (
          <CheckboxLabelComp value="" />
        )}
      </>
    ) : (
      ''
    );
  }
}

CheckboxCodeComp.propTypes = {
  sagaKey: PropTypes.string,
  changeFormData: PropTypes.func,
  changeValidationData: PropTypes.func,
  CONFIG: PropTypes.object,
  readOnly: PropTypes.bool,
  colData: PropTypes.any,
  formData: PropTypes.object,
  getExtraApiData: PropTypes.func,
  extraApiData: PropTypes.object,
  NAME_KOR: PropTypes.string,
  COMP_FIELD: PropTypes.string,
};

CheckboxCodeComp.defaultProps = {
  readOnly: false,
  changeFormData: () => false,
  changeValidationData: () => false,
  getExtraApiData: () => false,
  extraApiData: {},
  CONFIG: {
    property: {
      isRequired: true,
      mapId: 15, // 분류체계 ID
    },
  },
};

export default CheckboxCodeComp;
