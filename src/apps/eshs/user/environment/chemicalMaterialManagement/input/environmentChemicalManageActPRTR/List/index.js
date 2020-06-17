import React from 'react';
import PropTypes from 'prop-types';

import { Input, InputNumber, Popconfirm, Select } from 'antd';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledInputNumber from 'components/BizBuilder/styled/Form/StyledInputNumber';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';

import Modal from 'apps/eshs/user/environment/chemicalMaterialManagement/input/environmentMasterRegistration/InputModal';
import SearchComp from 'apps/eshs/user/environment/chemicalMaterialManagement/input/environmentMasterRegistration/InputModal/SearchComp';
import StyledSelect from 'commonStyled/Form/StyledSelect';
import { callBackAfterPost, callBackAfterPut, callBackAfterDelete } from 'apps/eshs/user/environment/chemicalMaterialManagement/input/submitCallbackFunc';

const AntdInput = StyledInput(Input);
const AntdInputNumber = StyledInputNumber(InputNumber);
const AntdSelect = StyledSelect(Select);
const AntdSearch = StyledSearchInput(Input.Search);
class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      requestValue: {
        CAS_NO: '',
        NAME_KOR: '',
        NAME_ENG: '',
        GROUP_NAME: 'I',
        HANDLE_AMOUNT: 0,
        INVESTIGATION_TARGET_RANGE: 0,
        CATEGORY: '',
      },
      isModified: false,
      deleteConfirmMessage: '삭제하시겠습니까?',
    };
  }

  handleInputClick = () => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    const { requestValue, isModified } = this.state;
    if (isModified) {
      return submitHandlerBySaga(id, 'PUT', `/api/eshs/v1/common/eshschemicalmaterialmanageactregistration`, requestValue, (key, response) =>
        callBackAfterPut(key, response, this.getMaterialList),
      );
    }
    return submitHandlerBySaga(id, 'POST', `/api/eshs/v1/common/eshschemicalmaterialmanageactregistration`, requestValue, (key, response) =>
      callBackAfterPost(key, response, this.getMaterialList),
    );
  };

  handleDeleteClick = () => {
    const { requestValue } = this.state;
    if (!requestValue.PRTR_ID) {
      return this.setState({
        deleteConfirmMessage: '선택된 항목이 없습니다.',
      });
    }
    return this.setState({
      deleteConfirmMessage: '삭제하시겠습니까?',
    });
  };

  handleDeleteConfirm = () => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    const { requestValue } = this.state;
    return submitHandlerBySaga(id, 'DELETE', `/api/eshs/v1/common/eshschemicalmaterialmanageactregistration`, requestValue, (key, response) =>
      callBackAfterDelete(key, response, this.getMaterialList),
    );
  };

  getMaterialList = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiArr = [
      {
        key: 'materialList',
        type: 'GET',
        url: '/api/eshs/v1/common/eshschemicalmaterialmanageactregistration',
      },
    ];
    getCallDataHandler(id, apiArr, this.handleResetClick);
  };

  handleModalClose = () => {
    this.setState({
      visible: false,
    });
  };

  handleResetClick = () => {
    this.setState({
      isModified: false,
      requestValue: {
        CAS_NO: '',
        NAME_KOR: '',
        NAME_ENG: '',
        GROUP_NAME: 'I',
        HANDLE_AMOUNT: '',
        INVESTIGATION_TARGET_RANGE: '',
        CATEGORY: '',
      },
    });
  };

  setRequestValue = record => {
    this.setState({
      requestValue: record,
      visible: false,
      isModified: true,
    });
  };

  handleInputChange = e => {
    const valueObj = { [e.target.name.toUpperCase()]: e.target.value };
    this.setState(prevState => ({
      requestValue: Object.assign(prevState.requestValue, valueObj),
    }));
  };

  handleInputNumberChange = (value, name) => {
    const valueObj = { [name.toUpperCase()]: value };
    this.setState(prevState => ({
      requestValue: Object.assign(prevState.requestValue, valueObj),
    }));
  };

  handleSelectChange = (value, name) => {
    const valueObj = { [name]: value };
    this.setState(prevState => ({
      requestValue: Object.assign(prevState.requestValue, valueObj),
    }));
  };

  columns = [
    {
      title: '호',
      dataIndex: 'CATEGORY',
      key: 'CATEGORY',
      align: 'center',
      width: '10%',
    },
    {
      title: '그룹',
      dataIndex: 'GROUP_NAME',
      key: 'GROUP_NAME',
      align: 'center',
      width: '5%',
    },
    {
      title: 'CAS_NO',
      dataIndex: 'CAS_NO',
      key: 'CAS_NO',
      align: 'center',
      width: '15%',
    },
    {
      title: '물질명(국문)',
      dataIndex: 'NAME_KOR',
      key: 'NAME_KOR',
      align: 'center',
      width: '30%',
      ellipsis: true,
    },
    {
      title: '물질명(영문)',
      dataIndex: 'NAME_ENG',
      key: 'NAME_ENG',
      align: 'center',
      width: '30%',
      ellipsis: true,
    },
  ];

  handleSearchClick = () => {
    this.setState({
      visible: true,
    });
  };

  render() {
    const { columns } = this;
    const {
      handleInputClick,
      handleResetClick,
      handleModalClose,
      setRequestValue,
      handleInputChange,
      handleInputNumberChange,
      handleDeleteClick,
      handleDeleteConfirm,
      handleSelectChange,
      handleSearchClick,
    } = this;
    const { visible, requestValue, deleteConfirmMessage, isModified } = this.state;
    const { sagaKey, getCallDataHandler, result, changeFormData, formData } = this.props;

    return (
      <>
        <StyledContentsWrapper>
          <StyledCustomSearchWrapper>
            <div className="search-input-area">
              <span className="text-label">화학물 추가</span>
              <AntdSearch
                className="ant-search-inline input-search-mid mr5"
                placeHolder="검색"
                onClick={handleSearchClick}
                value=""
                style={{ width: '200px' }}
              />
              <StyledButton className="btn-primary btn-first btn-sm" onClick={handleInputClick}>
                저장/수정
              </StyledButton>
              <Popconfirm
                title={deleteConfirmMessage}
                onConfirm={isModified ? handleDeleteConfirm : null}
                okText={isModified ? '삭제' : '확인'}
                cancelText="취소"
              >
                <StyledButton className="btn-light mr5 btn-sm" onClick={handleDeleteClick}>
                  삭제
                </StyledButton>
              </Popconfirm>
              <StyledButton className="btn-light btn-sm" onClick={handleResetClick}>
                초기화
              </StyledButton>
            </div>
          </StyledCustomSearchWrapper>
          <StyledHtmlTable>
            <table>
              <colgroup>
                <col width="16.6%" />
                <col width="16.6%" />
                <col width="16.6%" />
                <col width="16.6%" />
                <col width="16.6%" />
                <col width="16.6%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>CAS_NO.</th>
                  <td>
                    <AntdInput className="ant-input-sm" name="CAS_NO" value={requestValue.CAS_NO} onChange={handleInputChange} />
                  </td>
                  <th>화학물질명_국문</th>
                  <td>
                    <AntdInput className="ant-input-sm" name="NAME_KOR" value={requestValue.NAME_KOR} onChange={handleInputChange} />
                  </td>
                  <th>화학물질명_영문</th>
                  <td>
                    <AntdInput className="ant-input-sm" name="NAME_ENG" value={requestValue.NAME_ENG} onChange={handleInputChange} />
                  </td>
                </tr>
                <tr>
                  <th>그룹</th>
                  <td>
                    <AntdSelect
                      className="select-sm"
                      defaultValue="I"
                      value={requestValue.GROUP_NAME}
                      onChange={e => handleSelectChange(e, 'GROUP_NAME')}
                      style={{ width: '100%' }}
                    >
                      <Select.Option value="I">I</Select.Option>
                      <Select.Option value="II">II</Select.Option>
                    </AntdSelect>
                  </td>
                  <th>취급량(kg/년)</th>
                  <td>
                    <AntdInputNumber
                      className="ant-input-number ant-input-number-sm"
                      value={requestValue.HANDLE_AMOUNT}
                      onChange={value => handleInputNumberChange(value, 'HANDLE_AMOUNT')}
                    />
                  </td>
                  <th>조사대상범위(무게함유율%)</th>
                  <td>
                    <AntdInputNumber
                      className="ant-input-number ant-input-number-sm"
                      value={requestValue.INVESTIGATION_TARGET_RANGE}
                      onChange={value => handleInputNumberChange(value, 'INVESTIGATION_TARGET_RANGE')}
                    />
                  </td>
                </tr>
                <tr>
                  <th colSpan={1}>호</th>
                  <td colSpan={5}>
                    <AntdInput
                      className="ant-input-sm"
                      name="CATEGORY"
                      value={requestValue.CATEGORY}
                      onChange={handleInputChange}
                      style={{ width: '191.85px' }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </StyledHtmlTable>
        </StyledContentsWrapper>
        <Modal
          sagaKey={sagaKey}
          visible={visible}
          modalClose={handleModalClose}
          getCallDataHandler={getCallDataHandler}
          result={result}
          setRequestValue={setRequestValue}
          apiUrl="/api/eshs/v1/common/eshschemicalmaterialmanageactregistration"
          tableColumns={columns}
          SearchComp={SearchComp}
          changeFormData={changeFormData}
          formData={formData}
        />
      </>
    );
  }
}

List.propTypes = {
  sagaKey: PropTypes.string,
  getCallDataHandler: PropTypes.func,
  result: PropTypes.object,
  changeFormData: PropTypes.func,
  formData: PropTypes.object,
  submitHandlerBySaga: PropTypes.func,
};

List.defaultProps = {
  getCallDataHandler: () => {},
  result: {},
  changeFormData: () => {},
  formData: {},
};

export default List;
