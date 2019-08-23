import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Button, Select } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import Footer from 'containers/admin/App/Footer';

import reducer from './reducer';
import saga from './saga';
import selectors from './selectors';
import * as actions from './actions';

import Tree from './Tree';
import StyleCategory from './StyleCategory';
import StyleCategoryForm from './StyleCategoryForm';

const { Option } = Select;

class CategoryMap extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { MAP_ID } = this.props.match.params;
    const payload = {
      MAP_ID,
    };
    this.props.getRootMapList(payload);
    this.props.getCategoryMapList(payload);
  }

  onChangeNode = (e, fieldName) => {
    const { selectedNode, isAdd, addNodeInfo } = this.props;
    if (isAdd) {
      const nodeInfo = {
        NAME_KOR: fieldName === 'NAME_KOR' ? e.target.value : addNodeInfo.NAME_KOR,
        NAME_ENG: fieldName === 'NAME_ENG' ? e.target.value : addNodeInfo.NAME_ENG,
        NAME_CHN: fieldName === 'NAME_CHN' ? e.target.value : addNodeInfo.NAME_CHN,
      };
      this.props.setAddNodeInfo(nodeInfo);
    } else {
      const nodeInfo = {
        ...selectedNode,
        NAME_KOR: fieldName === 'NAME_KOR' ? e.target.value : selectedNode.NAME_KOR,
        NAME_ENG: fieldName === 'NAME_ENG' ? e.target.value : selectedNode.NAME_ENG,
        NAME_CHN: fieldName === 'NAME_CHN' ? e.target.value : selectedNode.NAME_CHN,
      };
      this.props.setSelectedNode(nodeInfo);
    }
  };

  onChangeRootMap = val => {
    const payload = {
      MAP_ID: val,
    };
    this.props.getCategoryMapList(payload);
  };

  onSubmit = e => {
    e.preventDefault();
    const { isAdd, selectedNode } = this.props;
    const data = new FormData(e.target);
    if (isAdd) {
      const payload = {
        MAP_ID: selectedNode.MAP_ID,
        PARENT_NODE_ID: selectedNode.NODE_ID,
        LVL: selectedNode.LVL + 1,
        NODE_ORDINAL: selectedNode.NODE_ORDINAL,
        FULLPATH: selectedNode.FULLPATH,
      };
      data.forEach((value, key) => {
        payload[key] = value;
      });
      this.props.addCategoryMap(payload);
    } else {
      const payload = {
        ...selectedNode,
      };
      data.forEach((value, key) => {
        payload[key] = value;
      });
      this.props.updateCategoryMap(payload);
    }
  };

  render() {
    const {
      rootMapList,
      categoryMapList,
      setCategoryMapList,
      selectedNode,
      setSelectedNode,
      addCategoryMap,
      updateCategoryMap,
      deleteCategoryMap,
      isAdd,
      setIsAdd,
      initAddNodeInfo,
      addNodeInfo,
    } = this.props;
    const { MAP_ID } = this.props.match.params;

    // const isSelectedNode = Object.prototype.hasOwnProperty.call(selectedNode, 'NODE_ID');

    return (
      <StyleCategory>
        <h3 className="pageTitle list">관리</h3>
        <div className="pageContent" style={{ display: 'inline-block', width: '100%', height: 'calc(100vh - 170px)' }}>
          <div className="categoryTreeWrapper">
            <div>
              <Select defaultValue={Number(MAP_ID)} onChange={val => this.onChangeRootMap(val)}>
                {rootMapList.map(item => (
                  <Option key={`option_${item.MAP_ID}`} value={item.MAP_ID}>
                    {item.NAME_KOR}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="searchWrapper">
              <Input type="text" name="" placeholder="검색" />
              <button type="button" title="검색" className="searchBtn" />
            </div>
            <div style={{ paddingTop: '10px' }}>
              <Tree
                treeData={categoryMapList}
                setCategoryMapList={setCategoryMapList}
                selectedNode={selectedNode}
                setSelectedNode={setSelectedNode}
                addCategoryMap={addCategoryMap}
                updateCategoryMap={updateCategoryMap}
                deleteCategoryMap={deleteCategoryMap}
                setIsAdd={setIsAdd}
                initAddNodeInfo={initAddNodeInfo}
              />
            </div>
          </div>
          <form onSubmit={e => this.onSubmit(e)}>
            <div className="categoryContents">
              <h4>{isAdd ? `${selectedNode.NAME_KOR} 하위 카테고리 추가` : '카테고리 정보'}</h4>
              <StyleCategoryForm>
                <table className="adminTbl categoryTbl">
                  <tbody>
                    <tr>
                      <th className="required">
                        <label htmlFor="v2">카테고리 명(KOR)</label>
                      </th>
                      <td>
                        <Input name="NAME_KOR" value={isAdd ? addNodeInfo.NAME_KOR : selectedNode.NAME_KOR} onChange={e => this.onChangeNode(e, 'NAME_KOR')} />
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="v2">카테고리 명(ENG)</label>
                      </th>
                      <td>
                        <Input name="NAME_ENG" value={isAdd ? addNodeInfo.NAME_ENG : selectedNode.NAME_ENG} onChange={e => this.onChangeNode(e, 'NAME_ENG')} />
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="v2">카테고리 명(CHN)</label>
                      </th>
                      <td>
                        <Input name="NAME_CHN" value={isAdd ? addNodeInfo.NAME_CHN : selectedNode.NAME_CHN} onChange={e => this.onChangeNode(e, 'NAME_CHN')} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </StyleCategoryForm>
            </div>
            <div className="buttonWrapper">
              <Link to="/admin/adminmain/classify/rootmap">
                <Button type="default" size="large" icon="unordered-list">
                  목록으로
                </Button>
              </Link>
              {isAdd ? (
                <Button type="primary" htmlType="submit" size="large">
                  추가
                </Button>
              ) : (
                <Button type="primary" htmlType="submit" size="large">
                  저장
                </Button>
              )}
            </div>
          </form>
        </div>
        <Footer />
      </StyleCategory>
    );
  }
}

CategoryMap.propTypes = {
  match: PropTypes.object.isRequired,
  rootMapList: PropTypes.array.isRequired,
  categoryMapList: PropTypes.array.isRequired,
  getRootMapList: PropTypes.func.isRequired,
  getCategoryMapList: PropTypes.func.isRequired,
  setCategoryMapList: PropTypes.func.isRequired,
  selectedNode: PropTypes.object.isRequired,
  setSelectedNode: PropTypes.func.isRequired,
  addCategoryMap: PropTypes.func.isRequired,
  updateCategoryMap: PropTypes.func.isRequired,
  deleteCategoryMap: PropTypes.func.isRequired,
  isAdd: PropTypes.bool.isRequired,
  setIsAdd: PropTypes.func.isRequired,
  initAddNodeInfo: PropTypes.func.isRequired,
  addNodeInfo: PropTypes.object.isRequired,
  setAddNodeInfo: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  rootMapList: selectors.makeRootMapList(),
  categoryMapList: selectors.makeCategoryMapList(),
  selectedNode: selectors.makeSelectedNode(),
  isAdd: selectors.makeIsAdd(),
  addNodeInfo: selectors.makeAddNodeInfo(),
});

const mapDispatchToProps = dispatch => ({
  getRootMapList: payload => dispatch(actions.getRootMapList(payload)),
  getCategoryMapList: payload => dispatch(actions.getCategoryMapList(payload)),
  setCategoryMapList: categoryMapList => dispatch(actions.setCategoryMapList(categoryMapList)),
  setSelectedNode: selectedNode => dispatch(actions.setSelectedNode(selectedNode)),
  addCategoryMap: categoryMap => dispatch(actions.addCategoryMap(categoryMap)),
  updateCategoryMap: categoryMap => dispatch(actions.updateCategoryMap(categoryMap)),
  deleteCategoryMap: categoryMap => dispatch(actions.deleteCategoryMap(categoryMap)),
  setIsAdd: isAdd => dispatch(actions.setIsAdd(isAdd)),
  initAddNodeInfo: () => dispatch(actions.initAddNodeInfo()),
  setAddNodeInfo: nodeInfo => dispatch(actions.setAddNodeInfo(nodeInfo)),
});

const withReducer = injectReducer({ key: 'containers.admin.AdminMain.Classify.CategoryMap', reducer });
const withSaga = injectSaga({ key: 'containers.admin.AdminMain.Classify.CategoryMap', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(CategoryMap);
