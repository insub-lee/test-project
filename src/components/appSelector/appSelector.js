import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { intlObj } from 'utils/commonUtils';
import { Button, Row, Col } from 'antd';
import { createStructuredSelector } from 'reselect';
import Draggable from 'react-draggable';

import messages from '../../components/Page/messages';
import { BtnDkGray, BtnLgtGray } from '../../containers/store/components/uielements/buttons.style';
import StyleModal from '../../containers/portal/components/Modal/StyleModal';
import StyleQuickmenuContent from './StyleModalQuickmenu';
import StyleSelectedApps from './StyleSelectedApps';
import Input from '../../components/Input';
import basicStyle from '../../config/basicStyle';
import Tree from './Tree';
import CategoryGrid from './categoryGrid';
import SelectedCategory from './selectedCategory';
import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import { makeCheckBoxStat, makeAppTree, makeAppCategoryList } from './selectors';
import { loadTree, resetCheckbox, searchCategory, resetCategory, loadCategoryList } from './actions';
import reducer from './reducer';
import saga from './saga';

const { rowStyle, colStyle, gutter } = basicStyle;

let categoryList = [];
let pageNum = 20;
const pageIndex = 10;

class AppTree extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCategory: [],
      saveCategoryList: [],
      // cselectedCategory: [],
      complete: false,
      checkAll: false,
      catID: [],
    };

    this.props.loadTree();

    this.onClickNode = this.onClickNode.bind(this);
    this.onLoadCategory = this.onLoadCategory.bind(this);
    this.addCategory = this.addCategory.bind(this);
    this.onSaveCategory = this.onSaveCategory.bind(this);
    this.deleteCategoryList = this.deleteCategoryList.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.changeInputKeyword = this.changeInputKeyword.bind(this);
    this.paging = this.paging.bind(this);
    // this.onModal = this.onModal.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.appTree.length > 0) {
      this.setState({ appTree: nextProps.appTree });
    }
  }

  onClickNode(node) {
    const type = this.props.type;
    pageNum = 30;
    this.props.loadCategoryList(node.key, type, pageNum);
  }

  onLoadCategory(selectedList) {
    if (selectedList.length > 0) {
      if (this.state.saveCategoryList.length > 0) {
        categoryList = this.state.saveCategoryList.slice();
        for (let i = 0; i < selectedList.length; i += 1) {
          const idx = this.state.saveCategoryList
            .findIndex(a => a.APP_ID === selectedList[i].APP_ID);

          if (idx === -1) {
            categoryList.push(selectedList[i]);
          }
        }

        this.setState({ selectedCategory: categoryList });
      } else {
        categoryList = selectedList;

        this.setState({ selectedCategory: categoryList });
      }
    } else {
      const selectCat = this.state.saveCategoryList.slice();

      this.setState({ selectedCategory: selectCat });
    }
  }

  onSaveCategory() {
    this.props.addList(this.state.saveCategoryList);
    this.setState({ saveCategoryList: [], selectedCategory: [] });
    categoryList = [];
    this.props.resetCategory();
    this.props.closeModal();
  }

  // onModal() {
  //   this.setState({ show: true });
  // }

  closeModal() {
    this.setState({ saveCategoryList: [], selectedCategory: [] });

    categoryList = [];

    this.props.resetCategory();
    this.props.closeModal();
  }

  changeInputKeyword(e) {
    const type = this.props.type;
    pageNum = 10;

    if (e.target.value.trim() !== '' && e.keyCode === 13) {
      this.props.searchCategory(e.target.value, type, pageNum);
      // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', e.target.value)
      // this.setState({
      //   loadingCountSearch: 1,
      //   scrollTopFlag: true,
      // });
    }
  }

  initializeSearchInput = () => {
    this.searchInputCategory.firstChild.value = '';
  }

  addCategory() {
    let saveList = [];

    if (this.state.selectedCategory.length === 0) {
      saveList = this.state.saveCategoryList.slice();
    } else {
      saveList = this.state.selectedCategory.slice();
      this.props.resetCheckbox(true);
    }
    // categoryList = saveList;

    this.setState({ saveCategoryList: saveList });
  }

  deleteCategoryList(deleteCategory, stat) {
    const catID = [];
    // const cselectedCategory = this.state.selectedCategory.slice();

    for (let i = 0; i < deleteCategory.length; i += 1) {
      // const result = cselectedCategory.findIndex(a => a.APP_ID === deleteCategory[i]);
      catID.push(deleteCategory[i]);
      // cselectedCategory.splice(result, 1);
    }

    this.setState({ catID, complete: false });

    if (stat === 'All') {
      this.setState({ checkAll: true });
    } else if (stat === 'nAll') {
      this.setState({ checkAll: false });
    }

    if (deleteCategory.length === this.state.saveCategoryList.length) {
      this.setState({ checkAll: true });
    } else {
      this.setState({ checkAll: false });
    }
  }

  deleteCategory() {
    if (this.state.saveCategoryList.length > 0) {
      for (let i = 0; i < this.state.catID.length; i += 1) {
        const idx = this.state.saveCategoryList.findIndex(a => a.APP_ID === this.state.catID[i]);
        delete this.state.saveCategoryList[idx].checked2;
        this.state.saveCategoryList.splice(idx, 1);
      }
      categoryList = this.state.saveCategoryList.slice();

      this.setState({
        saveCategoryList: categoryList, complete: true, catID: [], checkAll: false,
      });
    }

    if (this.state.selectedCategory.length !== 0) {
      this.props.resetCheckbox(true);
    }

    this.setState({ selectedCategory: [] });
  }

  paging() {
    const type = 'widget';
    pageNum += pageIndex;
    this.props.loadCategoryList(this.state.nodeKey, type, pageNum);
  }

  render() {
    const customstyle = {
      content: {
        // width: 1100,
        // height: 650,
        // top: '50%',
        // left: '50%',
        // transform: 'translate(-50%, -50%)',
      },
    };

    return (
      <div>
        <Modal
          isOpen={this.props.show}
          closeModal={this.closeModal}
          // style={customstyle}
          contentLabel={intlObj.get(messages.addWidget)}
          shouldCloseOnOverlayClick={false}
          portalClassName="portalCommonModal"
          ariaHideApp={false}
        >
          <Draggable
            handle="h2.modalTitle"
          >
            <StyleModal className="modalWrapper" style={{ width: 1100, height: 650, marginTop: '-325px', marginLeft: '-550px' }}>
              <h2 className="modalTitle" style={{ cursor: "move" }}>
                {intlObj.get(messages.addWidget)}
                <Button className="modalClose" onClick={this.closeModal} />
              </h2>
              <StyleQuickmenuContent className="modalContents quickmenu">
                <Row style={rowStyle} gutter={gutter} className="innerBody">
                  <Col xl={16} style={colStyle} className="leftActivity">
                    <div className="treeWrapper">
                      <h3 className="secTitle">{intlObj.get(messages.categoryList)}</h3>
                      <Tree
                        treeData={this.state.appTree}
                        onClick={this.onClickNode}
                        initializeSearchInput={this.initializeSearchInput}
                      />
                    </div>
                    <div
                      className="userGridResult"
                    >
                      <div className="userSearch">
                        <div className="inputWrapper" ref={(ref) => { this.searchInputCategory = ref; }}>
                          <Input
                            placeholder={intlObj.get(messages.seacrhText)}
                            onKeyUp={this.changeInputKeyword}
                          // name='searchInput'
                          />
                          <Button className="searchButton" />
                        </div>
                      </div>
                      {this.props.categoryList.length > 0 ?
                        <CategoryGrid
                          categoryList={this.props.categoryList}
                          onLoadCategory={this.onLoadCategory}
                          checkBoxStat={this.props.checkBoxStat}
                          resetCheckbox={this.props.resetCheckbox}
                        />
                        :
                        <p style={{ textAlign: 'center' }}>{intlObj.get(messages.noApp)}</p>
                      }
                    </div>
                    <Button className="inBtn" onClick={this.addCategory} />
                    <Button className="outBtn" onClick={this.deleteCategory} />
                  </Col>
                  <Col xl={8} style={colStyle} className="rightActivity" >
                    <StyleSelectedApps>
                      <SelectedCategory
                        selectedList={this.state.saveCategoryList}
                        deleteCategoryList={this.deleteCategoryList}
                        complete={this.state.complete}
                        checkAll={this.state.checkAll}
                        pageNum={pageNum}
                        paging={this.paging}
                      />
                    </StyleSelectedApps>
                  </Col>
                </Row>
              </StyleQuickmenuContent>
              <div className="modalFooter">
                <BtnLgtGray onClick={this.closeModal}>{intlObj.get(messages.cancel)}</BtnLgtGray>
                <BtnDkGray onClick={this.onSaveCategory}>{intlObj.get(messages.save)}</BtnDkGray>
              </div>
            </StyleModal>
          </Draggable>
        </Modal>
      </div>
    );
  }
}

AppTree.propTypes = {
  loadTree: PropTypes.func.isRequired,
  loadCategoryList: PropTypes.func.isRequired,
  addList: PropTypes.func.isRequired,
  resetCategory: PropTypes.func.isRequired,
  searchCategory: PropTypes.func.isRequired,
  resetCheckbox: PropTypes.func.isRequired,
  appTree: PropTypes.array.isRequired,
  checkBoxStat: PropTypes.bool.isRequired,
  categoryList: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  checkBoxStat: makeCheckBoxStat(),
  appTree: makeAppTree(),
  categoryList: makeAppCategoryList(),
});

export function mapDispatchToProps(dispatch) {
  return {
    resetCheckbox: check => dispatch(resetCheckbox(check)),
    searchCategory: (keyword, type, num) => dispatch(searchCategory(keyword, type, num)),
    resetCategory: () => dispatch(resetCategory()),
    loadTree: () => dispatch(loadTree()),
    loadCategoryList: (node, type, num) => dispatch(loadCategoryList(node, type, num)),
  };
}

const withReducer = injectReducer({ key: 'atree', reducer });
const withSaga = injectSaga({ key: 'atree', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withConnect,
  withSaga,
)(AppTree);
