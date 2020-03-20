import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Button, Icon, Modal } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import UserSelect from 'components/UserSelect';
import StyledTable from 'components/CommonStyled/StyledTable';
import StyledButton from 'apps/mdcs/styled/StyledButton';
import StyledModal from 'commonStyled/Modal/StyledModal';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

const AntdModal = StyledModal(Modal);
const { TextArea } = Input;

class DistributeCompanyView extends Component {
  state = {
    isShow: false,
    dataKey: '',
    seq: '',
    userType: 1,  //1:외부사용자 2:내부사용자
  }

  componentDidMount() {
    const{ id, getCallDataHandler, selectedRow, apiAry } = this.props;
    apiAry.push({
      key: 'externalDistributeMgnt',
      url: `/api/mdcs/v1/common/externalDistributeMgnt?DOCNUMBER=${selectedRow.DOCNUMBER}&RECV_DEPT_ID=${selectedRow.RECV_DEPT_ID}`,
      type: 'GET',
    });
    getCallDataHandler(id, apiAry, this.afterCallDataHandler);
  }

  afterCallDataHandler = () => {
    const { id, result: { externalDistributeMgnt }, setFormData, selectedRow } = this.props;
    if (selectedRow.RECV_DEPT_ID === -1) {
      setFormData(id, {
        ...selectedRow,
        RECV_USER_ID1: null,
        RECV_USER_NAME1: null,
        RECV_USER_EMAIL1: null,
        RECV_USER_ID2: null,
        RECV_USER_NAME2: null,
        RECV_USER_EMAIL2: null,
        REFERRER_EMAIL1: null,
        REFERRER_EMAIL2: null,
        PURCHASE_USER_ID1: null,
        PURCHASE_USER_NAME1: null,
        PURCHASE_USER_EMAIL1: null,
        PURCHASE_USER_ID2: null,
        PURCHASE_USER_NAME2: null,
        PURCHASE_USER_EMAIL2: null,
        IQC_USER_ID1: null,
        IQC_USER_NAME1: null,
        IQC_USER_EMAIL1: null,
        IQC_USER_ID2: null,
        IQC_USER_NAME2: null,
        IQC_USER_EMAIL2: null,
        IQC_USER_ID3: null,
        IQC_USER_NAME3: null,
        IQC_USER_EMAIL3: null,
        IQC_USER_ID4: null,
        IQC_USER_NAME4: null,
        IQC_USER_EMAIL4: null,
        COMMENT: null,
        changeHistory: [],
      });
    } else {
      if (externalDistributeMgnt !== undefined && externalDistributeMgnt.detail !== undefined) {
        setFormData(id, {
          ...externalDistributeMgnt.detail,
          changeHistory: [],
        });
      }
    }
  }

  onClickSelectUsers = (dataKey, seq, userType) => {
    this.setState({
      dataKey,
      seq,
      userType,
      isShow: true,
    });
  }

  onUserSelectedComplete = result => {
    const { id, formData, changeFormData, selectedRow } = this.props;
    if (result && result !== undefined && result.length > 0) {

      // 수신자 선택일 경우
      if (this.state.dataKey === 'RECV_USER') {
        // 등록
        if (selectedRow.RECV_DEPT_ID === -1) {
          // 수신자가 한명도 선택되어 있지 않은 경우 회사 등록
          if (formData.RECV_DEPT_ID === -1) {
            changeFormData(id, `RECV_DEPT_ID`, result[0].DEPT_ID);
            changeFormData(id, `RECV_DEPT_NAME`, result[0].DEPT_NAME_KOR);
            changeFormData(id, `RECV_USER_ID${this.state.seq}`, result[0].USER_ID);
            changeFormData(id, `RECV_USER_NAME${this.state.seq}`, result[0].NAME_KOR);
            changeFormData(id, `RECV_USER_EMAIL${this.state.seq}`, result[0].EMAIL);
          } else {
            if (formData.RECV_DEPT_ID === result[0].DEPT_ID) {
              changeFormData(id, `RECV_USER_ID${this.state.seq}`, result[0].USER_ID);
              changeFormData(id, `RECV_USER_NAME${this.state.seq}`, result[0].NAME_KOR);
              changeFormData(id, `RECV_USER_EMAIL${this.state.seq}`, result[0].EMAIL);
            } else {
              message.info(<MessageContent>{`동일한 회사의 사용자가 아닙니다.`}</MessageContent>);
            }
          }
        // 수정
        } else {
          // 회사가 같은 경우
          if (formData.RECV_DEPT_ID === result[0].DEPT_ID) {
            changeFormData(id, `RECV_USER_ID${this.state.seq}`, result[0].USER_ID);
            changeFormData(id, `RECV_USER_NAME${this.state.seq}`, result[0].NAME_KOR);
            changeFormData(id, `RECV_USER_EMAIL${this.state.seq}`, result[0].EMAIL);
          } else {
            message.info(<MessageContent>{`동일한 회사의 사용자가 아닙니다.`}</MessageContent>);
          }
        }
      // 수신자 외 선택
      } else {
        changeFormData(id, `${this.state.dataKey}_ID${this.state.seq}`, result[0].USER_ID);
        changeFormData(id, `${this.state.dataKey}_NAME${this.state.seq}`, result[0].NAME_KOR);
        changeFormData(id, `${this.state.dataKey}_EMAIL${this.state.seq}`, result[0].EMAIL);
      }

      // 히스토리 (수정인 경우에만)
      if (selectedRow.RECV_DEPT_ID !== -1) {
        console.debug('form[] : ' + formData[`${this.state.dataKey}_ID${this.state.seq}`]);
      }
    }
    this.setState({ isShow: false });
  }

