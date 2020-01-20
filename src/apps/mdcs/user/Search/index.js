import React, { Component } from 'react';
import { Tabs, Icon } from 'antd';

import StyledSearch from 'apps/mdcs/styled/StyledSearch';
import SearchBasic from './SearchBasic';
import SearchDetail from './SearchDetail';

const { TabPane } = Tabs;

class Search extends Component {
  componentWillMount = () => {
    console.debug('Search!!!');
  };

  render() {
    return (
      <StyledSearch>
        <div className="searchTabs">
          <Tabs defaultActiveKey="1" animated={false}>
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
              <SearchDetail workSeq={201} searchType="BIZ" />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <Icon type="file-search" />
                  기술표준
                </span>
              }
              key="3"
            >
              <SearchDetail workSeq={361} searchType="TECH" />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <Icon type="file-search" />
                  도면
                </span>
              }
              key="4"
            >
              <SearchDetail workSeq={423} searchType="DW" />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <Icon type="file-search" />
                  NPI
                </span>
              }
              key="5"
            >
              <SearchDetail workSeq={361} searchType="NPI" />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <Icon type="file-search" />
                  TDS
                </span>
              }
              key="6"
            >
              <SearchDetail workSeq={361} searchType="TDS" />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <Icon type="file-search" />
                  Work Process
                </span>
              }
              key="7"
            >
              <SearchDetail workSeq={361} searchType="WP" />
            </TabPane>
          </Tabs>
        </div>
      </StyledSearch>
    );
  }
}

export default Search;
