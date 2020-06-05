import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'rc-dialog';

import { Tree, Spin, Icon } from 'antd';
import Button from 'components/Button';
import StyledContent from './StyledContent';
import service from '../service';

const { TreeNode } = Tree;

class AdminWorkerGroupManageModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      tree: [],
      usrId: '',
      isLoading: true,
      userInfo: {},
      selectedKey: [],
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleAfterOpen = this.handleAfterOpen.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.selectKey = this.selectKey.bind(this);
    this.handleClickUpdateBtn = this.handleClickUpdateBtn.bind(this);
  }

  handleOpenModal(usrId, userInfo, tree) {
    this.setState({ isOpen: true, userInfo, tree, usrId, isLoading: false });
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
      if (node.type !== 'BAY') {
        return (
          <TreeNode
            key={node.key}
            title={<span style={{ verticalAlign: 'middle', fontSize: 15, fontWeight: 600 }}>{`${node.type} : ${node.title}`}</span>}
            selectable={false}
          >
            {this.handleTreeNodeRenderer(node.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={node.key} title={`${node.type} : ${node.title}`} isLeaf />;
    });
  }

  async updateUser(payload) {
    let result = false;
    const { response, error } = await service.manHisAdmin.put(payload);
    if (response && !error) {
      result = response.updateyn;
    }
    return result;
  }

  selectKey(value) {
    this.setState({ selectedKey: value });
  }

  handleClickUpdateBtn() {
    if (window.confirm('현재 지정한 값으로 저장하시겠습니까?')) {
      const { selectedKey, userInfo, tree, usrId } = this.state;
      if (selectedKey.length > 0) {
        const [areaIndex, workjoIndex, bayIndex] = selectedKey[0].split('-');
        const area = tree[areaIndex].id;
        const workjo = tree[areaIndex].children[workjoIndex].id;
        const bay = tree[areaIndex].children[workjoIndex].children[bayIndex].id;
        const payload = {
          empNo: userInfo.empno,
          bay,
          area,
          type: 'workjo',
          workjo,
          usrId,
        };
        this.updateUser(payload).then(result => {
          if (result) {
            const { callbackHandler } = this.props;
            this.handleCloseModal();
            callbackHandler();
          } else {
            alert('서버에러');
          }
        });
      }
    }
  }

  render() {
    const { isOpen, tree, isLoading, userInfo, selectedKey } = this.state;
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
        <div>
          <StyledContent>
            <div className="pop_tit">
              {`BAY 설정 (${userInfo.area}-${userInfo.workjo}-${userInfo.bay}-${userInfo.part}-${userInfo.empno}-${userInfo.usrnm})`}
              <button type="button" className="icon icon_pclose" onClick={this.handleCloseModal} />
            </div>
            <div className="pop_con">
              <p style={{ padding: '5px 0', fontWeight: 500 }}>
                <i className="xi-info-o xi-x" /> BAY를 선택하고 확인을 누르세요.
              </p>
              <Spin tip="Loading..." indicator={<Icon type="loading" spin />} spinning={isLoading}>
                <div style={{ height: 500, overflowY: 'auto', border: '1px solid #eaecee' }}>
                  <Tree onSelect={this.selectKey}>{this.handleTreeNodeRenderer(tree)}</Tree>
                </div>
                <div className="btn_wrap">
                  {selectedKey.length > 0 && (
                    <Button type="button" color="default" size="small" onClick={this.handleClickUpdateBtn}>
                      확인
                    </Button>
                  )}
                </div>
              </Spin>
            </div>
          </StyledContent>
        </div>
      </Modal>
    );
  }
}

AdminWorkerGroupManageModal.propTypes = {
  callbackHandler: PropTypes.func,
};

AdminWorkerGroupManageModal.defaultProps = {
  callbackHandler: () => false,
};

export default AdminWorkerGroupManageModal;
