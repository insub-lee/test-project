import React, { Component } from 'react';

import { isJSON } from 'utils/helpers';
import RichTextEditor from 'components/FormStuff/RichTextEditor';
import { froalaEditorConfig } from 'components/FormStuff/config';

const getDefaultValue = (value, COMP_FIELD, COMP_TAG, WORK_SEQ) => {
  if (typeof value === 'object') return value;
  if (isJSON(value)) return JSON.parse(value);
  return [
    {
      WORK_SEQ,
      TASK_SEQ: -1,
      CONT_SEQ: -1,
      FIELD_NM: COMP_FIELD,
      TYPE: COMP_TAG,
      DETAIL: value,
    },
  ];
};

const setFormDataValue = (value, colData, COMP_FIELD, COMP_TAG, WORK_SEQ) => {
  if (typeof colData === 'object') {
    colData[0].DETAIL = value;
    return colData;
  }
  if (colData && colData.length > 0 && isJSON(colData)) {
    JSON.parse(colData)[0].DETAIL = value;
    return colData;
  }
  return [
    {
      WORK_SEQ,
      TASK_SEQ: -1,
      CONT_SEQ: -1,
      FIELD_NM: COMP_FIELD,
      TYPE: COMP_TAG,
      DETAIL: value,
    },
  ];
};

class CustomEditorComp extends Component {
  componentDidMount = () => {
    const { changeFormData, sagaKey: id, colData, COMP_FIELD, COMP_TAG, WORK_SEQ } = this.props;
    if (typeof colData !== 'object') {
      changeFormData(id, COMP_FIELD, setFormDataValue(colData, colData, COMP_FIELD, COMP_TAG, WORK_SEQ));
    }
  };

  render = () => {
    const { COMP_FIELD, CONFIG, changeFormData, sagaKey: id, colData, COMP_TAG, WORK_SEQ, visible } = this.props;
    return visible ? (
      <RichTextEditor
        name={COMP_FIELD}
        defaultValue={getDefaultValue(colData, COMP_FIELD, COMP_TAG, WORK_SEQ)}
        saveTempContents={(model, name) => changeFormData(id, name, setFormDataValue(model, colData, COMP_FIELD, COMP_TAG, WORK_SEQ))}
        config={froalaEditorConfig()}
        readOnly={false}
        className={CONFIG.property.className || ''}
      />
    ) : (
      ''
    );
  };
}
export default CustomEditorComp;
