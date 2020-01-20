import React from 'react';
import FileUpload from 'components/FormStuff/Upload';
import { Descriptions, Tag, Icon } from 'antd';

const handlerAttachChange = (detail, CONFIG, id, changeFormData, changeValidationData, NAME_KOR, COMP_FIELD) => {
  if (CONFIG.property.isRequired) {
    changeValidationData(id, COMP_FIELD, detail.length > 0, detail.length > 0 ? '' : `${NAME_KOR}는 필수항목 입니다.`);
  }
  changeFormData(id, COMP_FIELD, detail);
};

const AttachComp = ({ CONFIG, colData, changeFormData, sagaKey: id, changeValidationData, readOnly, NAME_KOR, COMP_FIELD, visible, className }) => {
  let defaultAttachValue = { DETAIL: [] };
  if (colData !== undefined) {
    defaultAttachValue = colData;
  }

  let view = false;
  if (readOnly !== undefined && readOnly) {
    view = readOnly;
  }

  return visible ? (
    <>
      <FileUpload
        defaultValue={defaultAttachValue}
        multiple={CONFIG.property.multiple || true}
        readOnly={view}
        saveTempContents={detail => {
          handlerAttachChange(detail, CONFIG, id, changeFormData, changeValidationData, NAME_KOR, COMP_FIELD);
        }}
        className={className || ''}
      ></FileUpload>
    </>
  ) : (
    ''
  );
};

export default AttachComp;
