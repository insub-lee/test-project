import React, { Component } from 'react';
import { Select, Input, Button, Modal, message } from 'antd';
import StyledSearchWrap from 'components/CommonStyled/StyledSearchWrap';
import StyledContentsModal from 'commonStyled/EshsStyled/Modal/StyledContentsModal';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';
import StyledInput from 'commonStyled/Form/StyledInput';
import StyledSelect from 'commonStyled/Form/StyledSelect';
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
    const { id, changeFormData, formData, result } = this.props;
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
    if (searchList.length) changeFormData(id, 'is_search', true);
    changeFormData(id, 'is_search', true);
    changeFormData(id, 'searchList', searchList);
  };

  showUserModal = () => {
    const { id, changeFormData } = this.props;
    changeFormData(id, 'userModal', true);
    changeFormData(id, 'userModalType', 'INSERT');
  };

  handleUserOk = e => {
    console.debug('1111111111111111111');
    console.debug('eeeeeeeeeeee', e);
    if (this.validationCheck()) {
      const { id, submitHandlerBySaga, formData } = this.props;
      const type = (formData && formData.userModalType) || '';
      if (type === 'INSERT') {
        const submitData = (formData && formData.userData) || {};

        submitHandlerBySaga(id, 'PUT', '/api/eshs/v1/common/eshsHstCmpnyUser', submitData, this.saveComplete);
      } else if (type === 'UPDATE') {
        const submitData = (formData && formData.selectedUser) || {};

        submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/eshsHstCmpnyUser', submitData, this.saveComplete);
      }
    } else return false;
  };

  saveComplete = sagaKey => {
    const { id, getCallDataHandler, apiAry, changeFormData, handleAppStart, formData } = this.props;
    changeFormData(sagaKey, 'userData', { SITE: '청주' });
    getCallDataHandler(sagaKey, apiAry, handleAppStart);
    const is_update = formData && formData.userModalType;
    if (is_update === 'UPDATE') changeFormData(id, 'userModal', false);
  };

  handleUserCancel = e => {
    const { id, changeFormData } = this.props;
    changeFormData(id, 'userModal', false);
    changeFormData(id, 'userModalType', ' ');
  };

  showDeptModal = () => {
    const { id, changeFormData } = this.props;
    changeFormData(id, 'deptModal', true);
  };

  handleDeptCancel = () => {
    const { id, changeFormData } = this.props;
    changeFormData(id, 'deptModal', false);
    changeFormData(id, 'selectedDept', {});
  };

  validationCheck = () => {
    let is_ok = false;
    const { formData } = this.props;
    const type = (formData && formData.userModalType) || '';

    if (type === 'INSERT') {
      const userData = (formData && formData.userData) || {};
      if (!userData.HST_CMPNY_CD) {
        message.warning('주관회사를 선택하세요');
        return false;
      }
      if (!userData.EMP_NM) {
        message.warning('직원명을 입력하세요');
        return false;
      }
      if (!userData.DEPT_NM) {
        message.warning('부서를 선택하세요');
        return false;
      }
      is_ok = true;
    } else if (type === 'UPDATE') {
      const selectedUser = (formData && formData.selectedUser) || {};
      if (!selectedUser.EMP_NM) {
        message.warning('직원명을 입력하세요');
        return false;
      }
      if (!selectedUser.DEPT_NM) {
        message.warning('부서를 선택하세요');
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
            style={{ width: '10%' }}
            defaultValue={formData.searchSite && formData.searchSite === 'all' ? formData.searchSite : '지역 전체'}
            onChange={this.handleSiteOnChange}
          >
            <Option value="all">지역 전체</Option>
            <Option value="청주">청주</Option>
            <Option value="구미">구미</Option>
          </AntdSelect>
          <AntdSelect
            style={{ width: '10%' }}
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
            className="ant-input-inline"
            style={{ width: '10%' }}
            value={formData.searchName || ''}
            name="searchName"
            onChange={this.handleInputOnChange}
            placeholder="이름"
          />
          <StyledButtonWrapper className="btn-wrap-inline">
            <StyledButton className="btn-primary btn-first" onClick={this.handleOnSearch}>
              검색
            </StyledButton>
            <StyledButton className="btn-primary btn-first" onClick={this.showUserModal}>
              추가
            </StyledButton>
            <StyledButton className="btn-primary" type="link" onClick={this.showDeptModal}>
              [주관회사 부서관리]
            </StyledButton>
          </StyledButtonWrapper>
        </div>
        <AntdModal
          title="사용자 상세정보"
          visible={(formData && formData.userModal) || false}
          width={500}
          height={400}
          destroyOnClose
          onCancel={this.handleUserCancel}
          footer={[
            <StyledButtonWrapper className="btn-wrap-center">
              <StyledButton className="btn-primary btn-first" onClick={this.handleUserOk}>
                {formData && formData.userModalType === 'INSERT' ? '추가' : '저장'}
              </StyledButton>
              <StyledButton className="btn-primary" onClick={this.handleUserCancel}>
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
