import React, { Component } from 'react';
import { Select, Input, Button, Modal } from 'antd';
import StyledContentsModal from 'commonStyled/EshsStyled/Modal/StyledContentsModal';

import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';
import StyledInput from 'commonStyled/Form/StyledInput';
import StyledSelect from 'commonStyled/Form/StyledSelect';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import UserModal from './UserModal';
import DeptModal from './DeptModal';

const { Option } = Select;
const AntdModal = StyledContentsModal(Modal);
const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);

class SearchBar extends Component {
  constructor(props) {
    super(props);
  }

  handleSiteOnChange = e => {
    const { id, changeFormData } = this.props;
    changeFormData(id, 'searchSite', e);
  };

  handleCmpnyOnChange = e => {
    const { id, changeFormData } = this.props;
    changeFormData(id, 'searchCmpny', e);
  };

  handleInputOnChange = e => {
    const { id, changeFormData } = this.props;
    changeFormData(id, e.target.name, e.target.value);
  };

  handleOnSearch = () => {
    const { id, setFormData, formData, result } = this.props;
    const searchSite = (formData && formData.searchSite === 'all' ? '' : formData.searchSite) || '';
    const searchCmpny = (formData && formData.searchCmpny === 'all' ? '' : formData.searchCmpny) || '';
    const searchName = (formData && formData.searchName) || '';
    const userList = (result && result.selectAllUserList && result.selectAllUserList.list) || [];
    let searchList = [];

    if (searchSite && searchCmpny && searchName)
      searchList = userList.filter(u => u.SITE === searchSite && u.HST_CMPNY_CD === searchCmpny && u.EMP_NM === searchName);
    else if (searchSite && searchCmpny) searchList = userList.filter(u => u.SITE === searchSite && u.HST_CMPNY_CD === searchCmpny);
    else if (searchSite && searchName) searchList = userList.filter(u => u.SITE === searchSite && u.EMP_NM === searchName);
    else if (searchName && searchCmpny) searchList = userList.filter(u => u.EMP_NM === searchName && u.HST_CMPNY_CD === searchCmpny);
    else if (searchSite) searchList = userList.filter(u => u.SITE === searchSite);
    else if (searchCmpny) searchList = userList.filter(u => u.HST_CMPNY_CD === searchCmpny);
    else if (searchName) searchList = userList.filter(u => u.EMP_NM === searchName);
    else searchList = userList;
    setFormData(id, { ...formData, is_search: true, searchList });
  };

  showUserModal = () => {
    const { id, setFormData, formData } = this.props;
    setFormData(id, { ...formData, userModal: true, userModalType: 'INSERT' });
  };

