import React, { Component } from 'react';
import {
    SortableTreeWithoutDndContext as SortableTree
  } from '../../../containers/portal/components/Organization/resource/react-sortable-tree';
import PropTypes from 'prop-types';
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
          <SortableTree
            theme={CustomTheme}
            treeData={treeData}
            onChange={this.updateTreeData}
            canDrag={() => this.props.canDrag ? true : false}
            canDrop={() => this.props.canDrop ? true : false}
            rowHeight={35}
            scaffoldBlockPxWidth={22}            
            generateNodeProps={({ node }) => {
              node.selectedIndex = selectedIndex;
              const handleOnClick = () => {
                this.setState({
                  selectedIndex: node.key,
                });
                this.props.onClick(node);
                this.props.initializeSearchInput();
              };

              return {
                title: (
                <button
                  className={`${node.key === selectedIndex ? 'active' : ''}`}
                  onClick={handleOnClick}
                  style={{cursor: 'pointer'}}>
                  {lang.get('NAME', node)}
                </button>),
              };
            }}
            className="sortableTreeWrapper CustomSCRB"
          />
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
  canDrag: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  canDrop: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
};

Tree.defaultProps = {
  onClick: [],
  showSearchBox: false,
};

export default Tree;
