import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { intlObj } from 'utils/commonUtils';
import { Button, Row, Col } from 'antd';
import { createStructuredSelector } from 'reselect';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import messages from '../Page/messages';
import StyleModal from '../../containers/portal/components/Modal/StyleModal';
import StyleQuickmenuContent from './StyleModalQuickmenu';
import StyleSelectedApps from './StyleSelectedApps';
import Input from '../Input';
import basicStyle from '../../config/basicStyle';
import Tree from './Tree';
import CategoryGrid from './categoryGrid';
import SelectedCategory from './selectedCategory';
import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import { makeCheckBoxStat, makeAppTree, makeAppCategoryList, makeAppList } from './selectors';
import {
  loadTree,
  resetCheckbox,
  searchCategory,
  resetCategory,
  loadCategoryList,
  deleteAppList,
  onLoadBAppList,
  deleteAppBizList,
  onLoadBizAppList,
} from './actions';
import reducer from './reducer';
import saga from './saga';

const { colStyle, gutter } = basicStyle;

let categoryList = [];
let pageNum = 20;
const pageIndex = 10;

class AppTreePortal extends Component {
  constructor(props) {
    super(props);

    const { item, widgetID, type } = this.props;

    this.props.loadTree();

    if (type === 'mypage') {
      this.props.onLoadBAppList(Number(item.WIDGET_ID));
    } else {
      this.props.onLoadBizAppList(Number(item.WIDGET_ID));
    }

    this.state = {
      selectedCategory: [],
      saveCategoryList: [],
      categoryList: [],
      complete: false,
      de: false,
      checkGrid: [],
      // appList: [],
    };

    this.onClickNode = this.onClickNode.bind(this);
    this.onLoadCategory = this.onLoadCategory.bind(this);
    this.addCategory = this.addCategory.bind(this);
    this.onSaveCategory = this.onSaveCategory.bind(this);
    this.deleteCategoryList = this.deleteCategoryList.bind(this);
    this.changeInputKeyword = this.changeInputKeyword.bind(this);
    this.comList = this.comList.bind(this);
    this.paging = this.paging.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { appList, categoryList, appTree } = nextProps;

    if (appList.length !== undefined || categoryList.length !== undefined) {
      return true;
    }
    return false;
  }

  onClickNode(node) {
    const type = 'menu';
    pageNum = 10;
    this.props.loadCategoryList(node.key, type, pageNum);

    this.setState({ nodeKey: node.key });

    if (this.state.selectedCategory.length > 0 && this.state.nodeKey !== node.key && this.state.checkGrid.length > 0) {
      this.props.resetCheckbox(true);
      this.state.selectedCategory = [];
    }
  }

  onLoadCategory(selectedList) {
    this.setState({ checkGrid: selectedList });

    if (selectedList.length > 0) {
      if (this.state.saveCategoryList.length > 0) {
        this.state.categoryList = this.state.saveCategoryList.slice();
        for (let i = 0; i < selectedList.length; i += 1) {
          const idx = this.state.saveCategoryList.findIndex(a => a.APP_ID === selectedList[i].APP_ID);

          if (idx === -1) {
            this.state.categoryList.push(selectedList[i]);
          }
        }

        this.setState({ selectedCategory: this.state.categoryList });
      } else {
        this.state.categoryList = selectedList;

        this.setState({ selectedCategory: this.state.categoryList });
      }
    } else {
      const selectCat = this.state.saveCategoryList.slice();

      this.setState({ selectedCategory: selectCat });
    }
  }

