import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Select, Modal } from 'antd';

import DeptSelect from 'components/DeptSelect';
import PostionSelect from 'components/PostionSelect';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

import StyledTable from 'commonStyled/MdcsStyled/Table/StyledHtmlTable';
import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledInput from 'commonStyled/Form/StyledInput';
import StyledSelect from 'commonStyled/Form/StyledSelect';
import StyledContentsModal from 'commonStyled/MdcsStyled/Modal/StyledContentsModal';

const AntdSelect = StyledSelect(Select);
const AntdModal = StyledContentsModal(Modal);
const AntdInput = StyledInput(Input);
const { Option } = Select;

class RequesterView extends Component {
  state = {
    isDeptShow: false,
    isPstnShow: false,
    userInfo: {
      statusCd: 'C',  //재직
      empType: 'E',   //본사협력사
      deptId: -1,
      deptName: '',
      pstnId: -1,
      pstnName: '',
      dutyId: -1,
      rankId: -1,
    }
  };

  componentDidMount() {
    const { id, getCallDataHandler, selectedRow } = this.props;
    const arrApi = [
      {
        key: 'requesterView',
        url: `/api/edds/v1/common/eddsRequest/${selectedRow.REQUEST_ID}`,
        type: 'GET',
      },
    ];
    getCallDataHandler(id, arrApi);
  }

  onChangeEmpCode = val => {
    this.setState({ statusCd: val });
  };

  onClickApproval = () => {
    const { id, result: { requesterView: { detail } }, submitHandlerBySaga, onCancelPopup } = this.props;
    if (this.state.userInfo.deptId !== -1 &&  this.state.userInfo.pstnId !== -1) {
      const userInfo = {
        ...this.state.userInfo,
        deptName: detail.DEPT_ID,
        empNo: detail.REQUEST_ID,
        nameKor: detail.REQUESTER_NAME,
        email: detail.EMAIL,
      };
      console.debug('userInfo >> ', userInfo);
      // submitHandlerBySaga(id, 'POST', '/api/admin/v1/common/registUser/', userInfo, () => {
      //   onCancelPopup();
      // });
    } else {
      message.info(<MessageContent>회사와 직위를 선택해주세요.</MessageContent>);
    }
  };

  onClickDelete = e => {
    e.preventDefault();
    const { id, submitHandlerBySaga, selectedRow, onCancelPopup } = this.props;
    submitHandlerBySaga(id, 'DELETE', `/api/edds/v1/common/eddsRequest/${selectedRow.REQUEST_ID}`, {}, () => {
      onCancelPopup();
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
  }

  render() {
    const { result: { requesterView } } = this.props;
    let detail = {};
    if (requesterView && requesterView !== undefined && requesterView.detail !== undefined) {
      detail = requesterView.detail;
    }

    return (
      <div>
        {Object.keys(detail).length > 0 && (
          <>
            <StyledTable>
              <table>
                <colgroup>
                  <col width="20%" />
                  <col width="40%" />
                  <col width="40%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>요청 ID</th>
                    <td colSpan="2">{detail.REQUEST_ID}</td>
                  </tr>
                  <tr>
                    <th>요청자명</th>
                    <td colSpan="2">{detail.REQUESTER_NAME}</td>
                  </tr>
                  <tr>
                    <th>회사명</th>
                    <td>{detail.COMPANY_NAME}</td>
                    <td>
                      <AntdInput value={this.state.userInfo.deptName} className="input-mid" placeholder="회사선택" onClick={this.onClickCompany}  readOnly/>
                    </td>
                  </tr>
                  <tr>
                    <th>부서명</th>
                    <td colSpan="2">{detail.DEPT_NAME}</td>
                  </tr>
                  <tr>
                    <th>직위명</th>
                    <td>{detail.PSTN_NAME}</td>
                    <td>
                      <AntdInput value={this.state.userInfo.pstnName} className="input-mid" placeholder="직위선택" onClick={this.onClickPostion}  readOnly/>
                    </td>
                  </tr>
                  <tr>
                    <th>전화번호</th>
                    <td colSpan="2">{detail.PHONE}</td>
                    <td></td>
                  </tr>
                  <tr>
                    <th>이메일</th>
                    <td colSpan="2">{detail.EMAIL}</td>
                  </tr>
                </tbody>  
              </table>
            </StyledTable>
            <StyledButtonWrapper className="btn-wrap-center">
              <StyledButton className="btn-gray mr5" onClick={e => this.onClickDelete(e)}>삭제</StyledButton>
              <StyledButton className="btn-light mr5" onClick={this.props.onCancelPopup}>닫기</StyledButton>
              <StyledButton className="btn-primary" onClick={this.onClickApproval}>승인</StyledButton>
            </StyledButtonWrapper>
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
          </>
        )}
      </div>
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
