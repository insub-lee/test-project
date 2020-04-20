import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Select, Button, Table, Input, Modal, Tag } from 'antd';

import StyledAntdTable from 'components/CommonStyled/StyledAntdTable';
import StyledTextarea from 'commonStyled/Form/StyledTextarea';
import StyledModal from 'commonStyled/Modal/StyledModal';
import UserSelect from 'components/UserSelect';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

const AntdTable = StyledAntdTable(Table);
const AntdTextArea = StyledTextarea(Input.TextArea);
const AntdModal = StyledModal(Modal);

class ExternalDistView extends Component {
  state = {
    isShow: false,
    initUserList: [],
  };

  columns = [
    {
      title: 'No.',
      dataIndex: 'DOCNUMBER',
      key: 'DOCNUMBER',
      align: 'center',
      width: '20%',
    },
    {
      title: 'Rev',
      dataIndex: 'VERSION',
      key: 'VERSION',
      align: 'center',
      width: '15%',
    },
    {
      title: 'Title',
      dataIndex: 'TITLE',
      key: 'TITLE',
    },
  ]

  componentDidMount() {
    const { id, apiAry, getCallDataHandler, setFormData, docList } = this.props;
    getCallDataHandler(id, apiAry, () => {
      setFormData(id, {
        ctrlType: 'C',
        docList,
        selectedUserList: [],
        referrer: '',
        distribute_reason: '',
        comment: '',
      });
    });
  };

  onUserSelectModal = () => {
    this.setState({ isShow: true });
  };

  onUserSelectedComplete = result => {
    this.props.changeFormData(this.props.id, 'selectedUserList', result);
    this.setState({
      isShow: false,
      initUserList: result.map(item => item.USER_ID),
    });
  };

  onCancel = () => {
    this.setState({ isShow: false });
  };

  onCloseTag = (e, user) => {
    e.preventDefault();
    const { formData, changeFormData, id } = this.props;
    const { selectedUserList } = formData;
    const findIdx = selectedUserList.findIndex(item => item.USER_ID === user.USER_ID);
    selectedUserList.splice(findIdx, 1);
    changeFormData(id, 'selectedUserList', selectedUserList);
    
    this.setState({
      initUserList: selectedUserList.map(item => item.USER_ID),
    });
  };

  onChangeFormData = (key, val) => {
    const { id, changeFormData } = this.props;
    changeFormData(id, key, val);
  };

  onExternalDistribute = e => {
    e.preventDefault();
    const { id, formData, setFormData, submitHandlerBySaga, onExternalDistComplete } = this.props;
    if (formData.selectedUserList.length > 0) {
      submitHandlerBySaga(id, 'POST', '/api/mdcs/v1/common/externalDistribute', { PARAM: { ...formData } }, (id, response) => {
        if (response && response.result > 0) {
          setFormData(id, {
            docList: [],
            selectedUserList: [],
            referrer: '',
            distribute_reason: '',
            comment: '',
          });
          onExternalDistComplete();
        } else {
          message.error(<MessageContent>{`외부배포에 실패하였습니다.`}</MessageContent>);
        }
      });
    } else {
      message.info(<MessageContent>{`수신자를 선택해주세요.`}</MessageContent>);
    }
  };

