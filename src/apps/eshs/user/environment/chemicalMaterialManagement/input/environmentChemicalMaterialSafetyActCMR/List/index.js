import React from 'react';
import PropTypes from 'prop-types';
import { Input, Select, Popconfirm } from 'antd';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';

import Modal from 'apps/eshs/user/environment/chemicalMaterialManagement/input/environmentMasterRegistration/InputModal';
import SearchComp from 'apps/eshs/user/environment/chemicalMaterialManagement/input/environmentMasterRegistration/InputModal/SearchComp';
import { callBackAfterPost, callBackAfterPut, callBackAfterDelete } from 'apps/eshs/user/environment/chemicalMaterialManagement/input/submitCallbackFunc';

const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);
const AntdSearch = StyledSearchInput(Input.Search);

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requestValue: {
        SERIAL_NO: '',
        NAME_KOR: '',
        NAME_ENG: '',
        CAS_NO: '',
        CAS_NO_VERIFY: '',
        CARCINOGENICITY: 'N',
        MUTAGENICITY: 'N',
        REPRODUCTIVE_TOXICIT: 'N',
      },
      visible: false,
      isModified: false,
      isSameValue: false,
    };
  }

  handleSearchClick = () => {
    this.setState({
      visible: true,
    });
  };

  handleInputChange = (event, type, name) => {
    const { isSameValue } = this.state;

    if (type.toUpperCase() === 'INPUT') {
      const valueObj = { [event.target.name.toUpperCase()]: event.target.value };
      return this.setState(prevState => ({
        requestValue: Object.assign(prevState.requestValue, valueObj),
      }));
    }

    if (type.toUpperCase() === 'SELECT') {
      const valueObj = { [name.toUpperCase()]: event };
      return this.setState(prevState => ({
        requestValue: Object.assign(prevState.requestValue, valueObj),
      }));
    }

    if (type.toUpperCase() === 'NUMBER') {
      if (isSameValue && name.toUpperCase() === 'PRODUCTION_STOCK') {
        const valueObj = { PRODUCTION_STOCK: event, USAGE_STOCK: event, STORAGE_STOCK: event };
        return this.setState(prevState => ({
          requestValue: Object.assign(prevState.requestValue, valueObj),
        }));
      }
      const valueObj = { [name]: event };
      return this.setState(prevState => ({
        requestValue: Object.assign(prevState.requestValue, valueObj),
      }));
    }
    return null;
  };

  handleInputClick = () => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    const { requestValue, isModified } = this.state;
    if (isModified) {
      this.setState({
        isModified: false,
      });
      return submitHandlerBySaga(id, 'PUT', `/api/eshs/v1/common/eshschemicalsafetycmr`, requestValue, (key, response) =>
        callBackAfterPut(key, response, this.getMaterialList),
      );
    }
    this.setState({
      isModified: false,
    });
    return submitHandlerBySaga(id, 'POST', `/api/eshs/v1/common/eshschemicalsafetycmr`, requestValue, (key, response) =>
      callBackAfterPost(key, response, this.getMaterialList),
    );
  };

  handleDeleteClick = () => {
    const { requestValue } = this.state;
    if (!requestValue.CMR_ID) {
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

    return submitHandlerBySaga(id, 'DELETE', `/api/eshs/v1/common/eshschemicalsafetycmr`, requestValue, (key, response) =>
      callBackAfterDelete(key, response, this.getMaterialList),
    );
  };

  getMaterialList = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiArr = [
      {
        key: 'materialList',
        type: 'GET',
        url: '/api/eshs/v1/common/eshschemicalsafetycmr',
      },
    ];
    getCallDataHandler(id, apiArr, this.handleResetClick);
  };

  handleResetClick = () => {
    this.setState({
      requestValue: {
        SERIAL_NO: '',
        NAME_KOR: '',
        NAME_ENG: '',
        CAS_NO: '',
        CAS_NO_VERIFY: '',
        CARCINOGENICITY: 'N',
        MUTAGENICITY: 'N',
        REPRODUCTIVE_TOXICIT: 'N',
      },
      isModified: false,
    });
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

  modalColumns = [
    {
      title: 'CAS_NO',
      dataIndex: 'CAS_NO',
      key: 'CAS_NO',
      align: 'center',
      width: '15%',
    },
    {
      title: '화학물질명_국문',
      dataIndex: 'NAME_KOR',
      key: 'NAME_KOR',
      align: 'center',
      width: '30%',
      ellipsis: true,
    },
    {
      title: '화학물질명_영문',
      dataIndex: 'NAME_ENG',
      key: 'NAME_ENG',
      align: 'center',
      width: '30%',
      ellipsis: true,
    },
    {
      title: '발암성(C)',
      dataIndex: 'CARCINOGENICITY',
      key: 'CARCINOGENICITY',
      align: 'center',
      width: '10%',
    },
    {
      title: '변이원성(M)',
      dataIndex: 'MUTAGENICITY',
      key: 'MUTAGENICITY',
      align: 'center',
      width: '10%',
    },
    {
      title: '생식독성(R)',
      dataIndex: 'REPRODUCTIVE_TOXICIT',
      key: 'REPRODUCTIVE_TOXICIT',
      align: 'center',
      width: '10%',
    },
  ];

  render() {
    const {
      handleSearchClick,
      handleInputChange,
      handleInputClick,
      handleModalClose,
      setRequestValue,
      handleResetClick,
      handleDeleteConfirm,
      handleDeleteClick,
    } = this;
    const { modalColumns } = this;
    const { requestValue, visible, deleteConfirmMessage, isModified } = this.state;
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
                <StyledButton className="btn-light btn-first btn-sm" onClick={handleDeleteClick}>
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
                  <th>연번</th>
                  <td>
                    {/* <AntdInputNumber
                        className="ant-input-number input-number-sm"
                        value={requestValue.SERIAL_NO}
                        onChange={e => handleInputChange(e, 'NUMBER', 'SERIAL_NO')}
                        disabled={isModified}
                      /> */}
                    {requestValue.SERIAL_NO}
                  </td>
                  <th>화학물질명_국문</th>
                  <td>
                    <AntdInput className="ant-input-sm" name="NAME_KOR" value={requestValue.NAME_KOR} onChange={e => handleInputChange(e, 'INPUT')} />
                  </td>
                  <th>화학물질명_영문</th>
                  <td>
                    <AntdInput className="ant-input-sm" name="NAME_ENG" value={requestValue.NAME_ENG} onChange={e => handleInputChange(e, 'INPUT')} />
                  </td>
                </tr>
                <tr>
                  <th>CAS NO.</th>
                  <td colSpan={2}>
                    <AntdInput className="ant-input-sm" name="CAS_NO" value={requestValue.CAS_NO} onChange={e => handleInputChange(e, 'INPUT')} />
                  </td>
                  <th>Cas No Verification</th>
                  <td colSpan={2}>
                    <AntdSelect
                      className="select-sm"
                      defaultValue="Y"
                      onChange={e => handleInputChange(e, 'SELECT', 'CAS_NO_VERIFY')}
                      value={requestValue.CAS_NO_VERIFY}
                      style={{ width: '100%' }}
                    >
                      <Select.Option value="Y">O</Select.Option>
                      <Select.Option value="N">X</Select.Option>
                    </AntdSelect>
                  </td>
                </tr>
                <tr>
                  <th>발암성(C)</th>
                  <td>
                    <AntdSelect
                      className="select-sm"
                      defaultValue="N"
                      onChange={e => handleInputChange(e, 'SELECT', 'CARCINOGENICITY')}
                      value={requestValue.CARCINOGENICITY}
                      style={{ width: '100%' }}
                    >
                      <Select.Option value="1A">1A</Select.Option>
                      <Select.Option value="1B">1B</Select.Option>
                      <Select.Option value="2">2</Select.Option>
                      <Select.Option value="N">해당없음</Select.Option>
                    </AntdSelect>
                  </td>
                  <th>변이원성(M)</th>
                  <td>
                    <AntdSelect
                      className="select-sm"
                      defaultValue="Y"
                      onChange={e => handleInputChange(e, 'SELECT', 'MUTAGENICITY')}
                      value={requestValue.MUTAGENICITY}
                      style={{ width: '100%' }}
                    >
                      <Select.Option value="1A">1A</Select.Option>
                      <Select.Option value="1B">1B</Select.Option>
                      <Select.Option value="2">2</Select.Option>
                      <Select.Option value="N">해당없음</Select.Option>
                    </AntdSelect>
                  </td>
                  <th>생식독성(R)</th>
                  <td>
                    <AntdSelect
                      className="select-sm"
                      defaultValue="Y"
                      onChange={e => handleInputChange(e, 'SELECT', 'REPRODUCTIVE_TOXICIT')}
                      value={requestValue.REPRODUCTIVE_TOXICIT}
                      style={{ width: '100%' }}
                    >
                      <Select.Option value="1A">1A</Select.Option>
                      <Select.Option value="1B">1B</Select.Option>
                      <Select.Option value="2">2</Select.Option>
                      <Select.Option value="N">해당없음</Select.Option>
                    </AntdSelect>
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
          apiUrl="/api/eshs/v1/common/eshschemicalsafetycmr"
          tableColumns={modalColumns}
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
