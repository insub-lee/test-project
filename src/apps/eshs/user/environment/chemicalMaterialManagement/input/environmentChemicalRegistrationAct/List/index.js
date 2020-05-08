import React from 'react';
import PropTypes from 'prop-types';

import { Input, InputNumber, Popconfirm, Select } from 'antd';
import StyledSearchWrap from 'components/CommonStyled/StyledSearchWrap';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledInput from 'commonStyled/Form/StyledInput';
import StyledSearchInput from 'commonStyled/Form/StyledSearchInput';
import StyledHtmlTable from 'commonStyled/EshsStyled/Table/StyledHtmlTable';
import StyledInputNumber from 'commonStyled/Form/StyledInputNumber';

import Modal from 'apps/eshs/user/environment/chemicalMaterialManagement/input/environmentMasterRegistration/InputModal';
import SearchComp from 'apps/eshs/user/environment/chemicalMaterialManagement/input/environmentMasterRegistration/InputModal/SearchComp';
import StyledSelect from 'commonStyled/Form/StyledSelect';

const AntdSelect = StyledSelect(Select);
const AntdInput = StyledInput(Input);
const AntdSearch = StyledSearchInput(Input.Search);
const AntdInputNumber = StyledInputNumber(InputNumber);
class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      requestValue: {
        CAS_NO: '',
        NAME: '',
        ORDER_NO: '',
        IS_APPLICABLE: 'Y',
      },
      isModified: false,
      deleteConfirmMessage: '삭제하시겠습니까?',
    };
  }

  handleInputClick = () => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    const { requestValue, isModified } = this.state;
    if (isModified) {
      return submitHandlerBySaga(id, 'PUT', `/api/eshs/v1/common/eshschemicalmaterialregistrationact`, requestValue, this.getMaterialList);
    }
    return submitHandlerBySaga(id, 'POST', `/api/eshs/v1/common/eshschemicalmaterialregistrationact`, requestValue, this.getMaterialList);
  };

  handleDeleteClick = () => {
    const { requestValue } = this.state;
    if (!requestValue.REG_ID) {
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
    return submitHandlerBySaga(id, 'DELETE', `/api/eshs/v1/common/eshschemicalmaterialregistrationact`, requestValue, this.getMaterialList);
  };

  getMaterialList = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiArr = [
      {
        key: 'materialList',
        type: 'GET',
        url: '/api/eshs/v1/common/eshschemicalmaterialregistrationact',
      },
    ];
    getCallDataHandler(id, apiArr, this.handleResetClick);
  };

  handleSearchClick = () => {
    this.setState({
      visible: true,
    });
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
        NAME: '',
        ORDER_NO: '',
        IS_APPLICABLE: 'Y',
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

  columns = [
    {
      title: '순번',
      dataIndex: 'ORDER_NO',
      key: 'ORDER_NO',
      align: 'center',
    },
    {
      title: '화학물질 명칭',
      dataIndex: 'NAME',
      key: 'NAME',
      align: 'center',
    },
    {
      title: 'CAS_NO',
      dataIndex: 'CAS_NO',
      key: 'CAS_NO',
      align: 'center',
    },
    {
      title: '해당여부',
      dataIndex: 'IS_APPLICABLE',
      key: 'IS_APPLICABLE',
      align: 'center',
      render: text => (text === 'Y' ? '해당' : '비해당'),
    },
  ];

  render() {
    const { columns } = this;
    const {
      handleInputClick,
      handleSearchClick,
      handleResetClick,
      handleModalClose,
      setRequestValue,
      handleInputChange,
      handleInputNumberChange,
      handleDeleteClick,
      handleDeleteConfirm,
    } = this;
    const { visible, requestValue, deleteConfirmMessage, isModified } = this.state;
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
                <StyledButton className="btn-primary btn-first" onClick={handleInputClick} style={{ width: '91px' }}>
                  저장/수정
                </StyledButton>
                <Popconfirm
                  title={deleteConfirmMessage}
                  onConfirm={isModified ? handleDeleteConfirm : null}
                  okText={isModified ? '삭제' : '확인'}
                  cancelText="취소"
                >
                  <StyledButton className="btn-light btn-first" onClick={handleDeleteClick} style={{ width: '91px' }}>
                    삭제
                  </StyledButton>
                </Popconfirm>
                <StyledButton className="btn-light" onClick={handleResetClick} style={{ width: '91px' }}>
                  초기화
                </StyledButton>
              </StyledButtonWrapper>
            </div>
          </StyledSearchWrap>
          <div className="tableWrapper">
            <StyledHtmlTable>
              <table>
                <colgroup>
                  <col width="10%" />
                  <col width="15%" />
                  <col width="10%" />
                  <col width="15%" />
                  <col width="10%" />
                  <col width="15%" />
                  <col width="10%" />
                  <col width="15%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>순번</th>
                    <td>
                      <AntdInputNumber
                        value={requestValue.ORDER_NO}
                        onChange={value => handleInputNumberChange(value, 'ORDER_NO')}
                        className="ant-input-number input-number-sm"
                        style={{ width: '100%' }}
                      />
                    </td>
                    <th>화학물질 명칭</th>
                    <td>
                      <AntdInput className="ant-input-sm" name="NAME" value={requestValue.NAME} onChange={handleInputChange} />
                    </td>
                    <th>CAS_NO</th>
                    <td>
                      <AntdInput className="ant-input-sm" name="CAS_NO" value={requestValue.CAS_NO} onChange={handleInputChange} />
                    </td>
                    <th>해당여부</th>
                    <td>
                      <AntdSelect
                        className="select-sm"
                        defaultValue="Y"
                        value={requestValue.IS_APPLICABLE}
                        onChange={value => this.setState(prevState => ({ requestValue: Object.assign(prevState.requestValue, { IS_APPLICABLE: value }) }))}
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
          </div>
        </ContentsWrapper>
        <Modal
          sagaKey={sagaKey}
          visible={visible}
          modalClose={handleModalClose}
          getCallDataHandler={getCallDataHandler}
          result={result}
          setRequestValue={setRequestValue}
          apiUrl="/api/eshs/v1/common/eshschemicalmaterialregistrationact"
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
