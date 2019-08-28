import React from 'react';

import QnA from './QnA';
import IndexLink from './IndexLink';
import IndexFile from './IndexFile';
import Editor from './Editor';
import IndexBasic from './IndexBasic';

const onClickComponent = (e, selectItem, selectedComponentIdx, handleChangeCompIdx) => {
  e.stopPropagation();
  if (selectItem.MUAL_TABCOMP_IDX !== selectedComponentIdx) handleChangeCompIdx(selectItem.MUAL_TABCOMP_IDX);
};

const RenderEditorComponent = (item, handleChangeCompValue, handleChangeCompIdx, selectedComponentIdx, focusComponetIdx, addAreaIdx) => {
  let innerContent = '';
  switch (item.TYPE) {
    case 'editor':
      innerContent = <Editor item={item} selectedComponentIdx={selectedComponentIdx} handleChangeCompValue={handleChangeCompValue} />;
      break;
    case 'index':
      innerContent = <IndexBasic item={item} selectedComponentIdx={selectedComponentIdx} handleChangeCompValue={handleChangeCompValue} />;
      break;
    case 'indexLink':
      innerContent = <IndexLink item={item} selectedComponentIdx={selectedComponentIdx} handleChangeCompValue={handleChangeCompValue} />;
      break;
    case 'indexFile':
      innerContent = <IndexFile item={item} selectedComponentIdx={selectedComponentIdx} handleChangeCompValue={handleChangeCompValue} />;
      break;
    case 'qna':
      innerContent = <QnA item={item} selectedComponentIdx={selectedComponentIdx} handleChangeCompValue={handleChangeCompValue} />;
      break;
    default:
      innerContent = '';
      break;
  }
  return (
    <div
      key={`editorCompKey_${item.MUAL_TAB_IDX}_${item.MUAL_TABCOMP_IDX}`}
      id={`editorCompID_${item.MUAL_TAB_IDX}_${item.MUAL_TABCOMP_IDX}`}
      className={`editorComponent${addAreaIdx === item.MUAL_TABCOMP_IDX ? ' on' : ''}${focusComponetIdx === item.MUAL_TABCOMP_IDX ? ' focus' : ''}${
        item.TYPE.indexOf('index') === -1 && selectedComponentIdx === item.MUAL_TABCOMP_PIDX ? ' buttonOn' : ''
      }`}
      onClick={e => onClickComponent(e, item, selectedComponentIdx, handleChangeCompIdx)}
    >
      {innerContent}
    </div>
  );
};

export default RenderEditorComponent;
