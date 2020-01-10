import React, { Component } from 'react';
import { SortableTreeWithoutDndContext as SortableTree } from 'react-sortable-tree';
import PropTypes from 'prop-types';
import ScrollBar from 'react-custom-scrollbars';
import StyleUserTree from 'style/StyleUserTree';
// import 'style/sortable-tree-biz.css';
import { Checkbox } from 'antd';
import { fromJS } from 'immutable';

import CustomTheme from './theme';

class IfBoardList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchFocusIndex: 1,
      selectedIndex: -1,
      treeData: [],
      ctKeyword: '',
      grSeq: 0,
      checkedList: [],
    };

    this.updateTree = this.updateTree.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.treeData && nextProps.treeData.length > 0) {
      if (this.state.grSeq !== nextProps.grSeq) {
        this.setState({
          treeData: nextProps.treeData,
          ctKeyword: nextProps.ctKeyword,
          grSeq: nextProps.grSeq,
          checkedList: [],
        });
      }
      this.setState({ ctKeyword: nextProps.ctKeyword });
    } else {
      this.setState({
        treeData: [],
        ctKeyword: '',
        grSeq: 0,
        checkedList: [],
      });
    }
  }

  onCheckChange = (e, node) => {
    if (e.target.checked) {
      let deptIdArr = [];
      deptIdArr = this.state.checkedList.slice();
      deptIdArr.push(node.key);
      this.setState({ checkedList: deptIdArr });
    } else {
      /* 삭제 */
      let mapIndex = -1;
      this.state.checkedList.forEach((item, index) => {
        if (item === node.ctSeq) {
          mapIndex = index;
        }
      });
      if (mapIndex !== -1) {
        const tmpArrChk = fromJS(this.state.checkedList).toJS();
        tmpArrChk.splice(mapIndex, 1);
        this.setState({
          checkedList: tmpArrChk,
        });
      }
    }
    this.props.returnChkChange(e, node);
  };

  updateTree(treeData) {
    this.setState({ treeData });
  }

  render() {
    const { treeData, searchFocusIndex, selectedIndex, ctKeyword } = this.state;

    const { rowHeight, style, innerStyle, wrapperStyle, canDrag, canDrop } = this.props;

    const customSearchMethod = ({ node, searchQuery }) => searchQuery && node.title.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1;

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
        scaffoldBlockPxWidth={20}
        generateNodeProps={({ node }) => {
          const chkBox = (
            <Checkbox
              // id={node.key}
                onChange={(e) => this.onCheckChange(e, node)} //eslint-disable-line
              checked={this.state.checkedList.findIndex(t => t === node.key) !== -1}
            />
          );

          return {
            title: <button type="button">{node.title}</button>,
            buttons: [chkBox],
          };
        }}
        className="orgTreeWrapper CustomSCRB"
        searchQuery={ctKeyword}
        searchMethod={customSearchMethod}
        onlyExpandSearchedNodes
        selectedIndex={selectedIndex}
      />
    );

    return (
      <StyleUserTree
        style={{
          ...wrapperStyle,
        }}
        pl="22px"
      >
        {treeData.length > 0 ? (
          <ScrollBar style={{ width: '100%', height: '100%' }} autoHide autoHideTimeout={1000} autoHideDuration={200}>
            {treeJsx}
          </ScrollBar>
        ) : (
          treeJsx
        )}
      </StyleUserTree>
    );
  }
}

IfBoardList.propTypes = {
  treeData: PropTypes.array.isRequired,
  rowHeight: PropTypes.number,
  canDrag: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  canDrop: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  style: PropTypes.object,
  innerStyle: PropTypes.object,
  wrapperStyle: PropTypes.object,
  ctKeyword: PropTypes.string.isRequired,
  returnChkChange: PropTypes.func.isRequired,
  grSeq: PropTypes.number,
};

IfBoardList.defaultProps = {
  rowHeight: 35,
  grSeq: 0,
  canDrag: () => {},
  canDrop: () => {},
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
};

export default IfBoardList;
