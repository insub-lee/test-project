import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Select, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

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
const { confirm } = Modal;

class UserView extends Component {
  state = {};

  componentDidMount() {
    const { id, setFormData, selectedRow } = this.props;
    setFormData(id, selectedRow);
  }

  onChangeFormData = (key, val) => {
    const { id, changeFormData } = this.props;
    changeFormData(id, key, val);
  };

  onClickUpdate = () => {
    const { id, formData, submitHandlerBySaga, onCancelPopup } = this.props;
    const userInfo = {
      userId: formData.USER_ID,
      empNo: formData.EMP_NO,
      nameKor: formData.NAME_KOR,
      nameEng: formData.NAME_ENG,
      nameChn: formData.NAME_CHN,
      photo: formData.PHOTO,
      email: formData.EMAIL,
      statusCd: formData.STATUS_CD,
      empType: formData.EMP_TYPE,
      deptId: formData.DEPT_ID,
      pstnId: formData.PSTN_ID,
      dutyId: formData.DUTY_ID,
      rankId: formData.RANK_ID,
      officeTel: formData.OFFICE_TEL_NO,
      mobileTel: formData.MOBILE_TEL_NO,
      compCd: formData.COMP_CD,
    };

    submitHandlerBySaga(id, 'POST', '/api/admin/v1/common/updateUser', userInfo, () => {
      onCancelPopup();
    });
  };

  render() {
    const { formData: detail } = this.props;

    return (
      <div>
        {Object.keys(detail).length > 0 && (
          <>
            <StyledTable>
              <table>
                <colgroup>
                  <col width="20%" />
                  <col width="80%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>사용자 ID</th>
                    <td>{detail.EMP_NO}</td>
                  </tr>
                  <tr>
                    <th>사용자명</th>
                    <td>
                      <AntdInput value={detail.NAME_KOR} onChange={e => this.onChangeFormData('NAME_KOR', e.target.value)} />
                    </td>
                  </tr>
                  <tr>
                    <th>회사명</th>
                    <td>{detail.COMPANY_NAME}</td>
                  </tr>
                  <tr>
                    <th>부서명</th>
                    <td>{detail.DEPT_NAME}</td>
                  </tr>
                  <tr>
                    <th>직위명</th>
                    <td>{detail.PSTN_NAME}</td>
                  </tr>
                  <tr>
                    <th>전화번호</th>
                    <td>
                      <AntdInput value={detail.MOBILE_TEL_NO} onChange={e => this.onChangeFormData('MOBILE_TEL_NO', e.target.value)} />
                    </td>
                  </tr>
                  <tr>
                    <th>이메일</th>
                    <td>{detail.EMAIL}</td>
                  </tr>
                </tbody>  
              </table>
            </StyledTable>
            <StyledButtonWrapper className="btn-wrap-center">
              <StyledButton className="btn-light mr5" onClick={this.props.onCancelPopup}>닫기</StyledButton>
              <StyledButton className="btn-primary" onClick={this.onClickUpdate}>수정</StyledButton>
            </StyledButtonWrapper>
          </>
        )}
      </div>
    );
  }
}

UserView.propTypes = {
  id: PropTypes.string,
  apiAry: PropTypes.array,
  result: PropTypes.object,
  getCallDataHandler: PropTypes.func,
  selectedRow: PropTypes.object,
  formData: PropTypes.object,
};

UserView.defaultProps = {
  id: 'userView',
  result: {
    userView: {
      detail: [],
    },
  },
  getCallDataHandler: () => {},
  selectedRow: {},
  formData: {},
};

export default UserView;