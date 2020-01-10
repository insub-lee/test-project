import React, { Component } from 'react';

import { isJSON } from 'utils/helpers';
import RichTextEditor from 'components/FormStuff/RichTextEditor/SummerNote';

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
  if (isJSON(colData)) {
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

class EditorComp extends Component {
  componentDidMount = () => {
    const { changeFormData, id, colData, COMP_FIELD, COMP_TAG, WORK_SEQ } = this.props;
    if (typeof colData !== 'object') {
      changeFormData(id, COMP_FIELD, setFormDataValue(colData, colData, COMP_FIELD, COMP_TAG, WORK_SEQ));
    }
  };

  render = () => {
    const { COMP_FIELD, changeFormData, id, colData, readOnly, COMP_TAG, WORK_SEQ, visible } = this.props;
    return visible ? (
      <RichTextEditor
        name={COMP_FIELD}
        defaultValue={getDefaultValue(colData, COMP_FIELD, COMP_TAG, WORK_SEQ)}
        saveTempContents={(model, name) => changeFormData(id, name, setFormDataValue(model, colData, COMP_FIELD, COMP_TAG, WORK_SEQ))}
        readOnly={readOnly}
      />
    ) : (
      ''
    );
  };
}
export default EditorComp;
