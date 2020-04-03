import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getTreeFromFlatData } from 'react-sortable-tree';
import { Select, Tree } from 'antd';

import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';
import TreeWrapper from 'commonStyled/Wrapper/TreeWrapper';

// Component Attribute 및 Event Method 정리
// <PstnSelect
//   onComplete={this.onComplete}  확인버튼 클릭이벤트
//   onCancel={this.onCancel} 취소 버튼 이벤트
// />

const { Option } = Select;

const getTreeData = pstnList =>
  pstnList.length > 0
    ? getTreeFromFlatData({
        flatData: pstnList.map(item => ({
          title: item.NAME_KOR,
          value: `${item.PSTN_ID}`,
          key: `${item.PSTN_ID}`,
          parentValue: `${item.PRNT_ID}`,
        })),
        getKey: node => node.key,
        getParentKey: node => node.parentValue,
        rootKey: '-1',
      })
    : [];

class PstnSelectComp extends Component {
  state = {
    rootPstnId: -1,
    selectedPstnId: -1,
  }

  componentDidMount() {
    this.getRootPstnList();
  }

  // 루트 직위 조회
  getRootPstnList = () => {
    const { id, getCallDataHandlerReturnRes } = this.props;
    const apiInfo = { 
      key: 'rootPstnList',
      url: '/api/common/v1/account/organizationPstnList',
      type: 'GET',
      params: {} 
    };

    getCallDataHandlerReturnRes(id, apiInfo, (rId, res) => {
      if (res && res.list) {
        this.setState({ rootPstnId: res.list[0].PSTN_ID });
        this.getPstnList(res.list[0].PSTN_ID);
      }
    });
  }

  // 직위조회
  getPstnList = rootPstnId => {
    const { id, getCallDataHandler } = this.props;
    const apiAry = [
      { 
        key: 'pstnList',
        url: `/api/common/v1/account/pstnList/${rootPstnId}`,
        type: 'GET',
        params: {}
      },
    ];
    getCallDataHandler(id, apiAry, () => {});
  }

  // Root부서 변경
  onChangeRootPstn = val => {
    this.setState({ rootPstnId: val });
    this.getPstnList(val);
  };

  // 트리데이터 클릭
  onTreeSelect = selectedKeys => {
    if (selectedKeys && selectedKeys.length === 1) {
      this.setState({ selectedPstnId: Number(selectedKeys[0]) });
    } else {
      this.setState({ selectedPstnId: -1 });
    } 
  };

  // 확인(선택된 부서 리턴)
  onCompletePopup = () => {
    const { result, onComplete } = this.props;
    const filterRows = result.pstnList.list.filter(item => item.PSTN_ID === this.state.selectedPstnId);
    if (filterRows && filterRows.length === 1) {
      onComplete(filterRows[0]);
    } else {
      onComplete();
    }
  };

  // 취소
  onCancelPopup = () => {
    this.props.onCancel();
  };

  render() {
    const { result } = this.props;
    const treeData = result && result.pstnList && result.pstnList.list ? result.pstnList.list : [];
    const rootPstnList = result && result.rootPstnList && result.rootPstnList.list ? result.rootPstnList.list : [];

    return (
      <TreeWrapper>
        <div className="tree-wrapper-inner">
          <Select value={this.state.rootPstnId} onChange={val => this.onChangeRootPstn(val)}>
            {rootPstnList && (
              rootPstnList.map((item, idx) => (
                <Option value={item.PSTN_ID} key={idx}>
                  {item.NAME_KOR}
                </Option>
              ))
            )}
          </Select>
          <div className="depth-tree">
            <Tree
              treeData={getTreeData(treeData)}
              onSelect={this.onTreeSelect}
            />
          </div>
        </div>
        <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
          <StyledButton className="btn-light mr5" onClick={this.onCancelPopup}>취소</StyledButton>
          <StyledButton className="btn-primary" onClick={this.onCompletePopup}>확인</StyledButton>
        </StyledButtonWrapper>
      </TreeWrapper>
    )
  }
}

PstnSelectComp.propTypes = {

};

export default PstnSelectComp;