import React from 'react';
import PropTypes from 'prop-types';
import { Input, Select, Popconfirm, InputNumber } from 'antd';

import StyledSearchWrap from 'components/CommonStyled/StyledSearchWrap';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledSelect from 'commonStyled/Form/StyledSelect';
import StyledHtmlTable from 'commonStyled/EshsStyled/Table/StyledHtmlTable';
import StyledSearchInput from 'commonStyled/Form/StyledSearchInput';
import StyledInput from 'commonStyled/Form/StyledInput';
import StyledInputNumber from 'commonStyled/Form/StyledInputNumber';

import Modal from 'apps/eshs/user/environment/chemicalMaterialManagement/input/environmentMasterRegistration/InputModal';
import SearchComp from 'apps/eshs/user/environment/chemicalMaterialManagement/input/environmentMasterRegistration/InputModal/SearchComp';

const AntdSelect = StyledSelect(Select);
const AntdSearch = StyledSearchInput(Input.Search);
const AntdInput = StyledInput(Input);
const AntdInputNumber = StyledInputNumber(InputNumber);
class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      requestValue: {
        CONTRACT_ID: '',
        SERIAL_NO: '',
        CAS_NO: '',
        NAME_KOR: '',
        IS_APPLICATE: '',
        CONTENT_DOSE: '',
      },
      isModified: false,
      deleteConfirmMessage: '삭제하시겠습니까?',
    };
  }

  componentDidMount() {
    this.getCategorys();
  }

  getCategorys = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiArr = [
      {
        key: 'categorys',
        url: `/api/eshs/v1/common/eshschemicalmaterialcode?CATEGORY=${1950}`,
        type: 'GET',
      },
    ];

    getCallDataHandler(id, apiArr, this.setCategorys);
  };

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
    const valueObj = { [name.toUpperCase()]: value };
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
      return submitHandlerBySaga(id, 'PUT', `/api/eshs/v1/common/eshschemicalsafetycontract`, requestValue, this.getMaterialList);
    }
    this.setState({
      isModified: false,
    });
    return submitHandlerBySaga(id, 'POST', `/api/eshs/v1/common/eshschemicalsafetycontract`, requestValue, this.getMaterialList);
  };

  handleDeleteClick = () => {
    const { requestValue } = this.state;
    if (!requestValue.CONTRACT_ID) {
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
    return submitHandlerBySaga(id, 'DELETE', `/api/eshs/v1/common/eshschemicalsafetycontract`, requestValue, this.getMaterialList);
  };

  getMaterialList = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiArr = [
      {
        key: 'materialList',
        type: 'GET',
        url: '/api/eshs/v1/common/eshschemicalsafetycontract',
      },
    ];
    getCallDataHandler(id, apiArr, this.handleResetClick);
  };

  handleResetClick = () => {
    this.setState({
      requestValue: {
        CONTRACT_ID: '',
        SERIAL_NO: '',
        CAS_NO: '',
        NAME_KOR: '',
        IS_APPLICATE: '',
        CONTENT_DOSE: '',
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

  columns = [
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
      title: '해당여부',
      dataIndex: 'IS_APPLICATE',
      key: 'IS_APPLICATE',
      align: 'center',
    },
    {
      title: '기준함량',
      dataIndex: 'CONTENT_STANDARD',
      key: 'CONTENT_STANDARD',
      align: 'center',
    },
    {
      title: '규정량(kg)',
      dataIndex: 'CONTENT_DOSE',
      key: 'CONTENT_DOSE',
      align: 'center',
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
      handleInputNumberChange,
    } = this;
    const { columns } = this;
    const { requestValue, visible, deleteConfirmMessage, isModified } = this.state;
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
                <Popconfirm
                  title={deleteConfirmMessage}
                  onConfirm={isModified ? handleDeleteConfirm : null}
                  okText={isModified ? '삭제' : '확인'}
                  cancelText="취소"
                >
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
                  <col width="13%" />
                  <col width="20%" />
                  <col width="13%" />
                  <col width="20%" />
                  <col width="13%" />
                  <col width="20%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>연번</th>
                    <td>
                      {/* <AntdInputNumber
                        value={requestValue.SERIAL_NO}
                        onChange={value => handleInputNumberChange(value, 'SERIAL_NO')}
                        className="input-number-sm"
                        style={{ width: '100%' }}
                      /> */}
                      {requestValue.SERIAL_NO}
                    </td>
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
                        onChange={e => handleInputChange(e, 'SELECT', 'IS_APPLICATE')}
                        value={requestValue.IS_APPLICATE}
                        style={{ width: '100%' }}
                      >
                        <AntdSelect.Option value="Y">해당</AntdSelect.Option>
                        <AntdSelect.Option value="N">비해당</AntdSelect.Option>
                      </AntdSelect>
                    </td>
                    <th>기준함량</th>
                    <td>
                      <AntdInputNumber
                        value={requestValue.CONTENT_STANDARD}
                        onChange={value => handleInputNumberChange(value, 'CONTENT_STANDARD')}
                        className="input-number-sm"
                        style={{ width: '100%' }}
                      />
                    </td>
                    <th>규정량(kg)</th>
                    <td>
                      <AntdInputNumber
                        value={requestValue.CONTENT_DOSE}
                        onChange={value => handleInputNumberChange(value, 'CONTENT_DOSE')}
                        className="input-number-sm"
                        style={{ width: '100%' }}
                      />
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
          apiUrl="/api/eshs/v1/common/eshschemicalsafetycontract"
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
