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
        CAS_NO: '',
        NAME_KOR: '',
        IS_BAN: 'Y',
        SERIAL_NO: '',
        INVENTORY_ID: '',
      },
      visible: false,
      isModified: false,
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
      return this.setState(prevState => ({
        requestValue: Object.assign(prevState.requestValue, valueObj),
      }));
    }

    if (type.toUpperCase() === 'SELECT' && name === 'CATEGORY') {
      const valueObj = { [name.toUpperCase()]: event, SUB_CATEGORY: '' };
      this.getSubCategories(event);
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
      return submitHandlerBySaga(id, 'PUT', `/api/eshs/v1/common/eshschemicalsafetyban`, requestValue, (key, response) =>
        callBackAfterPut(key, response, this.getMaterialList),
      );
    }
    this.setState({
      isModified: false,
    });
    return submitHandlerBySaga(id, 'POST', `/api/eshs/v1/common/eshschemicalsafetyban`, requestValue, (key, response) =>
      callBackAfterPost(key, response, this.getMaterialList),
    );
  };

  handleDeleteClick = () => {
    const { requestValue } = this.state;
    if (!requestValue.INVENTORY_ID) {
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

    return submitHandlerBySaga(id, 'DELETE', `/api/eshs/v1/common/eshschemicalsafetyban`, requestValue, (key, response) =>
      callBackAfterDelete(key, response, this.getMaterialList),
    );
  };

  getMaterialList = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiArr = [
      {
        key: 'materialList',
        type: 'GET',
        url: '/api/eshs/v1/common/eshschemicalsafetyban',
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
        IS_BAN: 'Y',
        SERIAL_NO: '',
        INVENTORY_ID: '',
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
      title: '해당여부',
      dataIndex: 'IS_BAN',
      key: 'IS_BAN',
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
                <col width="25%" />
                <col width="25%" />
                <col width="25%" />
                <col width="25%" />
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
                  <th>CAS NO.</th>
                  <td>
                    <AntdInput className="ant-input-sm" name="CAS_NO" value={requestValue.CAS_NO} onChange={e => handleInputChange(e, 'INPUT')} />
                  </td>
                </tr>
                <tr>
                  <th>화학물질명_국문</th>
                  <td>
                    <AntdInput className="ant-input-sm" name="NAME_KOR" value={requestValue.NAME_KOR} onChange={e => handleInputChange(e, 'INPUT')} />
                  </td>
                  <th>해당여부</th>
                  <td>
                    <AntdSelect
                      className="select-sm"
                      defaultValue="Y"
                      onChange={e => handleInputChange(e, 'SELECT', 'IS_BAN')}
                      value={requestValue.IS_BAN}
                      style={{ width: '100%' }}
                    >
                      <Select.Option value="Y">해당</Select.Option>
                      <Select.Option value="N">비해당</Select.Option>
                    </AntdSelect>
                  </td>
                </tr>
              </tbody>
            </table>
          </StyledHtmlTable>
          <div className="div-comment div-comment-antd">β-나프틸아민, 4-니트로디페닐, 석면, 폴리클로리네이티드 터페닐을 함유한 중량비율 1% 이하 제외</div>
        </StyledContentsWrapper>
        <Modal
          sagaKey={sagaKey}
          visible={visible}
          modalClose={handleModalClose}
          getCallDataHandler={getCallDataHandler}
          result={result}
          setRequestValue={setRequestValue}
          apiUrl="/api/eshs/v1/common/eshschemicalsafetyban"
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