  render() {
    const { result: { distDeptList }, formData } = this.props;
    let list;
    if (distDeptList && distDeptList !== undefined) {
      if (distDeptList.list !== undefined) {
        list = distDeptList.list.filter(item => item.DEPT_ID === 1461 || item.PRNT_ID === 1461);
      }
    }
      
    return (
      <div>
        <Row>
          <Col span={24}>
            <div style={{ backgroundColor: '#bfbfbf', padding: '1.1em .4em 1.1em' }}>
              <span><strong>이 문서 및 도면은 MagnaChip 반도체의 자산이므로 불법 유출시 관계법과 MagnaChip 회사 규정에 의해 처벌함</strong></span>
            </div>
          </Col>
        </Row>
        <Row style={{ marginTop: '20px' }}>
          <Col span={16}>
            <Select style={{ width: '250px' }} value={formData.ctrlType} onChange={val => this.onChangeFormData('ctrlType', val)}>
              <Select.Option value='C'>CONTROLLED 배포</Select.Option>
              <Select.Option value='U'>UNCONTROLLED 배포</Select.Option>
            </Select>
          </Col>
          <Col span={8} style={{ textAlign: 'right' }}>
            <Button>외부 사용자 등록</Button>
            <Button style={{ marginLeft: '5px' }} type="primary" onClick={this.onExternalDistribute}>외부배포</Button>
          </Col>
        </Row>
        <Row>
          <Col span={14} style={{ backgroundColor: '#ebebeb', border: '1px solid #ddd', height: '26px' }}>문서정보</Col>
          <Col span={10} style={{ backgroundColor: '#ebebeb', border: '1px solid #ddd', height: '26px' }}>
            수신자
            <p style={{ float: 'right' }}>
              <Button size='small' onClick={this.onUserSelectModal}>검색</Button>
            </p>
          </Col>
        </Row>
        <Row>
          <Col span={14} style={{ border: '1px solid #ddd' }}>
            <AntdTable columns={this.columns} dataSource={formData.docList} pagination={false} />
          </Col>
          <Col span={10}>
            <Row>
              <Col style={{ height: '129px'}}>
                {formData.selectedUserList && formData.selectedUserList.length > 0 && (
                  formData.selectedUserList.map(user => (
                    <Tag key={`tag_${user.USER_ID}`} closable onClose={e => this.onCloseTag(e, user)}>{`${user.NAME_KOR}(${user.EMAIL})`}</Tag>
                  ))
                )}
              </Col>
            </Row>
            <Row>
              <Col style={{ backgroundColor: '#ebebeb', border: '1px solid #ddd' }}>참조</Col>
            </Row>
            <Row>
              <Col>
                <AntdTextArea value={formData.referrer} placeholder={`참조란에 2명이상 입력시 ' ; ' 로 구분`} onChange={e => this.onChangeFormData('referrer', e.target.value)} />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col span={14} style={{ backgroundColor: '#ebebeb', border: '1px solid #ddd' }}>배포사유</Col>
          <Col span={10} style={{ backgroundColor: '#ebebeb', border: '1px solid #ddd' }}>전달내용</Col>
        </Row>
        <Row>
          <Col span={14} style={{ border: '1px solid #ddd' }}>
            <AntdTextArea rows={8} value={formData.distribute_reason} onChange={e => this.onChangeFormData('distribute_reason', e.target.value)} />
          </Col>
          <Col span={10}>
            <AntdTextArea rows={8} value={formData.comment} onChange={e => this.onChangeFormData('comment', e.target.value)} />
          </Col>
        </Row>
        {list !== undefined && (
          <AntdModal title="담당자 선택" width="1000px" visible={this.state.isShow} onCancel={this.onCancel} destroyOnClose footer={[]}>
            <UserSelect
              initUserList={this.state.initUserList}
              treeDataSource={list}
              // userDataList={result.userList && result.userList.list}
              // onTreeSelect={this.onTreeSelect}
              // onUserSelectHandler={this.onUserSelect}
              onUserSelectedComplete={this.onUserSelectedComplete}
              onCancel={this.onCancel}
            />
          </AntdModal>
        )}
      </div>
    );
  }
}

ExternalDistView.propTypes = {
  id: PropTypes.string,
  docList: PropTypes.array,
  apiAry: PropTypes.array,
  result: PropTypes.object,
  formData: PropTypes.object,
  getCallDataHandler: PropTypes.func,
  setFormData: PropTypes.func,
  changeFormData: PropTypes.func,
}

ExternalDistView.defaultProps = {
  docList: [],
  apiAry: [
    {
      key: 'distDeptList',
      url: '/api/mdcs/v1/common/distribute/DistributeDeptMgnt',
      type: 'GET',
      params: {},
    },
  ],
  result: {
    distDeptList: {
      list: [],
    },
  },
  formData: {
    docList: [],
    selectedUserList: [],
    referrer: '',
    distribute_reason: '',
    comment: '',
  },
  getCallDataHandler: () => {},
  setFormData: () => {},
  changeFormData: () => {},
}

export default ExternalDistView;