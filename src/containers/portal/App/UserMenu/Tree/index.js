import React, { Component } from 'react';
import { SortableTreeWithoutDndContext as SortableTree } from '../../../components/Organization/resource/react-sortable-tree';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { lang } from 'utils/commonUtils';
import Input from 'components/Input';
import Widget from 'components/appSetting';
import ScrollBar from 'react-custom-scrollbars';
import { ModalContainer, ModalRoute } from 'react-router-modal';

import 'react-router-modal/css/react-router-modal.css';

import CustomTheme from './theme';
import { Badge, Button, Switch, Tooltip } from 'antd';
import './app.css';
// import StoreTree from '../StoreTree';
import icon_store from 'images/portal/icon-store.png';
import nextIcon from 'images/portal/icon-store.png';
import icon_unlock from 'images/portal/icon-unlock.png';
import icon_lock from 'images/portal/icon_lock.png';
import IconGo from 'images/portal/icon_go.png';
import TreeWrapper from './TreeWrapper';
import MyPageTree from '../../UserStore/components/MyPageTree';

import Main from '../../UserStore/AppMain/MyPage/Main';
import AppInfo from '../../UserStore/AppMain/MyPage/AppInfo';
import PageInfo from '../../UserStore/AppMain/MyPage/PageInfo';
import AppBizModal from '../../UserStore/AppMain/MyPage/AppBizModal';
import BizDetail from '../../UserStore/AppMain/Biz/BizDetail';
import BizMenuList from '../../UserStore/AppMain/Biz/BizMenuList';

