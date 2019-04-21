import React, { Component } from 'react';
// import SortableTree from 'react-sortable-tree';
import { SortableTreeWithoutDndContext as SortableTree } from 'react-sortable-tree';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import ScrollBar from 'react-custom-scrollbars';
import { lang } from 'utils/commonUtils';
// import 'style/sortable-tree-biz.css';
// import './app.css';
import CustomTheme from './theme';

class Tree extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: props.selectedIndex ? props.selectedIndex.toString() : '-1',
      searchFoundCount: null,
      treeData: props.treeData,
    };

    this.updateTreeData = this.updateTreeData.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.treeData !== undefined && this.props.treeData.length < 1) {
      this.setState({ treeData: nextProps.treeData });
    }
  }

  updateTreeData(treeData) {
    this.setState({ treeData });
  }

  render() {
    const {
      treeData,
      selectedIndex,
    } = this.state;

    return (
      <div
        style={{
          display: 'flex', flexDirection: 'column', height: 'calc(100vh - 115px)', width: '100%',
        }}
      >
        <div
          className="treeBox"
          style={{
            flex: '1 0 50%', padding: '20px 0 0 10px',
          }}
        >
          <ScrollBar
            style={{ width: 280, height: '100%' }}
            autoHide
            autoHideTimeout={1000}
            autoHideDuration={200}
          >
            <SortableTree
              theme={CustomTheme}
              treeData={treeData}
              onChange={this.updateTreeData}
              canDrag={() => this.props.canDrag ? true : false}
              canDrop={() => this.props.canDrop ? true : false}
              rowHeight={35}
              scaffoldBlockPxWidth={22}
              style={{ display: 'inline-block', width: '100%', height: '100%', overflow: 'visible' }}
              isVirtualized={false}
              generateNodeProps={({ node }) => {
                node.selectedIndex = selectedIndex;
                const handleOnClick = () => {
                  this.setState({
                    selectedIndex: node.key,
                  });
                  this.props.onClick(node);
                  this.props.initializeSearchInput();
                };

                const customNodeProps = this.props.getCustomNodeProps ? this.props.getCustomNodeProps(node) : {};

                return {
                  title: (<button className={`${node.key === selectedIndex ? 'active' : ''}`} onClick={handleOnClick} style={{ cursor: 'pointer' }}>{lang.get('NAME', node)}</button>),
                  ...customNodeProps,
                };
              }}
              className="sortableTreeWrapper CustomSCRB"
            />
          </ScrollBar>
        </div>
      </div>
    );
  }
}

Tree.propTypes = {
  treeData: PropTypes.array, //eslint-disable-line
  selectedIndex: PropTypes.string, //eslint-disable-line
  onClick: PropTypes.func,
  showSearchBox: PropTypes.bool,
  canDrag: PropTypes.bool,
  canDrop: PropTypes.bool,
  getCustomNodeProps: PropTypes.func,
};

Tree.defaultProps = {
  onClick: [],
  showSearchBox: false,
};

export default Tree;
