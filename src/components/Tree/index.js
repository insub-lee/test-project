import React, { Component } from 'react';
import { SortableTreeWithoutDndContext as SortableTree } from 'react-sortable-tree';
import PropTypes from 'prop-types';
import { lang } from 'utils/commonUtils';
import ScrollBar from 'react-custom-scrollbars';
import * as treeFunc from 'containers/common/functions/treeFunc';
import { toggleExpandedForSelected } from 'containers/common/functions/tree-data-utils';
// import 'style/sortable-tree-biz.css';
import StyleTree from './StyleTree';
import CustomTheme from './theme';

class Tree extends Component {
  constructor(props) {
    super(props);

    let treeData = [];

    if (props.treeData && props.treeData.length > 0) {
      if (props.selectedIndex !== -1) {
        treeData = toggleExpandedForSelected({
          treeData: props.treeData,
          selectedIndex: props.selectedIndex,
        });
      } else {
        const { treeData: treeData2 } = props;
        treeData = treeData2;
      }
    }

    this.state = {
      searchFocusIndex: -1,
      selectedIndex: -1,
      treeData,
    };

    this.updateTree = this.updateTree.bind(this);
    this.handleOnTreeNodeClick = this.handleOnTreeNodeClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { selectedIndex } = nextProps;

    if (nextProps.treeData && nextProps.treeData.length > 0) {
      if (nextProps.selectedIndex === -1) {
        this.setState({
          treeData: nextProps.treeData,
          selectedIndex,
        });
      } else {
        treeFunc.mergeArray(nextProps.treeData, this.state.treeData);

        this.setState({
          treeData: toggleExpandedForSelected({ treeData: nextProps.treeData, selectedIndex }),
          selectedIndex,
        });
      }
    } else {
      this.setState({
        treeData: [],
      });
    }
  }

  updateTree(treeData) {
    this.setState({ treeData });
    // this.props.updateTreeData(treeData);
  }

  handleOnTreeNodeClick = (node) => {
    this.setState({
      selectedIndex: node.key,
    });
    // this.props.updateTreeData(this.state.treeData);
    this.props.handleOnClick(node);
  };

  render() {
    const {
      treeData,
      searchFocusIndex,
      selectedIndex,
    } = this.state;

    const {
      rowHeight,
      style,
      innerStyle,
      wrapperStyle,
      canDrag,
      canDrop,

      onMoveNode,
      onDragStateChanged,
      generateNodeProps,
    } = this.props;

    const treeJsx = (
      <SortableTree
        theme={CustomTheme}
        treeData={treeData}
        onChange={this.updateTree}
        searchFocusOffset={searchFocusIndex}
        canDrag={canDrag}
        canDrop={canDrop}
        rowHeight={rowHeight}
        style={{
          display: 'inline-block',
          width: '100%',
          height: '100%',
          overflow: 'visible',
          ...style,
        }}
        innerStyle={{ ...innerStyle }}
        isVirtualized={false}
        scaffoldBlockPxWidth={22}
        onMoveNode={onMoveNode}
        // onVisibilityToggle={({ treeData: treeData2 }) => {
        //   this.props.updateTreeData(treeData2);
        // }}
        onDragStateChanged={onDragStateChanged}
        generateNodeProps={({
          node, path, treeIndex, lowerSiblingCounts, isSearchMatch, isSearchFocus,
        }) => {
          let parentsGenerateNodeProps = {};
          let className = '';
          if (generateNodeProps) {
            parentsGenerateNodeProps = generateNodeProps({
              node, path, treeIndex, lowerSiblingCounts, isSearchMatch, isSearchFocus,
            });
            className = node.className ? node.className : '';
          }

          return {
            title: (
              <button
                className={`${node.key === selectedIndex ? `${className} active` : `${className}`}`}
                onClick={() => this.handleOnTreeNodeClick(node)}
                style={{ cursor: 'pointer' }}
              >
                {lang.get('NAME', node)}
              </button>),
            ...parentsGenerateNodeProps,
          };
        }}
        className="sortableTreeWrapper CustomSCRB"
      />
    );

    return (
      <StyleTree
        style={{
          ...wrapperStyle,
        }}
      >
        {
          treeData.length > 0 ? (
            <ScrollBar
              style={{ width: '100%', height: '100%' }}
              autoHide
              autoHideTimeout={1000}
              autoHideDuration={200}
            >
              {treeJsx}
            </ScrollBar>
          ) : treeJsx
        }
      </StyleTree>
    );
  }
}

Tree.propTypes = {
  treeData: PropTypes.array.isRequired,
  selectedIndex: PropTypes.number,
  rowHeight: PropTypes.number,
  canDrag: PropTypes.func,
  canDrop: PropTypes.func,
  style: PropTypes.object,
  innerStyle: PropTypes.object,
  wrapperStyle: PropTypes.object,

  handleOnClick: PropTypes.func,
  onMoveNode: PropTypes.func,
  onDragStateChanged: PropTypes.func,
  generateNodeProps: PropTypes.func,
  // updateTreeData: PropTypes.func.isRequired,
};

Tree.defaultProps = {
  selectedIndex: -1,
  rowHeight: 35,
  canDrag: () => false,
  canDrop: () => false,
  wrapperStyle: {
    display: 'flex',
    flex: '1 0 50%',
    padding: '10px 0 0 10px',
    flexDirection: 'column',
    height: 'calc(100vh - 100px)',
    width: '100%',
  },
  style: {},
  innerStyle: {},
  generateNodeProps: () => {},
  onMoveNode: () => {},
  onDragStateChanged: () => {},
  handleOnClick: () => {},
};

export default Tree;