  onSaveCategory(saveList) {
    categoryList = [];
    // this.props.resetCategory();
    const { type } = this.props;
    const list = [];

    for (let i = 0; i < saveList.length; i += 1) {
      const newList = {};

      newList.app_ID = saveList[i].APP_ID;
      newList.image = saveList[i].ICON;
      newList.method = 'get';
      newList.param = '';
      newList.title = saveList[i].NAME_KOR;
      newList.url = '';
      newList.PAGE_ID = saveList[i].PAGE_ID;
      newList.TARGET = saveList[i].TARGET;
      newList.SRC_PATH = saveList[i].SRC_PATH;

      list.push(newList);
    }

    const result = {};
    const widget = this.props.item;
    const widgetID = widget.WIDGET_ID;
    const pageID = widget.PAGE_ID;

    result.size = widget.size;
    result.sizeArr = widget.sizeArr;
    result.user = {};
    result.user.isTitle = widget.user.isTitle;
    result.user.skin = widget.user.skin;
    result.data = list;
    // result.app_ID = 4;
    // result.widget_ID = 31;

    const item = JSON.stringify(result);

    if (type === 'mypage') {
      this.props.deleteAppList(item, widgetID, pageID);
    } else {
      this.props.deleteAppBizList(item, widgetID, pageID);
      this.props.updateBizGroupChgYn();
    }

    this.setState({ saveCategoryList: saveList, selectedCategory: [], de: true });
  }

  comList(list) {
    this.setState({ saveCategoryList: list });
  }

  changeInputKeyword(e) {
    if (e.target.value.trim() !== '' && e.keyCode === 13) {
      this.props.searchCategory('menu', 10, e.target.value);
    }
  }

  initializeSearchInput = () => {
    this.searchInputCategory.firstChild.value = '';
  };

  addCategory() {
    let saveList = [];

    if (this.state.selectedCategory.length === 0) {
      saveList = this.state.saveCategoryList.slice();
      this.props.resetCheckbox(false);
    } else {
      saveList = this.state.selectedCategory.slice();
      for (let i = 0; i < this.props.appList.length; i += 1) {
        const idx = saveList.findIndex(t => t.APP_ID === this.props.appList[i].APP_ID);
        if (idx === -1) {
          saveList.push(this.props.appList[i]);
        }
      }

      this.props.resetCheckbox(true);
    }

    this.setState({ saveCategoryList: saveList, selectedCategory: [] });

    this.onSaveCategory(saveList);

    if (this.state.selectedCategory.length > 0) {
      message.success(<MessageContent>추가하였습니다.</MessageContent>, 3);
    } else {
      message.error(<MessageContent>선택된 앱이 없습니다.</MessageContent>, 3);
    }
  }

  deleteCategoryList(deleteCategory) {
    if (this.state.saveCategoryList.length > 0 && deleteCategory !== 'ALL') {
      const idx = this.state.saveCategoryList.findIndex(a => a.APP_ID === deleteCategory);
      this.state.saveCategoryList.splice(idx, 1);

      categoryList = this.state.saveCategoryList.slice();

      this.setState({
        saveCategoryList: categoryList,
        complete: true,
      });
    } else if (this.state.saveCategoryList.length === 0 && deleteCategory !== 'ALL') {
      const pList = this.props.appList.slice();
      const idx = pList.findIndex(a => a.APP_ID === deleteCategory);
      pList.splice(idx, 1);

      categoryList = pList.slice();

      this.setState({
        saveCategoryList: categoryList,
        complete: true,
      });
    }

    if (deleteCategory === 'ALL') {
      // categoryList: [];

      this.setState({
        saveCategoryList: [],
        complete: true,
      });
    }
    if (this.state.selectedCategory.length > 0) {
      this.props.resetCheckbox(true);
    }

    this.setState({ selectedCategory: [] });

    this.onSaveCategory(categoryList);
  }

  paging() {
    const type = 'menu';
    pageNum += pageIndex;
    this.props.loadCategoryList(this.state.nodeKey, type, pageNum);
  }

