/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Table, Column } from 'react-virtualized';
import { Input, Select, Button, message } from 'antd';

const { Option } = Select;
const ReadStar = () => <label style={{ color: 'red' }}>* </label>;

class DeptModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchDept: [],
    };
  }

  componentDidMount = () => {
    const { id, getCallDataHanlder, changeFormData } = this.props;

    const apiAry = [
      {
        key: 'deptList',
        type: 'GET',
        url: '/api/eshs/v1/common/eshsHstCmpnyDept?CMPNY_CD=02',
      },
    ];
    getCallDataHanlder(id, apiAry, this.setDept);
    changeFormData(id, 'deptModal_cmpny', '02');
  };

  handleDeptAdd = () => {
    if (this.validationCheck()) {
      const { id, formData, getCallDataHanlder } = this.props;
      const hst_cmpny_cd = (formData && formData.deptModal_cmpny) || '';
      const dept_cd = (formData && formData.selectedDept.dept_cd) || '';

      const apiAry = [
        {
          key: 'deptCnt',
          type: 'GET',
          url: `/api/eshs/v1/common/eshsHstCmpnyDeptOverLap?HST_CMPNY_CD=${hst_cmpny_cd}&&DEPT_CD=${dept_cd}`,
        },
      ];

      getCallDataHanlder(id, apiAry, this.handleDeptOverLab);
    }
  };

  handleDeptOverLab = () => {
    const { id, submitHadnlerBySaga, formData, changeFormData, result } = this.props;
    const hst_cmpny_cd = (formData && formData.deptModal_cmpny) || '';
    const submitData = { ...(formData && formData.selectedDept), hst_cmpny_cd };

    const is_ok = (result && result.deptCnt && result.deptCnt.deptCnt) || 0;
    if (!is_ok) {
      submitHadnlerBySaga(id, 'POST', '/api/eshs/v1/common/eshsHstCmpnyDept', submitData, this.handleDeptReload);
      changeFormData(id, 'selectedDept', {});
    } else {
      message.warning('이전에 사용되었던 코드는 다시 사용할 수 없습니다!');
    }
  };

  handleDeptUpdate = () => {
    if (this.validationCheck()) {
      const { id, submitHadnlerBySaga, formData, changeFormData } = this.props;
      const submitData = (formData && formData.selectedDept) || {};

      submitHadnlerBySaga(id, 'PUT', '/api/eshs/v1/common/eshsHstCmpnyDept', submitData, this.handleDeptReload);
      changeFormData(id, 'selectedDept', {});
    }
  };

  handleDeptDelete = () => {
    const { id, formData, getCallDataHanlder } = this.props;
    const hst_cmpny_cd = (formData && formData.deptModal_cmpny) || '';
    const dept_cd = (formData && formData.selectedDept.dept_cd) || '';
    const apiAry = [
      {
        key: 'isDeleted',
        type: 'GET',
        url: `/api/eshs/v1/common/eshsHstCmpnyDeptDelete?HST_CMPNY_CD=${hst_cmpny_cd}&&DEPT_CD=${dept_cd}`,
      },
    ];

    getCallDataHanlder(id, apiAry, this.handleIsDeleted);
  };

  handleIsDeleted = () => {
    const { id, submitHadnlerBySaga, formData, changeFormData, result } = this.props;
    const submitData = (formData && formData.selectedDept) || {};
    const is_deleted = (result && result.isDeleted && result.isDeleted.isDeleted) || 1;
    if (!is_deleted) {
      submitHadnlerBySaga(id, 'DELETE', '/api/eshs/v1/common/eshsHstCmpnyDeptDelete', submitData, this.handleDeptReload);
      changeFormData(id, 'selectedDept', {});
    } else {
      message.warning('해당 부서에 등록된 직원이 있습니다. 직원 삭제후 시도해 주십시오.');
    }
  };

  handleSearchDept = e => {
    const { id, getCallDataHanlder, changeFormData } = this.props;

    const apiAry = [
      {
        key: 'deptList',
        type: 'GET',
        url: `/api/eshs/v1/common/eshsHstCmpnyDept?CMPNY_CD=${e}`,
      },
    ];
    getCallDataHanlder(id, apiAry, this.setDept);
    changeFormData(id, 'deptModal_cmpny', e);
  };

  setDept = () => {
    const { result } = this.props;
    const searchDept = (result && result.deptList && result.deptList.eshsHstCmpnyDeptListByCmpny) || [];

    this.setState({
      searchDept,
    });
  };

  handleDeptReload = sagaKey => {
    const { getCallDataHanlder, formData } = this.props;
    const apiAry = [
      {
        key: 'deptList',
        type: 'GET',
        url: `/api/eshs/v1/common/eshsHstCmpnyDept?CMPNY_CD=${formData && formData.deptModal_cmpny}`,
      },
    ];
    getCallDataHanlder(sagaKey, apiAry, this.setDept);
  };

  onRowClick = deptInfo => {
    const { id, changeFormData } = this.props;
    changeFormData(id, 'selectedDept', deptInfo);
  };

  handleInputChange = e => {
    const { id, changeFormData, formData } = this.props;
    const selectedDept = (formData && formData.selectedDept) || {};
    changeFormData(id, 'selectedDept', { ...selectedDept, [e.target.name]: e.target.value });
  };

  validationCheck = () => {
    let is_ok = true;
    const { formData } = this.props;
    const deptInfo = (formData && formData.selectedDept) || {};
    if (!deptInfo.dept_cd) {
      message.warning('부서코드를 입력하세요');
      is_ok = false;
    } else if (!deptInfo.dept_nm) {
      message.warning('부서명을 입력하세요');
      is_ok = false;
    }

    return is_ok;
  };

  handleDwExcel = () => {
    console.debug('handleDwExcel');
  };

  render() {
    const { result, formData } = this.props;
    const cmpnyList = (result && result.cmpnyList && result.cmpnyList.eshsHstCmpnyList) || [];
    const dfValue = cmpnyList.length ? cmpnyList[0].hst_cmpny_cd : ' ';
    const selectedDept = (formData && formData.selectedDept) || {};
    return (
      <div style={{ width: 650, height: 350 }}>
        <Select defaultValue={dfValue} style={{ width: 130, padding: 3 }} onChange={this.handleSearchDept}>
          {cmpnyList.map(c => (
            <Option key={c.hst_cmpny_cd} style={{ height: 30 }}>
              {c.hst_cmpny_nm}
            </Option>
          ))}
        </Select>
        <Button onClick={this.handleDwExcel}>엑셀받기</Button>
        <div>
          <table style={{ width: 550 }}>
            <thead>
              <tr className="bgF6f8fa">
                <td>
                  <ReadStar />
                  부서코드
                </td>
                <td>
                  <ReadStar />
                  부서명
                </td>
              </tr>
              <tr>
                <td>
                  <Input
                    style={{ width: 130, padding: 3 }}
                    name="dept_cd"
                    value={selectedDept.dept_cd}
                    onChange={this.handleInputChange}
                    placeholder="부서코드"
                  ></Input>
                </td>
                <td>
                  <Input
                    style={{ width: 200, padding: 3 }}
                    name="dept_nm"
                    value={selectedDept.dept_nm}
                    onChange={this.handleInputChange}
                    placeholder="부서명"
                  ></Input>
                  <Button onClick={this.handleDeptAdd}>추가</Button>
                  &nbsp; &nbsp;
                  <Button onClick={this.handleDeptUpdate}>저장</Button>
                  &nbsp; &nbsp;
                  <Button onClick={this.handleDeptDelete}>삭제</Button>
                </td>
              </tr>
            </thead>
            <tbody>
              {this.state.searchDept.map(d => (
                <tr key={d.dept_cd} onClick={() => this.onRowClick(d)} className="cell">
                  <td>{d.dept_cd}</td>
                  <td>{d.dept_nm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
DeptModal.defaultProps = {};
export default DeptModal;
