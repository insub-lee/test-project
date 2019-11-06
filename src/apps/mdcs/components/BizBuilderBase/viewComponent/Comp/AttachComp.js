import React from 'react';
import FileUpload from 'components/FormStuff/Upload';
import { Descriptions, Tag, Icon } from 'antd';

const handlerAttachChange = (detail, CONFIG, id, changeFormData, changeValidationData) => {
  if (CONFIG.property.isRequired) {
    changeValidationData(id, CONFIG.property.COMP_FIELD, detail.length > 0, detail.length > 0 ? '' : `${CONFIG.property.NAME_KOR}는 필수항목 입니다.`);
  }
  changeFormData(id, CONFIG.property.COMP_FIELD, detail);
};

const AttachComp = ({ CONFIG, colData, changeFormData, id, changeValidationData, readOnly }) => {
  let defaultAttachValue = { DETAIL: [] };
  if (colData !== undefined) {
    defaultAttachValue = colData;
  }

  let view = false;
  if (readOnly !== undefined && readOnly) {
    view = readOnly;
  }

  return (
    <React.Fragment>
      <FileUpload
        defaultValue={defaultAttachValue}
        multiple={CONFIG.property.multiple || true}
        readOnly={view}
        saveTempContents={detail => {
          handlerAttachChange(detail, CONFIG, id, changeFormData, changeValidationData);
        }}
      ></FileUpload>
    </React.Fragment>
  );
};

export default AttachComp;
