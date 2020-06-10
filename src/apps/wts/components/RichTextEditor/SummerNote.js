import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import 'summernote/dist/summernote-lite.min';
import 'summernote/dist/summernote-lite.css';
import 'summernote/dist/lang/summernote-ko-KR';
import SummernoteDefaultStyle from './SummernoteDefaultStyle';

class SummerNote extends Component {
  constructor(props) {
    super(props);
    const { value } = props;
    this.state = {
      id: `summernote-id-${new Date().getTime()}`,
      contents: value || '',
    };
    this.onChangeContents = this.onChangeContents.bind(this);
  }

  componentDidMount() {
    const { id } = this.state;
    const { readOnly, placeholder } = this.props;
    const onChangeHandler = this.onChangeContents;
    console.debug('Edit Able??', readOnly);
    if (!readOnly) {
      $(`#${id}`).summernote({
        toolbar: [
          ['style', ['bold', 'italic', 'underline', 'clear']],
          ['font', ['strikethrough', 'superscript', 'subscript']],
          ['fontsize', ['fontsize']],
          ['fontname', ['fontname']],
          ['color', ['color']],
          ['para', ['ul', 'ol', 'paragraph']],
          ['height', ['height']],
        ],
        fontNames: ['Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Merriweather', 'Roboto'],
        placeholder,
        tabsize: 2,
        height: 300,
        lang: 'ko-KR',
        airMode: false,
        callbacks: {
          onChange(contents) {
            onChangeHandler(contents);
          },
        },
        disableDragAndDrop: true,
      });
      $('div.note-group-select-from-files').remove();
      $('.note-popover.note-link-popover').remove();
      $('.note-popover.note-image-popover').remove();
      $('.note-popover.note-table-popover').remove();
    }
  }

  onChangeContents(contents) {
    this.setState({ contents });
  }

  render() {
    const { id, contents } = this.state;
    const { name } = this.props;
    return (
      <SummernoteDefaultStyle className="summernote_default_style">
        <div id={id} dangerouslySetInnerHTML={{ __html: contents }} />
        <textarea style={{ display: 'none' }} name={name} readOnly value={contents} />
      </SummernoteDefaultStyle>
    );
  }
}

SummerNote.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  readOnly: PropTypes.bool,
};

SummerNote.defaultProps = {
  name: '',
  placeholder: '',
  value: '',
  readOnly: false,
};

export default SummerNote;
