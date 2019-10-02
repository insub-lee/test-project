import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FroalaEditor from './FroalaEditor';
import FroalaEditorView from './FroalaEditorView';

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

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { defaultValue } = this.props;
    const { defaultValue: prevValue } = prevProps;
    if (defaultValue !== prevValue) {
      if (defaultValue[0] && defaultValue[0].hasOwnProperty('DETAIL')) {
        const { DETAIL: model } = defaultValue[0];
        this.setState({ model });
      }
    }
  }

  onModelChange = model => {
    const { saveTempContents, name, contSeq } = this.props;
    this.setState({ model }, () => saveTempContents(model, name, 'rich-text-editor', contSeq));
  };

  getCurrentValue = () => {
    const { model } = this.state;
    const { name, workSeq, taskSeq, contSeq } = this.props;
    return JSON.stringify([
      {
        WORK_SEQ: workSeq,
        TASK_SEQ: taskSeq,
        CONT_SEQ: contSeq,
        FIELD_NM: name,
        ORD: 0,
        TYPE: 'rich-text-editor',
        DETAIL: model,
      },
    ]);
  };

  render() {
    const { config, name, readOnly } = this.props;
    const { model } = this.state;
    return (
      <div>
        {readOnly ? (
          <FroalaEditorView model={model} />
        ) : (
          <React.Fragment>
            <FroalaEditor model={model} onModelChange={this.onModelChange} config={config} />
            <input type="hidden" name={name} value={this.getCurrentValue()} data-type="json" />
          </React.Fragment>
        )}
      </div>
    );
  }
}

RichTextEditor.propTypes = {
  config: PropTypes.object,
  saveTempContents: PropTypes.func,
  readOnly: PropTypes.bool,
  name: PropTypes.string,
  defaultValue: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
  contSeq: PropTypes.number,
  workSeq: PropTypes.number,
  taskSeq: PropTypes.number,
};

RichTextEditor.defaultProps = {
  config: {},
  saveTempContents: () => {},
  readOnly: false,
  name: '',
  defaultValue: [],
  contSeq: -1,
  workSeq: -1,
  taskSeq: -1,
};

export default RichTextEditor;
