import React from 'react';
import { fromJS } from 'immutable';
import { Scrollbars } from 'react-custom-scrollbars';
import PropTypes from 'prop-types';

import Panel from './Panel';
import InfoConWrap from './InfoConWrap';
import Styled from './Styled';

const ExplainInfo = ({ componentList, setScrollComponent, widgetId, mualMaster, navList }) => (
  <Styled>
    <Panel mualMaster={mualMaster} navList={navList}>
      <Scrollbars
        style={{ height: 'calc(100vh - 208px)' }}
        ref={c => {
          setScrollComponent(c, widgetId);
        }}
      >
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
