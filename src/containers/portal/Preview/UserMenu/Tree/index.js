import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { lang } from 'utils/commonUtils';
import { Badge } from 'antd';
import { fromJS } from 'immutable';
import * as treeFunc from 'containers/common/functions/treeFunc';
import { SortableTreeWithoutDndContext as SortableTree } from '../../../components/Organization/resource/react-sortable-tree';
import CustomTheme from './theme';
import { toggleExpandedForSelected } from './tree-data-utils';
import './app.css';

class Tree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFoundCount: null,
      treeData: props.treeData,
      isShow: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    // if (this.props.treeData !== nextProps.treeData) {
    //   this.setState({ treeData: nextProps.treeData });
    // }
    if (nextProps.treeData && nextProps.treeData.length > 0) {
      // 2 === 홈
      if (nextProps.selectedIndex === '-1' || nextProps.selectedIndex === 2) {
        this.setState({
          treeData: nextProps.treeData,
          selectedIndex: nextProps.selectedIndex,
        });
      } else {
        this.treeFlatData = treeFunc.generateList(fromJS(nextProps.treeData));
        const idx = nextProps.treeData.findIndex(i => i.key === nextProps.selectedIndex);
        if (idx !== -1) {
          this.setState({
            treeData: toggleExpandedForSelected({
              treeData: nextProps.treeData,
              path: this.treeFlatData.get(nextProps.selectedIndex).path,
            }),
            selectedIndex: nextProps.selectedIndex,
          });
        }
      }
    } else {
      this.setState({
        treeData: [],
      });
    }
  }

  updateTreeData = treeData => {
    this.setState({ treeData });
    this.props.saveData(null, treeData);
  };

  handleOnNotiClick = () => {
    const { isShow } = this.state;
    this.setState({
      isShow: !isShow,
    });
  };

  render() {
    const { treeData } = this.state;

    const {
      execMenu,
      execPage,
      selectedIndex,
      menuName,
      handleSetMenuNameSelectedIndex,
      saveData,
      // toggleChildrenVisibility,
    } = this.props;

    const customSearchMethod = ({ node, searchQuery }) =>
      searchQuery &&
      lang
        .get('NAME', node)
        .toLowerCase()
        .indexOf(searchQuery.toLowerCase()) > -1;

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100vh - 45px)',
          width: '100%',
        }}
      >
        <div
          className="treeBox"
          style={{
            flex: '1 0 50%',
            padding: '10px 0 0 10px',
          }}
        >
          <SortableTree
            theme={CustomTheme}
            // ref={c => { this.togg = c }}
            treeData={treeData}
            onChange={treeData => this.updateTreeData(treeData)}
            canDrag={() => !!this.props.canDrag}
            canDrop={() => !!this.props.canDrop}
            rowHeight={35}
            scaffoldBlockPxWidth={20}
            searchQuery={menuName}
            searchMethod={customSearchMethod}
            generateNodeProps={({ node }) => {
              const handleOnClick = () => {
                if (node.TARGET === 'NEW') {
                  window.open(node.URL, node.MENU_ID, 'width=1280, height=720, toolbar=yes, resizable=yes, menubar=yes, status=yes, location=yes');
                  execMenu(node.PAGE_ID, node.TARGET);
                } else {
                  handleSetMenuNameSelectedIndex(lang.get('NAME', node), node.key);
                  this.props.onClick(node);
                  if (node.NODE_TYPE !== 'F' && node.APP_YN !== 'F') {
                    execMenu(node.PAGE_ID, node.TARGET);
                    execPage(node);
                  }
                }
                saveData(node, treeData);
              };
              return {
                title: (
                  <button className={`${node.key === selectedIndex ? 'active' : ''}`} onClick={handleOnClick} style={{ cursor: 'pointer' }}>
                    {lang.get('NAME', node)}
                    <Badge count={node.UNREAD_CNT !== undefined ? node.UNREAD_CNT : ''} overflowCount={99} className="inTree" />
                  </button>
                ),
              };
            }}
            className="sortableTreeWrapper sidebar"
          />
        </div>
      </div>
    );
  }
}
Tree.propTypes = {
  treeData: PropTypes.array, //eslint-disable-line
  // selectedIndex: PropTypes.number, //eslint-disable-line
  onClick: PropTypes.func,
  showSearchBox: PropTypes.bool,
  canDrag: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  canDrop: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  execMenu: PropTypes.func.isRequired,
  execPage: PropTypes.func.isRequired,
  selectedIndex: PropTypes.string.isRequired,
  menuName: PropTypes.string.isRequired,
  handleSetMenuNameSelectedIndex: PropTypes.func.isRequired,
  saveData: PropTypes.func.isRequired,
};

Tree.defaultProps = {
  onClick: [],
  showSearchBox: false,
};

export default Tree;
