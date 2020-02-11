/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Input, Select, message } from 'antd';

const { Option } = Select;

const ReadStar = () => <label style={{ color: 'red' }}>* </label>;

class UserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchDept: [],
    };
  }

  componentDidMount = () => {
    const { id, changeFormData, formData, getCallDataHanlder } = this.props;
    changeFormData(id, 'userData', { SITE: '청주' });
    const type = (formData && formData.userModalType) || '';
    if (type === 'UPDATE') {
      const apiAry = [
        {
          key: 'deptList',
          type: 'GET',
          url: `/api/eshs/v1/common/eshsHstCmpnyDept?CMPNY_CD=${(formData && formData.selectedUser && formData.selectedUser.hst_cmpny_cd) || ' '}`,
        },
      ];

      getCallDataHanlder(id, apiAry, this.setDept);
    }
  };

  handleSearchDept = e => {
    const {
      id,
      getCallDataHanlder,
      changeFormData,
      formData: { userData },
    } = this.props;

    const apiAry = [
      {
        key: 'deptList',
        type: 'GET',
        url: `/api/eshs/v1/common/eshsHstCmpnyDept?CMPNY_CD=${e}`,
      },
    ];
    getCallDataHanlder(id, apiAry, this.setDept);
    this.setState({
      hst_cmpny_cd: e,
    });
    changeFormData(id, 'userData', { ...userData, HST_CMPNY_CD: e });
  };

  setDept = () => {
    const {
      result,
      formData: { selectedUser },
    } = this.props;
    const searchDept = (result && result.deptList && result.deptList.eshsHstCmpnyDeptListByCmpny) || [];

    this.setState({
      searchDept,
    });
  };

  handleInputChange = e => {
    const { id, changeFormData, formData } = this.props;
    const { userData, selectedUser } = formData;
    const type = (formData && formData.userModalType) || '';
    if (type === 'INSERT') changeFormData(id, 'userData', { ...userData, [e.target.name]: e.target.value });
    else if (type === 'UPDATE') changeFormData(id, 'selectedUser', { ...selectedUser, [e.target.name]: e.target.value });
  };

  handleSiteOnChange = e => {
    const { id, changeFormData, formData } = this.props;
    const { userData, selectedUser } = formData;
    const type = (formData && formData.userModalType) || '';
    if (type === 'INSERT') changeFormData(id, 'userData', { ...userData, SITE: e });
    else if (type === 'UPDATE') changeFormData(id, 'selectedUser', { ...selectedUser, site: e });
  };

  handleDeptChange = e => {
    const { id, changeFormData, formData } = this.props;
    const { userData, selectedUser } = formData;
    const code = e.split('&&');
    const type = (formData && formData.userModalType) || '';
    if (type === 'INSERT') changeFormData(id, 'userData', { ...userData, DEPT_CD: code[1] });
    else if (type === 'UPDATE') changeFormData(id, 'selectedUser', { ...selectedUser, dept_cd: code[1] });
  };

  render() {
    const { result, formData } = this.props;
    const { searchDept } = this.state;
    const userModalType = (formData && formData.userModalType) || ' ';
    const cmpnyList = (result && result.cmpnyList && result.cmpnyList.eshsHstCmpnyList) || [];
    const dfValue = cmpnyList.length ? cmpnyList[0].hst_cmpny_cd : ' ';
    const selectedUser = (formData && formData.selectedUser) || {};
    const userData = (formData && formData.userData) || {};

    return userModalType === 'INSERT' ? (
      <div>
        <table>
          <thead></thead>
          <tbody>
            <tr>
              <td>
                <ReadStar />
                회사
              </td>
              <td>
                <Select defaultValue={dfValue} style={{ width: 130, padding: 3 }} onChange={this.handleSearchDept}>
                  {cmpnyList.map(c => (
                    <Option key={c.hst_cmpny_cd} style={{ height: 30 }}>
                      {c.hst_cmpny_nm}
                    </Option>
                  ))}
                </Select>
              </td>
            </tr>
            <tr>
              <td>
                <ReadStar />
                이름
              </td>
              <td>
                <Input name="EMP_NM" value={userData.EMP_NM || ''} onChange={this.handleInputChange} placeholder="이름" />
              </td>
            </tr>
            <tr>
              <td>직위</td>
              <td>
                <Input name="EMP_POSITION" value={userData.EMP_POSITION || ''} onChange={this.handleInputChange} placeholder="직위" />
              </td>
            </tr>
            <tr>
              <td>직책</td>
              <td>
                <Input name="DUTY" value={userData.DUTY || ''} onChange={this.handleInputChange} placeholder="직책" />
              </td>
            </tr>
            <tr>
              <td>
                <ReadStar />
                부서
              </td>
              <td>
                <Select
                  defaultValue={userData.DEPT_CD ? `${userData.HST_CMPNY_CD}&&${userData.DEPT_CD}` : ' '}
                  style={{ width: 130, padding: 3 }}
                  onChange={this.handleDeptChange}
                >
                  {searchDept.map(d => (
                    <Option key={`${d.hst_cmpny_cd}&&${d.dept_cd}`} style={{ height: 30 }}>
                      {d.dept_nm}
                    </Option>
                  ))}
                </Select>
              </td>
            </tr>
            <tr>
              <td>
                <ReadStar />
                근무지
              </td>
              <td>
                <Select defaultValue={userData.SITE || '청주'} style={{ width: 110, padding: 3 }} onChange={this.handleSiteOnChange}>
                  <Option value="청주">청주</Option>
                  <Option value="구미">구미</Option>
                </Select>
              </td>
            </tr>
            <tr>
              <td>사내전화</td>
              <td>
                <Input name="TEL" value={userData.TEL || ''} onChange={this.handleInputChange} placeholder="사내전화" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    ) : (
      <div>
        <table>
          <tbody>
            <tr>
              <td>
                <ReadStar />
                회사
              </td>
              <td>
                <label>
                  {cmpnyList.map(c => {
                    if (c.hst_cmpny_cd === selectedUser.hst_cmpny_cd) return c.hst_cmpny_nm;
                  })}
                </label>
              </td>
            </tr>
            <tr>
              <td>
                <ReadStar />
                이름
              </td>
              <td>
                <Input name="emp_nm" value={selectedUser.emp_nm || ''} onChange={this.handleInputChange} placeholder="이름" />
              </td>
            </tr>
            <tr>
              <td>직위</td>
              <td>
                <Input name="emp_position" value={selectedUser.emp_position || ''} onChange={this.handleInputChange} placeholder="직위" />
              </td>
            </tr>
            <tr>
              <td>직책</td>
              <td>
                <Input name="duty" value={selectedUser.duty || ''} onChange={this.handleInputChange} placeholder="직책" />
              </td>
            </tr>
            <tr>
              <td>
                <ReadStar />
                부서
              </td>
              <td>
                <Select defaultValue={selectedUser.dept_nm} style={{ width: 130, padding: 3 }} onChange={this.handleDeptChange}>
                  {searchDept.map(d => (
                    <Option key={`${d.hst_cmpny_cd}&&${d.dept_cd}`} style={{ height: 30 }}>
                      {d.dept_nm}
                    </Option>
                  ))}
                </Select>
              </td>
            </tr>
            <tr>
              <td>
                <ReadStar />
                근무지
              </td>
              <td>
                <Select defaultValue={selectedUser.site || '청주'} style={{ width: 110, padding: 3 }} onChange={this.handleSiteOnChange}>
                  <Option value="청주">청주</Option>
                  <Option value="구미">구미</Option>
                </Select>
              </td>
            </tr>
            <tr>
              <td>사내전화</td>
              <td>
                <Input name="tel" value={selectedUser.tel || ''} onChange={this.handleInputChange} placeholder="사내전화" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

UserModal.defaultProps = {};
export default UserModal;
