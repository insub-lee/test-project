import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import DeptSelect from 'components/DeptSelect';
import PostionSelect from 'components/PostionSelect';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';

const AntdModal = StyledAntdModal(Modal);
const AntdInput = StyledInput(Input);
const { confirm } = Modal;

class RequesterView extends Component {
  state = {
    isDeptShow: false,
    isPstnShow: false,
    userInfo: {
      statusCd: 'C',  //재직
      empType: 'D',   //EDDS외부업체
      deptId: 0,
      deptName: '',
      pstnId: 73197,     //직위(과장-고정값)
      pstnName: '과장',
      dutyId: 73250,  //직책코드(담당-고정값)
      rankId: -1,
    }
  };

  componentDidMount() {
    const { sagaKey, getCallDataHandlerReturnRes, selectedRow } = this.props;
    const apiInfo = {
      key: 'requesterView',
      url: `/api/edds/v1/common/eddsRequest/${selectedRow.REQUEST_ID}`,
      type: 'GET',
    }
    getCallDataHandlerReturnRes(sagaKey, apiInfo, (id, res) => {
      if (res && res.detail) {
        this.setState({
          userInfo: {
            ...this.state.userInfo,
            deptId: res.detail.DEPT_ID,
            deptName: res.detail.DEPT_NAME_KOR,
          }
        });
      }
    });
  }

  onChangeEmpCode = val => {
    this.setState({ statusCd: val });
  };

  onClickApproval = () => {
    const { sagaKey, result: { requesterView: { detail } }, submitHandlerBySaga, onCancelPopup, selectedRow, spinningOn, spinningOff } = this.props;
    if (this.state.userInfo.deptId && this.state.userInfo.deptId !== 0) {
      const userInfo = {
        ...this.state.userInfo,
        // deptName: detail.DEPT_NAME,
        empNo: detail.REQUEST_ID,
        nameKor: detail.REQUESTER_NAME,
        email: detail.EMAIL,
        mobileTel: detail.PHONE,
        passwd: detail.PASSWORD,
      };

      confirm({
        title: '승인하시겠습니까?',
        icon: <ExclamationCircleOutlined />,
        okText: '승인',
        cancelText: '취소',
        onOk() {
          spinningOn();
          submitHandlerBySaga(sagaKey, 'POST', '/api/admin/v1/common/registUser', userInfo, (id, res) => {
            if (res && res.code === 200) {
              // 승인메일발송
              submitHandlerBySaga(sagaKey, 'POST', `/api/edds/v1/common/requesterApproveEmail`, { PARAM: { ...selectedRow }}, () => {});
              // 승인 후 요청내역 삭제
              submitHandlerBySaga(sagaKey, 'DELETE', `/api/edds/v1/common/eddsRequest/${selectedRow.REQUEST_ID}`, {}, () => {
                spinningOff();
                message.info(<MessageContent>승인하였습니다.</MessageContent>);
                onCancelPopup();
              });
            } else {
              spinningOff();
              message.info(<MessageContent>승인에 실패하였습니다.</MessageContent>);
            }
          });
        }
      });
    } else {
      message.info(<MessageContent>회사를 선택해주세요.</MessageContent>);
    }
  };

  onClickDelete = () => {
    const { sagaKey, submitHandlerBySaga, selectedRow, onCancelPopup, spinningOn, spinningOff } = this.props;
    confirm({
      title: '삭제하시겠습니까?',
      icon: <ExclamationCircleOutlined />,
      okText: '삭제',
      cancelText: '취소',
      onOk() {
        spinningOn();
        submitHandlerBySaga(sagaKey, 'DELETE', `/api/edds/v1/common/eddsRequest/${selectedRow.REQUEST_ID}`, {}, (id, res) => {
          spinningOff();
          if (res && res.result === 1) {
            message.info(<MessageContent>삭제하였습니다.</MessageContent>);
            onCancelPopup();
          } else {
            message.info(<MessageContent>삭제에 실패하였습니다.</MessageContent>);
          }
        });
      }
    });
  };

  onClickCompany = () => {
    this.setState({ isDeptShow: true });
  };

  onClickPostion = () => {
    this.setState({ isPstnShow: true });
  }

  onCompleteDeptPopup = result => {
    if (result) {
      this.setState(prevState => {
        const { userInfo } = prevState;
        userInfo.deptId = result.DEPT_ID;
        userInfo.deptName = result.NAME_KOR;
        return { 
          userInfo,
          isDeptShow: false,
        }
      })
    } else {
      this.setState({ isDeptShow: false });
    }
  };

  onCompletePstnPopup = result => {
    if (result) {
      this.setState(prevState => {
        const { userInfo } = prevState;
        userInfo.pstnId = result.PSTN_ID;
        userInfo.pstnName = result.NAME_KOR;
        return { 
          userInfo,
          isPstnShow: false,
        }
      })
    } else {
      this.setState({ isPstnShow: false });
    }
  };

  onCancelDeptPopup = () => {
    this.setState({ isDeptShow: false });
  };

  onCancelPstnPopup = () => {
    this.setState({ isPstnShow: false });
  };

