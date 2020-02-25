import * as PropTypes from 'prop-types';
import React from 'react';
import { InputNumber } from 'antd';
import { debounce } from 'lodash';

class RoadmapNumberComp extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnChange = debounce(this.handleOnChange, 300);
  }

  componentDidMount() {
    console.debug('@@@@@@@@ROADMAP_NUMBER_COMP@@@@@@@@@@@');
  }

  handleOnChange = e => {
    const { sagaKey: id, COMP_FIELD, NAME_KOR, CONFIG, changeFormData, changeValidationData } = this.props;
    if (CONFIG.property.isRequired) {
      changeValidationData(id, COMP_FIELD, e.trim().length > 0, e.trim().length > 0 ? '' : `${NAME_KOR}항목은 필수 입력입니다.`);
    }
    changeFormData(id, COMP_FIELD, e);
    console.debug(COMP_FIELD);
  };

  handleOnBlur = e => {
    const { sagaKey: id, changeFormData } = this.props;
    changeFormData(id, 'tempValue', e.target.value);
  };

  render() {
    const { CONFIG, colData, readOnly, visible } = this.props;
    return visible ? (
      <InputNumber
        width="150px"
        defaultValue={colData}
        min={0}
        max={10 ** CONFIG.info.size}
        placeholder={CONFIG.property.placeholder}
        onChange={this.handleOnChange}
        onBlur={this.handleOnBlur}
        readOnly={readOnly || CONFIG.property.readOnly}
        className={CONFIG.property.className || ''}
      />
    ) : (
      ''
    );
  }
}

RoadmapNumberComp.propTypes = {
  COMP_FIELD: PropTypes.any,
  NAME_KOR: PropTypes.any,
  CONFIG: PropTypes.any,
  colData: PropTypes.any,
  changeFormData: PropTypes.any,
  sagaKey: PropTypes.any,
  changeValidationData: PropTypes.any,
  readOnly: PropTypes.any,
  visible: PropTypes.bool,
};

export default RoadmapNumberComp;
