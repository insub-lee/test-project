import React, { Component } from 'react';
import { Row, Col, Select, Button, TreeSelect, Input } from 'antd';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import { getTreeFromFlatData } from 'react-sortable-tree';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

import Organization from '../../../../../containers/portal/components/Organization';
import selectors from '../selectors';

import Styled from './Styled';

const { Option } = Select;

const getTreeData = categoryMapList =>
  categoryMapList.length > 0
    ? getTreeFromFlatData({
      flatData: categoryMapList
        .filter(filterItem => filterItem.USE_YN === 'Y')
        .map(item => ({
          title: item.NAME_KOR,
          value: item.NODE_ID,
          key: item.NODE_ID,
          parentValue: item.PARENT_NODE_ID,
        })),
      getKey: node => node.key,
      getParentKey: node => node.parentValue,
      rootKey: 9,
    })
    : [];

class Edit extends Component {
  state = {
    modifyInfo: {
      modifyYn: false,
      taskSeq: -1,
      tempData: {},
    },
    isOpenModal: false,
    selectedUsers: [],
    displayUserName: '',
  };

  componentWillMount() {
    const { getExtraApiData, id, localApiArr } = this.props;
    getExtraApiData(id, localApiArr);
  }

  setSelectedUser = (type, selectedUsers) => {
    const { changeFormData, id } = this.props;
    let userId = '';
    let displayUserName = '';
    if (selectedUsers.length > 0) {
      userId = selectedUsers[0].USER_ID;
      displayUserName = `${selectedUsers[0].NAME_KOR}(${selectedUsers[0].EMP_NO} ${selectedUsers[0].DEPT_NAME_KOR}/${selectedUsers[0].PSTN_NAME_KOR}/${selectedUsers[0].DUTY_NAME_KOR})`;
    }
    if (type === 'modify') {
      this.setState({ selectedUsers, displayUserName });
    } else {
      this.setState({ selectedUsers, displayUserName }, () => changeFormData(id, 'APPROVER_ID', userId));
    }
  };

  // 리스트에서 수정버튼 눌렀을시 input에 값 대입 및 수정상태 flag 설정
  setModifyInfo = USERD_YN => {
    const { extraApiData, formData, getDetailData, workSeq, id } = this.props;
    const approverList = extraApiData.listData.list;

    let approverInfo;

    approverInfo = approverList.find(
      item =>
        item.NODE_ID === formData.NODE_ID &&
        item.APPROVER_ID === formData.APPROVER_ID &&
        item.DEGREE_FLAG === formData.DEGREE_FLAG &&
        item.DRAFT_TYPE === formData.DRAFT_TYPE &&
        item.USED_YN === USERD_YN &&
        item.APPROVER_TYPE === formData.APPROVER_TYPE,
    );

    this.setState(
      {
        modifyInfo: {
          modifyYn: true,
          taskSeq: approverInfo.TASK_SEQ,
          tempData: approverInfo,
        },
      },
      () => getDetailData(id, workSeq, this.state.modifyInfo.taskSeq),
    );

    this.setSelectedUser('modify', [approverInfo.APPROVER_INFO]);
  };

  // 수정모드 리셋버튼 : 기존값으로 form데이터 변경
  resetBtnHandle = () => {
    const { changeFormData, id } = this.props;
    const { modifyInfo } = this.state;
    changeFormData(id, 'NODE_ID', modifyInfo.tempData.NODE_ID);
    changeFormData(id, 'APPROVER_ID', modifyInfo.tempData.APPROVER_ID);
    changeFormData(id, 'DEGREE_FLAG', modifyInfo.tempData.DEGREE_FLAG);
    changeFormData(id, 'DRAFT_TYPE', modifyInfo.tempData.DRAFT_TYPE);
    changeFormData(id, 'USED_YN', modifyInfo.tempData.USED_YN);
    changeFormData(id, 'APPROVER_TYPE', modifyInfo.tempData.APPROVER_TYPE);
    this.setSelectedUser('modify', [modifyInfo.tempData.APPROVER_INFO]);
  };

  // 수정모드 취소
  cancelBtnHandle = () => {
    const { changeFormData, id } = this.props;
    changeFormData(id, 'NODE_ID', 0);
    changeFormData(id, 'APPROVER_ID', 0);
    changeFormData(id, 'DEGREE_FLAG', 0);
    changeFormData(id, 'DRAFT_TYPE', 0);
    changeFormData(id, 'USED_YN', 0);
    changeFormData(id, 'APPROVER_TYPE', 0);
    this.setState({
      modifyInfo: {
        modifyYn: false,
        taskSeq: -1,
        tempData: {},
      },
      selectedUsers: [],
      displayUserName: '',
    });
  };

