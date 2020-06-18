import React from 'react';
import PropTypes from 'prop-types';

import { Tree } from 'antd';
import Button from 'components/Button';
import StyledContent from './StyledContent';

const { TreeNode } = Tree;

class EtcMemberGroupManageModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKey: [],
    };
    this.selectKey = this.selectKey.bind(this);
    this.handleClickUpdateBtn = this.handleClickUpdateBtn.bind(this);
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

  selectKey(value) {
    this.setState({ selectedKey: value });
  }

  handleClickUpdateBtn() {
    if (window.confirm('현재 지정한 값으로 저장하시겠습니까?')) {
      const { selectedKey } = this.state;
      const { tree, setWorkEtcMember } = this.props;
      if (selectedKey.length > 0) {
        const [areaIndex, workjoIndex, bayIndex] = selectedKey[0].split('-');
        const area = tree[areaIndex].id;
        const workjo = tree[areaIndex].children[workjoIndex].id;
        const bay = tree[areaIndex].children[workjoIndex].children[bayIndex].id;
        const payload = {
          BAY: bay,
          AREA: area,
          WORKJO: workjo,
        };
        setWorkEtcMember(payload);
      }
    }
  }

  render() {
    const { selectedKey } = this.state;
    const { tree } = this.props;

    return (
      <div>
        <StyledContent>
          {/* <div className="pop_tit">
            {`BAY 설정 (${userInfo.area}-${userInfo.workjo}-${userInfo.bay}-${userInfo.part}-${userInfo.empno}-${userInfo.usrnm})`}
            <button type="button" className="icon icon_pclose" onClick={this.handleCloseModal} />
          </div> */}
          <div className="pop_con">
            <p style={{ padding: '5px 0', fontWeight: 500 }}>
              <i className="xi-info-o xi-x" /> BAY를 선택하고 확인을 누르세요.
            </p>
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
          </div>
        </StyledContent>
      </div>
    );
  }
}

EtcMemberGroupManageModal.propTypes = {
  callbackHandler: PropTypes.func,
};

EtcMemberGroupManageModal.defaultProps = {
  callbackHandler: () => false,
};

export default EtcMemberGroupManageModal;
