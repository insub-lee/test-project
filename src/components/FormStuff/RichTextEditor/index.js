import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FroalaEditor from './FroalaEditor';

class RichTextEditor extends Component {
  state = {
    model: '',
  };

  onModelChange = model => {
    const { saveTempContents, name, contSeq } = this.props;
    this.setState({ model }, () => saveTempContents(model, name, 'rich-text-editor', contSeq));
  };

  render() {
    const { config } = this.props;
    console.debug('@@', this.props);
    const { model } = this.state;
    return <FroalaEditor model={model} onModelChange={this.onModelChange} config={config} />;
  }
}

RichTextEditor.propTypes = {
  config: PropTypes.object,
  formStuff: PropTypes.object,
  saveTempContents: PropTypes.func,
};

RichTextEditor.defaultProps = {
  config: {},
  formStuff: {},
  saveTempContents: () => {},
};

export default RichTextEditor;
