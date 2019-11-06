import React from 'react';

import EditorComp from '../EditorComp';
const CustomEditorComp = props => (Number(props.formData.FMEA_FLAG) === 192 ? <EditorComp {...props}></EditorComp> : <div></div>);

export default CustomEditorComp;
