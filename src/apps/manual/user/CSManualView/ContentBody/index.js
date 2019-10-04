import React from 'react';

import SideMenu from '../SideMenu';
import ExplainInfo from '../ExplainInfo';
import QuickLink from '../QuickLink';
import Pagination from '../Pagination';
import Styled from './Styled';

const ContentBody = ({ componentList, setScrollComponent, widgetId, pagerProps, mualMaster, navList, quickProps, indexRelationList, bookmarkWidgetData }) => (
  <Styled>
    <div className="contentBody-wrap">
      <SideMenu widgetId={widgetId} bookmarkWidgetData={bookmarkWidgetData}/>
      <ExplainInfo
        componentList={componentList}
        setScrollComponent={setScrollComponent}
        widgetId={widgetId}
        mualMaster={mualMaster}
        navList={navList}
        indexRelationList={indexRelationList}
        bookmarkWidgetData={bookmarkWidgetData}
      />
      <QuickLink quickProps={quickProps} />
    </div>
    <Pagination className="pagination-wrap" pagerProps={pagerProps} widgetId={widgetId} mualMaster={mualMaster} />
  </Styled>
);

export default ContentBody;
