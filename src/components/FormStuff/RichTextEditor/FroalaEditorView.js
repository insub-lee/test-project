import React from 'react';
import PropTypes from 'prop-types';

import 'froala-editor/js/froala_editor.min';
import 'froala-editor/js/froala_editor.pkgd.min';

import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

import 'froala-editor/js/languages/ko';
import 'froala-editor/js/plugins/char_counter.min';
// import 'froala-editor/js/plugins/image.min';
// import 'froala-editor/js/plugins/table.min';
import 'froala-editor/js/plugins/font_family.min';
import 'froala-editor/js/plugins/colors.min';
import FroalaView from 'react-froala-wysiwyg/FroalaEditorView';

const FroalaEditorView = ({ model }) => <FroalaView model={model} />;

FroalaEditorView.propTypes = {
  model: PropTypes.string,
};

FroalaEditorView.defaultProps = {
  model: '',
};

export default FroalaEditorView;
