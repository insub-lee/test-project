import React from 'react';
import 'react-treeview/react-treeview.css';
import TreeView from 'react-treeview';
import { Table, Column } from 'react-virtualized';
import 'react-virtualized/styles.css';
import Wrapper from './StyledEmployeeSearcher';
import service from './service';
import alertMessage from '../../Notification/Alert';

const treeRenderer = (tree, action) =>
  tree.map(node => {
    const { dpnm, dpcd } = node;
    if (node.children.length > 0) {
      const label = <span className="node">{dpnm}</span>;
      return (
        <TreeView key={`${dpnm}|${dpcd}`} nodeLabel={label} defaultCollapsed>
          {treeRenderer(node.children, action)}
        </TreeView>
      );
    }
    return (
      <button key={`${dpnm}|${dpcd}`} type="button" onClick={() => action.fetchUsers(dpcd)}>
        <span>{dpnm}</span>
      </button>
    );
  });

class EmployeeSearcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tree: [],
      userList: [],
      selectedList: [],
    };
    this.fetchDeptTree = this.fetchDeptTree.bind(this);
    this.rowRenderer = this.rowRenderer.bind(this);
    this.addList = this.addList.bind(this);
  }

  componentDidMount() {
    // Todo - fetch dept tree
    this.mounted = true;
    this.fetchDeptTree();
  }

  componentWillUnmount() {
    this.mounted = true;
  }

  async fetchDeptTree() {
    const { response, error } = await service.deptTree.get();
    if (response && !error) {
      const tree = response || [];
      if (this.mounted) {
        this.setState({ tree });
      }
    } else {
      console.debug('# error', error);
      alertMessage.alert('Server Error');
    }
  }

  async fetchUsers(dpcd) {
    const queryString = `coid=00&dpcd=${dpcd}&page=1`;
    const { response, error } = await service.users.get(queryString);
    if (response && !error) {
      const { userList } = response;
      if (this.mounted) {
        this.setState({ userList });
      }
    } else {
      console.debug('# error', error);
      alertMessage.alert('Server Error');
    }
  }

  rowRenderer({ key, index, style }) {
    const { userList } = this.state;
    const userInfo = userList[index];
    return (
      <div key={key} style={style}>
        {`${userInfo.emrno} ${userInfo.usrnm} ${userInfo.jgnm}`}
      </div>
    );
  }

  addList(rowData) {
    const { emrno, usrnm, psnm, jgnm } = rowData;
    if (this.state.selectedList.findIndex(user => user.emrno === emrno) < 0) {
      this.setState(prevState => {
        prevState.selectedList.push({ emrno, usrnm, psnm, jgnm });
        return {
          selectedList: prevState.selectedList,
        };
      });
    }
  }

  render() {
    const { tree, userList, selectedList } = this.state;
    const action = {
      fetchUsers: dpcd => this.fetchUsers(dpcd),
    };
    return (
      <Wrapper>
        <div className="child dept_tree">
          <div>{treeRenderer(tree, action)}</div>
        </div>
        <div className="child selector_view">
          <div className="selectable_table">
            <Table
              width={400}
              height={400}
              headerHeight={20}
              rowHeight={30}
              rowCount={userList.length}
              rowGetter={({ index }) => userList[index]}
              // rowRenderer={this.rowRenderer}
              onRowClick={({ rowData }) => this.addList(rowData)}
            >
              <Column label="사번" dataKey="emrno" width="100" />
              <Column label="이름" dataKey="usrnm" width="150" />
              <Column label="직책" dataKey="psnm" width="75" />
              <Column label="직위" dataKey="jgnm" width="75" />
            </Table>
          </div>
          <div className="selected_list">
            <div className="column">
              <span>선택된 인원</span>
            </div>
            <ul>
              {selectedList.map(user => (
                <li className="user_tag" key={user.emrno}>
                  <span>{`${user.emrno} ${user.usrnm} ${user.psnm}`}</span>
                  <button type="button" className="close">
                    <i className="fas fa-times" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Wrapper>
    );
  }
}

export default EmployeeSearcher;
