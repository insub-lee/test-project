import React, { Component } from 'react';
import {
  SortableTreeWithoutDndContext as SortableTree
} from '../../../components/Organization/resource/react-sortable-tree';
import PropTypes from 'prop-types';
import { lang } from 'utils/commonUtils';
import ScrollBar from 'react-custom-scrollbars';
import CustomTheme from './theme';
import { Badge } from 'antd';
// import 'style/sortable-tree-biz.css';
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
    if (nextProps.treeData && nextProps.treeData.length > 0) {
      this.setState({
        treeData: nextProps.treeData,
        selectedIndex: nextProps.selectedIndex,
      });
    } else {
      this.setState({
        treeData: [],
      });
    }
  }
  updateTreeData = (treeData) => {
    this.setState({ treeData });
    this.props.saveData(null, treeData);
  }
  handleOnNotiClick = () => {
    const { isShow } = this.state;
    this.setState({
      isShow: !isShow,
    })
  }
  render() {
    const {
      treeData,
    } = this.state;

    const {
      execMenu,
      execPage,
      selectedIndex,
      menuName,
      handleSetMenuNameSelectedIndex,
      saveData,
      showNoti,
      // toggleChildrenVisibility,

      // execApp,
    } = this.props;

    const customSearchMethod = ({ node, searchQuery }) =>
      searchQuery &&
      lang.get('NAME', node).toLowerCase().indexOf(searchQuery.toLowerCase()) > -1;



    return (
      <div
        style={{
          display: 'flex', flexDirection: 'column', height: `calc(100vh - 45px ${showNoti ? '- 32px' : ''})`, width: '100%',
        }}
      >
        <div
          className="treeBox"
          style={{
            flex: '1 0 50%', padding: '10px 0 0 10px',
          }}
        >
          <ScrollBar
            style={{ width: 300, height: '100%' }}
            autoHide
            autoHideTimeout={1000}
            autoHideDuration={200}
          >
            <SortableTree
              theme={CustomTheme}
              // ref={c => { this.togg = c }}
              treeData={treeData}
              onChange={(treeData) => this.updateTreeData(treeData)}
              canDrag={() => this.props.canDrag ? true : false}
              canDrop={() => this.props.canDrop ? true : false}
              rowHeight={35}
              scaffoldBlockPxWidth={22}
              searchQuery={menuName}
              searchMethod={customSearchMethod}
              style={{ display: 'inline-block', width: '100%', height: '100%', overflow: 'visible' }}
              isVirtualized={false}
              generateNodeProps={({ node }) => {
                const handleOnClick = () => {
                  if (node.TARGET === 'NEW') {
                    window.open(node.URL, node.MENU_ID, 'width=1280, height=720, toolbar=yes, resizable=yes, menubar=yes, status=yes, location=yes');
                    execMenu(node.PAGE_ID, node.TARGET);
                  } else {
                    // handleSetMenuNameSelectedIndex(lang.get('NAME', node), node.key);
                    this.props.onClick(node);
                    if (node.NODE_TYPE !== 'F' && node.APP_YN !== 'F') {
                      console.log(node, 'node123123');
                      // execMenu(node.PAGE_ID, node.TARGET, node);
                      execPage(node, 'execMenu');
                      // execApp(node);
                    }
                  }
                  saveData(node, treeData);
                };
                return {
                  title: (
                    <button
                      className={`${node.key === selectedIndex ? 'active' : ''}`}
                      onClick={handleOnClick}
                      style={{ cursor: 'pointer' }}>
                      {lang.get('NAME', node)}
                      <Badge count={node.UNREAD_CNT !== undefined ? node.UNREAD_CNT : ''} overflowCount={99} className="inTree" />
                    </button>),
                };
              }}
              className="sortableTreeWrapper sidebar CustomSCRB"
            />
          </ScrollBar>
        </div>
      </div>
    );
  }
}
Tree.propTypes = {
  treeData: PropTypes.array, //eslint-disable-line
  selectedIndex: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  showSearchBox: PropTypes.bool,
  canDrag: PropTypes.bool,
  canDrop: PropTypes.bool,
  execMenu: PropTypes.func.isRequired,
  execPage: PropTypes.func.isRequired,
  menuName: PropTypes.string.isRequired,
  handleSetMenuNameSelectedIndex: PropTypes.func.isRequired,
  saveData: PropTypes.func.isRequired,
  showNoti: PropTypes.bool.isRequired,

  // execApp: PropTypes.func.isRequired,
};

Tree.defaultProps = {
  onClick: [],
  showSearchBox: false,
};

export default Tree;
