import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Select } from 'antd';

import StyledTable from 'commonStyled/MdcsStyled/Table/StyledHtmlTable';
import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledInput from 'commonStyled/Form/StyledInput';
import StyledSelect from 'commonStyled/Form/StyledSelect';

const AntdSelect = StyledSelect(Select);
const { Option } = Select;

class RequesterView extends Component {
  state = {
    statusCd: '',
  };

  componentDidMount() {
    const { id, getCallDataHandler, selectedRow } = this.props;
    const arrApi = [
      {
        key: 'requesterView',
        url: `/api/edds/v1/common/eddsRequest/${selectedRow.REQUEST_ID}`,
        type: 'GET',
      },
      {
        key: 'distDeptList',
        url: '/api/mdcs/v1/common/distribute/DistributeDeptMgnt',
        type: 'GET',
        params: {},
      },
      {
        key: 'empStatusCodeList',
        url: '/api/admin/v1/common/codeadmindtl',
        type: 'POST',
        params: {
          codeGrpCd: 'EMPSTATUS',
        },
      },
    ];
    getCallDataHandler(id, arrApi)
  }

  onChangeEmpCode = val => {
    this.setState({ statusCd: val });
  };

  onClickApproval = () => {
    // const userInfo = {
    //   userId: Number(this.state.userId),
    //   empNo: this.state.empNo.toUpperCase(),
    //   nameKor: this.state.nameKor,
    //   nameEng: this.state.nameEng,
    //   nameChn: this.state.nameChn,
    //   photo: this.state.photo,
    //   email: this.state.email,
    //   statusCd: this.state.statusCd,
    //   deptId: this.state.deptId,
    //   pstnId: this.state.pstnId,
    //   dutyId: this.state.dutyId,
    //   rankId: this.state.rankId,
    //   officeTel: this.state.officeTel,
    //   mobileTel: this.state.mobileTel,
    //   compCd: this.state.compCd,
    // };
    // /api/admin/v1/common/registUser/
  }

  onClickDelete = e => {
    e.preventDefault();
    const { id, submitHandlerBySaga, selectedRow, onCancelPopup } = this.props;
    submitHandlerBySaga(id, 'DELETE', `/api/edds/v1/common/eddsRequest/${selectedRow.REQUEST_ID}`, {}, () => {
      onCancelPopup();
    });
  }

  render() {
    const { result: { requesterView, distDeptList, empStatusCodeList } } = this.props;
    let detail = {};
    let deptList = [];
    let empCodeList = [];
    if (requesterView && requesterView !== undefined && requesterView.detail !== undefined) {
      detail = requesterView.detail;
    }
    if (distDeptList && distDeptList !== undefined && distDeptList.list !== undefined) {
      deptList = requesterView.list;
    }
    if (empStatusCodeList && empStatusCodeList !== undefined && empStatusCodeList.codeadmindtl !== undefined) {
      empCodeList = empStatusCodeList.codeadmindtl;
    }

    return (
      <div>
        {Object.keys(detail).length > 0 && (
          <React.Fragment>
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
                    <th>상태</th>
                    <td colSpan="2">
                      <AntdSelect value={this.state.statusCd} onChange={val => this.onChangeEmpCode(val)} className="selectMid" style={{ width: '100px' }}>
                        {empCodeList.map(code => (
                          <Option value={code.CODE_CD}>{code.NAME_KOR}</Option>
                        ))}
                      </AntdSelect>
                    </td>
                  </tr>
                  <tr>
                    <th>회사명</th>
                    <td>{detail.COMPANY_NAME}</td>
                    <td></td>
                  </tr>
                  <tr>
                    <th>부서명</th>
                    <td colSpan="2">{detail.DEPT_NAME}</td>
                  </tr>
                  <tr>
                    <th>직급명</th>
                    <td>{detail.PSTN_NAME}</td>
                    <td></td>
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
            <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
              <StyledButton className="btn-gray mr5" onClick={e => this.onClickDelete(e)}>삭제</StyledButton>
              <StyledButton className="btn-light mr5" onClick={this.props.onCancelPopup}>닫기</StyledButton>
              <StyledButton className="btn-primary">승인</StyledButton>
            </StyledButtonWrapper>
          </React.Fragment>
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
}

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
}

export default RequesterView;
