import React, { Component } from 'react';
// import SortableTree, { toggleExpandedForAll } from 'react-sortable-tree';
import { SortableTreeWithoutDndContext as SortableTree, toggleExpandedForAll } from 'react-sortable-tree';
import PropTypes from 'prop-types';
// import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
// import './app.css';

class Tree extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchString: '',
      searchFocusIndex: 0,
      searchFoundCount: null,
      treeData: this.props.treeData,
    };

    this.updateTreeData = this.updateTreeData.bind(this);
    this.expandAll = this.expandAll.bind(this);
    this.collapseAll = this.collapseAll.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (this.state.treeData.length === 0) {
      this.setState({
        treeData: nextProps.treeData,
      });
    }
  }

  updateTreeData(treeData) {
    this.setState({ treeData });
  }

  expand(expanded) {
    this.setState({
      treeData: toggleExpandedForAll({
        treeData: this.state.treeData,
        expanded,
      }),
    });
  }

  expandAll() {
    this.expand(true);
  }

  collapseAll() {
    this.expand(false);
  }

  render() {
    const { treeData, searchString, searchFocusIndex, searchFoundCount } = this.state;

    const selectPrevMatch = () =>
      this.setState({
        searchFocusIndex: searchFocusIndex !== null ? (searchFoundCount + searchFocusIndex - 1) % searchFoundCount : searchFoundCount - 1,
      });

    const selectNextMatch = () =>
      this.setState({
        searchFocusIndex: searchFocusIndex !== null ? (searchFocusIndex + 1) % searchFoundCount : 0,
      });

    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <div style={{ flex: '0 0 auto', padding: '0 15px' }}>
          <h3>File Explorer Theme</h3>
          <button onClick={this.expandAll}>Expand All</button>
          <button onClick={this.collapseAll}>Collapse All</button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <form style={{ display: 'inline-block' }} onSubmit={event => event.preventDefault()}>
            <label htmlFor="find-box">
              Search:&nbsp;
              <input id="find-box" type="text" value={searchString} onChange={event => this.setState({ searchString: event.target.value })} />
            </label>

            <button type="button" disabled={!searchFoundCount} onClick={selectPrevMatch}>
              &lt;
            </button>

            <button type="submit" disabled={!searchFoundCount} onClick={selectNextMatch}>
              &gt;
            </button>

            <span>
              &nbsp;
              {searchFoundCount > 0 ? searchFocusIndex + 1 : 0}
              &nbsp;/&nbsp;
              {searchFoundCount || 0}
            </span>
          </form>
        </div>

        <div style={{ flex: '1 0 50%', padding: '0 0 0 15px' }}>
          <SortableTree
            // theme={FileExplorerTheme}
            treeData={treeData}
            onChange={this.updateTreeData}
            searchQuery={searchString}
            searchFocusOffset={searchFocusIndex}
            searchFinishCallback={matches =>
              this.setState({
                searchFoundCount: matches.length,
                searchFocusIndex: matches.length > 0 ? searchFocusIndex % matches.length : 0,
              })
            }
            // canDrag={({ node }) => !node.dragDisabled}
            // canDrop={({ nextParent }) => !nextParent || nextParent.isDirectory}
            canDrag={false}
            canDrop={false}
            generateNodeProps={rowInfo => ({
              onClick: () => this.props.getUsers(rowInfo),
            })}
          />
        </div>
      </div>
    );
  }
}

Tree.propTypes = {
  treeData: PropTypes.array, //eslint-disable-line
  users: PropTypes.array, //eslint-disable-line
  user: PropTypes.object, //eslint-disable-line
  getUsers: PropTypes.func, //eslint-disable-line
};

export default Tree;
