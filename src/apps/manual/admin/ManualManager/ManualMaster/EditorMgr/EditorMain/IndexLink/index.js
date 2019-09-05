import React from 'react';
import { Input, Radio } from 'antd';
import PropTypes from 'prop-types';

const IndexLink = ({ item, selectedComponentIdx, handleChangeCompValue }) => (
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
      <div className="manualIndexContent">
        <div className="manualLinkIndexContent">
          <div>
            <span>URL 정보 : </span>
            <Input
              key={`manualEditorLinkInput_${item.MUAL_TABCOMP_IDX}`}
              type="text"
              value={item.COMP_OPTION.URL || ''}
              placeholder="URL을 입력해주세요"
              onChange={e => handleChangeCompValue(item.MUAL_TAB_IDX, item.MUAL_TABCOMP_IDX, 'COMP_OPTION.URL', e.target.value)}
            />
          </div>
          <div>
            <span>조회방법 : </span>
            <Radio.Group
              key={`manualEditorLinkRadioGroup1_${item.MUAL_TABCOMP_IDX}`}
              onChange={e => handleChangeCompValue(item.MUAL_TAB_IDX, item.MUAL_TABCOMP_IDX, 'COMP_OPTION.VIEW_TYPE', e.target.value)}
              value={item.COMP_OPTION.VIEW_TYPE}
            >
              <Radio value="popup">popup</Radio>
              <Radio value="inline">inline</Radio>
            </Radio.Group>
          </div>
          <div>
            <span>action 대상 : </span>
            <Radio.Group
              key={`manualEditorLinkRadioGroup2_${item.MUAL_TABCOMP_IDX}`}
              onChange={e => handleChangeCompValue(item.MUAL_TAB_IDX, item.MUAL_TABCOMP_IDX, 'COMP_OPTION.ACTION_TYPE', e.target.value)}
              value={item.COMP_OPTION.ACTION_TYPE}
            >
              <Radio value="title">목차명</Radio>
              <Radio value="menu">목차메뉴 & 목차명</Radio>
            </Radio.Group>
          </div>
        </div>
      </div>
    </div>
  </div>
);

IndexLink.propTypes = {
  handleChangeCompValue: PropTypes.func,
  item: PropTypes.object,
  selectedComponentIdx: PropTypes.number,
};

IndexLink.defaultProps = {
  handleChangeCompValue: () => false,
  item: {},
  selectedComponentIdx: 0,
};

export default IndexLink;
