import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Icon, Modal } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import UserSelect from 'components/UserSelect';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledTextarea from 'components/BizBuilder/styled/Form/StyledTextarea';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

import History from './History';

const AntdModal = StyledAntdModal(Modal);
const AntdInput = StyledInput(Input);
const AntdTextarea = StyledTextarea(Input.TextArea);
const { TextArea } = Input;

class DistributeCompanyView extends Component {
  state = {
    isShow: false,
    isHistoryShow: false,
    dataKey: '',
    seq: '',
    userType: 1,  //1:외부사용자 2:내부사용자
    changeHistory: [],
    orgReffer1: undefined,
    orgReffer2: undefined,
  }

  componentDidMount() {
    const{ id, getCallDataHandler, selectedRow, spinningOn } = this.props;
    const apiAry = [
      {
        key: 'distDeptList',
        url: '/api/mdcs/v1/common/distribute/ExternalDeptList',
        type: 'GET',
      },
      {
        key: 'externalDistributeMgnt',
        url: `/api/mdcs/v1/common/externalDistributeMgnt?DOCNUMBER=${selectedRow.DOCNUMBER}&RECV_DEPT_ID=${selectedRow.RECV_DEPT_ID}`,
        type: 'GET',
      }
    ];
    spinningOn();
    getCallDataHandler(id, apiAry, this.afterCallDataHandler);
  }