  onRegistCompany = () => {
    const { sagaKey, submitHandlerBySaga, spinningOn, spinningOff, result: { requesterView: { detail } }, profile } = this.props;
    const submitData = {
      PRNT_ID: 1461,
      DEPT_CD: detail.COMPANY_NAME,
      NAME_KOR: detail.COMPANY_NAME,
      NAME_ENG: detail.COMPANY_NAME,
      NAME_CHN: detail.COMPANY_NAME,
      NAME_JPN: detail.COMPANY_NAME,
      NAME_ETC: detail.COMPANY_NAME,
      COMP_CD: profile.COMP_CD,
    };

    const callbackFunc = deptId => {
      this.setState({
        userInfo: {
          ...this.state.userInfo,
          deptId,
          deptName: detail.COMPANY_NAME,
        }
      });
    };

    confirm({
      title: <p>선택할 회사가 없는 경우에만 등록하시기 바랍니다.<br /><br />회사를 등록하시겠습니까?</p>,
      icon: <ExclamationCircleOutlined />,
      okText: '등록',
      cancelText: '취소',
      onOk() {
        spinningOn();
        submitHandlerBySaga(sagaKey, 'POST', `/api/admin/v1/common/registDept`, submitData, (id, res) => {
          spinningOff();
          if (res && res.code === 200) {
            message.info(<MessageContent>등록하였습니다.</MessageContent>);
            callbackFunc(res.deptId);
          } else {
            message.info(<MessageContent>등록에 실패하였습니다.</MessageContent>);
          }
        });
      }
    });
  };

  render() {
    const { result: { requesterView } } = this.props;
    let detail = {};
    if (requesterView && requesterView !== undefined && requesterView.detail !== undefined) {
      detail = requesterView.detail;
    }

    console.debug('### >> ', this.state.userInfo);

    return (
      <>
        <AntdModal
          width={300}
          visible={this.state.isPstnShow}
          title="직위 검색"
          onCancel={this.onCancelPstnPopup}
          destroyOnClose
          footer={null}
        >
          <PostionSelect
            onComplete={this.onCompletePstnPopup}
            onCancel={this.onCancelPstnPopup}
          />
        </AntdModal>
        <AntdModal
          width={300}
          visible={this.state.isDeptShow}
          title="회사 검색"
          onCancel={this.onCancelDeptPopup}
          destroyOnClose
          footer={null}
        >
          <DeptSelect
            rootDeptChange={false}
            defaultRootDeptId={1461}  // EDDS 외부업체
            onComplete={this.onCompleteDeptPopup}
            onCancel={this.onCancelDeptPopup}
          />
        </AntdModal>
        <StyledContentsWrapper>
          <StyledHtmlTable>
            <table>
              <colgroup>
                <col width="15%" />
                <col width="35%" />
                <col width="15%" />
                <col width="35%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>요청 ID</th>
                  <td colSpan="3">{detail.REQUEST_ID}</td>
                </tr>
                <tr>
                  <th>요청자명</th>
                  <td colSpan="3">{detail.REQUESTER_NAME}</td>
                </tr>
                <tr>
                  <th>회사명</th>
                  <td>
                    {detail.COMPANY_NAME}
                    {(!this.state.userInfo.deptId || this.state.userInfo.deptId === 0) && (
                      <StyledButton className="btn-primary btn-xs ml5" onClick={this.onRegistCompany}>회사등록</StyledButton>
                    )}
                  </td>
                  <th>회사선택</th>
                  <td>
                    <AntdInput
                      value={detail.DEPT_NAME_KOR || this.state.userInfo.deptName}
                      className="ant-input-sm" placeholder="회사선택" allowClear
                      onClick={this.onClickCompany} readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <th>부서명</th>
                  <td colSpan="3">{detail.DEPT_NAME}</td>
                </tr>
                <tr>
                  <th>직위명</th>
                  <td>{detail.PSTN_NAME}</td>
                  <th>전화번호</th>
                  <td>{detail.PHONE}</td>
                  {/* <th>선택직위</th>
                  <td>
                    <AntdInput value={this.state.userInfo.pstnName} className="ant-input-sm" placeholder="직위선택" onClick={this.onClickPostion} readOnly/>
                  </td> */}
                </tr>
                {/* <tr>
                  <th>전화번호</th>
                  <td colSpan="3">{detail.PHONE}</td>
                </tr> */}
                <tr>
                  <th>이메일</th>
                  <td colSpan="3">{detail.EMAIL}</td>
                </tr>
              </tbody>  
            </table>
          </StyledHtmlTable>
          <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
            <StyledButton className="btn-light btn-sm mr5" onClick={this.props.onCancelPopup}>닫기</StyledButton>
            <StyledButton className="btn-gray btn-sm mr5" onClick={this.onClickDelete}>삭제</StyledButton>
            <StyledButton className="btn-primary btn-sm" onClick={this.onClickApproval}>승인</StyledButton>
          </StyledButtonWrapper>
        </StyledContentsWrapper>
      </>
    );
  }
}

RequesterView.propTypes = {
  id: PropTypes.string,
  apiAry: PropTypes.array,
  result: PropTypes.object,
  getCallDataHandler: PropTypes.func,
  selectedRow: PropTypes.object,
  formData: PropTypes.object,
};

RequesterView.defaultProps = {
  id: 'requesterView',
  result: {
    requesterView: {
      detail: [],
    },
  },
  getCallDataHandler: () => {},
  selectedRow: {},
  formData: {},
};

export default RequesterView;