  // 수정완료
  modifySavaBtnHandle = () => {
    const { id, workSeq, modifyTaskBySeq, extraApiData, formData } = this.props;
    const { modifyInfo } = this.state;
    const { dataReloadCallbackFunc } = this;

    const orgTaskList = extraApiData.listData.list; // 기존 taskList
    const overlapYn = orgTaskList.find(
      item =>
        item.NODE_ID === formData.NODE_ID &&
        item.APPROVER_ID === formData.APPROVER_ID &&
        item.DEGREE_FLAG === formData.DEGREE_FLAG &&
        item.DRAFT_TYPE === formData.DRAFT_TYPE &&
        item.USED_YN === formData.USED_YN &&
        item.APPROVER_TYPE === formData.APPROVER_TYPE,
    );

    if (overlapYn === undefined) {
      modifyTaskBySeq(id, workSeq, modifyInfo.taskSeq, dataReloadCallbackFunc);
      this.setState(
        {
          modifyInfo: {
            modifyYn: false,
            taskSeq: -1,
            tempData: {},
          },
          selectedUsers: [],
          displayUserName: '',
        },
        () => message.success(<MessageContent>내용을 수정하였습니다.</MessageContent>, 2),
      );
    } else {
      message.error(<MessageContent>동일한 내용이 이미 등록되어있습니다.</MessageContent>, 2);
    }
  };

  // 동일한 레코드 유무 검사 후 저장
  saveBtnHandle = () => {
    const { id, reload_id, saveTask, extraApiData, formData } = this.props;
    const { dataReloadCallbackFunc } = this;
    const orgTaskList = extraApiData.listData.list; // 기존 taskList
    const overlapYn = orgTaskList.find(
      item =>
        item.NODE_ID === formData.NODE_ID &&
        item.APPROVER_ID === formData.APPROVER_ID &&
        item.DEGREE_FLAG === formData.DEGREE_FLAG &&
        item.DRAFT_TYPE === formData.DRAFT_TYPE &&
        item.USED_YN === formData.USED_YN &&
        item.APPROVER_TYPE === formData.APPROVER_TYPE,
    );

    if (overlapYn === undefined) {
      this.setState({ selectedUsers: [], displayUserName: '' }, () => saveTask(id, reload_id, dataReloadCallbackFunc));
      message.success(<MessageContent>신규 결재자를 등록하였습니다.</MessageContent>, 2);
    } else {
      message.error(<MessageContent>동일한 내용이 이미 등록되어있습니다.</MessageContent>, 2);
    }
  };

  dataReloadCallbackFunc = id => {
    const { getExtraApiData, localApiArr, reload_id } = this.props;
    getExtraApiData(id, localApiArr); // 에딧쪽 리로드
    getExtraApiData(reload_id, localApiArr); // 리스트쪽 리로드
  };
  // componentDidUpdate() {
  //   const { formData } = this.props;
  //   const { selectedUsers } = this.state;
  //   if (!formData.APPROVER_ID && selectedUsers.length > 0) {
  //     this.setState({ selectedUsers: [], displayUserName: '' });
  //   }
  // }

