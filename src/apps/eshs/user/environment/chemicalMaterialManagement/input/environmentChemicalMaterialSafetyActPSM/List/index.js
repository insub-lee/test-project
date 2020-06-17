import React from 'react';
import PropTypes from 'prop-types';
import { Input, InputNumber, Select, Popconfirm, Checkbox } from 'antd';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledInputNumber from 'components/BizBuilder/styled/Form/StyledInputNumber';

import Modal from 'apps/eshs/user/environment/chemicalMaterialManagement/input/environmentMasterRegistration/InputModal';
import SearchComp from 'apps/eshs/user/environment/chemicalMaterialManagement/input/environmentMasterRegistration/InputModal/SearchComp';

const AntdInput = StyledInput(Input);
const AntdInputNumber = StyledInputNumber(InputNumber);
const AntdSelect = StyledSelect(Select);
const AntdSearch = StyledSearchInput(Input.Search);

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requestValue: {
        CAS_NO: '',
        NAME_KOR: '',
        CONTENT_STANDARD: 0,
        IS_APPLICATE: 'Y',
        SERIAL_NO: '',
        PSM_ID: '',
        PRODUCTION_STOCK: 0,
        USAGE_STOCK: 0,
        STORAGE_STOCK: 0,
      },
      visible: false,
      isModified: false,
      hasSameValue: false,
    };
  }

  handleSearchClick = () => {
    this.setState({
      visible: true,
    });
  };

  handleInputChange = (event, type, name) => {
    const { hasSameValue } = this.state;

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
      if (hasSameValue && name.toUpperCase() === 'PRODUCTION_STOCK') {
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
      return submitHandlerBySaga(id, 'PUT', `/api/eshs/v1/common/eshschemicalsafetypsm`, requestValue, this.getMaterialList);
    }
    this.setState({
      isModified: false,
    });
    return submitHandlerBySaga(id, 'POST', `/api/eshs/v1/common/eshschemicalsafetypsm`, requestValue, this.getMaterialList);
  };

  handleDeleteClick = () => {
    const { requestValue } = this.state;
    if (!requestValue.PSM_ID) {
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
    return submitHandlerBySaga(id, 'DELETE', `/api/eshs/v1/common/eshschemicalsafetypsm`, requestValue, this.getMaterialList);
  };

  getMaterialList = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiArr = [
      {
        key: 'materialList',
        type: 'GET',
        url: '/api/eshs/v1/common/eshschemicalsafetypsm',
      },
    ];
    getCallDataHandler(id, apiArr, this.handleResetClick);
  };

  handleResetClick = () => {
    this.setState({
      requestValue: {
        CAS_NO: '',
        NAME_KOR: '',
        NAME_ENG: '',
        IS_APPLICATE: 'Y',
        SERIAL_NO: '',
        PSM_ID: '',
        PRODUCTION_STOCK: 0,
        USAGE_STOCK: 0,
        STORAGE_STOCK: 0,
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

  handleSameValueCheck = () => {
    const { hasSameValue, requestValue } = this.state;
    if (!hasSameValue) {
      const valueObj = { USAGE_STOCK: requestValue.PRODUCTION_STOCK, STORAGE_STOCK: requestValue.PRODUCTION_STOCK };
      this.setState(prevState => ({
        hasSameValue: !prevState.hasSameValue,
        requestValue: Object.assign(prevState.requestValue, valueObj),
      }));
    } else {
      const valueObj = { USAGE_STOCK: '', STORAGE_STOCK: '' };
      this.setState(prevState => ({
        hasSameValue: !prevState.hasSameValue,
        requestValue: Object.assign(prevState.requestValue, valueObj),
      }));
    }
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
      title: '함유량 기준',
      dataIndex: 'CONTENT_STANDARD',
      key: 'CONTENT_STANDARD',
      align: 'center',
      width: '10%',
    },
    {
      title: '해당여부',
      dataIndex: 'IS_APPLICATE',
      key: 'IS_APPLICATE',
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
      handleSameValueCheck,
    } = this;
    const { modalColumns } = this;
    const { requestValue, visible, deleteConfirmMessage, isModified, hasSameValue } = this.state;
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
              <StyledButton className="btn-primary btn-sm btn-first" onClick={handleInputClick}>
                저장/수정
              </StyledButton>
              <Popconfirm
                title={deleteConfirmMessage}
                onConfirm={isModified ? handleDeleteConfirm : null}
                okText={isModified ? '삭제' : '확인'}
                cancelText="취소"
              >
                <StyledButton className="btn-light btn-sm mr5" onClick={handleDeleteClick}>
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
                  <td>{requestValue.SERIAL_NO}</td>
                  <th>화학물질명_국문</th>
                  <td>
                    <AntdInput className="ant-input-sm" name="NAME_KOR" value={requestValue.NAME_KOR} onChange={e => handleInputChange(e, 'INPUT')} />
                  </td>
                  <th>CAS NO.</th>
                  <td>
                    <AntdInput className="ant-input-sm" name="CAS_NO" value={requestValue.CAS_NO} onChange={e => handleInputChange(e, 'INPUT')} />
                  </td>
                </tr>
                <tr>
                  <th>해당여부</th>
                  <td>
                    <AntdSelect
                      className="select-sm"
                      defaultValue="Y"
                      onChange={e => handleInputChange(e, 'SELECT', 'IS_APPLICATE')}
                      value={requestValue.IS_APPLICATE}
                      style={{ width: '100%' }}
                    >
                      <Select.Option value="Y">해당</Select.Option>
                      <Select.Option value="N">비해당</Select.Option>
                    </AntdSelect>
                  </td>
                  <th>기준함량</th>
                  <td>
                    <AntdInputNumber
                      className="ant-input-number ant-input-number-sm"
                      value={requestValue.CONTENT_STANDARD}
                      onChange={e => handleInputChange(e, 'NUMBER', 'CONTENT_STANDARD')}
                    />
                  </td>
                  <th>제출량 (제조, 취급, 저장 동일여부)</th>
                  <td style={{ textAlign: 'center' }}>
                    <Checkbox onChange={handleSameValueCheck} checked={hasSameValue} />
                  </td>
                </tr>
                <tr>
                  <th>{hasSameValue ? '제조, 취급, 저장' : '제조'}</th>
                  <td colSpan={hasSameValue ? 5 : 1}>
                    <AntdInputNumber
                      className="ant-input-number ant-input-number-sm"
                      value={requestValue.PRODUCTION_STOCK}
                      onChange={e => handleInputChange(e, 'NUMBER', 'PRODUCTION_STOCK')}
                      style={{ width: hasSameValue ? '191.8px' : '100%' }}
                    />
                  </td>
                  {hasSameValue ? null : (
                    <>
                      <th>취급</th>
                      <td>
                        <AntdInputNumber
                          className="ant-input-number ant-input-number-sm"
                          defaultValue={0}
                          value={requestValue.USAGE_STOCK}
                          onChange={e => handleInputChange(e, 'NUMBER', 'USAGE_STOCK')}
                        />
                      </td>
                      <th>저장</th>
                      <td>
                        <AntdInputNumber
                          className="ant-input-number ant-input-number-sm"
                          defaultValue={0}
                          value={requestValue.STORAGE_STOCK}
                          onChange={e => handleInputChange(e, 'NUMBER', 'STORAGE_STOCK')}
                        />
                      </td>
                    </>
                  )}
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
          apiUrl="/api/eshs/v1/common/eshschemicalsafetypsm"
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
