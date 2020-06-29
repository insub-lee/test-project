import * as PropTypes from 'prop-types';
import React from 'react';
import { Input } from 'antd';
import { debounce } from 'lodash';
import uuid from 'uuid/v1';

const { TextArea } = Input;
const getNewKey = () => uuid();

class TextareaComp extends React.Component {
  constructor(props) {
    super(props);

    this.state = { compKey: `textarea-comp___${getNewKey()}` };

    this.handleOnChange = debounce(this.handleOnChange, 300);
  }

  componentDidMount() {
    const { sagaKey, COMP_FIELD } = this.props;
    this.setState({ compKey: `textarea-comp_${sagaKey}_${COMP_FIELD}_${getNewKey()}` });
  }

  componentDidUpdate() {
    const { formData, sagaKey, COMP_FIELD } = this.props;
    const { compKey } = this.state;
    const { [`builderTextareaCopyKey_${sagaKey}_${COMP_FIELD}`]: copyKey } = formData;

    if (copyKey && copyKey.length > 0 && copyKey !== compKey) {
      this.setState({ compKey: copyKey });
    }
  }

  handleOnChange = value => {
    const { sagaKey: id, COMP_FIELD, NAME_KOR, CONFIG, changeFormData, changeValidationData } = this.props;
    // if (CONFIG.property.isRequired) {
    //   changeValidationData(id, COMP_FIELD, value.trim().length > 0, value.trim().length > 0 ? '' : `${NAME_KOR}항목은 필수 입력입니다.`);
    // }
    changeFormData(id, COMP_FIELD, value);
  };

  render() {
    const { CONFIG, colData, readOnly, visible, sagaKey, COMP_FIELD } = this.props;
    const { compKey } = this.state;
    return visible ? (
      <TextArea
        id={`${sagaKey}_${COMP_FIELD}`}
        key={compKey}
        className={`ant-textarea${CONFIG.property.className ? ` ${CONFIG.property.className}` : ''}`}
        defaultValue={colData || ''}
        placeholder={CONFIG.property.placeholder}
        onChange={e => this.handleOnChange(e.target.value)}
        readOnly={readOnly || CONFIG.property.readOnly}
        autoSize={false}
        rows={CONFIG.property.rowCount || 5}
      />
    ) : (
      ''
    );
  }
}

TextareaComp.propTypes = {
  COMP_FIELD: PropTypes.any,
  NAME_KOR: PropTypes.any,
  CONFIG: PropTypes.any,
  colData: PropTypes.any,
  changeFormData: PropTypes.any,
  sagaKey: PropTypes.any,
  changeValidationData: PropTypes.any,
  readOnly: PropTypes.any,
  compProp: PropTypes.any,
};

export default TextareaComp;
