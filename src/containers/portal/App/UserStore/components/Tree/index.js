import React, { Component } from 'react';
import { SortableTreeWithoutDndContext as SortableTree } from 'react-sortable-tree';
import PropTypes from 'prop-types';
// import { fromJS } from 'immutable';
import { lang } from 'utils/commonUtils';
import ScrollBar from 'react-custom-scrollbars';
import * as treeFunc from 'containers/common/functions/treeFunc';
// import 'style/sortable-tree-biz.css';
// import { toggleExpandedForSelected } from './tree-data-utils';
import { toggleExpandedForSelected } from 'containers/common/functions/tree-data-utils';
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

    this.updateTreeData = this.updateTreeData.bind(this);
    this.handleOnTreeNodeClick = this.handleOnTreeNodeClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { selectedIndex } = nextProps;

    if (nextProps.treeData && nextProps.treeData.length > 0) {
      if (selectedIndex === -1) {
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

  updateTreeData(treeData) {
    this.setState({ treeData });
  }

  handleOnTreeNodeClick = node => {
    this.setState({
      selectedIndex: node.key,
    });
    this.props.onClick(node);
  };

  render() {
    const { treeData, searchFocusIndex, selectedIndex } = this.state;

    const { generateNodeProps } = this.props;

    const tree = (
      <SortableTree
        theme={CustomTheme}
        treeData={treeData}
        onChange={this.updateTreeData}
        searchFocusOffset={searchFocusIndex}
        canDrag={() => !!this.props.canDrag}
        canDrop={() => !!this.props.canDrop}
        rowHeight={35}
        style={{
          display: 'inline-block',
          width: '100%',
          height: '100%',
          overflow: 'visible',
        }}
        isVirtualized={false}
        scaffoldBlockPxWidth={22}
        generateNodeProps={({ node, path, treeIndex, lowerSiblingCounts, isSearchMatch, isSearchFocus }) => {
          let parentsGenerateNodeProps = {};
          let className = '';

          if (generateNodeProps) {
            parentsGenerateNodeProps = generateNodeProps({
              node,
              path,
              treeIndex,
              lowerSiblingCounts,
              isSearchMatch,
              isSearchFocus,
            });
            className = node.className ? node.className : '';
          }
          return {
            title: (
              <button
                type="button"
                className={`${node.key === selectedIndex ? `${className} active` : `${className}`}`}
                onClick={() => this.handleOnTreeNodeClick(node)}
                style={{ cursor: 'pointer' }}
              >
                {lang.get('NAME', node)}
              </button>
            ),
            ...parentsGenerateNodeProps,
          };
        }}
        className="sortableTreeWrapper CustomSCRB"
      />
    );

    return (
      <div
        className="treeWrapper2"
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <div
          className="treeBox"
          style={{
            flex: '1 0 50%',
            padding: '20px 0 0 10px',
          }}
        >
          {treeData.length > 0 ? (
            <ScrollBar style={{ width: 270, height: '100%' }} autoHide autoHideTimeout={1000} autoHideDuration={200}>
              {tree}
            </ScrollBar>
          ) : (
            tree
          )}
        </div>
      </div>
    );
  }
}

Tree.propTypes = {
  treeData: PropTypes.array.isRequired,
  selectedIndex: PropTypes.number,
  generateNodeProps: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  canDrag: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  canDrop: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
};

Tree.defaultProps = {
  onClick: [],
  selectedIndex: -1,
};

export default Tree;