  afterCallDataHandler = () => {
    const { id, result: { externalDistributeMgnt }, setFormData, selectedRow, spinningOff } = this.props;
    spinningOff();
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
      });
    } else {
      if (externalDistributeMgnt !== undefined && externalDistributeMgnt.detail !== undefined) {
        setFormData(id, {
          ...externalDistributeMgnt.detail,
        });
        this.setState({
          orgReffer1: externalDistributeMgnt.detail.REFERRER_EMAIL1,
          orgReffer2: externalDistributeMgnt.detail.REFERRER_EMAIL2,
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

    // 기존 담당자가 변경될 경우 히스토리를 남기기위해서 변수 생성
    let orgUserInfo = {
      USER_ID: formData[`${this.state.dataKey}_ID${this.state.seq}`],
      EMAIL: formData[`${this.state.dataKey}_EMAIL${this.state.seq}`],
    };

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
    }

    this.setState(prevState => {
      const { changeHistory } = prevState;
      if (result && result !== undefined && result.length > 0 && selectedRow.RECV_DEPT_ID !== -1) {
        if (orgUserInfo.USER_ID !== null) {
          changeHistory.push({
            ...orgUserInfo,
            USER_TYPE: this.getModifyTypeString(this.state.dataKey),
            MODIFY_TYPE: 'N', // 추가
          });
        }

        changeHistory.push({
          USER_TYPE: this.getModifyTypeString(this.state.dataKey),
          USER_ID: result[0].USER_ID,
          EMAIL: result[0].EMAIL,
          MODIFY_TYPE: 'P', // 추가
        });
      }
      return {
        changeHistory,
        isShow: false,
      }
    });
  };

  onDeleteUser = (dataKey, seq, userId, userEmail) => {
    const { id, formData, changeFormData, selectedRow } = this.props;
    changeFormData(id, `${dataKey}_ID${seq}`, null);
    changeFormData(id, `${dataKey}_NAME${seq}`, null);
    changeFormData(id, `${dataKey}_EMAIL${seq}`, null);

    // 수정일 경우 변경이력 등록하기 위한 state 저장
    if (selectedRow.RECV_DEPT_ID !== -1 && formData[`${dataKey}_ID${seq}`] !== null) {
      this.setState(prevState => {
        const { changeHistory } = prevState;
        changeHistory.push({
          USER_TYPE: this.getModifyTypeString(dataKey),
          USER_ID: userId,
          EMAIL: userEmail,
          MODIFY_TYPE: 'N', // 삭제
        });
        return { changeHistory }
      });
    }
  };

  onCancelUserSelect = () => {
    this.setState({ isShow: false });
  };

  onClickSave = saveType => {
    const {id, submitHandlerBySaga, formData, onSaveAfter, spinningOn, spinningOff } = this.props;
    const { orgReffer1, orgReffer2, changeHistory } = this.state;

    Modal.confirm({
      title: `${saveType === 'POST' ? '등록' : '수정'}하시겠습니까?`,
      icon: <ExclamationCircleOutlined />,
      okText: `${saveType === 'POST' ? '등록' : '수정'}`,
      cancelText: '취소',
      onOk() {
        
        // 업체 참조자 변경 히스토리 설정
        if (saveType === 'PUT') {
          //참조자1
          if (formData.REFERRER_EMAIL1 && formData.REFERRER_EMAIL1 !== null && formData.REFERRER_EMAIL1 !== '') {
            if (orgReffer1) { // org 참조자가 있을경우
              if (orgReffer1 !== formData.REFERRER_EMAIL1) {  // org참조자와 new참조자가 같지 않을경우 변경히스토리 삭제, 추가 두건 등록
                changeHistory.push({
                  USER_TYPE: 'ccc',
                  EMAIL: orgReffer1,
                  MODIFY_TYPE: 'N',
                });
                changeHistory.push({
                  USER_TYPE: 'ccc',
                  EMAIL: formData.REFERRER_EMAIL1,
                  MODIFY_TYPE: 'P',
                });
              }
            } else {  // org 참조자가 없을경우 new 참조자만 등록
              changeHistory.push({
                USER_TYPE: 'ccc',
                EMAIL: formData.REFERRER_EMAIL1,
                MODIFY_TYPE: 'P',
              });
            }
          }
        } else {
          if (orgReffer1) {
            changeHistory.push({
              USER_TYPE: 'ccc',
              EMAIL: orgReffer1,
              MODIFY_TYPE: 'N',
            });
          }
        }
        //참조자2
        if (formData.REFERRER_EMAIL2 && formData.REFERRER_EMAIL2 !== null && formData.REFERRER_EMAIL2 !== '') {
          if (orgReffer2) { // org 참조자가 있을경우
            if (orgReffer2 !== formData.REFERRER_EMAIL2) {  // org참조자와 new참조자가 같지 않을경우 변경히스토리 삭제, 추가 두건 등록
              changeHistory.push({
                USER_TYPE: 'ccc',
                EMAIL: orgReffer2,
                MODIFY_TYPE: 'N',
              });
              changeHistory.push({
                USER_TYPE: 'ccc',
                EMAIL: formData.REFERRER_EMAIL2,
                MODIFY_TYPE: 'P',
              });
            }
          } else {  // org 참조자가 없을경우 new 참조자만 등록
            changeHistory.push({
              USER_TYPE: 'ccc',
              EMAIL: formData.REFERRER_EMAIL2,
              MODIFY_TYPE: 'P',
            });
          }
        } else {
          if (orgReffer2) {
            changeHistory.push({
              USER_TYPE: 'ccc',
              EMAIL: orgReffer2,
              MODIFY_TYPE: 'N',
            });
          }
        }

        spinningOn();
        submitHandlerBySaga(id, saveType, '/api/mdcs/v1/common/externalDistributeMgnt', { PARAM: { ...formData, changeHistory } }, (id, response) => {
          spinningOff();
          if (response) {
            if (response.result === -1) {
              message.info(<MessageContent>{`이미 등록되어 있는 회사입니다.`}</MessageContent>);
            } else {
              message.success(<MessageContent>{`${saveType === 'POST' ? '등록' : '수정'}하였습니다.`}</MessageContent>);
              onSaveAfter();
            }
          } else {
            message.error(<MessageContent>{`${saveType === 'POST' ? '등록' : '수정'}에 실패하였습니다.`}</MessageContent>);
          }
        });
      }
    });
  };

  onClickDelete = () => {
    const {id, submitHandlerBySaga, formData, onSaveAfter, spinningOn, spinningOff } = this.props;

    Modal.confirm({
      title: `삭제하시겠습니까?`,
      icon: <ExclamationCircleOutlined />,
      okText: `삭제`,
      cancelText: '취소',
      onOk() {
        spinningOn();
        submitHandlerBySaga(id, 'DELETE', '/api/mdcs/v1/common/externalDistributeMgnt', { PARAM: { ...formData } }, (id, response) => {
          if (response && response.result === 1) {
            spinningOff();
            message.success(<MessageContent>삭제하였습니다.</MessageContent>);
            onSaveAfter();
          } else {
            message.error(<MessageContent>삭제에 실패하였습니다.</MessageContent>);
          }
        });
      }
    });
  };

  onClickHistory = () => {
    this.setState({ isHistoryShow: true });
  };

  onCancelHistoryPopup = () => {
    this.setState({ isHistoryShow: false });
  };

  getModifyTypeString = type => {
    let typeStr = '';
    switch(type) {
      case 'RECV_USER':
        typeStr = 'to'; //수신자
        break;
      case 'REFERRER_EMAIL1':
        typeStr = 'ccc';  //업체참조자
        break;
      case 'PURCHASE_USER':
        typeStr = 'cc';   //구매담당자
        break;
      case 'IQC_USER':
        typeStr = 'iqc';  //IQC담당자
        break;
      default:
        break;
    }
    return typeStr;
  };

  render() {
    const { id, selectedRow, formData, onCancelPopup, result: { distDeptList }, changeFormData } = this.props;
    let list;
    if (distDeptList && distDeptList !== undefined) {
      if (distDeptList.list !== undefined) {
        if (selectedRow.RECV_DEPT_ID !== -1) {
          list = distDeptList.list.filter(item => item.DEPT_ID === 1461 || item.DEPT_ID === selectedRow.RECV_DEPT_ID);
        } else {
          list = distDeptList.list;
        }
      }
    }

    return (
      <>
      {list !== undefined && (
        <AntdModal
          title="담당자 선택"
          width="1000px" 
          visible={this.state.isShow} 
          onCancel={this.onCancelUserSelect} 
          destroyOnClose 
          footer={[]}
        >
          <UserSelect
            treeDataSource={this.state.userType === 1 ? list : null}
            // onTreeSelect={this.onTreeSelect}
            // onUserSelectHandler={this.onUserSelect}
            onUserSelectedComplete={this.onUserSelectedComplete}
            onCancel={this.onCancelUserSelect}
          />
        </AntdModal>
      )}
      {this.state.isHistoryShow && (
        <AntdModal
          title={`${formData.RECV_DEPT_NAME} 변경 List`}
          width="1100px" 
          visible={this.state.isHistoryShow} 
          onCancel={this.onCancelHistoryPopup} 
          destroyOnClose 
          footer={[<StyledButton className="btn-light btn-sm" onClick={this.onCancelHistoryPopup}>닫기</StyledButton>]}
        >
          <History formData={formData} />
        </AntdModal>
      )}
        <StyledContentsWrapper>
          <StyledHtmlTable>
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
                      <AntdInput value={formData.RECV_DEPT_NAME} className="ant-input-xs" style={{ width: '90%' }} readOnly />
                    ) : (
                      formData.RECV_DEPT_NAME
                    )}
                  </td>
                </tr>
                <tr>
                  <th>수신자(Supplier)1</th>
                  <td>
                    <AntdInput
                      value={formData.RECV_USER_ID1 && `${formData.RECV_USER_NAME1}(${formData.RECV_USER_EMAIL1})`}
                      className="ant-input-xs"
                      style={{ width: '90%' }}
                      readOnly
                      addonAfter={<CloseOutlined style={{ cursor: 'pointer' }} onClick={() => this.onDeleteUser('RECV_USER', '1', formData.RECV_USER_ID1, formData.RECV_USER_EMAIL1)} />} 
                    />
                    <StyledButton style={{ float: 'right' }} className="btn-primary btn-xs mr5" onClick={() => this.onClickSelectUsers('RECV_USER', '1', 1)}>
                      <Icon type="edit" />
                    </StyledButton>
                  </td>
                </tr>
                <tr>
                  <th>수신자(Supplier)2</th>
                  <td>
                    <AntdInput
                      value={formData.RECV_USER_ID2 && `${formData.RECV_USER_NAME2}(${formData.RECV_USER_EMAIL2})`}
                      className="ant-input-xs"
                      style={{ width: '90%' }}
                      readOnly
                      addonAfter={<CloseOutlined style={{ cursor: 'pointer' }} onClick={() => this.onDeleteUser('RECV_USER', '2', formData.RECV_USER_ID2, formData.RECV_USER_EMAIL2)} />} 
                    />
                    <StyledButton style={{ float: 'right' }} className="btn-primary btn-xs mr5" onClick={() => this.onClickSelectUsers('RECV_USER', '2', 1)}>
                      <Icon type="edit" />
                    </StyledButton>
                  </td>
                </tr>
                <tr>
                  <th>업체 참조자1</th>
                  <td>
                    <AntdInput
                      value={formData.REFERRER_EMAIL1}
                      className="ant-input-xs"
                      style={{ width: '90%' }} allowClear
                      onChange={e => changeFormData(id, 'REFERRER_EMAIL1', e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <th>업체 참조자2</th>
                  <td>
                    <AntdInput
                      value={formData.REFERRER_EMAIL2}
                      className="ant-input-xs"
                      style={{ width: '90%' }} allowClear
                      onChange={e => changeFormData(id, 'REFERRER_EMAIL2', e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <th>구매 담당자1</th>
                  <td>
                    <AntdInput
                      value={formData.PURCHASE_USER_ID1 && `${formData.PURCHASE_USER_NAME1}(${formData.PURCHASE_USER_EMAIL1})`}
                      className="ant-input-xs"
                      style={{ width: '90%' }}
                      readOnly
                      addonAfter={<CloseOutlined style={{ cursor: 'pointer' }} onClick={() => this.onDeleteUser('PURCHASE_USER', '1', formData.PURCHASE_USER_ID1, formData.PURCHASE_USER_EMAIL1)} />} 
                    />
                    <StyledButton style={{ float: 'right' }} className="btn-primary btn-xs mr5" onClick={() => this.onClickSelectUsers('PURCHASE_USER', '1', 2)}>
                      <Icon type="edit" />
                    </StyledButton>
                  </td>
                </tr>
                <tr>
                  <th>구매 담당자2</th>
                  <td>
                    <AntdInput
                      value={formData.PURCHASE_USER_ID2 && `${formData.PURCHASE_USER_NAME2}(${formData.PURCHASE_USER_EMAIL2})`}
                      className="ant-input-xs"
                      style={{ width: '90%' }}
                      readOnly
                      addonAfter={<CloseOutlined style={{ cursor: 'pointer' }} onClick={() => this.onDeleteUser('PURCHASE_USER', '2', formData.PURCHASE_USER_ID2, formData.PURCHASE_USER_EMAIL2)} />} 
                    />
                    <StyledButton style={{ float: 'right' }} className="btn-primary btn-xs mr5" onClick={() => this.onClickSelectUsers('PURCHASE_USER', '2', 2)}>
                      <Icon type="edit" />
                    </StyledButton>
                  </td>
                </tr>
                <tr>
                  <th>IQC 담당자1</th>
                  <td>
                    <AntdInput
                      value={formData.IQC_USER_ID1 && `${formData.IQC_USER_NAME1}(${formData.IQC_USER_EMAIL1})`}
                      className="ant-input-xs"
                      style={{ width: '90%' }}
                      readOnly
                      addonAfter={<CloseOutlined style={{ cursor: 'pointer' }} onClick={() => this.onDeleteUser('IQC_USER', '1', formData.IQC_USER_ID1, formData.IQC_USER_EMAIL1)} />} 
                    />
                    <StyledButton style={{ float: 'right' }} className="btn-primary btn-xs mr5" onClick={() => this.onClickSelectUsers('IQC_USER', '1', 2)}>
                      <Icon type="edit" />
                    </StyledButton>
                  </td>
                </tr>
                <tr>
                  <th>IQC 담당자2</th>
                  <td>
                    <AntdInput
                      value={formData.IQC_USER_ID2 && `${formData.IQC_USER_NAME2}(${formData.IQC_USER_EMAIL2})`}
                      className="ant-input-xs"
                      style={{ width: '90%' }}
                      readOnly
                      addonAfter={<CloseOutlined style={{ cursor: 'pointer' }} onClick={() => this.onDeleteUser('IQC_USER', '2', formData.IQC_USER_ID2, formData.IQC_USER_EMAIL2)} />} 
                    />
                    <StyledButton style={{ float: 'right' }} className="btn-primary btn-xs mr5" onClick={() => this.onClickSelectUsers('IQC_USER', '2', 2)}>
                      <Icon type="edit" />
                    </StyledButton>
                  </td>
                </tr>
                <tr>
                  <th>IQC 담당자3</th>
                  <td>
                    <AntdInput
                      value={formData.IQC_USER_ID3 && `${formData.IQC_USER_NAME3}(${formData.IQC_USER_EMAIL3})`}
                      className="ant-input-xs"
                      style={{ width: '90%' }}
                      readOnly
                      addonAfter={<CloseOutlined style={{ cursor: 'pointer' }} onClick={() => this.onDeleteUser('IQC_USER', '3', formData.IQC_USER_ID3, formData.IQC_USER_EMAIL3)} />} 
                    />
                    <StyledButton style={{ float: 'right' }} className="btn-primary btn-xs mr5" onClick={() => this.onClickSelectUsers('IQC_USER', '3', 2)}>
                      <Icon type="edit" />
                    </StyledButton>
                  </td>
                </tr>
                <tr>
                  <th>IQC 담당자4</th>
                  <td>
                    <AntdInput
                      value={formData.IQC_USER_ID4 && `${formData.IQC_USER_NAME4}(${formData.IQC_USER_EMAIL4})`}
                      className="ant-input-xs"
                      style={{ width: '90%' }}
                      readOnly
                      addonAfter={<CloseOutlined style={{ cursor: 'pointer' }} onClick={() => this.onDeleteUser('IQC_USER', '4', formData.IQC_USER_ID4, formData.IQC_USER_EMAIL4)} />} 
                    />
                    <StyledButton style={{ float: 'right' }} className="btn-primary btn-xs mr5" onClick={() => this.onClickSelectUsers('IQC_USER', '4', 2)}>
                      <Icon type="edit" />
                    </StyledButton>
                  </td>
                </tr>
                <tr>
                  <th>Comment</th>
                  <td>
                    <AntdTextarea value={formData.COMMENT} rows={6} onChange={e => changeFormData(id, 'COMMENT', e.target.value)} />
                  </td>
                </tr>
              </tbody>
            </table>
          </StyledHtmlTable>
          <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
            {selectedRow.RECV_DEPT_ID === -1 ? (
              <StyledButton className="btn-primary btn-sm" onClick={() => this.onClickSave('POST')}>등록</StyledButton>
            ) : (
              <>
                <StyledButton className="btn-gray btn-sm mr5" onClick={this.onClickDelete}>삭제</StyledButton>
                <StyledButton className="btn-primary btn-sm mr5" onClick={() => this.onClickSave('PUT')}>수정</StyledButton>
                <StyledButton className="btn-light btn-sm" onClick={this.onClickHistory}>history</StyledButton>
              </>
            )}
            <StyledButton className="btn-light btn-sm mr5" onClick={onCancelPopup} style={{ marginLeft: '8px' }}>닫기</StyledButton>
          </StyledButtonWrapper>
        </StyledContentsWrapper>
      </>
    );
  }
}

DistributeCompanyView.propTypes = {
  id: PropTypes.string,
  result: PropTypes.object,
  getCallDataHandler: PropTypes.func,
  selectedRow: PropTypes.object,
  formData: PropTypes.object,
};

DistributeCompanyView.defaultProps = {
  id: 'distributeCompany',
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