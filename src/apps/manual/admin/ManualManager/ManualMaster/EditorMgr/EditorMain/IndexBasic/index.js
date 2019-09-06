import React from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';

const IndexBasic = ({ item, selectedComponentIdx, handleChangeCompValue }) => (
  <div className="manualEditorComponent">
    <div className="manualIndexWrapper">
      <div className="manualIndexTitle">
        {selectedComponentIdx === item.MUAL_TABCOMP_IDX ? (
          <Input
            key={`manualEditorIndexInput_${item.MUAL_TABCOMP_IDX}`}
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
  </div>
);

IndexBasic.propTypes = {
  handleChangeCompValue: PropTypes.func,
  item: PropTypes.object,
  selectedComponentIdx: PropTypes.number,
};

IndexBasic.defaultProps = {
  handleChangeCompValue: () => false,
  item: {},
  selectedComponentIdx: 0,
};

export default IndexBasic;
