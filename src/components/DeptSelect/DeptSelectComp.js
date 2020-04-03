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
// <DeptSelect
//   rootDeptChange={true} - root부서 변경가능여부
//   defaultRootDeptId={1461} - defaultRootDeptId
//   selectedDeptId={111} - 선택된 부서ID
//   onComplete={this.onComplete}  확인버튼 클릭이벤트
//   onCancel={this.onCancel} 취소 버튼 이벤트
// />

const { Option } = Select;

const getTreeData = deptList =>
  deptList.length > 0
    ? getTreeFromFlatData({
        flatData: deptList.map(item => ({
          title: item.NAME_KOR,
          value: `${item.DEPT_ID}`,
          key: `${item.DEPT_ID}`,
          parentValue: `${item.PRNT_ID}`,
        })),
        getKey: node => node.key,
        getParentKey: node => node.parentValue,
        rootKey: '-1',
      })
    : [];

class DeptSelectComp extends Component {
  state = {
    rootDeptId: -1,
    selectedDeptId: -1,
  }

  componentDidMount() {
    const { defaultRootDeptId, selectedDeptId } = this.props;
    this.getDeptList(defaultRootDeptId);
    this.setState({
      rootDeptId: defaultRootDeptId,
      selectedDeptId,
    });
  }

  // 부서조회
  getDeptList = defaultRootDeptId => {
    const { id, getCallDataHandler } = this.props;
    const apiAry = [
      { 
        key: 'deptList',
        url: '/api/common/v1/account/deptSelectList',
        type: 'POST',
        params: { PARAM: { ROOT_DEPT_ID: defaultRootDeptId } } 
      },
      { 
        key: 'companyList',
        url: '/api/common/v1/account/organizationList',
        type: 'GET',
        params: {} 
      },
    ];
    getCallDataHandler(id, apiAry);
  }

  // Root부서 변경
  onChangeRootDept = val => {
    if (this.props.rootDeptChange) {
      this.setState({ rootDeptId: val });
      this.getDeptList(val);
    }
  };

  // 트리데이터 클릭
  onTreeSelect = selectedKeys => {
    if (selectedKeys && selectedKeys.length === 1) {
      this.setState({ selectedDeptId: Number(selectedKeys[0]) });
    } else {
      this.setState({ selectedDeptId: -1 });
    } 
  };

  // 확인(선택된 부서 리턴)
  onCompletePopup = () => {
    const { result, onComplete } = this.props;
    const filterRows = result.deptList.result.filter(item => item.DEPT_ID === this.state.selectedDeptId);
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
    const { result, rootDeptChange, defaultRootDeptId } = this.props;
    const treeData = result && result.deptList && result.deptList.result ? result.deptList.result : [];
    const rootDeptList = result && result.companyList && result.companyList.list ? (rootDeptChange ? result.companyList.list : result.companyList.list.filter(item => item.DEPT_ID === defaultRootDeptId ) ) : [];

    return (
      <TreeWrapper>
        <div className="tree-wrapper-inner">
          <Select value={this.state.rootDeptId} onChange={val => this.onChangeRootDept(val)}>
            {rootDeptList && (
              rootDeptList.map((item, idx) => (
                <Option value={item.DEPT_ID} key={idx}>
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
    );
  }
}

DeptSelectComp.propTypes = {

};

export default DeptSelectComp;