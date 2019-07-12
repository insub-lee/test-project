import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import ScrollBar from 'react-custom-scrollbars';
import { Badge } from 'antd';

import { lang } from 'utils/commonUtils';

import { SortableTreeWithoutDndContext as SortableTree } from '../../../components/Organization/resource/react-sortable-tree';
import CustomTheme from './theme';
import './app.css';
import TreeWrapper from './TreeWrapper';

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
    return nextProps.treeData.length > 0;
  }

  /* eslint-disable */
  updateTreeData = treeData => {
    //this.props.saveData(null, treeData);
  };
  /* eslint-disable */

  render() {
    const { searchFocusIndex, searchString, searchFoundCount, editTree, editMenuMode } = this.state;

    console.debug('>>>>>>>this.props tree: ', this.props);

    const { treeData, execMenu, execPage, selectedIndex, showNoti, onClick } = this.props;

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
            <p>메뉴 카테고리</p>
          </div>
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
                  console.debug('>>>>>>>>node: ', node);
                  node.active = node.key === selectedIndex;
                  const handleOnClick = () => {
                    if (node.TARGET === 'NEW') {
                      window.open(node.URL, node.MENU_ID, 'width=1280, height=720, toolbar=yes, resizable=yes, menubar=yes, status=yes, location=yes');
                      execMenu(node.PAGE_ID, node.TARGET);
                    } else {
                      onClick(node);
                      if (node.NODE_TYPE !== 'F' && node.APP_YN !== 'F') {
                        execPage(node, 'execMenu');
                      }
                    }
                    // saveData(node, treeData);
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
              />
            </ScrollBar>
          </div>
        </div>
      </TreeWrapper>
    );
  }
}
Tree.propTypes = {
  treeData: PropTypes.array,
  selectedIndex: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  showSearchBox: PropTypes.bool,
  execMenu: PropTypes.func.isRequired,
  execPage: PropTypes.func.isRequired,
  menuName: PropTypes.string.isRequired,
  handleSetMenuNameSelectedIndex: PropTypes.func.isRequired,
  // saveData: PropTypes.func.isRequired,
  // showNoti: PropTypes.bool.isRequired,
};

Tree.defaultProps = {
  treeData: [],
  onClick: () => console.debug('no bind event'),
  showSearchBox: false,
};

export default Tree;
