import React from 'react';
import { fromJS } from 'immutable';
import { Scrollbars } from 'react-custom-scrollbars';
import PropTypes from 'prop-types';

import Panel from './Panel';
import InfoConWrap from './InfoConWrap';
import Styled from './Styled';

const ExplainInfo = ({ componentList }) => (
  <Styled>
    <Panel>
      <Scrollbars style={{ height: 'calc(100vh - 259px)' }}>
        <InfoConWrap componentList={componentList} />
      </Scrollbars>
    </Panel>
  </Styled>
);

ExplainInfo.propTypes = {
  maulTabList: PropTypes.object,
  selectedTabIdx: PropTypes.number,
  setSelectedTabIdx: PropTypes.func,
};

ExplainInfo.defaultProps = {
  maulTabList: fromJS([]),
  selectedTabIdx: 0,
  setSelectedTabIdx: () => false,
};

export default ExplainInfo;
