import React, { Component } from 'react';
import { SortableTreeWithoutDndContext as SortableTree } from '../../../components/Organization/resource/react-sortable-tree';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { lang } from 'utils/commonUtils';
import Input from 'components/Input';
import ScrollBar from 'react-custom-scrollbars';

import { Badge, Button } from 'antd';
import CustomTheme from './theme';

import iconUnlock from 'images/portal/icon-unlock.png';
import iconLock from 'images/portal/icon_lock.png';
import IconGo from 'images/portal/icon_go.png';
import TreeWrapper from './TreeWrapper';
import MyPage from '../../UserStore/AppMain/MyPage';

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
      searchFoundCount: 1,
      searchFocusIndex: 0,
      searchString: '',
      editTree: false,
      editMenuMode: false,
    };

    this.updateTreeData = _.debounce(this.updateTreeData.bind(this), 300);
  }

  shouldComponentUpdate(nextProps) {
    return !(nextProps.treeData.length === 0);
  }

  onSetEditClick = () => {
    this.setState(prevState => ({
      editTree: !prevState.editTree,
      editMenuMode: !prevState.editMenuMode,
    }));
  };

  setSearchString = (value) => {
    this.setState({
      searchString: value,
    });
  };

  updateTreeData = (treeData) => {
    this.props.saveData(null, treeData);
  };

  clickEvent = (node) => {
    const {
      treeData, execPage, execMenu, onClick, saveData,
    } = this.props;
    if (node.TARGET === 'NEW') {
      window.open(node.URL, node.MENU_ID, features);
      execMenu(node.PAGE_ID, node.TARGET);
    } else {
      onClick(node);
      if (node.NODE_TYPE !== 'F' && node.APP_YN !== 'F') {
        execPage(node, 'execMenu');
      }
    }
    saveData(node, treeData);
  };

  generateNodeProps = ({ node }) => {
    const { selectedIndex } = this.props;
    const nodeData = { ...node, active: node.key === selectedIndex };
    return {
      title: (
        <button className={`${nodeData.active ? 'active' : ''}`} onClick={this.clickEvent} style={{ cursor: 'pointer' }}>
          {lang.get('NAME', nodeData)}
          <Badge count={nodeData.UNREAD_CNT !== undefined ? nodeData.UNREAD_CNT : ''} overflowCount={99} className="inTree" />
        </button>
      ),
    };
  };

  render() {
    const {
      searchFocusIndex,
      searchString,
      editTree,
      editMenuMode,
    } = this.state;

    const {
      treeData, showNoti, history,
    } = this.props;

    return (
      <TreeWrapper>
        <div className={`tree-contents ${showNoti ? 'show-noti' : ''}`}>
          <div className="search-box">
            <div className="searchWrapper">
              <Input
                type="text"
                value={searchString}
                placeholder="메뉴에서 My App을 검색하세요."
                onChange={(event) => {
                  this.setSearchString(event.target.value);
                }}
                readOnly={editTree}
                autoComplete="off"
              />
              <Button className="searchBtn" title="찾기" />
            </div>
            <div className="myMenuEdit">
              <button type="button" onClick={this.onSetEditClick}>
                <img src={editMenuMode ? iconUnlock : iconLock} alt="메뉴수정" title="메뉴수정" />
              </button>
            </div>
          </div>
          <div className="searchResult" style={{ display: searchString.trim().length === 0 ? 'none' : 'block' }}>
            {this.tree && !editTree && this.tree.state.searchMatches.length > 0 && (
              <div className="searchResultMessage">
                <span>해당 내용 검색결과가 없습니다. Biz Store로 이동하시겠습니까?</span>
                <Link to={`/portal/store/appMain/bizStore/app/search/${searchString}`} className="storeLink" title="스토어 홈 바로가기" target="_blank">
                  <img src={IconGo} style={{ paddingLeft: '7px', marginTop: '-2px' }} className="nextIcon" alt="스토어 홈 바로가기" />
                </Link>
              </div>
            )}
          </div>
          {editTree ? (
            <div style={{ padding: '10px' }}>
              <MyPage history={history} />
            </div>
          ) : (
            <div
              className="treeBox"
              style={{
                flex: '1 0 50%',
                padding: '10px 0 0 10px',
              }}
            >
              <ScrollBar style={{ width: 290, height: '100%' }} autoHide autoHideTimeout={1000} autoHideDuration={200}>
                <SortableTree
                  theme={CustomTheme}
                  treeData={treeData}
                  onChange={tree => this.updateTreeData(tree)}
                  searchMethod={customSearchMethod}
                  searchQuery={searchString}
                  searchFocusOffset={searchFocusIndex}
                  style={{
                   display: 'inline-block', width: '100%', height: '100%', overflow: 'visible',
                  }}
                  isVirtualized={false}
                  generateNodeProps={this.generateNodeProps}
                  rowHeight={35}
                  scaffoldBlockPxWidth={22}
                  className="sortableTreeWrapper sidebar CustomSCRB"
                  ref={(ref) => {
                    this.tree = ref;
                  }}
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
