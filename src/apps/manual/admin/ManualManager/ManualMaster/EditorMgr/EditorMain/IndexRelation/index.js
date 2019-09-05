import React from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';

import FroalaEditorView from '../../../../../../components/RichTextEditor/FroalaEditorView';

const IndexRelation = ({ item, selectedComponentIdx, handleChangeCompValue, indexRelationList }) => {
  let renderChild = '';
  if (item.COMP_OPTION) {
    console.debug(indexRelationList);
    const findIdx = indexRelationList.findIndex(find => find.MUAL_TABCOMP_OIDX === item.COMP_OPTION.MUAL_TABCOMP_OIDX);
    if (findIdx > -1) {
      const childNode = indexRelationList[findIdx];
      renderChild =
        childNode.CHILD_NODE &&
        childNode.CHILD_NODE.map(node => (
          <div>
            <FroalaEditorView model={node.MUAL_COMPVIEWINFO} />
          </div>
        ));
    }
  }
  return (
    <div className="manualEditorComponent">
      <div className="manualIndexWrapper">
        <div className="manualIndexTitle">
          {selectedComponentIdx === item.MUAL_TABCOMP_IDX ? (
            <Input
              type="text"
              defaultValue={item.MUAL_COMPVIEWINFO}
              placeholder="목차명을 입력해주세요"
              onChange={e => handleChangeCompValue(item.MUAL_TAB_IDX, item.MUAL_TABCOMP_IDX, 'MUAL_COMPVIEWINFO', e.target.value)}
            />
          ) : (
            item.MUAL_COMPVIEWINFO || '목차명을 입력해주세요'
          )}
        </div>
      </div>
      {renderChild}
    </div>
  );
};

IndexRelation.propTypes = {
  handleChangeCompValue: PropTypes.func,
  item: PropTypes.object,
  selectedComponentIdx: PropTypes.number,
  indexRelationList: PropTypes.arrayOf(PropTypes.object),
};

IndexRelation.defaultProps = {
  handleChangeCompValue: () => false,
  item: {},
  selectedComponentIdx: 0,
  indexRelationList: [],
};

export default IndexRelation;