  onDeleteUser = (dataKey, seq) => {
    const { id, changeFormData } = this.props;
    changeFormData(id, `${dataKey}_ID${seq}`, null);
    changeFormData(id, `${dataKey}_NAME${seq}`, null);
    changeFormData(id, `${dataKey}_EMAIL${seq}`, null);
  }

  onCancelUserSelect = () => {
    this.setState({ isShow: false });
  }

  onClickSave = saveType => {
    const {id, submitHandlerBySaga, formData, onCancelPopup } = this.props;
    submitHandlerBySaga(id, saveType, '/api/mdcs/v1/common/externalDistributeMgnt', { PARAM: { ...formData } }, (id, response) => {
      if (response) {
        if (response.result === -1) {
          message.info(<MessageContent>{`이미 등록되어 있는 회사입니다.`}</MessageContent>);
        } else {
          onCancelPopup();
        }
      }
    });
  }

  onClickDelete = () => {
    const {id, submitHandlerBySaga, formData, onCancelPopup } = this.props;
    submitHandlerBySaga(id, 'DELETE', '/api/mdcs/v1/common/externalDistributeMgnt', { PARAM: { ...formData } }, (id, response) => {
      if (response && response.result === 1) {
         onCancelPopup();
      }
    });
  }

  render() {
    const { id, selectedRow, formData, onCancelPopup, result: { distDeptList }, changeFormData } = this.props;
    let list;
    if (distDeptList && distDeptList !== undefined) {
      if (distDeptList.list !== undefined) {
        if (this.state.userType === 1) {
          if (selectedRow.RECV_DEPT_ID !== -1) {
            list = distDeptList.list.filter(item => item.DEPT_ID === 1461 || item.DEPT_ID === selectedRow.RECV_DEPT_ID);
          } else {
            list = distDeptList.list.filter(item => item.DEPT_ID === 1461 || item.PRNT_ID === 1461);
          }
        } else {
          list = distDeptList.list.filter(item => item.DEPT_ID !== 1461 && item.PRNT_ID !== 1461);
        }
      }
    }

    return (
      <div>
        <StyledTable>
          <table>
            <colgroup>
              <col width="20%" />
              <col width="80%" />
            </colgroup>
            <tbody>
              <tr>
                <th>문서번호</th>
                <td>{formData.DOCNUMBER}</td>
              </tr>
              <tr>
                <th>Title</th>
                <td>{formData.TITLE}</td>
              </tr>
              <tr>
                <th>배포자</th>
                <td>{formData.DIST_USER_NAME}</td>
              </tr>
              <tr>
                <th>회사</th>
                <td>
                  {selectedRow.RECV_DEPT_ID === -1 ? (
                    <Input value={formData.RECV_DEPT_NAME} style={{ width: '90%' }} readOnly />
                  ) : (
                    formData.RECV_DEPT_NAME
                  )}
                </td>
              </tr>
              <tr>
                <th>수신자(Supplier)1</th>
                <td>
                  <Input
                    value={formData.RECV_USER_ID1 && `${formData.RECV_USER_NAME1}(${formData.RECV_USER_EMAIL1})`}
                    style={{ width: '90%' }}
                    readOnly
                    addonAfter={<CloseOutlined style={{ cursor: 'pointer' }} onClick={() => this.onDeleteUser('RECV_USER', '1')} />} 
                  />
                  <StyledButton style={{ float: 'right' }} className="btn-primary btn-first btn-sm" onClick={() => this.onClickSelectUsers('RECV_USER', '1', 1)}>
                    <Icon type="edit" />
                  </StyledButton>
                </td>
              </tr>
              <tr>
                <th>수신자(Supplier)2</th>
                <td>
                  <Input
                    value={formData.RECV_USER_ID2 && `${formData.RECV_USER_NAME2}(${formData.RECV_USER_EMAIL2})`}
                    style={{ width: '90%' }}
                    readOnly
                    addonAfter={<CloseOutlined style={{ cursor: 'pointer' }} onClick={() => this.onDeleteUser('RECV_USER', '2')} />} 
                  />
                  <StyledButton style={{ float: 'right' }} className="btn-primary btn-first btn-sm" onClick={() => this.onClickSelectUsers('RECV_USER', '2', 1)}>
                    <Icon type="edit" />
                  </StyledButton>
                </td>
              </tr>
              <tr>
                <th>업체 참조자1</th>
                <td>
                  <Input value={formData.REFERRER_EMAIL1} style={{ width: '90%' }} onChange={e => changeFormData(id, 'REFERRER_EMAIL1', e.target.value)} />
                </td>
              </tr>
              <tr>
                <th>업체 참조자2</th>
                <td>
                  <Input value={formData.REFERRER_EMAIL2} style={{ width: '90%' }} onChange={e => changeFormData(id, 'REFERRER_EMAIL2', e.target.value)} />
                </td>
              </tr>
              <tr>
                <th>구매 담당자1</th>
                <td>
                  <Input
                    value={formData.PURCHASE_USER_ID1 && `${formData.PURCHASE_USER_NAME1}(${formData.PURCHASE_USER_EMAIL1})`}
                    style={{ width: '90%' }}
                    readOnly
                    addonAfter={<CloseOutlined style={{ cursor: 'pointer' }} onClick={() => this.onDeleteUser('PURCHASE_USER', '1')} />} 
                  />
                  <StyledButton style={{ float: 'right' }} className="btn-primary btn-first btn-sm" onClick={() => this.onClickSelectUsers('PURCHASE_USER', '1', 2)}>
                    <Icon type="edit" />
                  </StyledButton>
                </td>
              </tr>
              <tr>
                <th>구매 담당자2</th>
                <td>
                  <Input
                    value={formData.PURCHASE_USER_ID2 && `${formData.PURCHASE_USER_NAME2}(${formData.PURCHASE_USER_EMAIL2})`}
                    style={{ width: '90%' }}
                    readOnly
                    addonAfter={<CloseOutlined style={{ cursor: 'pointer' }} onClick={() => this.onDeleteUser('PURCHASE_USER', '2')} />} 
                  />
                  <StyledButton style={{ float: 'right' }} className="btn-primary btn-first btn-sm" onClick={() => this.onClickSelectUsers('PURCHASE_USER', '2', 2)}>
                    <Icon type="edit" />
                  </StyledButton>
                </td>
              </tr>
              <tr>
                <th>IQC 담당자1</th>
                <td>
                  <Input
                    value={formData.IQC_USER_ID1 && `${formData.IQC_USER_NAME1}(${formData.IQC_USER_EMAIL1})`}
                    style={{ width: '90%' }}
                    readOnly
                    addonAfter={<CloseOutlined style={{ cursor: 'pointer' }} onClick={() => this.onDeleteUser('IQC_USER', '1')} />} 
                  />
                  <StyledButton style={{ float: 'right' }} className="btn-primary btn-first btn-sm" onClick={() => this.onClickSelectUsers('IQC_USER', '1', 2)}>
                    <Icon type="edit" />
                  </StyledButton>
                </td>
              </tr>
              <tr>
                <th>IQC 담당자2</th>
                <td>
                  <Input
                    value={formData.IQC_USER_ID2 && `${formData.IQC_USER_NAME2}(${formData.IQC_USER_EMAIL2})`}
                    style={{ width: '90%' }}
                    readOnly
                    addonAfter={<CloseOutlined style={{ cursor: 'pointer' }} onClick={() => this.onDeleteUser('IQC_USER', '2')} />} 
                  />
                  <StyledButton style={{ float: 'right' }} className="btn-primary btn-first btn-sm" onClick={() => this.onClickSelectUsers('IQC_USER', '2', 2)}>
                    <Icon type="edit" />
                  </StyledButton>
                </td>
              </tr>
              <tr>
                <th>IQC 담당자3</th>
                <td>
                  <Input
                    value={formData.IQC_USER_ID3 && `${formData.IQC_USER_NAME3}(${formData.IQC_USER_EMAIL3})`}
                    style={{ width: '90%' }}
                    readOnly
                    addonAfter={<CloseOutlined style={{ cursor: 'pointer' }} onClick={() => this.onDeleteUser('IQC_USER', '3')} />} 
                  />
                  <StyledButton style={{ float: 'right' }} className="btn-primary btn-first btn-sm" onClick={() => this.onClickSelectUsers('IQC_USER', '3', 2)}>
                    <Icon type="edit" />
                  </StyledButton>
                </td>
              </tr>
              <tr>
                <th>IQC 담당자4</th>
                <td>
                  <Input
                    value={formData.IQC_USER_ID4 && `${formData.IQC_USER_NAME4}(${formData.IQC_USER_EMAIL4})`}
                    style={{ width: '90%' }}
                    readOnly
                    addonAfter={<CloseOutlined style={{ cursor: 'pointer' }} onClick={() => this.onDeleteUser('IQC_USER', '4')} />} 
                  />
                  <StyledButton style={{ float: 'right' }} className="btn-primary btn-first btn-sm" onClick={() => this.onClickSelectUsers('IQC_USER', '4', 2)}>
                    <Icon type="edit" />
                  </StyledButton>
                </td>
              </tr>
              <tr>
                <th>Comment</th>
                <td>
                  <TextArea value={formData.COMMENT} onChange={e => changeFormData(id, 'COMMENT', e.target.value)} />
                </td>
              </tr>
            </tbody>
          </table>
          <div style={{ padding: '10px 16px', textAlign: 'center', borderTop: '1px solid #e8e8e8', borderRadius: '0 0 4px 4px' }}>
            {selectedRow.RECV_DEPT_ID === -1 ? (
              <Button type="primary" onClick={() => this.onClickSave('POST')}>등록</Button>
            ) : (
              <React.Fragment>
                <Button type="primary" onClick={() => this.onClickSave('PUT')}>수정</Button>
                <Button type="primary" onClick={this.onClickDelete} style={{ marginLeft: '8px' }}>삭제</Button>
              </React.Fragment>
            )}
            <Button type="default" onClick={onCancelPopup} style={{ marginLeft: '8px' }}>취소</Button>
          </div>
        </StyledTable>
        {list !== undefined && (
          <AntdModal title="담당자 선택" width="1000px" visible={this.state.isShow} onCancel={this.onCancelUserSelect} destroyOnClose footer={[]}>
            <UserSelect
              treeDataSource={list}
              // onTreeSelect={this.onTreeSelect}
              // onUserSelectHandler={this.onUserSelect}
              onUserSelectedComplete={this.onUserSelectedComplete}
              onCancel={this.onCancelUserSelect}
            />
          </AntdModal>
        )}
      </div>
    )
  }
}

DistributeCompanyView.propTypes = {
  id: PropTypes.string,
  apiAry: PropTypes.array,
  result: PropTypes.object,
  getCallDataHandler: PropTypes.func,
  selectedRow: PropTypes.object,
  formData: PropTypes.object,
};

DistributeCompanyView.defaultProps = {
  id: 'distributeCompany',
  apiAry: [
    {
      key: 'distDeptList',
      url: '/api/mdcs/v1/common/distribute/DistributeDeptMgnt',
      type: 'GET',
      params: {},
    },
  ],
  result: {
    externalDistributeMgnt: {
      detail: [],
    },
  },
  getCallDataHandler: () => {},
  selectedRow: {},
  formData: {},
};

export default DistributeCompanyView;