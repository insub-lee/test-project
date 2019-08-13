import React from 'react';

import SideMenu from '../SideMenu';
import ExplainInfo from '../ExplainInfo';
import QuickLink from '../QuickLink';
import Pagination from '../Pagination';
import Styled from './Styled';

const ContentBody = ({ componentList, setScrollComponent, widgetId, pagerProps }) => (
  <Styled>
    <div className="contentBody-wrap">
      <SideMenu widgetId={widgetId} />
      <ExplainInfo componentList={componentList} setScrollComponent={setScrollComponent} widgetId={widgetId} />
      <QuickLink />
    </div>
    <Pagination pagerProps={pagerProps} widgetId={widgetId} />
  </Styled>
);

export default ContentBody;