class Tree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFoundCount: 1,
      searchFocusIndex: 0,
      searchString: '',
      editTree: false,
      editMenuMode: false,
    };

    this.updateTreeData = _.debounce(this.updateTreeData.bind(this), 300);
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.treeData.length === 0) {
      return false;
    }
    return true;
  }
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.treeData && nextProps.treeData.length > 0) {
  //     this.setState({
  //       treeData: nextProps.treeData,
  //       selectedIndex: nextProps.selectedIndex,
  //     });
  //   } else {
  //     this.setState({
  //       treeData: [],
  //     });
  //   }
  // }
  setSearchString = value => {
    this.setState({
      searchString: value,
    });
  };

  updateTreeData = treeData => {
    this.props.saveData(null, treeData);
  };

  onSetEditClick = () => {
    this.setState({
      editTree: !this.state.editTree,
      editMenuMode: !this.state.editMenuMode,
    });
  };

  handleTreeOnClick = node => {
    changeSelectedIndex(node.key);

    if (node.NODE_TYPE !== 'F') {
      const url = getUrl(node);
      history.push(url);
      window.scrollTo(0, 0);
    }
  };

  render() {
    const {
      // treeData,
      searchFocusIndex,
      searchString,
      searchFoundCount,
      editTree,
      editMenuMode,
    } = this.state;

    const { treeData, execMenu, execPage, selectedIndex, saveData, showNoti, editMenu } = this.props;

    const customSearchMethod = ({ node, searchQuery }) =>
      searchQuery &&
      // 스페이스 제거(lang.get('NAME', node).toLowerCase()).replace(" ", "").indexOf((searchQuery.toLowerCase()).replace(" ","")) > -1;
      lang
        .get('NAME', node)
        .toLowerCase()
        .indexOf(searchQuery.toLowerCase()) > -1;
    return (
      <TreeWrapper>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: `calc(100vh - 45px ${showNoti ? '- 32px' : ''})`,
            width: '100%',
          }}
        >
          <div className="searchWrapper">
            <Input
              type="text"
              value={searchString}
              placeholder="메뉴에서 My App을 검색하세요."
              onChange={event => {
                this.setSearchString(event.target.value);
              }}
              readOnly={editTree}
              autoComplete="off"
            />
            <Button className="searchBtn" title="찾기" />
            <div className="myMenuEdit" style={{ textAlign: 'center' }}>
              {/* <Link to="/store" className="storeLink" style={{ padding: '10px' }} title="Biz스토어" target="_blank">
                <img src={icon_store} alt="Biz스토어 바로가기" title="Biz스토어 바로가기" />
              </Link> */}
              <img onClick={this.onSetEditClick} src={editMenuMode ? icon_unlock : icon_lock} alt="메뉴수정" title="메뉴수정" />
            </div>
            {/* <Button className="myMenuEdit" onClick={this.onSetEditClick} title="메뉴수정" /> */}
          </div>
          <div className="searchResult" style={{ display: searchString.trim().length === 0 ? 'none' : 'block' }}>
            {this.tree !== undefined && !editTree ? (
              <div className="searchResultMessage" style={{ display: this.tree !== null && this.tree.state.searchMatches.length !== 0 ? 'none' : 'block' }}>
                <span>해당 내용 검색결과가 없습니다. Biz Store로 이동하시겠습니까?</span>
                <Link to={`/portal/store/appMain/bizStore/app/search/${searchString}`} className="storeLink" title="스토어 홈 바로가기" target="_blank">
                  <img src={IconGo} style={{ paddingLeft: '7px', marginTop: '-2px' }} className="nextIcon" alt="스토어 홈 바로가기" />
                </Link>
              </div>
            ) : (
              <div />
            )}
          </div>
          {this.state.editTree ? (
            <div style={{ padding: '10px' }}>
              <MyPageTree
                treeData={this.props.myAppStoreTreeData}
                moveNode={this.props.moveNode}
                updateMymenuDisp={this.props.updateMymenuDisp}
                showNoti={this.props.showNoti}
                // selectedIndex={selectedIndex}
                onClick={this.handleTreeOnClick}
                canDrag={true}
                canDrop={true}
                // insertNode={insertNode}
                // updateNode={updateNode}
                // saveData={saveData}
                // moveNode={moveNode}
                // deleteNode={deleteNode}
                // history={history}
              />
              <ModalRoute path="/store/appMain/myPage/widgetsetting/:PAGE_ID/:WIDGET_ID" component={Widget} outDelay={1200} />
              <ModalContainer />
              <div className="myPageContentWrapper">
                <Route path="/portal/store/appMain/myPage" component={Main} exact />
                <Route path="/portal/store/appMain/myPage/app/:APP_ID" component={AppInfo} exact />
                <Route path="/portal/store/appMain/myPage/page/:PAGE_ID" component={PageInfo} exact />
                <Route path="/portal/store/appMain/myPage/modal" component={AppBizModal} />
                <Route path="/portal/store/appMain/myPage/biz/detail/:type/:BIZGRP_ID" component={BizDetail} />
                <Route path="/portal/store/appMain/myPage/biz/menulist/:BIZGRP_ID" component={BizMenuList} />
              </div>
            </div>
          ) : (
            <div
              className="treeBox"
              style={{
                flex: '1 0 50%',
                padding: '10px 0 0 10px',
              }}
            >
              <ScrollBar style={{ width: 350, height: '100%' }} autoHide autoHideTimeout={1000} autoHideDuration={200}>
                <SortableTree
                  theme={CustomTheme}
                  treeData={treeData}
                  onChange={treeData => this.updateTreeData(treeData)}
                  searchMethod={customSearchMethod}
                  searchQuery={searchString}
                  searchFocusOffset={searchFocusIndex}
                  style={{ display: 'inline-block', width: '100%', height: '100%', overflow: 'visible' }}
                  isVirtualized={false}
                  generateNodeProps={({ node }) => {
                    node.active = node.key === selectedIndex;
                    const handleOnClick = () => {
                      if (node.TARGET === 'NEW') {
                        window.open(node.URL, node.MENU_ID, 'width=1280, height=720, toolbar=yes, resizable=yes, menubar=yes, status=yes, location=yes');
                        execMenu(node.PAGE_ID, node.TARGET);
                      } else {
                        this.props.onClick(node);
                        if (node.NODE_TYPE !== 'F' && node.APP_YN !== 'F') {
                          execPage(node, 'execMenu');
                        }
                      }
                      saveData(node, treeData);
                    };
                    return {
                      title: (
                        <button className={`${node.active ? 'active' : ''}`} onClick={handleOnClick} style={{ cursor: 'pointer' }}>
                          {lang.get('NAME', node)}
                          <Badge count={node.UNREAD_CNT !== undefined ? node.UNREAD_CNT : ''} overflowCount={99} className="inTree" />
                        </button>
                      ),
                    };
                  }}
                  rowHeight={35}
                  scaffoldBlockPxWidth={22}
                  className="sortableTreeWrapper sidebar CustomSCRB"
                  ref={ref => {
                    this.tree = ref;
                  }}
                  // onlyExpandSearchedNodes={true}
                />
              </ScrollBar>
            </div>
          )}
        </div>
      </TreeWrapper>
    );
  }
}
Tree.propTypes = {
  treeData: PropTypes.array, //eslint-disable-line
  selectedIndex: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  showSearchBox: PropTypes.bool,
  execMenu: PropTypes.func.isRequired,
  execPage: PropTypes.func.isRequired,
  menuName: PropTypes.string.isRequired,
  handleSetMenuNameSelectedIndex: PropTypes.func.isRequired,
  saveData: PropTypes.func.isRequired,
  showNoti: PropTypes.bool.isRequired,
  // 수정모드일때 사용하는 func, type 정의
  selectedIndex: PropTypes.number.isRequired,
};

Tree.defaultProps = {
  onClick: [],
  showSearchBox: false,
};

export default Tree;
