import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

import TopbarBtn from '../../components/TopbarBtn';
import Styled from './Styled';

const { Option } = Select;

const handleClickSelect = (mualIdx, widgetId, { setSelectedMualIdx, setListSelectedMualIdx, setNewsfeedModalIdx }) => {
  setListSelectedMualIdx(mualIdx, widgetId);
  setSelectedMualIdx(mualIdx, widgetId, 'N');
  setNewsfeedModalIdx(mualIdx, widgetId);
};

const TopbarBtnWrap = ({ className, data, mualMaster, widgetId, action }) => (
  <Styled className={className}>
    {data && data.map((item, idx) => <TopbarBtn key={`${item.key}_${idx}`} data={item} />)}
    {mualMaster && mualMaster.get('VERSIONLIST') && mualMaster.get('VERSIONLIST').size > 0 && (
      <Select
        value={mualMaster.get('MUAL_IDX')}
        className="manualViewTopbarSelect"
        placeholder="이력보기"
        style={{ width: 78 }}
        onChange={mualIdx => handleClickSelect(mualIdx, widgetId, action)}
      >
        {mualMaster.get('VERSIONLIST').map(node => (
          <Option key={`mualViewBookmark_${node.get('MUAL_IDX')}`} value={node.get('MUAL_IDX')}>
            {node.get('VERSION')}
          </Option>
        ))}
      </Select>
    )}
  </Styled>
);

TopbarBtnWrap.propTypes = {
  className: PropTypes.string.isRequired,
  mualMaster: PropTypes.object.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TopbarBtnWrap;
