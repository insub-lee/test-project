import React, { Component } from 'react';
import { SortableTreeWithoutDndContext as SortableTree } from 'react-sortable-tree';
import PropTypes from 'prop-types';
import ScrollBar from 'react-custom-scrollbars';
import * as treeFunc from 'containers/common/functions/treeFunc';
import { toggleExpandedForSelected } from 'containers/common/functions/tree-data-utils';
import 'style/sortable-tree-biz.css';
import StyleTree from './StyleTree';
import CustomTheme from './theme';
import './tree-node.css';
import './app.css';

class MasterPmBomTree extends Component {
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
    const { treeData } = nextProps;

    if (treeData && treeData.length > 0) {
      treeFunc.mergeArray(nextProps.treeData, this.state.treeData);

      this.setState({
        treeData: nextProps.treeData,
      });
    }
  }

  updateTree(treeData) {
    this.setState({ treeData });
  }

  handleOnTreeNodeClick = node => {
    this.setState({
      selectedIndex: node.key,
    });
    this.props.handleOnClick(node);
  };

  render() {
    const { treeData, searchFocusIndex, selectedIndex } = this.state;

    const {
      rowHeight,
      style,
      innerStyle,
      wrapperStyle,
      canDrag,
      canDrop,

      onDragStateChanged,
    } = this.props;

    const treeJsx = (
      <SortableTree
        theme={CustomTheme}
        treeData={treeData}
        onChange={this.updateTree}
        searchFocusOffset={searchFocusIndex}
        selectedIndex={selectedIndex}
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
        scaffoldBlockPxWidth={20}
        onDragStateChanged={onDragStateChanged}
        generateNodeProps={({ node }) => {
          console.log('test');
          return {
            title: (
              <span
                className={`${node.key === selectedIndex ? 'active' : ''}`}
                // onClick={() => this.handleOnTreeNodeClick(node)}
                style={{ cursor: 'pointer' }}
              >
                {node.OJTXP}
              </span>
            ),
            onClick: this.handleOnTreeNodeClick,
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
        {treeData.length > 0 ? (
          <ScrollBar style={{ width: '100%', height: '100%' }} autoHide autoHideTimeout={1000} autoHideDuration={200}>
            {treeJsx}
          </ScrollBar>
        ) : (
          treeJsx
        )}
      </StyleTree>
    );
  }
}

MasterPmBomTree.propTypes = {
  treeData: PropTypes.array.isRequired,
  selectedIndex: PropTypes.number,
  rowHeight: PropTypes.number,
  canDrag: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  canDrop: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  style: PropTypes.object,
  innerStyle: PropTypes.object,
  wrapperStyle: PropTypes.object,

  handleOnClick: PropTypes.func,
  onDragStateChanged: PropTypes.func,
  // updateTreeData: PropTypes.func.isRequired,
};

MasterPmBomTree.defaultProps = {
  selectedIndex: -1,
  rowHeight: 35,
  canDrag: () => false,
  canDrop: () => false,
  wrapperStyle: {
    display: 'flex',
    flex: '1 0 50%',
    padding: '10px 0 0 10px',
    flexDirection: 'column',
    height: 'calc(100vh - 400px)',
    width: '100%',
  },
  style: {},
  innerStyle: {},
  onDragStateChanged: () => {},
  handleOnClick: () => {},
};

export default MasterPmBomTree;
