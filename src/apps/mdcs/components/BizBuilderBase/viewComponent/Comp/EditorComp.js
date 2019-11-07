import React from 'react';

import RichTextEditor from 'components/FormStuff/RichTextEditor';
import { froalaEditorConfig } from 'components/FormStuff/config';

const TextComp = ({ CONFIG, changeFormData, id, colData, readOnly }) => (
  <RichTextEditor
    name={CONFIG.property.COMP_FIELD}
    defaultValue={colData}
    saveTempContents={(model, name) => changeFormData(id, name, model)}
    config={froalaEditorConfig()}
    readOnly={readOnly}
  />
);

export default TextComp;
