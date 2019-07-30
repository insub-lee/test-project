import React from 'react';

import SideMenu from '../SideMenu';
import ExplainInfo from '../ExplainInfo';
import QuickLink from '../QuickLink';
import Pagination from '../Pagination';
import Styled from './Styled';

const ContentBody = ({ componentList, setScrollComponent }) => (
  <Styled>
    <div className="contentBody-wrap">
      <SideMenu />
      <ExplainInfo componentList={componentList} setScrollComponent={setScrollComponent} />
      <QuickLink />
    </div>
    <Pagination />
  </Styled>
);

export default ContentBody;
