import React, { Component } from 'react';
import { Row, Col, Select, Modal, TreeSelect, Input, Icon } from 'antd';

import { getTreeFromFlatData } from 'react-sortable-tree';

import StyledButton from 'apps/mdcs/styled/StyledButton';
import UserSelect from 'components/UserSelect';
// import Organization from '../../../../../containers/portal/components/Organization';

import Styled from './Styled';

const { Option } = Select;

const getTreeData = (categoryMapList, rootId) =>
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
        rootKey: rootId,
      })
    : [];

class Edit extends Component {
  state = {
    isOpenModal: false,
  };

  componentDidMount() {}

  onUserSelect = result => {
    console.debug(result);
  };

  onUserSelectedComplete = result => {
    const { sagaKey, changeFormData } = this.props;

    if (result.length > 0) {
      changeFormData(sagaKey, 'APPROVER_ID', result[0].USER_ID);
      changeFormData(sagaKey, 'APPROVER_NAME', result[0].NAME_KOR);
      changeFormData(sagaKey, 'APPROVER_INFO', result);     
    }
    result.length > 0 &&
      this.setState({
        isOpenModal: false,
      });
  };

  onChangeValue = (key, val) => {
    const { sagaKey, changeFormData } = this.props;
    changeFormData(sagaKey, key, val);
  };

  onSave = () => {
    const { sagaKey, submitHadnlerBySaga, formData } = this.props;
    const submitData = {
      PARAM: { formData },
    };
    submitHadnlerBySaga(sagaKey, 'POST', '/api/mdcs/v1/common/DocApproverManageList', submitData, this.onSaveComplete);
  };

  onUpdate = () => {
    const { sagaKey, submitHadnlerBySaga, formData } = this.props;
    const submitData = {
      PARAM: { formData },
    };
    submitHadnlerBySaga(sagaKey, 'PUT', '/api/mdcs/v1/common/DocApproverManageList', submitData, this.onSaveComplete);
  };

  onSaveComplete = id => {
    const { getCallDataHanlder, apiAry, removeStorageReduxState } = this.props;
    removeStorageReduxState(id, 'result');
    getCallDataHanlder(id, apiAry);
    this.setState({
      displayUserName: undefined,      
    });
   this.onCancel();
  };

  onCancel = () => {
    const { sagaKey, removeStorageReduxState, changeFormData } = this.props;
    removeStorageReduxState(sagaKey, 'formData');
    changeFormData(sagaKey, 'actionType', 'I');
    this.setState({ isOpenModal: false });
  };

  render() {
    const { id, result, formData, actionType } = this.props;
    return (      
        <Styled id="docApproverManageWrap">
          <Row className="editRow firstRow">
            <Col span={2} className="titleCol">
              분류
            </Col>
            <Col span={10}>
              <TreeSelect
                className="editSelect"
                treeData={
                  result.categoryList &&
                  result.categoryList.categoryMapList &&
                  getTreeData(result.categoryList.categoryMapList, result.categoryList.categoryMapList[0].ROOT_ID)
                }
                placeholder="select me"
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                onChange={val => this.props.changeFormData(id, 'NODE_ID', val)}
                value={formData && formData.NODE_ID}
              />
            </Col>
            <Col span={2} className="titleCol">
              기안구분
            </Col>
            <Col span={10}>
              <Select
                value={formData && formData.DRAFT_TYPE}
                onChange={val => this.props.changeFormData(id, 'DRAFT_TYPE', val)}
                className="editSelect"
                placeholder="select me"
              >
                {result.draftTypes &&
                  result.draftTypes.categoryMapList &&
                  result.draftTypes.categoryMapList
                    .filter(x => x.PARENT_NODE_ID !== 0)
                    .map(draftType => <Option value={draftType.NODE_ID}>{draftType.NAME_KOR}</Option>)}
              </Select>
            </Col>
          </Row>
          <Row className="editRow">
            <Col span={2} className="titleCol">
              개정범위
            </Col>
            <Col span={10}>
              <Select
                value={formData && formData.DEGREE_FLAG}
                onChange={val => this.props.changeFormData(id, 'DEGREE_FLAG', val)}
                className="editSelect"
                placeholder="select me"
                dropdownStyle={{ width: '100px' }}
              >
                {result.dgreeTypes &&
                  result.dgreeTypes.categoryMapList &&
                  result.dgreeTypes.categoryMapList
                    .filter(x => x.PARENT_NODE_ID !== 0)
                    .map(dgreeType => <Option value={dgreeType.NODE_ID}>{dgreeType.NAME_KOR}</Option>)}
              </Select>
            </Col>
            <Col span={2} className="titleCol">
              결재단계
            </Col>
            <Col span={10}>
              <Select
                value={formData && formData.APPROVER_TYPE}
                onChange={val => this.props.changeFormData(id, 'APPROVER_TYPE', val)}
                className="editSelect"
                placeholder="select me"
                dropdownStyle={{ width: '100px' }}
              >
                {result.appvSteps &&
                  result.appvSteps.categoryMapList &&
                  result.appvSteps.categoryMapList
                    .filter(x => x.PARENT_NODE_ID !== 0)
                    .map(appvStep => <Option value={appvStep.NODE_ID}>{appvStep.NAME_KOR}</Option>)}
              </Select>
            </Col>
          </Row>
          <Row className="editRow">
            <Col span={2} className="titleCol">
              결재자
            </Col>
            <Col span={10}>
              <Input readOnly placeholder="select me" value={formData && formData.APPROVER_NAME} onClick={() => this.setState({ isOpenModal: true })} />
              <Modal visible={this.state.isOpenModal} width="1000px" onCancel={this.onCancel} destroyOnClose footer={[]}>
                <UserSelect onUserSelectHandler={this.onUserSelect} onUserSelectedComplete={this.onUserSelectedComplete}></UserSelect>
              </Modal>
            </Col>
            <Col span={2} className="titleCol">
              사용여부
            </Col>
            <Col span={10}>
              <Select
                value={formData && formData.USED_YN}
                onChange={val => this.props.changeFormData(id, 'USED_YN', val)}
                className="editSelect"
                placeholder="select me"
                dropdownStyle={{ width: '100px' }}
              >
                <Option value={1}>Y</Option>
                <Option value={0}>N</Option>
              </Select>
            </Col>
          </Row>
          <Row className="editRow">
            <Col className="buttonCol">
              <>
                {formData && formData.actionType === 'I' ? (
                  <StyledButton className="btn-primary btn-first" onClick={() => this.onSave()}>
                    저장
                  </StyledButton>
                ) : (
                  <StyledButton className="btn-primary btn-first" onClick={() => this.onUpdate()}>
                    수정
                  </StyledButton>
                )}
                <StyledButton className="btn-light" onClick={() => this.onCancel()}>
                  CANCEL
                </StyledButton>
              </>
            </Col>
          </Row>
        </Styled>      
    );
  }
}

export default Edit;
