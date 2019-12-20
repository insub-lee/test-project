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
import ReactFroalaEditor from 'react-froala-wysiwyg';

const configSetting = config => {
  config.imageUploadURL = 'http://192.168.0.35:12082/upload';
  config.events = {
    'froalaEditor.image.uploaded': function(e, editor, response) {
      // console.debug('# Uploaded', response, JSON.parse(response));
    },
    'froalaEditor.image.inserted': function(e, editor, $img, response) {
      console.debug('$img : ', $img, response);
      // Todo - insert file docNo to state
    },
  };

  return config;
};

const FroalaEditor = ({ config, model, onModelChange }) => <ReactFroalaEditor config={configSetting(config)} model={model} onModelChange={onModelChange} />;

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
