import React from 'react';
import PropTypes from 'prop-types';

import FroalaEditor from '../../../../../../components/RichTextEditor/FroalaEditor';
import FroalaEditorView from '../../../../../../components/RichTextEditor/FroalaEditorView';
import { froalaEditorConfig } from '../../../../../../components/RichTextEditor/FroalaEditorConfig';

const Editor = ({ item, selectedComponentIdx, handleChangeCompValue }) => (
  <div className="manualEditorComponent">
    {(selectedComponentIdx === item.MUAL_TABCOMP_PIDX && selectedComponentIdx > 0) || selectedComponentIdx === item.MUAL_TABCOMP_IDX ? (
      <FroalaEditor
        key={`manualEditorFroalaEditor_${item.MUAL_TABCOMP_IDX}`}
        config={froalaEditorConfig}
        model={item.MUAL_COMPVIEWINFO}
        onModelChange={text => handleChangeCompValue(item.MUAL_TAB_IDX, item.MUAL_TABCOMP_IDX, 'MUAL_COMPVIEWINFO', text)}
      />
    ) : (
      <FroalaEditorView key={`manualEditorFroalaEditorView_${item.MUAL_TABCOMP_IDX}`} model={item.MUAL_COMPVIEWINFO} />
    )}
  </div>
);

Editor.propTypes = {
  handleChangeCompValue: PropTypes.func,
  item: PropTypes.object,
  selectedComponentIdx: PropTypes.number,
};

Editor.defaultProps = {
  handleChangeCompValue: () => false,
  item: {},
  selectedComponentIdx: 0,
};

export default Editor;