  render() {
    const {
      responseData,
      metaList,
      changeFormData,
      saveTask,
      id,
      categoryMapInfo,
      draftMapInfo,
      degreeMapInfo,
      approverMapInfo,
      reload_id,
      formData,
      extraApiData,
      modifyTaskBySeq,
    } = this.props;

    const { displayUserName, selectedUsers, modifyInfo } = this.state;

    if (Object.prototype.hasOwnProperty.call(formData, 'USED_YN')) {
      const checkModify = String(formData.USED_YN);
      if (checkModify.includes('_modify')) {
        const USERD_YN = Number(checkModify.substring(0, 1));
        changeFormData(id, 'USED_YN', USERD_YN);
        this.setModifyInfo(USERD_YN);
      }
    }

    return (
      <Styled id="docApproverManageWrap">
        <Row className="editRow firstRow">
          <Col span={4} className="titleCol">
            분류
          </Col>
          <Col span={8}>
            <TreeSelect
              className="editSelect"
              placeholder="select me"
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              treeData={getTreeData(categoryMapInfo.toJS())}
              onChange={value => changeFormData(id, 'NODE_ID', value)}
              value={formData.NODE_ID || undefined}
            />
          </Col>
          <Col span={4} className="titleCol">
            기안구분
          </Col>
          <Col span={8}>
            <Select
              className="editSelect"
              placeholder="select me"
              dropdownStyle={{ width: '100px' }}
              onChange={value => changeFormData(id, 'DRAFT_TYPE', value)}
              value={formData.DRAFT_TYPE || undefined}
            >
              {draftMapInfo
                .toJS()
                .filter(filterItem => filterItem.LVL > 0 && filterItem.USE_YN === 'Y')
                .map(node => (
                  <Option key={`DRAFT_TYPE_${node.NODE_ID}`} value={node.NODE_ID}>
                    {node.NAME_KOR}
                  </Option>
                ))}
            </Select>
          </Col>
        </Row>
        <Row className="editRow">
          <Col span={4} className="titleCol">
            개정범위
          </Col>
          <Col span={8}>
            <Select
              className="editSelect"
              placeholder="select me"
              dropdownStyle={{ width: '100px' }}
              onChange={value => changeFormData(id, 'DEGREE_FLAG', value)}
              value={formData.DEGREE_FLAG || undefined}
            >
              {degreeMapInfo
                .toJS()
                .filter(filterItem => filterItem.LVL > 0 && filterItem.USE_YN === 'Y')
                .map(node => (
                  <Option key={`DEGREE_FLAG${node.NODE_ID}`} value={node.NODE_ID}>
                    {node.NAME_KOR}
                  </Option>
                ))}
            </Select>
          </Col>
          <Col span={4} className="titleCol">
            결재단계
          </Col>
          <Col span={8}>
            <Select
              className="editSelect"
              placeholder="select me"
              dropdownStyle={{ width: '100px' }}
              onChange={value => changeFormData(id, 'APPROVER_TYPE', value)}
              value={formData.APPROVER_TYPE || undefined}
            >
              {approverMapInfo
                .toJS()
                .filter(filterItem => filterItem.LVL > 0 && filterItem.USE_YN === 'Y')
                .map(node => (
                  <Option key={`APPROVER_TYPE${node.NODE_ID}`} value={node.NODE_ID}>
                    {node.NAME_KOR}
                  </Option>
                ))}
            </Select>
          </Col>
        </Row>
        <Row className="editRow">
          <Col span={4} className="titleCol">
            결재자
          </Col>
          <Col span={8}>
            <Input readOnly placeholder="select me" value={this.state.displayUserName} onClick={() => this.setState({ isOpenModal: true })} />
          </Col>
          <Col span={4} className="titleCol">
            사용여부
          </Col>
          <Col span={8}>
            <Select
              className="editSelect"
              placeholder="select me"
              dropdownStyle={{ width: '100px' }}
              onChange={value => changeFormData(id, 'USED_YN', value)}
              value={formData.USED_YN || formData.USED_YN === 0 ? formData.USED_YN : undefined}
            >
              <Option value={1}>Y</Option>
              <Option value={0}>N</Option>
            </Select>
          </Col>
        </Row>
        <Row className="editRow">
          <Col className="buttonCol">
            {modifyInfo.modifyYn ? (
              <React.Fragment>
                <Button onClick={() => this.modifySavaBtnHandle()}>SAVE</Button>
                <Button onClick={() => this.resetBtnHandle()}>RESET</Button>
                <Button onClick={() => this.cancelBtnHandle()}>CANCEL</Button>
              </React.Fragment>
            ) : (
              <Button onClick={() => this.saveBtnHandle()}>SAVE</Button>
            )}
          </Col>
        </Row>
        <Organization
          show={this.state.isOpenModal}
          userTab
          selectedUsers={this.state.selectedUsers}
          checkedDept={[]}
          checkedPstn={[]}
          checkedDuty={[]}
          checkedGrp={[]}
          onlyUser
          selectSingleUser
          closeModal={() => this.setState({ isOpenModal: false })}
          getDataFromOrganization={result => this.setSelectedUser('insert', result.selectedUsers)}
        />
      </Styled>
    );
  }
}

Edit.propTypes = {
  responseData: PropTypes.object.isRequired,
  metaList: PropTypes.arrayOf(PropTypes.object).isRequired,
  categoryMapInfo: PropTypes.object,
  draftMapInfo: PropTypes.object,
  degreeMapInfo: PropTypes.object,
  approverMapInfo: PropTypes.object,
};

Edit.defaultProps = {
  categoryMapInfo: fromJS([]),
  draftMapInfo: fromJS([]),
  degreeMapInfo: fromJS([]),
  approverMapInfo: fromJS([]),
  localApiArr: [
    {
      key: 'listData',
      url: '/api/mdcs/v1/common/DocApproverManageList',
      type: 'GET',
      params: {},
    },
  ],
};

export default Edit;