  handleUserOk = () => {
    if (this.validationCheck()) {
      const { id, submitHandlerBySaga, formData } = this.props;
      const type = (formData && formData.userModalType) || '';
      if (type === 'INSERT') {
        const submitData = (formData && formData.userData) || {};
        submitHandlerBySaga(id, 'PUT', '/api/eshs/v1/common/eshsHstCmpnyUser', submitData, (afterId, res) => {
          if (res && res.code === 200) {
            message.info(<MessageContent>저장되었습니다.</MessageContent>);
            return this.saveComplete();
          }
          return message.info(<MessageContent>저장에 실패하였습니다.</MessageContent>);
        });
      } else if (type === 'UPDATE') {
        const submitData = (formData && formData.selectedUser) || {};

        submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/eshsHstCmpnyUser', submitData, (afterId, res) => {
          if (res && res.code === 200) {
            message.info(<MessageContent>수정되었습니다.</MessageContent>);
            return this.saveComplete();
          }
          return message.info(<MessageContent>수정에 실패하였습니다.</MessageContent>);
        });
      }
    }
    return undefined;
  };

  saveComplete = () => {
    const { id, getCallDataHandler, apiAry, changeFormData, handleAppStart, formData } = this.props;
    changeFormData(id, 'userData', { SITE: '청주' });
    getCallDataHandler(id, apiAry, handleAppStart);
    const is_update = formData && formData.userModalType;
    if (is_update === 'UPDATE') changeFormData(id, 'userModal', false);
  };

  handleUserCancel = e => {
    const { id, setFormData, formData } = this.props;
    setFormData(id, { ...formData, userModal: false, userModalType: '' });
  };

  showDeptModal = () => {
    const { id, changeFormData } = this.props;
    changeFormData(id, 'deptModal', true);
  };

  handleDeptCancel = () => {
    const { id, setFormData, formData } = this.props;
    setFormData(id, { ...formData, deptModal: false, selectedDept: {} });
  };

  validationCheck = () => {
    let is_ok = false;
    const { formData } = this.props;
    const type = (formData && formData.userModalType) || '';

    if (type === 'INSERT') {
      const userData = (formData && formData.userData) || {};
      if (!userData.HST_CMPNY_CD) {
        message.info(<MessageContent>주관회사를 선택하세요.</MessageContent>);

        return false;
      }
      if (!userData.EMP_NM) {
        message.info(<MessageContent>직원명을 입력하세요.</MessageContent>);
        return false;
      }
      if (!userData.DEPT_NM) {
        message.info(<MessageContent>부서를 선택하세요.</MessageContent>);
        return false;
      }
      is_ok = true;
    } else if (type === 'UPDATE') {
      const selectedUser = (formData && formData.selectedUser) || {};
      if (!selectedUser.EMP_NM) {
        message.info(<MessageContent>직원명을 입력하세요.</MessageContent>);

        return false;
      }
      if (!selectedUser.DEPT_NM) {
        message.info(<MessageContent>부서를 선택하세요</MessageContent>);

        return false;
      }
      is_ok = true;
    }

    return is_ok;
  };

  render() {
    const { formData, Search } = this.props;
    const { result } = this.props;
    const cmpnyList = (result && result.cmpnyList && result.cmpnyList.eshsHstCmpnyList) || [];
    return (
      <div>
        <div className="selSaveWrapper alignLeft">
          <AntdSelect
            className="select-mid mr5"
            style={{ width: '15%' }}
            defaultValue={formData.searchSite && formData.searchSite === 'all' ? formData.searchSite : '지역 전체'}
            onChange={this.handleSiteOnChange}
          >
            <Option value="all">지역 전체</Option>
            <Option value="청주">청주</Option>
            <Option value="구미">구미</Option>
          </AntdSelect>
          <AntdSelect
            className="select-mid mr5"
            style={{ width: '15%' }}
            defaultValue={formData.searchCmpny && formData.searchCmpny === 'all' ? formData.searchCmpny : '회사 전체'}
            onChange={this.handleCmpnyOnChange}
          >
            <Option value="all">회사 전체</Option>
            {cmpnyList.map(c => (
              <Option key={c.HST_CMPNY_CD} style={{ height: 30 }}>
                {c.HST_CMPNY_NM}
              </Option>
            ))}
          </AntdSelect>
          <AntdInput
            className="ant-input-inline ant-input-mid mr5 "
            style={{ width: '10%' }}
            value={formData.searchName || ''}
            name="searchName"
            onChange={this.handleInputOnChange}
            placeholder="이름"
          />
          <StyledButtonWrapper className="btn-wrap-inline">
            <StyledButton className="btn-gray btn-first btn-sm" onClick={this.handleOnSearch}>
              검색
            </StyledButton>
            <StyledButton className="btn-primary btn-first btn-sm" onClick={this.showUserModal}>
              추가
            </StyledButton>
            <StyledButton className="btn-gray btn-sm" type="link" onClick={this.showDeptModal}>
              [주관회사 부서관리]
            </StyledButton>
          </StyledButtonWrapper>
        </div>
        <AntdModal
          title="사용자 상세정보"
          visible={(formData && formData.userModal) || false}
          width={500}
          height={400}
          onCancel={this.handleUserCancel}
          footer={[
            <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
              <StyledButton className="btn-primary btn-sm btn-first" onClick={this.handleUserOk}>
                {formData && formData.userModalType === 'INSERT' ? '추가' : '저장'}
              </StyledButton>
              <StyledButton className="btn-light btn-sm" onClick={this.handleUserCancel}>
                닫기
              </StyledButton>
            </StyledButtonWrapper>,
          ]}
        >
          <UserModal {...this.props} />
        </AntdModal>
        <AntdModal
          title="주관회사 부서 관리"
          destroyOnClose
          visible={(formData && formData.deptModal) || false}
          onCancel={this.handleDeptCancel}
          width={900}
          height={600}
          footer={[null]}
        >
          <DeptModal {...this.props} />
        </AntdModal>
      </div>
    );
  }
}

SearchBar.defaultProps = {
  cmpnyList: [],
};
export default SearchBar;