  render() {
    const { appList, categoryList } = this.props;
    const style = {
      display: 'flex',
      height: 'calc(100% - 58px)',
      justifyContent: 'center',
      alignItems: 'center',
    };

    const RenderCategoryView = categoryList => {
      if (categoryList.size === undefined || categoryList.length !== undefined) {
        if (categoryList.length !== 0) {
          return (
            <CategoryGrid
              categoryList={categoryList}
              onLoadCategory={this.onLoadCategory}
              checkBoxStat={this.props.checkBoxStat}
              resetCheckbox={this.props.resetCheckbox}
              pageNum={pageNum}
              paging={this.paging}
            />
          );
        }
        if (categoryList.length === 0) {
          return (
            <div style={style} className="noContentWrapper">
              <span>
                <span className="noContentIcon" />
                {intlObj.get(messages.noApp)}
              </span>
            </div>
          );
        }
      }
    };

    return (
      <div>
        <StyleModal className="modalWrapper inPage">
          <StyleQuickmenuContent className="modalContents quickmenu">
            <Row gutter={gutter} className="innerBody">
              <Col xl={16} style={colStyle} className="leftActivity">
                <div className="treeWrapper">
                  <h3 className="secTitle">{intlObj.get(messages.categoryList)}</h3>
                  <Tree treeData={this.props.appTree} onClick={this.onClickNode} initializeSearchInput={this.initializeSearchInput} />
                </div>
                <div className="userGridResult">
                  <div className="userSearch">
                    <div
                      className="inputWrapper"
                      ref={ref => {
                        this.searchInputCategory = ref;
                      }}
                    >
                      <Input
                        placeholder={intlObj.get(messages.seacrhText)}
                        onKeyUp={this.changeInputKeyword}
                        // name='searchInput'
                      />
                      <Button className="searchButton" />
                    </div>
                  </div>
                  {RenderCategoryView(categoryList)}
                </div>
                <Button className="inBtn" onClick={this.addCategory} />
                {/* <Button className="outBtn" onClick={this.deleteCategory} /> */}
              </Col>
              <Col xl={8} style={colStyle} className="rightActivity">
                <StyleSelectedApps>
                  {/* {appList.size === undefined ? */}
                  <SelectedCategory
                    selectedList={this.state.saveCategoryList}
                    deleteCategoryList={this.deleteCategoryList}
                    complete={this.state.complete}
                    appList={appList}
                    comList={this.comList}
                    de={this.state.de}
                    onSaveCategory={this.onSaveCategory}
                  />
                  {/* :
                    false
                  } */}
                </StyleSelectedApps>
              </Col>
            </Row>
          </StyleQuickmenuContent>
        </StyleModal>
      </div>
    );
  }
}

AppTreePortal.propTypes = {
  loadTree: PropTypes.func.isRequired,
  loadCategoryList: PropTypes.func.isRequired,
  onLoadBAppList: PropTypes.func.isRequired,
  searchCategory: PropTypes.func.isRequired,
  resetCheckbox: PropTypes.func.isRequired,
  appTree: PropTypes.array.isRequired,
  checkBoxStat: PropTypes.bool.isRequired,
  // categoryList: PropTypes.object.isRequired,
  // appList: PropTypes.arrayOf(PropTypes.number).isRequired,
  deleteAppList: PropTypes.func.isRequired,
  deleteAppBizList: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  checkBoxStat: makeCheckBoxStat(),
  appTree: makeAppTree(),
  categoryList: makeAppCategoryList(),
  appList: makeAppList(),
});

export function mapDispatchToProps(dispatch) {
  return {
    resetCheckbox: check => dispatch(resetCheckbox(check)),
    searchCategory: (type, num, keyword) => dispatch(searchCategory(type, num, keyword)),
    resetCategory: () => dispatch(resetCategory()),
    loadTree: () => dispatch(loadTree()),
    loadCategoryList: (node, type, num) => dispatch(loadCategoryList(node, type, num)),
    deleteAppList: (list, widgetID, pageID) => dispatch(deleteAppList(list, widgetID, pageID)),
    deleteAppBizList: (list, widgetID, pageID) => dispatch(deleteAppBizList(list, widgetID, pageID)),
    onLoadBAppList: id => dispatch(onLoadBAppList(id)),
    onLoadBizAppList: id => dispatch(onLoadBizAppList(id)),
  };
}

const withReducer = injectReducer({ key: 'atreeportal', reducer });
const withSaga = injectSaga({ key: 'atreeportal', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withReducer, withSaga, withConnect)(AppTreePortal);
