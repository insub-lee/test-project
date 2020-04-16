import React from 'react';
import PropTypes from 'prop-types';
import { Input, Select, Popconfirm, Table } from 'antd';

import StyledSearchWrap from 'components/CommonStyled/StyledSearchWrap';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledSelect from 'commonStyled/Form/StyledSelect';
import StyledInput from 'commonStyled/Form/StyledInput';
import StyledSearchInput from 'commonStyled/Form/StyledSearchInput';
import StyledHtmlTable from 'commonStyled/EshsStyled/Table/StyledHtmlTable';
import StyledLineTable from 'commonStyled/EshsStyled/Table/StyledLineTable';

import Modal from 'apps/eshs/user/environmentMasterRegistration/InputModal';
import SearchComp from 'apps/eshs/user/environmentMasterRegistration/InputModal/SearchComp';
const AntdTable = StyledLineTable(Table);
const AntdSelect = StyledSelect(Select);
const AntdInput = StyledInput(Input);
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
        IS_EXPOSURE: 'N',
        IS_PERMISSION: 'N',
        IS_ALLOW: 'N',
      },
      isModified: false,
      deleteConfirmMessage: '삭제하시겠습니까?',
      tempInput: {
        CAS_NO: '',
        NAME_KOR: '',
        NAME_ENG: '',
        IS_EXPOSURE: 'N',
        IS_PERMISSION: 'N',
        IS_ALLOW: 'N',
      },
      dataSource: [{}],
      subMaterialList: [],
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
      const valueObj = { [name.toUpperCase()]: event };
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
    return null;
  };

  handleInputClick = () => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    const { requestValue, isModified } = this.state;
    if (isModified) {
      this.setState({
        isModified: false,
      });
      return submitHandlerBySaga(id, 'PUT', `/api/eshs/v1/common/eshschemicalsafetymaster`, requestValue, this.getMaterialList);
    }
    this.setState({
      isModified: false,
    });
    return submitHandlerBySaga(id, 'POST', `/api/eshs/v1/common/eshschemicalsafetymaster`, requestValue, this.getMaterialList);
  };

  handleDeleteClick = () => {
    const { requestValue } = this.state;
    if (!requestValue.SAFETY_ID) {
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
    return submitHandlerBySaga(id, 'DELETE', `/api/eshs/v1/common/eshschemicalsafetymaster`, requestValue, this.getMaterialList);
  };

  getMaterialList = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiArr = [
      {
        key: 'materialList',
        type: 'GET',
        url: '/api/eshs/v1/common/eshschemicalsafetymaster',
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
        IS_EXPOSURE: 'N',
        IS_PERMISSION: 'N',
        IS_ALLOW: 'N',
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
      title: 'CAS_NO',
      dataIndex: 'CAS_NO',
      key: 'CAS_NO',
      align: 'center',
    },
  ];

  tableColumns = [
    {
      title: '화학물질명_국문',
      key: 'NAME_KOR',
      dataIndex: 'NAME_KOR',
      align: 'center',
      width: '18%',
      render: (text, record, index) => {
        if (index === 0) {
          return (
            <AntdInput
              name="NAME_KOR"
              value={this.state.tempInput.NAME_KOR}
              style={{ width: '100%' }}
              className="ant-input-sm"
              onChange={this.handleSubInputChange}
            />
          );
        }
        return text;
      },
    },
    {
      title: '화학물질명_영문',
      key: 'NAME_ENG',
      dataIndex: 'NAME_ENG',
      align: 'center',
      width: '18%',
      render: (text, record, index) => {
        if (index === 0) {
          return (
            <AntdInput
              name="NAME_ENG"
              value={this.state.tempInput.NAME_ENG}
              style={{ width: '100%' }}
              className="ant-input-sm"
              onChange={this.handleSubInputChange}
            />
          );
        }
        return text;
      },
    },
    {
      title: 'CAS_NO',
      key: 'CAS_NO',
      dataIndex: 'CAS_NO',
      align: 'center',
      width: '18%',
      render: (text, record, index) => {
        if (index === 0) {
          return (
            <AntdInput
              name="CAS_NO"
              value={this.state.tempInput.CAS_NO}
              style={{ width: '100%' }}
              className="ant-input-sm"
              onChange={this.handleSubInputChange}
            />
          );
        }
        return text;
      },
    },
    {
      title: '노출기준설정물질',
      dataIndex: 'IS_EXPOSURE',
      width: '10%',
      align: 'center',
      render: (text, record, index) => {
        if (index === 0) {
          return (
            <AntdSelect
              defaultValue="N"
              value={this.state.tempInput.IS_EXPOSURE}
              style={{ width: '100%' }}
              className="select-sm"
              onChange={e => this.handleSubSelectChange(e, 'IS_EXPOSURE')}
            >
              <Select.Option value="Y">해당</Select.Option>
              <Select.Option value="N">비해당</Select.Option>
            </AntdSelect>
          );
        }
        return text === 'Y' ? '해당' : '비해당';
      },
    },
    {
      title: '허가대상물질',
      dataIndex: 'IS_PERMISSION',
      width: '10%',
      align: 'center',
      render: (text, record, index) => {
        if (index === 0) {
          return (
            <AntdSelect
              defaultValue="N"
              value={this.state.tempInput.IS_PERMISSION}
              style={{ width: '100%' }}
              className="select-sm"
              onChange={e => this.handleSubSelectChange(e, 'IS_PERMISSION')}
            >
              <Select.Option value="Y">해당</Select.Option>
              <Select.Option value="N">비해당</Select.Option>
            </AntdSelect>
          );
        }
        return text === 'Y' ? '해당' : '비해당';
      },
    },
    {
      title: '허용기준설정물질(제한물질)',
      dataIndex: 'IS_ALLOW',
      width: '10%',
      align: 'center',
      render: (text, record, index) => {
        if (index === 0) {
          return (
            <AntdSelect
              defaultValue="N"
              value={this.state.tempInput.IS_ALLOW}
              style={{ width: '100%' }}
              className="select-sm"
              onChange={e => this.handleSubSelectChange(e, 'IS_ALLOW')}
            >
              <Select.Option value="Y">해당</Select.Option>
              <Select.Option value="N">비해당</Select.Option>
            </AntdSelect>
          );
        }
        return text === 'Y' ? '해당' : '비해당';
      },
    },
    {
      title: '',
      width: '16%',
      align: 'center',
      render: (text, record, index) => {
        if (index === 0) {
          return (
            <>
              <StyledButton className="btn-primary btn-first btn-sm" onClick={() => this.handleSubInputClick(index)}>
                추가
              </StyledButton>
            </>
          );
        }
        return (
          <>
            <StyledButton className="btn-primary btn-first btn-sm" onClick={() => this.handleSubModifyClick(record)}>
              수정
            </StyledButton>
            <StyledButton className="btn-primary btn-first btn-sm" onClick={() => this.handleSubInputClick(index)}>
              삭제
            </StyledButton>
          </>
        );
      },
    },
  ];

  inputRow = [{}];

  handleSubInputChange = e => {
    const valueObj = { [e.target.name]: e.target.value };
    this.setState(prevState => ({
      tempInput: Object.assign(prevState.tempInput, valueObj),
    }));
  };

  handleSubSelectChange = (value, name) => {
    const valueObj = { [name]: value };
    this.setState(prevState => ({
      tempInput: Object.assign(prevState.tempInput, valueObj),
    }));
  };

  handleSubInputClick = index => {
    const valueObj = { index };
    this.setState(prevState => ({
      tempInput: Object.assign(prevState.tempInput, valueObj),
    }));
    this.setState(prevState => ({
      subMaterialList: prevState.subMaterialList.concat(prevState.tempInput),
      dataSource: [...prevState.dataSource.concat(prevState.tempInput)],
      tempInput: {
        CAS_NO: '',
        NAME_KOR: '',
        NAME_ENG: '',
        IS_EXPOSURE: 'N',
        IS_PERMISSION: 'N',
        IS_ALLOW: 'N',
      },
    }));
  };

  handleSubModifyClick = record => {
    this.setState({
      tempInput: {
        CAS_NO: record.CAS_NO,
        NAME_KOR: record.NAME_KOR,
        NAME_ENG: record.NAME_ENG,
        IS_EXPOSURE: record.IS_EXPOSURE,
        IS_PERMISSION: record.IS_PERMISSION,
        IS_ALLOW: record.IS_ALLOW,
      },
    });
  };

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
    const { columns, tableColumns } = this;
    const { requestValue, visible, deleteConfirmMessage, dataSource } = this.state;
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
                  <col width="15%" />
                  <col width="18%" />
                  <col width="15%" />
                  <col width="18%" />
                  <col width="15%" />
                  <col width="18%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>화학물질명_국문</th>
                    <td>
                      <AntdInput className="ant-input-sm" name="NAME_KOR" value={requestValue.NAME_KOR} onChange={e => handleInputChange(e, 'INPUT')} />
                    </td>
                    <th>화학물질명_영문</th>
                    <td>
                      <AntdInput className="ant-input-sm" name="NAME_ENG" value={requestValue.NAME_ENG} onChange={e => handleInputChange(e, 'INPUT')} />
                    </td>
                    <th>CAS NO.</th>
                    <td>
                      <AntdInput className="ant-input-sm" name="CAS_NO" value={requestValue.CAS_NO} onChange={e => handleInputChange(e, 'INPUT')} />
                    </td>
                  </tr>
                  <tr>
                    <th>노출기준설정물질</th>
                    <td>
                      <AntdSelect
                        className="select-sm"
                        defaultValue="Y"
                        onChange={e => handleInputChange(e, 'SELECT', 'IS_EXPOSURE')}
                        value={requestValue.IS_EXPOSURE}
                        style={{ width: '100%' }}
                      >
                        <Select.Option value="Y">해당</Select.Option>
                        <Select.Option value="N">비해당</Select.Option>
                      </AntdSelect>
                    </td>
                    <th>허가대상물질</th>
                    <td>
                      <AntdSelect
                        className="select-sm"
                        defaultValue="Y"
                        onChange={e => handleInputChange(e, 'SELECT', 'IS_PERMISSION')}
                        value={requestValue.IS_PERMISSION}
                        style={{ width: '100%' }}
                      >
                        <Select.Option value="Y">해당</Select.Option>
                        <Select.Option value="N">비해당</Select.Option>
                      </AntdSelect>
                    </td>
                    <th>허용기준설정물질(제한물질)</th>
                    <td>
                      <AntdSelect
                        className="select-sm"
                        defaultValue="Y"
                        onChange={e => handleInputChange(e, 'SELECT', 'IS_ALLOW')}
                        value={requestValue.IS_ALLOW}
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
            <StyledButtonWrapper className="btn-wrap-inline">
              <StyledButton className="btn-light" onClick={() => this.setState(prevState => ({ dataSource: prevState.dataSource.concat(dataSource[0]) }))}>
                하위물질추가
              </StyledButton>
            </StyledButtonWrapper>
            <AntdTable columns={tableColumns} dataSource={dataSource} />
          </div>
        </ContentsWrapper>
        <Modal
          sagaKey={sagaKey}
          visible={visible}
          modalClose={handleModalClose}
          getCallDataHandler={getCallDataHandler}
          result={result}
          setRequestValue={setRequestValue}
          apiUrl="/api/eshs/v1/common/eshschemicalsafetymaster"
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
