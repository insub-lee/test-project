/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Input, Select, Popconfirm } from 'antd';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledContentsModal from 'commonStyled/EshsStyled/Modal/StyledContentsModal';
import StyledInput from 'commonStyled/Form/StyledInput';
import StyledSelect from 'commonStyled/Form/StyledSelect';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

import DeptModal from './DeptModal';

const { Option } = Select;
const AntdSearch = StyledSearchInput(Input.Search);

const AntdModal = StyledContentsModal(Modal);
const currentYear = new Date().getFullYear();
const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);

class DeptSearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      years: [],
    };
  }

  componentDidMount = () => {
    const { id, getCallDataHandler, setFormData, formData, searchData, reqNo } = this.props;
    const years = [];
    for (let i = 2006; i <= currentYear + 1; i++) {
      years.push(String(i));
    }
    const apiAry = [
      {
        key: 'deptList',
        type: 'GET',
        url: '/api/eshs/v1/common/eshsDeptList?COMP_CD=COMP_M000',
      },
    ];
    this.setState({ years });
    if (JSON.stringify(searchData) !== '{}') {
      const { CHK_YEAR } = searchData;
      setFormData(id, { ...formData, CHK_YEAR, searchFlag: true, searchRow: searchData });
    } else if (reqNo) {
      setFormData(id, { ...formData, REQ_NO: reqNo, CHK_YEAR: reqNo.substr(2, 4), searchFlag: false });
    } else {
      setFormData(id, { ...formData, CHK_YEAR: String(currentYear), searchFlag: false });
    }
    getCallDataHandler(id, apiAry, () => this.handleAppStart(reqNo));
  };

  handleAppStart = (reqNo = undefined) => {
    const { result, profile, id, changeFormData, handleSearchOnClick } = this.props;
    const deptList = (result && result.deptList && result.deptList.result) || [];
    const myDept = deptList.find(d => d.DEPT_ID === profile.DEPT_ID);
    changeFormData(id, 'myDept', myDept);
    handleSearchOnClick(reqNo);
  };

  handleModal = () => {
    const { modalVisible } = this.state;
    this.setState({
      modalVisible: !modalVisible,
    });
  };

  handleModalRowClick = searchRow => {
    const { id, changeFormData } = this.props;
    changeFormData(id, 'searchRow', searchRow);
    this.handleModal();
  };

  handleYearChange = e => {
    const { id, changeFormData } = this.props;
    changeFormData(id, 'CHK_YEAR', e);
  };

  handleDeptSearch = () => {
    const { id, formData, changeFormData, handleSearchOnClick } = this.props;
    const searchDeptId = (formData && formData.searchRow && formData.searchRow.DEPT_ID) || '';
    if (searchDeptId) {
      const searchFlag = !(formData.myDept.DEPT_ID === searchDeptId);
      changeFormData(id, 'searchFlag', searchFlag);
    }
    handleSearchOnClick();
  };

  handleFinsh = () => {
    const { id, formData, submitHandlerBySaga, handleSearchOnClick, getCallDataHandler } = this.props;
    const materialData = (formData && formData.materialData) || '';
    const REQ_NO = (formData && formData.materialData && formData.materialData.REQ_NO) || '';
    const CHK_YEAR = (formData && formData.materialData && formData.materialData.CHK_YEAR) || '';
    const DEPT_ID = (formData && formData.materialData && formData.materialData.FROM_DEPT_ID) || '';
    const materialCnt = (formData && formData.materialCnt) || 0;
    const itemList = (formData && formData.itemList) || [];

    if (id === 'eiMaterial') {
      if (!materialCnt || !itemList.length) {
        return message.info(<MessageContent>저장된 자료가 없습니다.</MessageContent>);
      }
      submitHandlerBySaga(id, 'PUT', '/api/eshs/v1/common/eshsEiUpdateComplete', { REQ_NO }, (id1, res) => {
        if (res && res.code === 200) return message.info(<MessageContent>완료 되었습니다</MessageContent>);
        return message.info(<MessageContent>다시 시도해주십시오.</MessageContent>);
      });
    } else if (id === 'eiStatement') {
      const validationCheck = itemList.filter(item => !item.ENV_IMPACT_SIZE && item);
      if (validationCheck.length) {
        return message.info(<MessageContent>모든 내용을 입력하셔야 합니다.</MessageContent>);
      }
      submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/eshsEiUpdateComplete', { ...materialData, itemList }, (id1, res) => {
        if (res && res.code === 200) {
          return submitHandlerBySaga(id, 'PUT', '/api/eshs/v1/common/eshsEiStatementComplete', { REQ_NO, CHK_YEAR, DEPT_ID }, (id2, res2) => {
            if (res2 && res2.code === 200) {
              return message.info(<MessageContent>완료 되었습니다</MessageContent>);
            }
            return message.info(<MessageContent>다시 시도해주십시오.</MessageContent>);
          });
        }
        return message.info(<MessageContent>다시 시도해주십시오.</MessageContent>);
      });
    } else if (id === 'eiImportantAssesment') {
      const { saveBeforeProcess } = this.props;
      // 환경영향평가 상신
      saveBeforeProcess();
      // submitHandlerBySaga(id, 'PUT', '/api/eshs/v1/common/eshsEiImportantAssesment', { ...materialData, itemList });
    }

    handleSearchOnClick();
  };

  render() {
    const { formData, result, id, deptSearchBarVisible } = this.props;
    const { years } = this.state;
    const deptList = result?.deptList?.result || [];
    const myDept = formData?.myDept || {};
    const searchRow = formData?.searchRow || {};
    const eiMaterialCnt = formData?.materialCnt || 0;
    const searchFlag = formData?.searchFlag || false;
    const itemList = formData?.itemList || [];
    const materialData = formData?.materialData || {};

    return deptSearchBarVisible ? (
      <StyledCustomSearchWrapper className="search-wrapper-inline">
        <div className="search-input-area">
          <span className="text-label">평가년도</span>
          <AntdSelect className="select-sm mr5" value={formData.CHK_YEAR} style={{ width: 130 }} onChange={this.handleYearChange}>
            {years.map(y => (
              <Option key={y} value={y}>
                {y}
              </Option>
            ))}
          </AntdSelect>
          <span className="text-label">부서코드</span>
          <AntdSearch
            className="input-search-sm mr5"
            name="DEPT_CD"
            value={searchRow.DEPT_CD ? searchRow.DEPT_CD : myDept.DEPT_CD}
            style={{ width: 150 }}
            readOnly
            placeholder="부서코드"
            onClick={this.handleModal}
            onSearch={this.handleModal}
          />
          <AntdInput
            className="ant-input-sm ant-input-inline"
            value={searchRow.NAME_KOR ? searchRow.NAME_KOR : myDept.NAME_KOR}
            style={{ width: 150 }}
            readOnly
          />
        </div>
        <div className="btn-area">
          <StyledButton className="btn-gray btn-sm mr5" onClick={this.handleDeptSearch}>
            검색
          </StyledButton>
          {/* 중대환경영향평가에 등록된 데이터가 있고, 로그인한 유저와 등록하려는 부서가 같고, 상신이 안된 문서만 완료 가능 */}
          {eiMaterialCnt > 0 && itemList.length > 0 && !searchFlag && !materialData?.DRAFT_ID && (
            <Popconfirm title="완료하시겠습니까?" onConfirm={this.handleFinsh} okText="확인" cancelText="취소">
              <StyledButton className="btn-primary btn-sm">완료</StyledButton>
            </Popconfirm>
          )}
        </div>
        <AntdModal title="주관회사 부서 검색" visible={this.state.modalVisible} onCancel={this.handleModal} width={900} height={600} footer={[null]}>
          <DeptModal deptList={deptList || []} handleModalRowClick={this.handleModalRowClick} handleModal={this.handleModal}></DeptModal>
        </AntdModal>
      </StyledCustomSearchWrapper>
    ) : (
      ''
    );
  }
}
DeptSearchBar.propTypes = {
  id: PropTypes.string,
  getCallDataHandler: PropTypes.func,
  result: PropTypes.object,
  searchData: PropTypes.object,
  saveBeforeProcess: PropTypes.func,
  deptSearchBarVisible: PropTypes.bool,
};
DeptSearchBar.defaultProps = {
  getCallDataHandler: () => {},
  result: {},
  deptSearchBarVisible: true,
  saveBeforeProcess: () => {},
  searchData: {},
};
export default DeptSearchBar;
