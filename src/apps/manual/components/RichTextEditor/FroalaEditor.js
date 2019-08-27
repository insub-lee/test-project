import React from 'react';
import PropTypes from 'prop-types';

import 'froala-editor/js/froala_editor.pkgd.min';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/plugins/char_counter.min';
import 'froala-editor/js/plugins/image.min';
import 'froala-editor/js/plugins/table.min';
import 'froala-editor/js/plugins/colors.min';
import 'froala-editor/js/plugins/font_size.min';

import ReactFroalaEditor from 'react-froala-wysiwyg';

const FroalaEditor = ({ config, model, onModelChange }) => <ReactFroalaEditor tag="textarea" config={config} model={model} onModelChange={onModelChange} />;

FroalaEditor.propTypes = {
  config: PropTypes.object,
  model: PropTypes.string,
  onModelChange: PropTypes.func,
};

FroalaEditor.defaultProps = {
  config: {},
  model: '',
  onModelChange: () => {},
};

export default FroalaEditor;
