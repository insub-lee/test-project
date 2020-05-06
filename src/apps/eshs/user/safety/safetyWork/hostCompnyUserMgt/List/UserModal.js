/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Input, Select } from 'antd';
import StyledHtmlTable from 'commonStyled/MdcsStyled/Table/StyledHtmlTable';
import StyledSelect from 'commonStyled/Form/StyledSelect';
import StyledInput from 'commonStyled/Form/StyledInput';

const { Option } = Select;
const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);

class UserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchDept: [],
    };
  }

  componentDidMount = () => {
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
      <StyledHtmlTable>
        <table>
          <colgroup>
            <col width="20%" />
            <col width="80%" />
          </colgroup>
          <thead></thead>
          <tbody>
            <tr>
              <th>* 회사</th>
              <td>
                <AntdSelect value={dfValue} style={{ width: '50%' }} onChange={this.handleSearchDept}>
                  {cmpnyList.map(c => (
                    <Option key={c.HST_CMPNY_CD} style={{ height: 30 }}>
                      {c.HST_CMPNY_NM}
                    </Option>
                  ))}
                </AntdSelect>
              </td>
            </tr>
            <tr>
              <th>* 이름</th>
              <td>
                <AntdInput
                  className="ant-input-inline"
                  style={{ width: '50%' }}
                  name="EMP_NM"
                  value={userData.EMP_NM || ''}
                  onChange={this.handleInputChange}
                  placeholder="이름"
                />
              </td>
            </tr>
            <tr>
              <th>직위</th>
              <td>
                <AntdInput
                  className="ant-input-inline"
                  name="EMP_POSITION"
                  style={{ width: '50%' }}
                  value={userData.EMP_POSITION || ''}
                  onChange={this.handleInputChange}
                  placeholder="직위"
                />
                <span>&nbsp;(ex. 부장)</span>
              </td>
            </tr>
            <tr>
              <th>직책</th>
              <td>
                <AntdInput
                  className="ant-input-inline"
                  style={{ width: '50%' }}
                  name="DUTY"
                  value={userData.DUTY || ''}
                  onChange={this.handleInputChange}
                  placeholder="직책"
                />
                <span>&nbsp;(ex. 팀장)</span>
              </td>
            </tr>
            <tr>
              <th>* 부서</th>
              <td>
                <AntdSelect
                  defaultValue={' '}
                  value={userData.DEPT_CD ? `${userData.HST_CMPNY_CD}&&${userData.DEPT_CD}&&${userData.DEPT_NM}` : ''}
                  style={{ width: '50%' }}
                  onChange={this.handleDeptChange}
                >
                  {searchDept.map(d => (
                    <Option key={`${d.HST_CMPNY_CD}&&${d.DEPT_CD}&&${d.DEPT_NM}`} style={{ height: 30 }}>
                      {d.DEPT_NM}
                    </Option>
                  ))}
                </AntdSelect>
              </td>
            </tr>
            <tr>
              <th>* 근무지</th>
              <td>
                <AntdSelect defaultValue={userData.SITE || '청주'} style={{ width: '50%' }} onChange={this.handleSiteOnChange}>
                  <Option value="청주">청주</Option>
                  <Option value="구미">구미</Option>
                </AntdSelect>
              </td>
            </tr>
            <tr>
              <th>사내전화</th>
              <td>
                <AntdInput
                  className="ant-input-inline"
                  style={{ width: '50%' }}
                  name="TEL"
                  value={userData.TEL || ''}
                  onChange={this.handleInputChange}
                  placeholder="사내전화"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </StyledHtmlTable>
    ) : (
      <StyledHtmlTable>
        <table>
          <tbody>
            <tr>
              <th>* 회사</th>
              <td>
                <label>
                  {cmpnyList.map(c => {
                    if (c.HST_CMPNY_CD === selectedUser.HST_CMPNY_CD) return c.HST_CMPNY_NM;
                    return '';
                  })}
                </label>
              </td>
            </tr>
            <tr>
              <th>* 이름</th>
              <td>
                <AntdInput
                  className="ant-input-inline"
                  name="EMP_NM"
                  style={{ width: '50%' }}
                  value={selectedUser.EMP_NM || ''}
                  onChange={this.handleInputChange}
                  placeholder="이름"
                />
              </td>
            </tr>
            <tr>
              <th>직위</th>
              <td>
                <AntdInput
                  className="ant-input-inline"
                  name="EMP_POSITION"
                  value={selectedUser.EMP_POSITION || ''}
                  style={{ width: '50%' }}
                  onChange={this.handleInputChange}
                  placeholder="직위"
                />
                <span>&nbsp;(ex. 부장)</span>
              </td>
            </tr>
            <tr>
              <th>직책</th>
              <td>
                <AntdInput
                  className="ant-input-inline"
                  name="DUTY"
                  value={selectedUser.DUTY || ''}
                  style={{ width: '50%' }}
                  onChange={this.handleInputChange}
                  placeholder="직책"
                />
                <span>&nbsp;(ex. 팀장)</span>
              </td>
            </tr>
            <tr>
              <th>* 부서</th>
              <td>
                <AntdSelect
                  value={`${selectedUser.HST_CMPNY_CD}&&${selectedUser.DEPT_CD}&&${selectedUser.DEPT_NM}`}
                  style={{ width: '50%' }}
                  onChange={this.handleDeptChange}
                >
                  {searchDept.map(d => (
                    <Option key={`${d.HST_CMPNY_CD}&&${d.DEPT_CD}&&${d.DEPT_NM}`} style={{ height: 30 }}>
                      {d.DEPT_NM}
                    </Option>
                  ))}
                </AntdSelect>
              </td>
            </tr>
            <tr>
              <th>* 근무지</th>
              <td>
                <AntdSelect defaultValue={selectedUser.SITE || '청주'} style={{ width: '50%' }} onChange={this.handleSiteOnChange}>
                  <Option value="청주">청주</Option>
                  <Option value="구미">구미</Option>
                </AntdSelect>
              </td>
            </tr>
            <tr>
              <th>사내전화</th>
              <td>
                <AntdInput
                  className="ant-input-inline"
                  style={{ width: '50%' }}
                  name="TEL"
                  value={selectedUser.TEL || ''}
                  onChange={this.handleInputChange}
                  placeholder="사내전화"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </StyledHtmlTable>
    );
  }
}

UserModal.defaultProps = {};
export default UserModal;
