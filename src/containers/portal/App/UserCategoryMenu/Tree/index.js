import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import ScrollBar from 'react-custom-scrollbars';
import { AutoSizer } from 'react-virtualized';

import { Badge } from 'antd';

import IconGo from 'images/portal/icon_go.png';
import { lang } from 'utils/commonUtils';
import { InputSearch } from 'components/Input';

import { basicPath } from 'containers/common/constants';
import CustomTheme from './theme';
import TreeWrapper from './TreeWrapper';
import MyPage from '../../UserStore/AppMain/MyPage';
import { SortableTreeWithoutDndContext as SortableTree } from './SortableMenuTree/react-sortable-tree';
import IconCollection from '../../../../../components/IconCollection';

const features = 'width=1280, height=720, toolbar=yes, resizable=yes, menubar=yes, status=yes, location=yes';

const customSearchMethod = ({ node, searchQuery }) =>
  searchQuery &&
  // 스페이스 제거(lang.get('NAME', node).toLowerCase()).replace(" ", "").indexOf((searchQuery.toLowerCase()).replace(" ","")) > -1;
  lang
    .get('NAME', node)
    .toLowerCase()
    .indexOf(searchQuery.toLowerCase()) > -1;

class Tree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // searchFoundCount: 1,
      searchFocusIndex: 0,
      searchString: '',
      editTree: false,
      editMenuMode: false,
      prevUrl: props.history.location.pathname,
    };

    this.updateTreeData = debounce(this.updateTreeData.bind(this), 300);
  }
  /* eslint-disable */
  onSetEditClick = () => {
    event.stopPropagation();
    if (this.state.editMenuMode && this.state.prevUrl !== this.props.history.location.pathname) {
      this.setState({
        prevUrl: this.props.history.location.pathname,
      });

      this.props.history.push('/');
    }

    this.setState(prevState => ({
      editTree: !prevState.editTree,
      editMenuMode: !prevState.editMenuMode,
    }));
  };

  setSearchString = value => {
    this.setState({
      searchString: value,
    });
  };

  updateTreeData = treeData => {
    this.props.saveData(null, treeData);
  };

  handleShowAllBizMenuClick = () => {
    console.debug('>>>>>>>>>통합업무 메뉴 클릭');
  };

  handleClickMenuFolder = node => {
    event.stopPropagation();
    console.debug('>>>>>>>this.node: ', node);
    const menuType = node.REF_TYPE === 'B' ? 'bizMenu' : 'myMenu';
    if (node.LVL === 1) {
      this.props.history.push(`/${basicPath.PORTAL}/card/${menuType}/list/${node.MENU_ID}`);
    } else if (node.MENU_EXIST_YN === 'Y') {
      this.props.history.push(`/${basicPath.PORTAL}/card/${menuType}/detail/info/${node.REF_ID}`);
    } else {
      this.props.history.push(`/${basicPath.PORTAL}/card/${menuType}/detail/info/${node.BIZGRP_ID}`);
    }
  };

  clickEvent = node => {
    event.stopPropagation();
    const { treeData, execPage, execMenu, onClick, saveData } = this.props;
    if (node.TARGET === 'NEW') {
      window.open(node.URL, node.MENU_ID, features);
      execMenu(node.PAGE_ID, node.TARGET);
    } else if (node.NODE_TYPE === 'F' && node.APP_YN === 'F') {
      // 폴더 클릭 이벤트
      this.handleClickMenuFolder(node);
    } else {
      // onClick(node);
      if (node.NODE_TYPE !== 'F' && node.APP_YN !== 'F') {
        execPage(node, 'execMenu');
      }
    }
    saveData(node, treeData);
  };

  generateNodeProps = ({ node }) => {
    const { selectedIndex } = this.props;
    const nodeData = { ...node, active: node.key === selectedIndex };
    let menuIconClassName = 'icon-workCard';
    if(node.MENU_NODE_TYPE === 'BIZ') { // 업무폴더일 경우
      menuIconClassName = 'icon-workCard';
    } else if(node.MENU_NODE_TYPE === 'FLD') { // 일반 폴더일 경우
      menuIconClassName = 'icon-workFolder';
    } else { // 그 외
      menuIconClassName = 'icon-pen';
    }

    return {
      title: (
        <button
          type="button"
          className={`${nodeData.active ? 'active' : ''}`}
          onClick={e => {
            e.stopPropagation();
            this.clickEvent(node);
          }}
          style={{ cursor: 'pointer' }}
        >
          {/* 업무 메뉴에서 일반폴더 와 업무폴더일 경우 아이콘으로 분류  */}
          <IconCollection className={menuIconClassName} />
          {lang.get('NAME', nodeData)}
          <Badge count={nodeData.UNREAD_CNT !== undefined ? nodeData.UNREAD_CNT : ''} overflowCount={99} className="inTree" />
        </button>
      ),
    };
  };

  render() {
    const { searchFocusIndex, searchString, editTree, editMenuMode } = this.state;

    const { treeData, showNoti, history } = this.props;
    console.debug();
    return (
      <TreeWrapper>
        <div className={`tree-contents ${showNoti ? 'show-noti' : ''}`}>
          <div className="search-box">
            <div className="searchWrapper">
              <InputSearch
                type="text"
                size="small"
                value={searchString}
                placeholder="메뉴에서 My App을 검색하세요."
                onChange={event => {
                  this.setSearchString(event.target.value);
                }}
                readOnly={editTree}
                autoComplete="off"
              />
            </div>
            <div className="myMenuEdit">
              <button type="button" onClick={this.onSetEditClick} title="메뉴수정">
                <i className={`${editMenuMode ? 'fa fa-unlock' : 'fa fa-lock'}`} />
              </button>
            </div>
          </div>
          <div className="searchResult" style={{ display: searchString.trim().length === 0 ? 'none' : 'block' }}>
            {this.tree && !editTree && (
              <div className="searchResultMessage" style={{ display: this.tree && this.tree.state.searchMatches.length !== 0 ? 'none' : 'block' }}>
                <span>해당 내용 검색결과가 없습니다. Biz Store로 이동하시겠습니까?</span>
                <Link to={`/portal/store/appMain/bizStore/app/search/${searchString}`} className="storeLink" title="스토어 홈 바로가기" target="_blank">
                  <img src={IconGo} style={{ paddingLeft: '7px', marginTop: '-2px' }} className="nextIcon" alt="스토어 홈 바로가기" />
                </Link>
              </div>
            )}
          </div>
          <div
            className="treeBox"
            style={{
              width: '100%',
              height: 'calc(100% - 50px)',
              padding: '0 10px',
            }}
          >
            <AutoSizer>
              {({ width, height }) => (
                <ScrollBar style={{ width, height, overflowX: 'hidden' }} autoHide autoHideTimeout={1000} autoHideDuration={200} className="tree-scrollbar">
                  {editTree ? (
                    <MyPage history={history} height={height} />
                  ) : (
                    <SortableTree
                      theme={CustomTheme}
                      treeData={treeData}
                      onChange={tree => this.updateTreeData(tree)}
                      searchMethod={customSearchMethod}
                      searchQuery={searchString}
                      searchFocusOffset={searchFocusIndex}
                      style={{
                        overflow: 'hidden',
                      }}
                      // style={{
                      //   display: 'inline-block', width: '100%', height: '100%', overflow: 'visible',
                      // }}
                      isVirtualized={false}
                      generateNodeProps={this.generateNodeProps}
                      rowHeight={35}
                      scaffoldBlockPxWidth={22}
                      className="sortableTreeWrapper sidebar CustomSCRB"
                      ref={ref => {
                        this.tree = ref;
                      }}
                    />
                  )}
                </ScrollBar>
              )}
            </AutoSizer>
          </div>
        </div>
      </TreeWrapper>
    );
  }
}

Tree.propTypes = {
  history: PropTypes.object.isRequired,
  treeData: PropTypes.arrayOf(PropTypes.object),
  selectedIndex: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  execMenu: PropTypes.func.isRequired,
  execPage: PropTypes.func.isRequired,
  saveData: PropTypes.func.isRequired,
  showNoti: PropTypes.bool.isRequired,
};

Tree.defaultProps = {
  treeData: [],
  onClick: () => {},
};

export default Tree;
