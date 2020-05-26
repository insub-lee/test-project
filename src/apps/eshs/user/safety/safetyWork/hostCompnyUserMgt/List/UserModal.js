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

  handleOnChange = (target, value) => {
    const { id, changeFormData, formData } = this.props;
    const { userData, selectedUser } = formData;
    const type = (formData && formData.userModalType) || '';
    if (type === 'INSERT') changeFormData(id, 'userData', { ...userData, [target]: value });
    else if (type === 'UPDATE') changeFormData(id, 'selectedUser', { ...selectedUser, [target]: value });
  };

  handleDeptChange = e => {
    const { id, changeFormData, formData } = this.props;
    const { searchDept } = this.state;
    const { userData, selectedUser } = formData;
    const index = searchDept.findIndex(s => s.DEPT_CD === e);

    const type = (formData && formData.userModalType) || '';
    if (type === 'INSERT') changeFormData(id, 'userData', { ...userData, DEPT_CD: searchDept[index].DEPT_CD, DEPT_NM: searchDept[index].DEPT_NM });
    else if (type === 'UPDATE') changeFormData(id, 'selectedUser', { ...selectedUser, DEPT_CD: searchDept[index].DEPT_CD, DEPT_NM: searchDept[index].DEPT_NM });
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
                <AntdSelect className="select-mid mr5" value={dfValue} style={{ width: '50%' }} onChange={this.handleSearchDept}>
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
                  onChange={e => this.handleOnChange('EMP_NM', e.target.value)}
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
                  onChange={e => this.handleOnChange('EMP_POSITION', e.target.value)}
                  placeholder="직위"
                />
                <span>&nbsp;(ex. 부장)</span>
              </td>
            </tr>
            {/* <tr>
              <th>직책</th>
              <td>
                <AntdInput
                  className="ant-input-inline"
                  style={{ width: '50%' }}
                  name="DUTY"
                  value={userData.DUTY || ''}
                  onChange={e => this.handleOnChange('DUTY', e.target.value)}
                  placeholder="직책"
                />
                <span>&nbsp;(ex. 팀장)</span>
              </td>
            </tr> */}
            <tr>
              <th>* 부서</th>
              <td>
                <AntdSelect className="select-mid mr5" value={userData.DEPT_CD} style={{ width: '50%' }} onChange={this.handleDeptChange}>
                  {searchDept.map(d => (
                    <Option key={d.DEPT_CD} style={{ height: 30 }}>
                      {d.DEPT_NM}
                    </Option>
                  ))}
                </AntdSelect>
              </td>
            </tr>
            <tr>
              <th>* 근무지</th>
              <td>
                <AntdSelect
                  className="select-mid mr5"
                  defaultValue={userData.SITE || '청주'}
                  style={{ width: '50%' }}
                  onChange={value => this.handleOnChange('SITE', value)}
                >
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
                  onChange={e => this.handleOnChange('TEL', e.target.value)}
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
                  onChange={e => this.handleOnChange('EMP_NM', e.target.value)}
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
                  onChange={e => this.handleOnChange('EMP_POSITION', e.target.value)}
                  placeholder="직위"
                />
                <span>&nbsp;(ex. 부장)</span>
              </td>
            </tr>
            {/* <tr>
              <th>직책</th>
              <td>
                <AntdInput
                  className="ant-input-inline"
                  name="DUTY"
                  value={selectedUser.DUTY || ''}
                  style={{ width: '50%' }}
                  onChange={e => this.handleOnChange('DUTY', e.target.value)}
                  placeholder="직책"
                />
                <span>&nbsp;(ex. 팀장)</span>
              </td>
            </tr> */}
            <tr>
              <th>* 부서</th>
              <td>
                <AntdSelect
                  className="select-mid mr5"
                  value={
                    searchDept.findIndex(s => s.DEPT_CD === selectedUser.DEPT_CD) > -1
                      ? searchDept[searchDept.findIndex(s => s.DEPT_CD === selectedUser.DEPT_CD)].DEPT_CD
                      : selectedUser.DEPT_NM
                  }
                  style={{ width: '50%' }}
                  onChange={this.handleDeptChange}
                >
                  {searchDept.map(d => (
                    <Option key={d.DEPT_CD} style={{ height: 30 }}>
                      {d.DEPT_NM}
                    </Option>
                  ))}
                </AntdSelect>
              </td>
            </tr>
            <tr>
              <th>* 근무지</th>
              <td>
                <AntdSelect
                  className="select-mid mr5"
                  defaultValue={selectedUser.SITE || '청주'}
                  style={{ width: '50%' }}
                  onChange={value => this.handleOnChange('SITE', value)}
                >
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
                  onChange={e => this.handleOnChange('TEL', e.target.value)}
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
