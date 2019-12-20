import React from 'react';

import EditorComp from './EditorComp';
const CustomEditorComp = props => (props.visible && Number(props.formData.FMEA_FLAG) === 192 ? <EditorComp {...props}></EditorComp> : '');

export default CustomEditorComp;
