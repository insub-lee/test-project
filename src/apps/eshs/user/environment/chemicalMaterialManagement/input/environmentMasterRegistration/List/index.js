import React from 'react';
import PropTypes from 'prop-types';
import { Input, InputNumber, Select, Popconfirm } from 'antd';

import StyledSearchWrap from 'components/CommonStyled/StyledSearchWrap';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledSelect from 'commonStyled/Form/StyledSelect';
import StyledInput from 'commonStyled/Form/StyledInput';
import StyledHtmlTable from 'commonStyled/EshsStyled/Table/StyledHtmlTable';
import StyledSearchInput from 'commonStyled/Form/StyledSearchInput';
import StyledInputNumber from 'commonStyled/Form/StyledInputNumber';

import EshsCmpnyComp from 'components/BizBuilder/Field/EshsCmpnyComp';
import Modal from '../InputModal';
import SearchComp from '../InputModal/SearchComp';

const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);
const AntdSearch = StyledSearchInput(Input.Search);
const AntdInputNumber = StyledInputNumber(InputNumber);
class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      requestValue: {
        SAP_NO: '',
        CAS_NO: '',
        NAME_KOR: '',
        NAME_ENG: '',
        NAME_SAP: '',
        NAME_ETC: '',
        IS_IMPORT: 'N',
        VENDOR_CD: '',
        CONTENT_EXP: '',
        CONTENT_DOSE: 0,
        MASTER_ID: '',
        IS_INFLAMMABILITY_GAS: '',
        IS_INFLAMMABILITY_LIQUID: '',
      },
      isModified: false,
      deleteConfirmMessage: '삭제하시겠습니까?',
    };
  }

  handleSearchClick = () => {
    this.setState({
      visible: true,
    });
  };

  handleInputChange = (event, type, name) => {
    if (type.toUpperCase() === 'INPUT') {
      const valueObj = { [event.target.name.toUpperCase()]: event.target.value };
      this.setState(prevState => ({
        requestValue: Object.assign(prevState.requestValue, valueObj),
      }));
    }

    if (type.toUpperCase() === 'SELECT') {
      const valueObj = { [name.toUpperCase()]: event };
      this.setState(prevState => ({
        requestValue: Object.assign(prevState.requestValue, valueObj),
      }));
    }
  };

  handleInputNumberChange = (value, name) => {
    if (typeof value !== 'number') {
      const valueObj = { [name]: '' };
      this.setState(prevState => ({
        requestValue: Object.assign(prevState.requestValue, valueObj),
      }));
    }
    const valueObj = { [name]: value };
    this.setState(prevState => ({
      requestValue: Object.assign(prevState.requestValue, valueObj),
    }));
  };

  handleInputClick = () => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    const { requestValue, isModified } = this.state;
    if (isModified) {
      this.setState({
        isModified: false,
      });
      return submitHandlerBySaga(id, 'PUT', `/api/eshs/v1/common/eshschemicalmaterialMaster`, requestValue, this.getMaterialList);
    }
    this.setState({
      isModified: false,
    });
    return submitHandlerBySaga(id, 'POST', `/api/eshs/v1/common/eshschemicalmaterialMaster`, requestValue, this.getMaterialList);
  };

  handleDeleteClick = () => {
    const { requestValue } = this.state;
    if (!requestValue.MASTER_ID) {
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
    return submitHandlerBySaga(id, 'DELETE', `/api/eshs/v1/common/eshschemicalmaterialMaster`, requestValue, this.getMaterialList);
  };

  getMaterialList = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiArr = [
      {
        key: 'materialList',
        type: 'GET',
        url: '/api/eshs/v1/common/eshschemicalmaterialMaster',
      },
    ];
    getCallDataHandler(id, apiArr, this.handleResetClick);
  };

  handleResetClick = () => {
    this.setState({
      requestValue: {
        SAP_NO: '',
        CAS_NO: '',
        NAME_KOR: '',
        NAME_ENG: '',
        NAME_SAP: '',
        NAME_ETC: '',
        IS_IMPORT: 'N',
        VENDOR_CD: '',
        CONTENT_EXP: '',
        CONTENT_DOSE: 0,
        UNIT: '',
        FIR_UNIT_EXCHANGE: 0,
        SEC_UNIT_EXCHANGE: 0,
        IS_INFLAMMABILITY_GAS: '',
        IS_INFLAMMABILITY_LIQUID: '',
      },
      isModified: false,
    });
  };

  handleEshsCmpnyCompChange = data => {
    const valueObj = { VENDOR_CD: data.WRK_CMPNY_CD }; // 키값 바꾸기
    this.setState(prevState => ({ requestValue: Object.assign(prevState.requestValue, valueObj) }));
  };

  handleModalClose = () => {
    this.setState({
      visible: false,
    });
  };

  setRequestValue = record => {
    this.setState({
      requestValue: record,
      visible: false,
      isModified: true,
    });
  };

  columns = [
    {
      title: 'SAP_NO',
      dataIndex: 'SAP_NO',
      key: 'SAP_NO',
      align: 'center',
    },
    {
      title: 'CAS_NO',
      dataIndex: 'CAS_NO',
      key: 'CAS_NO',
      align: 'center',
    },
    {
      title: '화학물질명_국문',
      dataIndex: 'NAME_KOR',
      key: 'NAME_KOR',
      align: 'center',
    },
    {
      title: '화학물질명_영문',
      dataIndex: 'NAME_ENG',
      key: 'NAME_ENG',
      align: 'center',
    },
    {
      title: '화학물질명_SAP',
      dataIndex: 'NAME_SAP',
      key: 'NAME_SAP',
      align: 'center',
    },
    {
      title: '관용명 및 이명',
      dataIndex: 'NAME_ETC',
      key: 'NAME_ETC',
      align: 'center',
    },
  ];

  render() {
    const {
      handleSearchClick,
      handleInputChange,
      handleInputNumberChange,
      handleInputClick,
      handleModalClose,
      setRequestValue,
      handleResetClick,
      handleDeleteConfirm,
      handleDeleteClick,
    } = this;
    const { columns } = this;
    const { requestValue, visible, deleteConfirmMessage } = this.state;
    const { sagaKey, getCallDataHandler, result, changeFormData, formData } = this.props;
    return (
      <>
        <ContentsWrapper>
          <StyledSearchWrap>
            <div className="search-inner">
              <span className="input-label">화학물 추가</span>
              <AntdSearch
                className="ant-search-inline input-search-mid mr5"
                placeHolder="검색"
                onClick={handleSearchClick}
                value=""
                style={{ width: '200px' }}
              />
              <StyledButtonWrapper className="btn-wrap-inline">
                <StyledButton className="btn-primary btn-first" onClick={handleInputClick}>
                  저장/수정
                </StyledButton>
                <Popconfirm title={deleteConfirmMessage} onConfirm={handleDeleteConfirm} okText="삭제" cancelText="취소">
                  <StyledButton className="btn-light btn-first" onClick={handleDeleteClick}>
                    삭제
                  </StyledButton>
                </Popconfirm>
                <StyledButton className="btn-light" onClick={handleResetClick}>
                  초기화
                </StyledButton>
              </StyledButtonWrapper>
            </div>
          </StyledSearchWrap>
          <div className="tableWrapper">
            <StyledHtmlTable>
              <table>
                <colgroup>
                  <col width="12%" />
                  <col width="13%" />
                  <col width="12%" />
                  <col width="13%" />
                  <col width="12%" />
                  <col width="13%" />
                  <col width="12%" />
                  <col width="13%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th colSpan={1}>SAP NO.</th>
                    <td colSpan={3}>
                      <AntdInput className="ant-input-sm" name="SAP_NO" value={requestValue.SAP_NO} onChange={e => handleInputChange(e, 'INPUT')} />
                    </td>
                    <th colSpan={1}>CAS NO.</th>
                    <td colSpan={3}>
                      <AntdInput className="ant-input-sm" name="CAS_NO" value={requestValue.CAS_NO} onChange={e => handleInputChange(e, 'INPUT')} />
                    </td>
                  </tr>
                  <tr>
                    <th>화학물질명_국문</th>
                    <td>
                      <AntdInput className="ant-input-sm" name="NAME_KOR" value={requestValue.NAME_KOR} onChange={e => handleInputChange(e, 'INPUT')} />
                    </td>
                    <th>화학물질명_영문</th>
                    <td>
                      <AntdInput className="ant-input-sm" name="NAME_ENG" value={requestValue.NAME_ENG} onChange={e => handleInputChange(e, 'INPUT')} />
                    </td>
                    <th>화학물질명_SAP</th>
                    <td>
                      <AntdInput className="ant-input-sm" name="NAME_SAP" value={requestValue.NAME_SAP} onChange={e => handleInputChange(e, 'INPUT')} />
                    </td>
                    <th>관용명 및 이명</th>
                    <td>
                      <AntdInput className="ant-input-sm" name="NAME_ETC" value={requestValue.NAME_ETC} onChange={e => handleInputChange(e, 'INPUT')} />
                    </td>
                  </tr>
                  <tr>
                    <th>공급업체</th>
                    <td colSpan={3}>
                      <EshsCmpnyComp
                        searchWidth="146px"
                        sagaKey={sagaKey}
                        getExtraApiData={getCallDataHandler}
                        extraApiData={result}
                        colData={requestValue.VENDOR_CD}
                        visible
                        CONFIG={{ property: { isRequired: false, className: 'ant-input-search input-search-sm' } }}
                        changeFormData={changeFormData}
                        COMP_FIELD="VENDOR_CD"
                        eshsCmpnyCompResult={(companyInfo, COMP_FIELD) => this.handleEshsCmpnyCompChange(companyInfo, COMP_FIELD)}
                      />
                    </td>
                    <th>MSDS 함량</th>
                    <td>
                      <AntdInput
                        name="CONTENT_EXP"
                        value={requestValue.CONTENT_EXP}
                        onChange={e => handleInputChange(e, 'INPUT')}
                        className="col-input-number ant-input-sm"
                      />
                    </td>
                    <th>함유량</th>
                    <td>
                      <AntdInputNumber
                        value={requestValue.CONTENT_DOSE}
                        onChange={value => handleInputNumberChange(value, 'CONTENT_DOSE')}
                        className="input-number-sm"
                        style={{ width: '100%' }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>수입구분</th>
                    <td>
                      <AntdSelect
                        className="select-sm"
                        defaultValue="N"
                        onChange={e => handleInputChange(e, 'SELECT', 'IS_IMPORT')}
                        value={requestValue.IS_IMPORT}
                        style={{ width: '100%' }}
                      >
                        <Select.Option value="N">내수</Select.Option>
                        <Select.Option value="Y">수입</Select.Option>
                      </AntdSelect>
                    </td>
                    <th>인화성가스 구분</th>
                    <td>
                      <AntdSelect
                        className="select-sm"
                        defaultValue={-1}
                        onChange={e => handleInputChange(e, 'SELECT', 'IS_INFLAMMABILITY_GAS')}
                        value={requestValue.IS_INFLAMMABILITY_GAS}
                        style={{ width: '100%' }}
                      >
                        <Select.Option value={1}>1</Select.Option>
                        <Select.Option value={2}>2</Select.Option>
                        <Select.Option value={3}>3</Select.Option>
                        <Select.Option value={4}>4</Select.Option>
                        <Select.Option value={-1}>해당 없음</Select.Option>
                      </AntdSelect>
                    </td>
                    <th>인화성액체 구분</th>
                    <td colSpan={3}>
                      <AntdSelect
                        className="select-sm"
                        defaultValue={-1}
                        onChange={e => handleInputChange(e, 'SELECT', 'IS_INFLAMMABILITY_LIQUID')}
                        value={requestValue.IS_INFLAMMABILITY_LIQUID}
                        style={{ width: '145px' }}
                      >
                        <Select.Option value={1}>1</Select.Option>
                        <Select.Option value={2}>2</Select.Option>
                        <Select.Option value={3}>3</Select.Option>
                        <Select.Option value={4}>4</Select.Option>
                        <Select.Option value={-1}>해당 없음</Select.Option>
                      </AntdSelect>
                    </td>
                  </tr>
                </tbody>
              </table>
            </StyledHtmlTable>
          </div>
        </ContentsWrapper>
        <Modal
          sagaKey={sagaKey}
          visible={visible}
          modalClose={handleModalClose}
          getCallDataHandler={getCallDataHandler}
          result={result}
          setRequestValue={setRequestValue}
          apiUrl="/api/eshs/v1/common/eshschemicalmaterialMaster"
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
  submitHandlerBySaga: PropTypes.func,
  formData: PropTypes.object,
};

List.defaultProps = {
  sagaKey: '',
  getCallDataHandler: () => {},
  result: {},
  changeFormData: () => {},
  submitHandlerBySaga: () => {},
  formData: {},
};

export default List;
