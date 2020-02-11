import React, { Component } from 'react';
import { Select, Input, Button, Modal, message } from 'antd';
import UserModal from './UserModal';
import DeptModal from './DeptModal';

const { Option } = Select;

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
      searchList = userList.filter(u => u.site === searchSite && u.hst_cmpny_cd === searchCmpny && u.emp_nm === searchName);
    else if (searchSite && searchCmpny) searchList = userList.filter(u => u.site === searchSite && u.hst_cmpny_cd === searchCmpny);
    else if (searchSite && searchName) searchList = userList.filter(u => u.site === searchSite && u.emp_nm === searchName);
    else if (searchName && searchCmpny) searchList = userList.filter(u => u.emp_nm === searchName && u.hst_cmpny_cd === searchCmpny);
    else if (searchSite) searchList = userList.filter(u => u.site === searchSite);
    else if (searchCmpny) searchList = userList.filter(u => u.hst_cmpny_cd === searchCmpny);
    else if (searchName) searchList = userList.filter(u => u.emp_nm === searchName);
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
    if (this.validationCheck()) {
      const { id, submitHadnlerBySaga, formData } = this.props;
      const type = (formData && formData.userModalType) || '';
      if (type === 'INSERT') {
        const submitData = (formData && formData.userData) || {};

        submitHadnlerBySaga(id, 'PUT', '/api/eshs/v1/common/eshsHstCmpnyUser', submitData, this.saveComplete);
      } else if (type === 'UPDATE') {
        const submitData = (formData && formData.selectedUser) || {};

        submitHadnlerBySaga(id, 'POST', '/api/eshs/v1/common/eshsHstCmpnyUser', submitData, this.saveComplete);
      }
    } else return false;
  };

  saveComplete = sagaKey => {
    const { id, getCallDataHanlder, apiAry, changeFormData, handleAppStart, formData } = this.props;
    changeFormData(sagaKey, 'userData', { SITE: '청주' });
    getCallDataHanlder(sagaKey, apiAry, handleAppStart);
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
      if (!selectedUser.emp_nm) {
        message.warning('직원명을 입력하세요');
        return false;
      }
      if (!selectedUser.dept_nm) {
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
      <div className="Eshs_hostCmpny_SearchBar">
        <Select
          defaultValue={formData.searchSite && formData.searchSite === 'all' ? formData.searchSite : '지역 전체'}
          style={{ width: 110, padding: 3 }}
          onChange={this.handleSiteOnChange}
        >
          <Option value="all">지역 전체</Option>
          <Option value="청주">청주</Option>
          <Option value="구미">구미</Option>
        </Select>
        <Select
          defaultValue={formData.searchCmpny && formData.searchCmpny === 'all' ? formData.searchCmpny : '회사 전체'}
          style={{ width: 130, padding: 3 }}
          onChange={this.handleCmpnyOnChange}
        >
          <Option value="all">회사 전체</Option>
          {cmpnyList.map(c => (
            <Option key={c.hst_cmpny_cd} style={{ height: 30 }}>
              {c.hst_cmpny_nm}
            </Option>
          ))}
        </Select>
        <span>이름</span>
        <Input style={{ width: 130, padding: 3 }} value={formData.searchName || ''} name="searchName" onChange={this.handleInputOnChange} placeholder="이름" />
        &nbsp;&nbsp;
        <Button onClick={this.handleOnSearch}>검색</Button>
        &nbsp;&nbsp;
        <Button onClick={this.showUserModal}>추가</Button>
        &nbsp;&nbsp;
        <Button type="link" onClick={this.showDeptModal}>
          [주관회사 부서관리]
        </Button>
        <Modal
          title="사용자 상세정보"
          destroyOnClose
          visible={(formData && formData.userModal) || false}
          onOk={this.handleUserOk}
          onCancel={this.handleUserCancel}
          okText={formData && formData.userModalType === 'INSERT' ? '추가' : '저장'}
          cancelText="닫기"
          width={500}
          height={400}
          bodyStyle={{ backgroundColor: '#f4f4f4' }}
          className="eshs_user_modal"
        >
          <UserModal {...this.props} />
        </Modal>
        <Modal
          title="주관회사 부서 관리"
          destroyOnClose
          visible={(formData && formData.deptModal) || false}
          onCancel={this.handleDeptCancel}
          width={900}
          height={600}
          footer={[null]}
        >
          <DeptModal {...this.props} />
        </Modal>
      </div>
    );
  }
}

SearchBar.defaultProps = {
  cmpnyList: [],
};
export default SearchBar;
