import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Select, Button, Table, Input, Modal, Tag } from 'antd';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledAntdTable from 'commonStyled/MdcsStyled/Table/StyledLineTable';
import StyledHtmlTable from 'commonStyled/MdcsStyled/Table/StyledHtmlTable';
import StyledTextarea from 'components/BizBuilder/styled/Form/StyledTextarea';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import UserSelect from 'components/UserSelect';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

const AntdTable = StyledAntdTable(Table);
const AntdTextArea = StyledTextarea(Input.TextArea);
const AntdSelect = StyledSelect(Select);
const AntdModal = StyledAntdModal(Modal);

class ExternalDistView extends Component {
  state = {
    isShow: false,
    initUserList: [],
    deptList: [],
  };

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
      this.initData();
    });
  };

  initData = () => {
    const { result } = this.props;
    if (result && result.distDeptList && result.distDeptList.list) {
      this.setState({ deptList : result.distDeptList.list });
    }
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

  render() {
    const { formData } = this.props;

    return (
      <StyledContentsWrapper>
        <Row>
          <Col span={24}>
            <div style={{ backgroundColor: '#bfbfbf', padding: '1.1em .4em 1.1em' }}>
              <span><strong>이 문서 및 도면은 MagnaChip 반도체의 자산이므로 불법 유출시 관계법과 MagnaChip 회사 규정에 의해 처벌함</strong></span>
            </div>
          </Col>
        </Row>
        <StyledHtmlTable>
          <table>
            <colgroup>
              <col width="60%" />
              <col width="40%" />
            </colgroup>
            <tbody>
              <tr>
                <td colSpan={2}>
                <AntdSelect className="select-sm" style={{ width: '250px' }} defaultValue="C" onChange={val => this.onChangeFormData('ctrlType', val)}>
                  <AntdSelect.Option value='C'>CONTROLLED 배포</AntdSelect.Option>
                  <AntdSelect.Option value='U'>UNCONTROLLED 배포</AntdSelect.Option>
                </AntdSelect>
                </td>
              </tr>
              <tr>
                <th>문서정보</th>
                <th>
                  수신자 <StyledButton className="btn-gray btn-xs" onClick={this.onUserSelectModal}>검색</StyledButton>
                </th>
              </tr>
              <tr>
                <td rowSpan={3} style={{ verticalAlign: 'top' }}>
                  <AntdTable columns={this.columns} dataSource={formData.docList} pagination={false} bordered />
                </td>
                <td style={{ height: 130, verticalAlign: 'top' }}>
                  {formData.selectedUserList && formData.selectedUserList.length > 0 && (
                    formData.selectedUserList.map(user => (
                      <Tag key={`tag_${user.USER_ID}`} closable onClose={e => this.onCloseTag(e, user)}>{`${user.NAME_KOR}(${user.EMAIL})`}</Tag>
                    ))
                  )}
                </td>
              </tr>
              <tr>
                <th>참조</th>
              </tr>
              <tr>
                <td>
                  <AntdTextArea
                    placeholder={`E-mail 형식으로 입력(2명이상 입력시 ' ; ' 로 구분)`}
                    onChange={e => this.onChangeFormData('referrer', e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <th>배포사유</th>
                <th>전달내용</th>
              </tr>
              <tr>
                <td>
                  <AntdTextArea rows={8} onChange={e => this.onChangeFormData('distribute_reason', e.target.value)} />
                </td>
                <td>
                  <AntdTextArea rows={8} onChange={e => this.onChangeFormData('comment', e.target.value)} />
                </td>
              </tr>
            </tbody>
          </table>
        </StyledHtmlTable>
        <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
          <StyledButton className="btn-primary mr5" onClick={this.onExternalDistribute}>외부배포</StyledButton>
          <StyledButton className="btn-light mr5" onClick={this.props.onExternalDistCancel}>취소</StyledButton>
          <StyledButton className="btn-light">외부 사용자 등록</StyledButton>
        </StyledButtonWrapper>
        <AntdModal title="담당자 선택" width="1000px" visible={this.state.isShow} onCancel={this.onCancel} destroyOnClose footer={[]}>
          <UserSelect
            initUserList={this.state.initUserList}
            treeDataSource={this.state.deptList.map(item => ({ ...item, key: item.DEPT_ID }))}
            // userDataList={result.userList && result.userList.list}
            // onTreeSelect={this.onTreeSelect}
            // onUserSelectHandler={this.onUserSelect}
            onUserSelectedComplete={this.onUserSelectedComplete}
            onCancel={this.onCancel}
          />
        </AntdModal>
      </StyledContentsWrapper>
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
      url: '/api/mdcs/v1/common/distribute/ExternalDeptList',
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