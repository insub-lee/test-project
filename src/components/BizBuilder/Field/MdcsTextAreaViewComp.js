import * as PropTypes from 'prop-types';
import React from 'react';
import { Input, message } from 'antd';
import { debounce } from 'lodash';
import uuid from 'uuid/v1';
import StyledHtmlTextarea from 'components/BizBuilder/styled/HtmlForm/StyledHtmlTextarea';

const getNewKey = () => uuid();

class MdcsTextAreaViewComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { compKey: `textarea-comp___${getNewKey()}`, defaultValue: undefined };
  }

  componentDidMount() {
    const { sagaKey, COMP_FIELD, colData, isObsCheck, formData } = this.props;
    const { STATUS, MIG_YN } = formData;
    if (isObsCheck || (STATUS === 99 && MIG_YN !== 'Y')) {
      const obsText = formData[`OBS_${COMP_FIELD}`];
      this.setState({ defaultValue: obsText });
    } else {
      this.setState({ defaultValue: colData });
    }
    this.setState({ compKey: `textarea-comp_${sagaKey}_${COMP_FIELD}_${getNewKey()}` });
  }

  componentDidUpdate() {
    const { formData, sagaKey, COMP_FIELD, colData, isObsCheck } = this.props;
  }

  render() {
    const { CONFIG, colData, readOnly, visible, sagaKey, COMP_FIELD, isObsCheck } = this.props;
    const { compKey, defaultValue } = this.state;
    return visible ? (
      <StyledHtmlTextarea
        id={`${sagaKey}_${COMP_FIELD}`}
        key={compKey}
        className={`html-textarea${CONFIG.property.className ? ` ${CONFIG.property.className}` : ''}`}
        defaultValue={defaultValue}
        placeholder={CONFIG.property.placeholder}
        readOnly={readOnly || CONFIG.property.readOnly}
        autoSize={false}
        rows={CONFIG.property.rowCount || 5}
      />
    ) : (
      ''
    );
  }
}

MdcsTextAreaViewComp.propTypes = {
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

export default MdcsTextAreaViewComp;
