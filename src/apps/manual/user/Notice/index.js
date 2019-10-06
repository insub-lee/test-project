import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tree, Row, Col, Input } from 'antd';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { getTreeFromFlatData } from 'react-sortable-tree';
import PropTypes from 'prop-types';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import selectors from './selectors';
import * as actions from './actions';
import BizBuilderBase from '../../components/BizBuilderBase';
import List from './List';

const getCategoryMapListAsTree = flatData =>
  getTreeFromFlatData({
    flatData: flatData.map(item => ({
      title: item.NAME_KOR,
      value: item.NODE_ID,
      key: item.NODE_ID,
      parentValue: item.PARENT_NODE_ID,
    })),
    getKey: node => node.key,
    getParentKey: node => node.parentValue,
    rootKey: 0,
  });

const filterFunc = (text, treeData) => {
  let tempResult = treeData.filter(item => item.title.indexOf(text) > -1);
  if (tempResult.length === 0) {
    treeData.filter(x => {
      if (Object.prototype.hasOwnProperty.call(x, 'children')) {
        tempResult = filterFunc(text, x.children);
      }
    });
  }

  return tempResult;
};

const { Search } = Input;
class Notice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: false,
      viewType: 'List',
      taskSeq: -1,
      workSeq: 1251,
      record: {},
      selectedKey: '',
    };
  }

  componentDidMount() {
    const { getCategoryMapListBySaga, categoryMapId, getFilteredData } = this.props;
    getCategoryMapListBySaga('categoryMapInfo', categoryMapId);
    getFilteredData('148');
    this.setState({ selectedKey: '148' });
  }

  onSelect = (selectedKeys, info) => {
    console.log(selectedKeys, '온셀렉트');
    const { getFilteredData } = this.props;
    getFilteredData(selectedKeys[0]);
    this.setState({ viewType: 'List', selectedKey: selectedKeys[0], record: {} });
  };

  handleChange = (text, treeData) => {
    let result;
    treeData.map(item => {
      if (item.title.indexOf(text) > -1) {
        result = treeData;
      } else {
        result = filterFunc(text, item.children);
      }
    });
    this.setState({ data: result });
  };

  handlerViewChange = (viewType, taskSeq) => {
    const { getFilteredData } = this.props;
    const { selectedKey } = this.state;
    this.setState({ viewType, taskSeq }, () => {
      if (viewType === 'List') {
        this.setState({ record: {} });
      }
    });
    getFilteredData(selectedKey);
  };

  selectedRecord = record => {
    this.setState({ record });
  };

  render() {
    const { categoryMapInfo, filteredDataByKey, profile } = this.props;
    const { data, workSeq, taskSeq, viewType } = this.state;
    const categoryData = [];
    if (categoryMapInfo && categoryMapInfo.categoryMapList) {
      const source = getCategoryMapListAsTree(categoryMapInfo.categoryMapList.filter(x => x.USE_YN === 'Y'));
      categoryData.push(source[0]);
    }

    return (
      <Row>
        <Col span={4}>
          <Search
            placeholder="검색어를 입력해 주세요"
            onSearch={text => {
              this.handleChange(text, categoryData);
            }}
          ></Search>
          <Tree showLine defaultExpandAll treeData={data || categoryData} onSelect={this.onSelect}></Tree>
        </Col>
        <Col span={18}>
          <BizBuilderBase
            id="Notice"
            viewType={viewType}
            filteredDataByKey={filteredDataByKey}
            component={List}
            profile={profile}
            selectedCategorie={this.state.selectedKey}
            taskSeq={taskSeq}
            categoryData={categoryData}
            selectedRecord={this.selectedRecord}
            record={this.state.record}
            workSeq={workSeq}
            viewChange={this.handlerViewChange}
            {...this.props}
          ></BizBuilderBase>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  categoryMapInfo: selectors.makeSelectCategoryMapList('categoryMapInfo'),
  filteredDataByKey: selectors.makeSelectedFilteredData(),
  profile: selectors.makeSelectProfile(),
});

const mapDispatchToProps = dispatch => ({
  getCategoryMapListBySaga: (key, mapId) => dispatch(actions.getCategoryMapListBySaga(key, mapId)),
  getFilteredData: selectedKey => dispatch(actions.getFilteredData(selectedKey)),
});

const withReducer = injectReducer({ key: 'apps-mdcs-user-Notice-reducer', reducer });
const withSaga = injectSaga({ key: 'apps-mdcs-user-Notice-saga', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
Notice.propTypes = {
  getCategoryMapListBySaga: PropTypes.func,
  categoryMapId: PropTypes.number,
  categoryMapInfo: PropTypes.object,
  workSeq: PropTypes.number,
  apiInfo: PropTypes.object,
  apiArr: PropTypes.array,
  setFilterKeyByReducer: PropTypes.func,
};
Notice.defaultProps = {
  categoryMapId: 17,
  filteredDataByKey: [],
};
export default compose(
  withSaga,
  withReducer,
  withConnect,
)(Notice);
