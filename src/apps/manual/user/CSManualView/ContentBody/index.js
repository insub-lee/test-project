import React from 'react';

import SideMenu from '../SideMenu';
import ExplainInfo from '../ExplainInfo';
import QuickLink from '../QuickLink';
import Pagination from '../Pagination';
import Styled from './Styled';

const ContentBody = ({ componentList, setScrollComponent, widgetId }) => (
  <Styled>
    <div className="contentBody-wrap">
      <SideMenu widgetId={widgetId} />
      <ExplainInfo componentList={componentList} setScrollComponent={setScrollComponent} widgetId={widgetId} />
      <QuickLink />
    </div>
    <Pagination />
  </Styled>
);

export default ContentBody;
