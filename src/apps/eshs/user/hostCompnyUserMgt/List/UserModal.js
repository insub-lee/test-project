/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Input, Select } from 'antd';
import UserModalStyled from './UserModalStyled';

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
    console.debug('여기는 componentDIdMount');
    const { id, changeFormData, formData, getCallDataHandler } = this.props;
    const cmpnyList = (formData && formData.cmpnyList) || [];
    changeFormData(id, 'userData', { SITE: '청주', HST_CMPNY_CD: cmpnyList[0].HST_CMPNY_CD });
    const type = (formData && formData.userModalType) || '';
    if (type === 'UPDATE') {
      const apiAry = [
        {
          key: 'deptList',
          type: 'GET',
          url: `/api/eshs/v1/common/eshsHstCmpnyDept?CMPNY_CD=${(formData && formData.selectedUser && formData.selectedUser.HST_CMPNY_CD) || ' '}`,
        },
      ];

      getCallDataHandler(id, apiAry, this.setDept);
    } else if (type === 'INSERT') {
      const apiAry = [
        {
          key: 'deptList',
          type: 'GET',
          url: `/api/eshs/v1/common/eshsHstCmpnyDept?CMPNY_CD=${cmpnyList[0].HST_CMPNY_CD}`,
        },
      ];

      getCallDataHandler(id, apiAry, this.setDept);
    }
  };

  handleSearchDept = e => {
    const {
      id,
      getCallDataHandler,
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
    getCallDataHandler(id, apiAry, this.setDept);
    this.setState({
      HST_CMPNY_CD: e,
    });
    changeFormData(id, 'userData', { ...userData, HST_CMPNY_CD: e, DEPT_CD: '', DEPT_NM: '' });
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
    else if (type === 'UPDATE') changeFormData(id, 'selectedUser', { ...selectedUser, SITE: e });
  };

  handleDeptChange = e => {
    const { id, changeFormData, formData } = this.props;
    const { userData, selectedUser } = formData;
    const code = e.split('&&');
    const type = (formData && formData.userModalType) || '';
    if (type === 'INSERT') changeFormData(id, 'userData', { ...userData, DEPT_CD: code[1], DEPT_NM: code[2] });
    else if (type === 'UPDATE') changeFormData(id, 'selectedUser', { ...selectedUser, DEPT_CD: code[1], DEPT_NM: code[2] });
  };

  render() {
    const { result, formData } = this.props;
    const { searchDept } = this.state;
    const userModalType = (formData && formData.userModalType) || ' ';
    const cmpnyList = (result && result.cmpnyList && result.cmpnyList.eshsHstCmpnyList) || [];
    const dfValue = (formData && formData.userData && formData.userData.HST_CMPNY_CD) || '';
    const selectedUser = (formData && formData.selectedUser) || {};
    const userData = (formData && formData.userData) || {};

    return userModalType === 'INSERT' ? (
      <UserModalStyled>
        <div className="userModal_body">
          <table>
            <thead></thead>
            <tbody>
              <tr>
                <td>
                  <ReadStar />
                  회사
                </td>
                <td>
                  <Select value={dfValue} style={{ width: 130, padding: 3 }} onChange={this.handleSearchDept}>
                    {cmpnyList.map(c => (
                      <Option key={c.HST_CMPNY_CD} style={{ height: 30 }}>
                        {c.HST_CMPNY_NM}
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
                  <span>(ex. 부장)</span>
                </td>
              </tr>
              <tr>
                <td>직책</td>
                <td>
                  <Input name="DUTY" value={userData.DUTY || ''} onChange={this.handleInputChange} placeholder="직책" />
                  <span>(ex. 팀장)</span>
                </td>
              </tr>
              <tr>
                <td>
                  <ReadStar />
                  부서
                </td>
                <td>
                  <Select
                    defaultValue={' '}
                    value={userData.DEPT_CD ? `${userData.HST_CMPNY_CD}&&${userData.DEPT_CD}&&${userData.DEPT_NM}` : ''}
                    style={{ width: 130, padding: 3 }}
                    onChange={this.handleDeptChange}
                  >
                    {searchDept.map(d => (
                      <Option key={`${d.HST_CMPNY_CD}&&${d.DEPT_CD}&&${d.DEPT_NM}`} style={{ height: 30 }}>
                        {d.DEPT_NM}
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
      </UserModalStyled>
    ) : (
      <UserModalStyled>
        <div className="userModal_body">
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
                      if (c.HST_CMPNY_CD === selectedUser.HST_CMPNY_CD) return c.HST_CMPNY_NM;
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
                  <Input name="EMP_NM" value={selectedUser.EMP_NM || ''} onChange={this.handleInputChange} placeholder="이름" />
                </td>
              </tr>
              <tr>
                <td>직위</td>
                <td>
                  <Input name="EMP_POSITION" value={selectedUser.EMP_POSITION || ''} onChange={this.handleInputChange} placeholder="직위" />
                  <span>(ex. 부장)</span>
                </td>
              </tr>
              <tr>
                <td>직책</td>
                <td>
                  <Input name="DUTY" value={selectedUser.DUTY || ''} onChange={this.handleInputChange} placeholder="직책" />
                  <span>(ex. 팀장)</span>
                </td>
              </tr>
              <tr>
                <td>
                  <ReadStar />
                  부서
                </td>
                <td>
                  <Select
                    value={`${selectedUser.HST_CMPNY_CD}&&${selectedUser.DEPT_CD}&&${selectedUser.DEPT_NM}`}
                    style={{ width: 130, padding: 3 }}
                    onChange={this.handleDeptChange}
                  >
                    {searchDept.map(d => (
                      <Option key={`${d.HST_CMPNY_CD}&&${d.DEPT_CD}&&${d.DEPT_NM}`} style={{ height: 30 }}>
                        {d.DEPT_NM}
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
                  <Select defaultValue={selectedUser.SITE || '청주'} style={{ width: 110, padding: 3 }} onChange={this.handleSiteOnChange}>
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
      </UserModalStyled>
    );
  }
}

UserModal.defaultProps = {};
export default UserModal;
