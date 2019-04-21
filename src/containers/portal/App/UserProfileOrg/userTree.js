import React, { Component } from 'react';
import { lang, intlObj } from 'utils/commonUtils';
import StyleUserTree from 'style/StyleUserTree';
import {
  SortableTreeWithoutDndContext as SortableTree,
  toggleExpandedForAll,
} from '../../components/Organization/resource/react-sortable-tree';
import 'react-sortable-tree/style.css'
import PropTypes from 'prop-types';
import '../../components/Organization/app.css';
import Input from '../../../../components/Input';
import Select, { SelectOption } from '../../../../components/Select';
// import StyleUserTree from '../../components/Organization/StyleUserTree';
import { Button } from 'antd';
import CustomTheme from '../../components/Organization/theme';
const Option = SelectOption;

let list = [];
let checkedList = [];

class UserTree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      searchFocusIndex: 0,
      searchFoundCount: null,
      treeData: this.props.treeData,
      selectedDept: this.props.selectedDept,
      organizationData: this.props.organizationData,
      checked: false,

      // 선택된 구성원이 속한 부서를 트리에 표시해 주기 위한 상태값
      selectedIndex: `${this.props.selectedUserDeptId}`,
      userDept: this.props.selectedUserDeptName,
    };
    this.updateTreeData = this.updateTreeData.bind(this);
  }

  componentWillReceiveProps(nextProps) {

    if (this.state.treeData[0].key != nextProps.treeData[0].key) {
      this.setState({
        treeData: nextProps.treeData,
      });
    }

    if (this.state.userDept !== nextProps.selectedUserDeptName) {
      const { userDept } = this.state;
      console.log('this.state.userDept', this.state.userDept);
      console.log('this.state.userDept', nextProps.selectedUserDeptName)
      console.log('this.state.userDept', nextProps)
      this.setState({
        userDept: userDept == "" ? userDept : nextProps.selectedUserDeptName,
        selectedIndex: nextProps.selectedUserDeptId,
      });
    }

    if (nextProps.reset) {
      checkedList = [];
    }
  }


  updateTreeData(treeData) {
    this.setState({ treeData });
  }

  render() {
    const {
      selectedIndex,
      treeData,
      selectedDept,
      searchString,
      searchFocusIndex,
      searchFoundCount,
      organizationData,
      userDept,
    } = this.state;

    console.log(userDept, 'seartchdskf');

    const {
      initializeSearchInput,
      setSelectedIdAndCount
    } = this.props;

    const customSearchMethod = ({ node, searchQuery }) =>
      searchQuery &&
      lang.get('NAME', node).toLowerCase().indexOf(searchQuery.toLowerCase()) > -1;

    const recordCall = (name, args) => {
      // eslint-disable-next-line no-console
      console.log(`${name} called with arguments:`, args);
      this.setState({
        userDept: '',
      })
    };

    return (
      <StyleUserTree
        style={{ display: 'flex', flexDirection: 'column', height: 526 }}
      >
        <div className="treeTotalWrapper">
          <div style={{ flex: '0 0 auto' }}>
            {/* <button onClick={this.expandAll}>펼치기</button>
            <button onClick={this.collapseAll}>합치기</button> */}
            <div>
              <form
                style={{ display: 'block' }}
                onSubmit={event => event.preventDefault()}
              >
                <div className="searchOptions">
                  <div className="selectWrapper" style={{ marginBottom: 10 }}>
                    <select
                      defaultValue={this.props.selectedDept}
                      onChange={(e) => this.props.changeTreeData(e.target.value)} // e.target.value : DEPT_ID
                      value={this.props.selectedDept}
                    >
                      {
                        this.state.organizationData.map(dept => (
                          <option
                            value={dept.DEPT_ID} key={dept.DEPT_ID}
                          >
                            {lang.get('NAME', dept)}
                          </option>
                        ))
                      }
                    </select>
                  </div>

                  <div
                    className="inputWrapper"
                  >
                    <label htmlFor="find-box">
                      <Input
                        id="find-box"
                        type="text"
                        value={searchString}
                        onChange={event =>
                          this.setState({ searchString: event.target.value })}
                      />
                    </label>
                    <Button className="searchButton" title="{intlObj.get(messages.search)}" />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div style={{ flex: '1 0 50%', marginTop: 10, paddingLeft: 15 }}>
            <SortableTree
              theme={CustomTheme}
              treeData={treeData}
              onChange={this.updateTreeData}
              searchMethod={customSearchMethod}
              searchQuery={searchString !== "" ? searchString : userDept}
              searchFocusOffset={searchFocusIndex}
              onVisibilityToggle={args => recordCall('onVisibilityToggle', args)}
              onlyExpandSearchedNodes={true}
              searchFinishCallback={matches =>
                this.setState({
                  searchFoundCount: matches.length,
                  searchFocusIndex:
                    matches.length > 0 ? searchFocusIndex % matches.length : 0,
                })}
              canDrag={false}
              rowHeight={24}
              scaffoldBlockPxWidth={20}
              className="orgTreeWrapper"
              generateNodeProps={({ node }) => {
                const handleOnClick = () => {
                  console.log(node.key, 'nodenode');
                  this.setState({
                    selectedIndex: node.key,
                    userDept: '',
                  });
                  initializeSearchInput();
                  setSelectedIdAndCount(node.key);
                  this.updateTreeData(this.state.treeData);
                  this.props.getUsers(node.key); // node.key : DEPT_ID
                };
                return {
                  title: (<button className={`${node.key === selectedIndex ? 'active' : ''}`} onClick={handleOnClick}>{node[`NAME_${lang.translator[lang.getLocale()]}`]}</button>),
                };
              }}
            />
          </div>
        </div>
      </StyleUserTree>
    );
  }
}
UserTree.propTypes = {
  treeData: PropTypes.array, //eslint-disable-line
  organizationData: PropTypes.array, //eslint-disable-line
  getUsers: PropTypes.func, //eslint-disable-line
  changeTreeData: PropTypes.func,
  initializeSearchInput: PropTypes.func.isRequired,
  setSelectedIdAndCount: PropTypes.func.isRequired,
};
export default UserTree;