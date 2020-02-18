import React, { Component } from 'react';
import { Table, Radio, Form, Tree, Select, Modal } from 'antd';
import { getTreeFromFlatData } from 'react-sortable-tree';
import moment from 'moment';

import StyledSearch from 'apps/mdcs/styled/StyledSearch';

class SearchCommon extends Component {
  render() {
    const { searchTitle, treeData } = this.props;

    console.debug('searchDetail treedata', treeData);
    return (
      <StyledSearch>
        <div className="searchPage searchDetail">
          <div className="searchWrapper">
            <p className="searchTitle">{`${searchTitle} 검색`}</p>
            <div className="treeWrapper tfWrapper">
              {treeData && treeData.children && treeData.children.length > 0 && <Tree showLine treeData={treeData} />}
            </div>
            <div className="formWrapper tfWrapper">검색 내용</div>
          </div>
        </div>
      </StyledSearch>
    );
  }
}

export default SearchCommon;
