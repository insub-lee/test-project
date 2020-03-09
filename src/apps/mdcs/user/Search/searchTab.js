import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Tabs, Icon } from 'antd';

import StyledSearch from 'apps/mdcs/styled/StyledSearch';
import BizMicroDevBase from 'components/BizMicroDevBase';
import SearchBasic from './SearchBasic';
import SearchDetail from './SearchDetail';

const { TabPane } = Tabs;

class SearchTab extends Component {
  state = {
    currentPage: 'BASIC',
    treeData: [],
  };

  componentDidMount() {
    const { sagaKey, getCallDataHandler, apiArys } = this.props;
    getCallDataHandler(sagaKey, apiArys, this.initDataBind);
  }

  initDataBind = sagaKey => {
    const {
      result: {
        list: { categoryMapList },
      },
    } = this.props;
    this.setState({ treeData: categoryMapList });
  };

  onTabClick = key => {
    this.setState({ currentPage: key });
  };

  render() {
    const { currentPage } = this.state;
    return (
      <StyledSearch>
        <div className="searchTabs">
          <Tabs defaultActiveKey="1" animated={false} onChange={this.onTabClick}>
            <TabPane
              tab={
                <span>
                  <Icon type="search" />
                  기본검색
                </span>
              }
              key="BASIC"
            >
              <SearchBasic {...this.props} />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <Icon type="file-search" />
                  업무표준
                </span>
              }
              key="BIZ"
            >
              {currentPage === 'BIZ' && (
                <BizMicroDevBase
                  rootNodeId={2}
                  currentPage={this.state.currentPage}
                  treeData={this.state.treeData}
                  sagaKey="STD_BIZ_SEARCH"
                  searchTitle="업무표준"
                  workSeq={901}
                  component={SearchDetail}
                />
              )}
            </TabPane>
            <TabPane
              tab={
                <span>
                  <Icon type="file-search" />
                  기술표준
                </span>
              }
              key="TECH"
            >
              {currentPage === 'TECH' && (
                <BizMicroDevBase
                  rootNodeId={6}
                  currentPage={this.state.currentPage}
                  treeData={this.state.treeData}
                  sagaKey="STD_TECH_SEARCH"
                  searchTitle="기술표준"
                  workSeq={1921}
                  component={SearchDetail}
                />
              )}
            </TabPane>
            <TabPane
              tab={
                <span>
                  <Icon type="file-search" />
                  도면
                </span>
              }
              key="DW"
            >
              {currentPage === 'DW' && (
                <BizMicroDevBase
                  rootNodeId={16}
                  currentPage={this.state.currentPage}
                  treeData={this.state.treeData}
                  sagaKey="STD_DW_SEARCH"
                  searchTitle="도면"
                  workSeq={1881}
                  component={SearchDetail}
                />
              )}
            </TabPane>
            <TabPane
              tab={
                <span>
                  <Icon type="file-search" />
                  NPI
                </span>
              }
              key="NPI"
            >
              {currentPage === 'NPI' && (
                <BizMicroDevBase
                  rootNodeId={0}
                  currentPage={this.state.currentPage}
                  treeData={this.state.treeData}
                  sagaKey="STD_NPI_SEARCH"
                  searchTitle="NPI"
                  workSeq={2975}
                  component={SearchDetail}
                />
              )}
            </TabPane>
            <TabPane
              tab={
                <span>
                  <Icon type="file-search" />
                  TDS
                </span>
              }
              key="TDS"
            >
              {currentPage === 'TDS' && (
                <BizMicroDevBase
                  rootNodeId={231}
                  currentPage={this.state.currentPage}
                  treeData={this.state.treeData}
                  sagaKey="STD_TDS_SEARCH"
                  searchTitle="TDS"
                  workSeq={2941}
                  component={SearchDetail}
                />
              )}
            </TabPane>
            <TabPane
              tab={
                <span>
                  <Icon type="file-search" />
                  Work Process
                </span>
              }
              key="WP"
            >
              {currentPage === 'WP' && (
                <BizMicroDevBase
                  rootNodeId={234}
                  currentPage={this.state.currentPage}
                  treeData={this.state.treeData}
                  sagaKey="STD_WP_SEARCH"
                  searchTitle="Work Process"
                  workSeq={3013}
                  component={SearchDetail}
                />
              )}
            </TabPane>
          </Tabs>
        </div>
      </StyledSearch>
    );
  }
}

SearchTab.propTypes = {
  apiArys: PropTypes.array,
  treeData: PropTypes.object,
};

SearchTab.defaultProps = {
  apiArys: [
    {
      key: 'list',
      url: `/api/admin/v1/common/categoryMapList`,
      type: 'POST',
      params: { PARAM: { NODE_ID: 1 } },
    },
  ],
  treeData: {},
};

export default SearchTab;
