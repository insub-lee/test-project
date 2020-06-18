import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'rc-dialog';

import { Tree, Spin, Icon } from 'antd';
import Scrollbars from 'react-custom-scrollbars';
import Checkbox from 'apps/wts/components/CheckboxGroup/Checkbox';
import { jsonToQueryString } from 'utils/helpers';
import StyledContent from './StyledContent';
import StyledStandard from '../../StyledStandard';
// import { areas } from '../sampleData';
import service from '../service';

const { TreeNode } = Tree;

class WorkerGroupManageModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      tree: [],
      usrId: '',
      isLoading: true,
      selectedFromKey: '',
      selectedFromTargets: [],
      selectedToKey: '',
      selectedToTargets: [],
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleAfterOpen = this.handleAfterOpen.bind(this);
    this.fetchTreeData = this.fetchTreeData.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.handleTransferFrom = this.handleTransferFrom.bind(this);
    this.handleTransferTo = this.handleTransferTo.bind(this);
    this.filteredList = this.filteredList.bind(this);
    this.toggleKeyFromList = this.toggleKeyFromList.bind(this);
    this.toggleKeyToList = this.toggleKeyToList.bind(this);
    this.sendData = this.sendData.bind(this);
    this.initTreeData = this.initTreeData.bind(this);
  }

  initTreeData() {
    const { usrId } = this.state;
    this.setState({ isLoading: true }, () => {
      this.fetchTreeData(usrId).then(payload => {
        const { manWorkJoList } = payload;
        const tree = [];
        manWorkJoList.forEach(info => {
          const parentIndex = tree.findIndex(obj => obj.id === info.area);
          if (parentIndex > -1) {
            const bayList = tree[parentIndex].children;
            const bayIndex = bayList.findIndex(obj => obj.id === info.bay);
            if (bayIndex > -1) {
              const userList = bayList[bayIndex].children;
              userList.push({
                key: `${parentIndex}-${bayIndex}-${userList.length}`,
                type: 'USER',
                id: info.empno,
                title: `${info.usrnm}(${info.empno})`,
              });
            } else {
              bayList.push({
                key: `${parentIndex}-${bayList.length}`,
                type: 'BAY',
                id: info.bay,
                title: info.bay,
                children: [{ key: `${parentIndex}-${bayList.length}-0`, type: 'USER', id: info.empno, title: `${info.usrnm}(${info.empno})` }],
              });
            }
          } else {
            tree.push({
              key: `${tree.length}`,
              type: 'AREA',
              id: info.area,
              title: info.area,
              children: [
                {
                  key: `${tree.length}-0`,
                  type: 'BAY',
                  id: info.bay,
                  title: info.bay,
                  children: [{ key: `${tree.length}-0-0`, type: 'USER', id: info.empno, title: `${info.usrnm}(${info.empno})` }],
                },
              ],
            });
          }
        });
        const newTree = tree.map((area, index) => {
          const nextArea = area;
          if (nextArea.children.findIndex(bay => bay.id === '휴직') < 0) {
            nextArea.children.push({ key: `${index}-${nextArea.children.length}`, type: 'BAY', id: '휴직', title: '휴직', children: [] });
          }
          if (nextArea.children.findIndex(bay => bay.id === '미배정') < 0) {
            nextArea.children.push({ key: `${index}-${nextArea.children.length}`, type: 'BAY', id: '미배정', title: '미배정', children: [] });
          }
          return nextArea;
        });
        this.setState({ tree: newTree, isLoading: false });
      });
    });
  }

  handleOpenModal(empNo) {
    this.setState({ isOpen: true, usrId: empNo, tree: [], isLoading: false }, () => {
      this.initTreeData();
    });
  }

  handleCloseModal() {
    const { callbackHandler } = this.props;
    this.setState({ isOpen: false, isLoading: true }, () => callbackHandler());
  }

  handleAfterOpen() {
    const { id } = this.state;
  }

  handleTreeNodeRenderer(tree = []) {
    return tree.map(node => {
      if (node.type !== 'USER') {
        return (
          <TreeNode
            key={node.key}
            title={
              <span style={{ verticalAlign: 'middle', fontSize: 15, fontWeight: 600 }}>
                {(node.type === 'AREA' || node.type === 'BAY') && `${node.type} : `}
                {node.title}
                {node.type === 'BAY' && `(${node.children ? node.children.length : 0}명)`}
              </span>
            }
            selectable={false}
          >
            {this.handleTreeNodeRenderer(node.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={node.key} title={node.title} isLeaf />;
    });
  }

  sendData(isFromTo = true) {
    const { usrId } = this.state;
    if (isFromTo) {
      const { selectedFromTargets, selectedToKey } = this.state;
      const payload = {
        empNos: selectedFromTargets,
        bay: selectedToKey,
        type: 'workjoByEmpnos',
        usrId,
      };
      const message = `선택한 사원을 ${selectedToKey} 로 이동시키겠습니까?`;
      if (window.confirm(message)) {
        this.updateUsers(payload).then(result => {
          if (result) {
            this.setState({ selectedFromTargets: [] }, () => this.initTreeData());
          } else {
            alert('Server Error');
          }
        });
      }
    } else {
      const { selectedToTargets, selectedFromKey } = this.state;
      const payload = {
        empNos: selectedToTargets,
        bay: selectedFromKey,
        type: 'workjoByEmpnos',
        usrId,
      };
      const message = `선택한 사원을 ${selectedFromKey} 로 이동시키겠습니까?`;
      if (window.confirm(message)) {
        this.updateUsers(payload).then(result => {
          if (result) {
            this.setState({ selectedToTargets: [] }, () => this.initTreeData());
          } else {
            alert('Server Error');
          }
        });
      }
    }
  }

  async fetchTreeData(empNo) {
    const requestQuery = {
      empNo,
      type: 'manWorkJoList',
    };
    const queryString = jsonToQueryString(requestQuery);
    const { response, error } = await service.manHisChief.get(queryString);
    const payload = {};
    if (response && !error) {
      payload[requestQuery.type] = response[requestQuery.type];
    }
    return payload;
  }

  onDrop(info) {
    const dropKey = info.node.props.eventKey;
    const dragKey = info.dragNode.props.eventKey;
    const dropPos = info.node.props.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
    const dropKeyList = dropKey.split('-').map(key => Number(key));
    const dragKeyList = dragKey.split('-').map(key => Number(key));
    if (dragKeyList.length === 3 && info.node.props.expanded && dropKeyList.length === 2 && dragKeyList[1] !== dropKeyList[1] && dropPosition === 0) {
      const { tree } = this.state;
      const fromChildren = tree[dragKeyList[0]].children[dragKeyList[1]].children;
      const toChildren = tree[dropKeyList[0]].children[dropKeyList[1]].children;
      const fromUser = fromChildren[dragKeyList[2]];
      const toUser = {
        ...fromUser,
        key: `${dropKeyList.join('-')}-${toChildren.length}`,
      };
      const empNo = toUser.id;
      const area = tree[dropKeyList[0]].id;
      const bay = tree[dropKeyList[0]].children[dropKeyList[1]].id;

      fromChildren.splice(dragKeyList[2], 1);
      tree[dragKeyList[0]].children[dragKeyList[1]].children = fromChildren.map((user, index) => ({
        ...user,
        key: `${dragKeyList[0]}-${dragKeyList[1]}-${index}`,
      }));
      tree[dropKeyList[0]].children[dropKeyList[1]].children.push(toUser);

      const { usrId } = this.state;
      const payload = {
        empNo,
        bay,
        area,
        type: 'workjo',
        usrId,
      };

      this.setState({ isLoading: true }, () => {
        this.updateUser(payload).then(result => {
          if (result) {
            this.setState({ tree, isLoading: false });
          }
        });
      });
    }
  }

  async updateUser(payload) {
    let result = false;
    const { response, error } = await service.manHisChief.put(payload);
    if (response && !error) {
      result = response.updateyn;
    }
    return result;
  }

  async updateUsers(payload) {
    let result = false;
    const { response, error } = await service.manHisChief.put(payload);
    if (response && !error) {
      result = response.updateyn;
    }
    return result;
  }

  handleTransferFrom(e) {
    const { value } = e.target;
    this.setState({ selectedFromKey: value, selectedFromTargets: [] });
  }

  handleTransferTo(e) {
    const { value } = e.target;
    this.setState({ selectedToKey: value, selectedToTargets: [] });
  }

  filteredList() {
    const { tree, selectedFromKey, selectedToKey } = this.state;
    if (tree.length > 0) {
      const listFrom = (selectedFromKey === '' ? [] : tree[0].children.find(bay => bay.id === selectedFromKey).children) || [];
      const listTo = (selectedToKey === '' ? [] : tree[0].children.find(bay => bay.id === selectedToKey).children) || [];
      return { listFrom, listTo };
    }
    return { listFrom: [], listTo: [] };
  }

  toggleKeyFromList(id) {
    this.setState(prevState => {
      const { selectedFromTargets } = prevState;
      if (selectedFromTargets.includes(id)) {
        const index = selectedFromTargets.findIndex(userId => userId === id);
        selectedFromTargets.splice(index, 1);
        return {
          selectedFromTargets,
        };
      }
      selectedFromTargets.push(id);
      return { selectedFromTargets };
    });
  }

  toggleKeyToList(id) {
    this.setState(prevState => {
      const { selectedToTargets } = prevState;
      if (selectedToTargets.includes(id)) {
        const index = selectedToTargets.findIndex(userId => userId === id);
        selectedToTargets.splice(index, 1);
        return {
          selectedToTargets,
        };
      }
      selectedToTargets.push(id);
      return { selectedToTargets };
    });
  }

  render() {
    const { isOpen, tree, isLoading, selectedFromKey, selectedToKey, selectedFromTargets, selectedToTargets } = this.state;
    const { listFrom, listTo } = this.filteredList();
    return (
      <Modal
        maskClosable={false}
        visible={isOpen}
        animation="zoom"
        maskAnimation="fade"
        onClose={this.handleCloseModal}
        bodyStyle={{
          padding: 0,
        }}
        closable={false}
        destroyOnClose
      >
        <StyledStandard>
          <StyledContent>
            <div className="pop_tit">
              BAY 설정
              <button type="button" className="icon icon_pclose" onClick={this.handleCloseModal} />
            </div>
            <div className="pop_con">
              <p style={{ padding: '5px 0', fontWeight: 500 }}>
                <i className="xi-info-o xi-x" /> 사원을 선택후 이동시 바로 저장됩니다.
              </p>
              <Spin tip="Loading..." indicator={<Icon type="loading" spin />} spinning={isLoading}>
                <div style={{ overflowY: 'auto', border: '1px solid #eaecee' }}>
                  <div className="transfer_box">
                    <div className="transfer-from">
                      <select name="" className="transfer-target_selector" value={selectedFromKey} onChange={this.handleTransferFrom}>
                        <option value="" disabled>
                          BAY를 지정해주세요.
                        </option>
                        {tree.length > 0 &&
                          tree[0].children.map(bay => (
                            <option value={bay.id} key={bay.id} disabled={bay.id === selectedToKey}>
                              {bay.title}
                            </option>
                          ))}
                      </select>
                      {tree.length > 0 && (
                        <Scrollbars style={{ height: 'calc(100% - 45px)', marginTop: 15, background: 'transparent' }} autoHide>
                          {listFrom.map(user => (
                            <div key={user.id} style={{ padding: 5 }}>
                              <Checkbox
                                className="checkbox"
                                labelText={user.title}
                                id={user.id}
                                noPadding
                                checked={selectedFromTargets.includes(user.id)}
                                onChange={() => this.toggleKeyFromList(user.id)}
                              />
                            </div>
                          ))}
                        </Scrollbars>
                      )}
                    </div>
                    <div className="transfer-action">
                      <ul className="transfer-action_list">
                        <li style={{ textAlign: 'center' }} className={selectedFromTargets.length > 0 && selectedToKey !== '' ? 'active' : ''}>
                          <button
                            type="button"
                            style={{ margin: 'auto' }}
                            disabled={selectedFromTargets.length === 0 || !selectedFromKey || !selectedToKey || selectedFromKey === '' || selectedToKey === ''}
                            onClick={() => this.sendData(true)}
                          >
                            <i className="fa fa-arrow-circle-right fa-2x" />
                          </button>
                        </li>
                        <li style={{ textAlign: 'center' }} className={selectedToTargets.length > 0 && selectedFromKey !== '' ? 'active' : ''}>
                          <button
                            type="button"
                            style={{ margin: 'auto' }}
                            disabled={selectedToTargets.length === 0 || !selectedFromKey || !selectedToKey || selectedFromKey === '' || selectedToKey === ''}
                            onClick={() => this.sendData(false)}
                          >
                            <i className="fa fa-arrow-circle-left fa-2x" />
                          </button>
                        </li>
                      </ul>
                    </div>
                    <div className="transfer-to">
                      <select name="" className="transfer-target_selector" value={selectedToKey} onChange={this.handleTransferTo}>
                        <option value="" disabled>
                          BAY를 지정해주세요.
                        </option>
                        {tree.length > 0 &&
                          tree[0].children.map(bay => (
                            <option value={bay.id} key={bay.id} disabled={bay.id === selectedFromKey}>
                              {bay.title}
                            </option>
                          ))}
                      </select>
                      {tree.length > 0 && (
                        <Scrollbars style={{ height: 'calc(100% - 45px)', marginTop: 15, background: 'transparent' }} autoHide>
                          {listTo.map(user => (
                            <div key={user.id} style={{ padding: 5 }}>
                              <Checkbox
                                className="checkbox"
                                labelText={user.title}
                                id={user.id}
                                noPadding
                                checked={selectedToTargets.includes(user.id)}
                                onChange={() => this.toggleKeyToList(user.id)}
                              />
                            </div>
                          ))}
                        </Scrollbars>
                      )}
                    </div>
                  </div>
                  {/*
                  <Tree draggable onDrop={this.onDrop}>
                    {this.handleTreeNodeRenderer(tree)}
                  </Tree>
                  */}
                </div>
              </Spin>
            </div>
          </StyledContent>
        </StyledStandard>
      </Modal>
    );
  }
}

WorkerGroupManageModal.propTypes = {
  callbackHandler: PropTypes.func,
};

WorkerGroupManageModal.defaultProps = {
  callbackHandler: () => false,
};

export default WorkerGroupManageModal;
