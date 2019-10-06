import React from 'react';
import { fromJS } from 'immutable';
import { Scrollbars } from 'react-custom-scrollbars';
import PropTypes from 'prop-types';

import Panel from './Panel';
import InfoConWrap from './InfoConWrap';
import Styled from './Styled';

const ExplainInfo = ({ componentList, setScrollComponent, widgetId, mualMaster, navList, indexRelationList, bookmarkWidgetData }) => (
  <Styled>
    <Panel mualMaster={mualMaster} navList={navList}>
      <Scrollbars
        style={bookmarkWidgetData.widgetYn ? { height: 'calc(100vh - 25vh)' } : { height: 'calc(100vh - 208px)' }}
        ref={c => {
          if (c) {
            setScrollComponent(c, widgetId);
          }
        }}
      >
        <InfoConWrap componentList={componentList} indexRelationList={indexRelationList} />
      </Scrollbars>
    </Panel>
  </Styled>
);

ExplainInfo.propTypes = {
  maulTabList: PropTypes.object,
  selectedTabIdx: PropTypes.number,
  setSelectedTabIdx: PropTypes.func,
  bookmarkWidgetData: PropTypes.object,
};

ExplainInfo.defaultProps = {
  maulTabList: fromJS([]),
  selectedTabIdx: 0,
  setSelectedTabIdx: () => false,
  bookmarkWidgetData: { widgetYn: false, appCount: 0 },
};

export default ExplainInfo;
