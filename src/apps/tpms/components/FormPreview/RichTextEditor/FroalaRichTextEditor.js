import React from 'react';
import PropTypes from 'prop-types';

// Require Editor JS files.
import 'froala-editor/js/froala_editor.min';
import 'froala-editor/js/froala_editor.pkgd.min';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

import 'froala-editor/js/languages/ko';
import 'font-awesome/css/font-awesome.min.css';
import 'froala-editor/js/plugins/font_family.min';
import 'froala-editor/js/plugins/colors.min';
import FroalaEditor from 'react-froala-wysiwyg';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';

import { v4 as UUID } from 'uuid';

import { getMeta } from 'utils/request';
import defaultConfig from './froalaEditorConfig';
import StyledFroalaEditor from './StyledFroalaEditor';

class FroalaRichTextEditor extends React.Component {
  constructor(props) {
    super(props);
    const { value } = props;
    this.state = {
      contents: value || '',
      uploaded: [],
    };
    this.handleModelChange = this.handleModelChange.bind(this);
    this.handleUploadedState = this.handleUploadedState.bind(this);
  }

  handleModelChange(model) {
    this.setState({ contents: model });
  }

  handleUploadedState(docNo) {
    this.setState(prevState => {
      const { uploaded } = prevState;
      uploaded.push(docNo);
      return { uploaded };
    });
  }

  // upload res
  // {
  //   code: 300,
  //   fileName: '1.PNG',
  //   fileType: 2,
  //   fileExt: 'png',
  //   size: 33685,
  //   fileSize: 33685,
  //   seq: '303631',
  //   img: '/img/thumb/0x0/303631',
  //   link: '/img/thumb/200x200/303631',
  //   down: '/down/file/303631',
  // };

  render() {
    const { contents, uploaded } = this.state;
    const { name, readOnly, placeholder } = this.props;
    const { handleUploadedState } = this;
    const config = { ...Object.freeze(defaultConfig) };
    // Todo TPMS - Upload To Base64
    config.placeholderText = placeholder || '';
    config.requestHeaders = {
      META: JSON.stringify(getMeta()),
    };
    config.imageUploadURL = `/upload/files?conserveYm=29991231&sysId=TPMS&uid=${UUID()}`;
    config.events = {
      'froalaEditor.image.uploaded': function(e, editor, response) {
        // console.debug('# Uploaded', response, JSON.parse(response));
      },
      'froalaEditor.image.inserted': function(e, editor, $img, response) {
        console.debug('$img : ', $img, response);
        // Todo - insert file docNo to state
        handleUploadedState(JSON.parse(response).docNo);
      },
    };
    return (
      <StyledFroalaEditor>
        {readOnly ? (
          <FroalaEditorView model={contents} />
        ) : (
          <>
            <FroalaEditor config={config} tag="textarea" model={contents} onModelChange={this.handleModelChange} />
            <textarea style={{ display: 'none' }} name={name} readOnly value={contents} />
            <input type="hidden" name={`${name}_UPLOADED_FILES`} value={JSON.stringify(uploaded.map(docNo => docNo))} />
          </>
        )}
      </StyledFroalaEditor>
    );
  }
}

FroalaRichTextEditor.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
};

FroalaRichTextEditor.defaultProsp = {
  value: '',
  placeholder: '',
  readOnly: false,
};

export default FroalaRichTextEditor;
