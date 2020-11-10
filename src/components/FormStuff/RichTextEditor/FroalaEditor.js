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

const configSetting = config => ({
  ...config,
  key: 'jUA1yB1A4E4E1F2E1pZGCTRSAPJWTLPLZHTQQb1JGZxE2F2G2C1B10C2D2E6D1G2==',
  // imageUploadURL: 'http://192.168.0.35:12082/upload',
  events: {
    'froalaEditor.image.beforeUpload': function(event, editor, files) {
      if (files.length) {
        const reader = new FileReader();
        reader.onload = function(e) {
          const { result } = e.target;
          editor.image.insert(result, null, null, editor.image.get());
        };
        // base64 로 인코딩 처리
        reader.readAsDataURL(files[0]);
      }
      editor.popups.hideAll();
      return false;
    },
  },
});

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
