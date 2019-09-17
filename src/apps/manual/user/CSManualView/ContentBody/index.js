import React from 'react';

import SideMenu from '../SideMenu';
import ExplainInfo from '../ExplainInfo';
import QuickLink from '../QuickLink';
import Pagination from '../Pagination';
import Styled from './Styled';

const ContentBody = ({ componentList, setScrollComponent, widgetId, pagerProps, mualMaster, navList, quickProps, indexRelationList }) => (
  <Styled>
    <div className="contentBody-wrap">
      <SideMenu widgetId={widgetId} />
      <ExplainInfo
        componentList={componentList}
        setScrollComponent={setScrollComponent}
        widgetId={widgetId}
        mualMaster={mualMaster}
        navList={navList}
        indexRelationList={indexRelationList}
      />
      <QuickLink quickProps={quickProps} />
    </div>
    <Pagination pagerProps={pagerProps} widgetId={widgetId} mualMaster={mualMaster} />
  </Styled>
);

export default ContentBody;
