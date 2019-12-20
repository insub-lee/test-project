import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import uuid from 'uuid/v1';
import $ from 'jquery';
import { debounce } from 'lodash';
import 'summernote/dist/summernote-lite.min';
import 'summernote/dist/summernote-lite.css';
import 'summernote/lang/summernote-ko-KR';

import StyledSummerNote from './StyledSummerNote';

const getNewKey = () => uuid();
const imgUrlPrefix = '/img/thumb/0x0/';
const sendFile = (formData, callback) => {
  axios
    .post('/upload', formData)
    .then(({ data: { seq, fileName } }) => {
      const imgUrl = `${imgUrlPrefix}${seq}`;
      callback(imgUrl, fileName);
    })
    .catch(error => {
      console.error(error.message);
    });
};

class SummerNoteEditor extends Component {
  constructor(props) {
    super(props);
    this.nodeId = getNewKey();
    this.onChangeEditor = debounce(this.onChangeEditor, 300);
  }

  componentDidMount() {
    const { model } = this.props;
    const { nodeId, onChangeEditor } = this;
    const summernoteNode = $(`#${nodeId}`);
    summernoteNode.summernote({
      lang: 'ko-KR',
      height: 300,
      toolbar: [
        ['style', ['style']],
        ['font', ['strikethrough', 'superscript', 'subscript']],
        ['fontsize', ['fontsize']],
        ['fontname', ['fontname']],
        ['color', ['color']],
        ['para', ['ul', 'ol', 'paragraph']],
        ['height', ['height']],
        ['table', ['table']],
        ['insert', ['link', 'picture', 'hr']],
        ['view', ['fullscreen', 'codeview', 'help']],
      ],
      // fontNames: ['Nanum Gothic', '맑은고딕,Malgun Gothic', '돋움,Dotum', 'Roboto,sans-serif', 'Oswald,sans-serif', 'Montserrat,sans-serif'],
      callbacks: {
        onImageUpload(files) {
          files.forEach(file => {
            const formData = new FormData();
            formData.append('file', file);
            sendFile(formData, (imgUrl, fileName) => summernoteNode.summernote('insertImage', imgUrl, fileName));
          });
        },
        onChange(contents) {
          onChangeEditor(contents);
        },
      },
    });
    summernoteNode.summernote('code', model);
  }

  onChangeEditor = contents => {
    const { onModelChange } = this.props;
    onModelChange(contents);
  };

  render() {
    return (
      <StyledSummerNote>
        <div id={this.nodeId} />
      </StyledSummerNote>
    );
  }
}

SummerNoteEditor.propTypes = {
  model: PropTypes.string,
  onModelChange: PropTypes.func,
};

SummerNoteEditor.defaultProps = {
  model: '',
  onModelChange: () => {},
};

export default SummerNoteEditor;
