import React from 'react';

import QnA from './QnA';
import Tab from './Tab';
import IndexLink from './IndexLink';
import IndexFile from './IndexFile';
import Editor from './Editor';
import IndexBasic from './IndexBasic';
import IndexRelation from './IndexRelation';

const onClickComponent = (e, selectItem, selectedComponentIdx, handleChangeCompIdx) => {
  e.stopPropagation();
  if (selectItem.MUAL_TABCOMP_IDX !== selectedComponentIdx) handleChangeCompIdx(selectItem.MUAL_TABCOMP_IDX);
};

const RenderEditorComponent = (
  item,
  handleChangeCompValue,
  handleChangeCompIdx,
  selectedComponentIdx,
  focusComponetIdx,
  addAreaIdx,
  handlePushCompValue,
  handleRemoveCompValue,
  indexRelationList,
) => {
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
      innerContent = (
        <IndexFile
          item={item}
          selectedComponentIdx={selectedComponentIdx}
          handleChangeCompValue={handleChangeCompValue}
          handlePushCompValue={handlePushCompValue}
          handleRemoveCompValue={handleRemoveCompValue}
        />
      );
      break;
    case 'indexRelation':
      innerContent = (
        <IndexRelation
          item={item}
          selectedComponentIdx={selectedComponentIdx}
          handleChangeCompValue={handleChangeCompValue}
          indexRelationList={indexRelationList}
        />
      );
      break;
    case 'qna':
      innerContent = <QnA item={item} selectedComponentIdx={selectedComponentIdx} handleChangeCompValue={handleChangeCompValue} />;
      break;
    case 'tab':
      innerContent = <Tab item={item} selectedComponentIdx={selectedComponentIdx} handleChangeCompValue={handleChangeCompValue} />;
      break;
    default:
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
