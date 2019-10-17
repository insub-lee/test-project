import React, { Component } from 'react';
import { Tabs, Icon } from 'antd';

import StyledSearch from 'apps/mdcs/styled/StyledSearch';
import SearchBasic from './SearchBasic';
import SearchDetail from './SearchDetail';

const { TabPane } = Tabs;

class Search extends Component {
  render() {
    return (
      <StyledSearch>
        <div className="searchTabs">
          <Tabs defaultActiveKey="1">
            <TabPane
              tab={
                <span>
                  <Icon type="search" />
                  기본검색
                </span>
              }
              key="1"
            >
              <SearchBasic />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <Icon type="file-search" />
                  업무표준
                </span>
              }
              key="2"
            >
              <SearchDetail />
            </TabPane>
          </Tabs>
        </div>
      </StyledSearch>
    );
  }
}

export default Search;
