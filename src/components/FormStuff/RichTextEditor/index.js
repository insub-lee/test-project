import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FroalaEditor from './FroalaEditor';

class RichTextEditor extends Component {
  state = {
    model: '',
  };

  componentDidMount() {
    const { defaultValue, contSeq, name } = this.props;
    console.debug('Rich Text Editor ', defaultValue, this.props, name);
    if (defaultValue && defaultValue.length > 0) {
      const { DETAIL: model } = defaultValue[0];
      this.setState({ model });
    }
  }

  onModelChange = model => {
    const { saveTempContents, name, contSeq } = this.props;
    this.setState({ model }, () => saveTempContents(model, name, 'rich-text-editor', contSeq));
  };

  getCurrentValue = () => {
    const { model } = this.state;
    const { name, workSeq, taskSeq, contSeq } = this.props;
    return JSON.stringify([{
      WORK_SEQ: workSeq,
      TASK_SEQ: taskSeq,
      CONT_SEQ: contSeq,
      FIELD_NM: name,
      ORD: 0,
      TYPE: 'rich-text-editor',
      DETAIL: model,
    }]);
  };

  render() {
    const { config, name } = this.props;
    const { model } = this.state;
    return (
      <div>
        <FroalaEditor model={model} onModelChange={this.onModelChange} config={config} />
        <input type="hidden" name={name} value={this.getCurrentValue()} data-type="json" />
      </div>
    );
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
