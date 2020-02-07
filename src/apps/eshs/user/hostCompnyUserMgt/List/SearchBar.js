import React, { Component } from 'react';
import { Select, Input, Button, Modal } from 'antd';
import UserModal from './UserModal';

const { Option } = Select;

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { user_Modal: false };
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
    console.debug('searchSite 111111111111111', searchSite);
    console.debug('searchCmpny111111111111111', searchCmpny);
    console.debug('searchName1111111111111', searchName);
    console.debug('userList1111111111111', userList);

    if (searchSite && searchCmpny && searchName)
      searchList = userList.filter(u => u.site === searchSite && u.hst_cmpny_cd === searchCmpny && u.emp_nm === searchName);
    else if (searchSite && searchCmpny) searchList = userList.filter(u => u.site === searchSite && u.hst_cmpny_cd === searchCmpny);
    else if (searchSite && searchName) searchList = userList.filter(u => u.site === searchSite && u.emp_nm === searchName);
    else if (searchName && searchCmpny) searchList = userList.filter(u => u.emp_nm === searchName && u.hst_cmpny_cd === searchCmpny);
    else if (searchSite) searchList = userList.filter(u => u.site === searchSite);
    else if (searchCmpny) searchList = userList.filter(u => u.hst_cmpny_cd === searchCmpny);
    else if (searchName) searchList = userList.filter(u => u.emp_nm === searchName);
    else searchList = userList;
    console.debug('searchList1111111111111', searchList);
    changeFormData(id, 'searchList', searchList);
  };

  showUserModal = () => {
    console.debug('userModal', this.state);
    this.setState({
      user_Modal: true,
    });
  };

  handleUserOk = e => {
    console.debug(e);
    this.setState({
      user_Modal: false,
    });
  };

  handleUserCancel = e => {
    console.debug(e);
    this.setState({
      user_Modal: false,
    });
  };

  render() {
    const { formData, Search } = this.props;
    const { result } = this.props;
    const cmpnyList = (result && result.cmpnyList && result.cmpnyList.eshsHstCmpnyList) || [];
    console.debug('formData', formData);
    console.log('this.props ..... ', this.props);
    // const cmpnyList = (formData && formData.cmpnyList) || [];
    return (
      <div>
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
        이름
        <Input style={{ width: 130, padding: 3 }} value={formData.searchName || ''} name="searchName" onChange={this.handleInputOnChange} />
        <Button onClick={this.handleOnSearch}>검색</Button>
        <Button onClick={this.showUserModal}>추가</Button>
        <Button type="link">[주관회사 부서관리]</Button>
        <Modal title="사용자 상세정보" destroyOnClose visible={this.state.user_Modal} onOk={this.handleUserOk} onCancel={this.handleUserCancel}>
          <UserModal {...this.props} />
        </Modal>
      </div>
    );
  }
}

SearchBar.defaultProps = {
  cmpnyList: [],
};
export default SearchBar;
