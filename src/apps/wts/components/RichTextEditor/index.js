// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { EditorState, convertToRaw, ContentState } from 'draft-js';
// import { Editor } from 'react-draft-wysiwyg';
// import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import StyledRichTextEditor from './StyledRichTextEditor';
// import toolbar from './editorConfig';

// class RichTextEditor extends Component {
//   constructor(props) {
//     super(props);
//     const { value } = props;
//     const contentBlock = htmlToDraft(value);
//     const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
//     const editorState = EditorState.createWithContent(contentState);
//     this.state = {
//       editorState,
//     };
//     this.handleChangeValue = this.handleChangeValue.bind(this);
//   }

//   componentWillReceiveProps(nextProps) {
//     if (nextProps.value !== this.props.value) {
//       const { value } = nextProps;
//       const contentBlock = htmlToDraft(value);
//       const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
//       const editorState = EditorState.createWithContent(contentState);
//       this.setState({ editorState });
//     }
//   }

//   handleChangeValue(editorState) {
//     this.setState({ editorState });
//   }

//   render() {
//     const { editorState } = this.state;
//     const { name, placeholder, readOnly } = this.props;
//     return (
//       <StyledRichTextEditor>
//         <Editor
//           toolbarHidden={readOnly}
//           toolbar={toolbar}
//           editorState={editorState}
//           wrapperClassName="demo-wrapper"
//           editorClassName={readOnly ? 'view-wrapper' : ''}
//           onEditorStateChange={this.handleChangeValue}
//           placeholder={placeholder}
//           readOnly={readOnly}
//         />
//         <textarea style={{ display: 'none' }} name={name} readOnly value={draftToHtml(convertToRaw(editorState.getCurrentContent()))} />
//       </StyledRichTextEditor>
//     );
//   }
// }

// RichTextEditor.propTypes = {
//   name: PropTypes.string,
//   placeholder: PropTypes.string,
//   value: PropTypes.string,
//   readOnly: PropTypes.bool,
// };

// RichTextEditor.defaultProps = {
//   name: '',
//   placeholder: '',
//   value: '',
//   readOnly: false,
// };

// export default RichTextEditor;
