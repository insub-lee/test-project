import React from 'react';
import PropTypes from 'prop-types';
import { Input, InputNumber, Select, Popconfirm, Table } from 'antd';

import StyledSearchWrap from 'components/CommonStyled/StyledSearchWrap';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledHtmlTable from 'commonStyled/EshsStyled/Table/StyledHtmlTable';
import StyledLineTable from 'commonStyled/EshsStyled/Table/StyledLineTable';
import StyledSelect from 'commonStyled/Form/StyledSelect';
import StyledInput from 'commonStyled/Form/StyledInput';
import StyledSearchInput from 'commonStyled/Form/StyledSearchInput';
import StyledInputNumber from 'commonStyled/Form/StyledInputNumber';

import Modal from 'apps/eshs/user/environmentMasterRegistration/InputModal';
import SearchComp from 'apps/eshs/user/environmentMasterRegistration/InputModal/SearchComp';

const AntdInput = StyledInput(Input);
const AntdInputNumber = StyledInputNumber(InputNumber);
const AntdSelect = StyledSelect(Select);
const AntdSearch = StyledSearchInput(Input.Search);
const AntdTable = StyledLineTable(Table);
class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      subCategories: [],
      visible: false,
      subTableVisible: false,
      requestValue: {
        CAS_NO: '',
        NAME_KOR: '',
        NAME_ENG: '',
        CATEGORY: '',
        SUB_CATEGORY: '',
        IS_APPLICATE: 'Y',
        SERIAL_NO: '',
        WORK_ID: '',
        CONTENT_STANDARD: '',
      },
      subRequestValue: {
        CAS_NO: '',
        NAME_KOR: '',
        NAME_ENG: '',
        CATEGORY: '',
        SUB_CATEGORY: '',
        IS_APPLICATE: 'Y',
        SERIAL_NO: '',
        WORK_ID: '',
        CONTENT_STANDARD: '',
        PARENT_ID: '',
      },
      dataSource: [{}],
      isModified: false,
      isSubModified: false,
      deleteConfirmMessage: '삭제하시겠습니까?',
    };
  }

  componentDidMount() {
    this.getCategoryList();
  }

  getCategoryList = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiArr = [
      {
        key: 'codeCategory',
        type: 'POST',
        url: `/api/admin/v1/common/categoryMapList`,
        params: { PARAM: { NODE_ID: 1951 } },
      },
    ];

    getCallDataHandler(id, apiArr, this.setCategory);
  };

  setCategory = () => {
    const { result } = this.props;
    const category = result.codeCategory.categoryMapList.filter(item => item.PARENT_NODE_ID === 1951);
    this.setState({
      categories: category,
    });
  };

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

  handleSubInputChange = (event, type, name) => {
    if (type.toUpperCase() === 'INPUT') {
      const valueObj = { [event.target.name.toUpperCase()]: event.target.value };
      return this.setState(prevState => ({
        subRequestValue: Object.assign(prevState.subRequestValue, valueObj),
      }));
    }

    if (type.toUpperCase() === 'SELECT' && name === 'CATEGORY') {
      const valueObj = { [name.toUpperCase()]: event, SUB_CATEGORY: '' };
      this.getSubCategories(event);
      return this.setState(prevState => ({
        subRequestValue: Object.assign(prevState.subRequestValue, valueObj),
      }));
    }

    if (type.toUpperCase() === 'SELECT') {
      const valueObj = { [name.toUpperCase()]: event };
      return this.setState(prevState => ({
        subRequestValue: Object.assign(prevState.subRequestValue, valueObj),
      }));
    }

    if (type.toUpperCase() === 'NUMBER') {
      const valueObj = { [name]: event };
      return this.setState(prevState => ({
        subRequestValue: Object.assign(prevState.subRequestValue, valueObj),
      }));
    }
    return null;
  };

  getSubCategories = value => {
    const { result } = this.props;
    const category = result.codeCategory.categoryMapList.filter(item => item.PARENT_NODE_ID === value);
    this.setState({
      subCategories: category,
    });
  };

  setSubCategories = () => {
    const { result } = this.props;
    this.setState({
      subCategories: (result.subCategories && result.subCategories.categoryMapList && result.subCategories.categoryMapList.slice(1)) || [],
    });
  };

  handleInputClick = () => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    const { requestValue, isModified, dataSource } = this.state;
    if (isModified) {
      this.setState({
        isModified: false,
      });
      return submitHandlerBySaga(id, 'PUT', `/api/eshs/v1/common/eshschemicalsafetyworkplace`, requestValue, this.getMaterialList);
    }
    this.setState({
      isModified: false,
    });
    return submitHandlerBySaga(
      id,
      'POST',
      `/api/eshs/v1/common/eshschemicalsafetyworkplace`,
      { requestValue, SUB_MATERIALS: dataSource.slice(1) },
      this.getMaterialList,
    );
  };

  handleDeleteClick = () => {
    const { requestValue } = this.state;
    if (!requestValue.WORK_ID) {
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
    return submitHandlerBySaga(id, 'DELETE', `/api/eshs/v1/common/eshschemicalsafetyworkplace`, requestValue, this.getMaterialList);
  };

  getMaterialList = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiArr = [
      {
        key: 'materialList',
        type: 'GET',
        url: '/api/eshs/v1/common/eshschemicalsafetyworkplace',
      },
    ];
    // getCallDataHandler(id, apiArr, this.handleResetClick);
    getCallDataHandler(id, apiArr);
  };

  handleResetClick = () => {
    this.setState({
      requestValue: {
        CAS_NO: '',
        NAME_KOR: '',
        NAME_ENG: '',
        CATEGORY: '',
        SUB_CATEGORY: '',
        IS_APPLICATE: '',
        CONTENT_STANDARD: '',
        SERIAL_NO: '',
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
      subRequestValue: {
        CAS_NO: '',
        NAME_KOR: '',
        NAME_ENG: '',
        CATEGORY: record.CATEGORY,
        SUB_CATEGORY: record.SUB_CATEGORY,
        IS_APPLICATE: 'Y',
        SERIAL_NO: record.SERIAL_NO,
        CONTENT_STANDARD: '',
        PARENT_ID: '',
      },
    });
  };

  handleSubInputClick = () => {
    const { isSubModified } = this.state;
    if (!isSubModified) {
      this.setState(prevState => ({
        dataSource: prevState.dataSource.concat(prevState.subRequestValue),
        subRequestValue: {
          CAS_NO: '',
          NAME_KOR: '',
          NAME_ENG: '',
          CATEGORY: prevState.requestValue.CATEGORY,
          SUB_CATEGORY: prevState.requestValue.SUB_CATEGORY,
          IS_APPLICATE: 'Y',
          SERIAL_NO: prevState.requestValue.SERIAL_NO,
          CONTENT_STANDARD: '',
          PARENT_ID: '',
        },
      }));
    }
  };

  columns = [
    {
      title: 'CAS_NO',
      dataIndex: 'CAS_NO',
      key: 'CAS_NO',
      align: 'center',
      render: (text, record, index) => {
        const { handleSubInputChange } = this;
        const { subRequestValue } = this.state;
        if (index === 0) {
          return <AntdInput className="ant-input-sm" name="CAS_NO" value={subRequestValue.CAS_NO} onChange={e => handleSubInputChange(e, 'INPUT')} />;
        }
        return text;
      },
    },
    {
      title: '화학물질명_국문',
      dataIndex: 'NAME_KOR',
      key: 'NAME_KOR',
      align: 'center',
      render: (text, record, index) => {
        const { handleSubInputChange } = this;
        const { subRequestValue } = this.state;
        if (index === 0) {
          return <AntdInput className="ant-input-sm" name="NAME_KOR" value={subRequestValue.NAME_KOR} onChange={e => handleSubInputChange(e, 'INPUT')} />;
        }
        return text;
      },
    },
    {
      title: '화학물질명_영문',
      dataIndex: 'NAME_ENG',
      key: 'NAME_ENG',
      align: 'center',
      render: (text, record, index) => {
        const { handleSubInputChange } = this;
        const { subRequestValue } = this.state;
        if (index === 0) {
          return <AntdInput className="ant-input-sm" name="NAME_ENG" value={subRequestValue.NAME_ENG} onChange={e => handleSubInputChange(e, 'INPUT')} />;
        }
        return text;
      },
    },
    {
      title: '함량기준',
      dataIndex: 'CONTENT_STANDARD',
      key: 'CONTENT_STANDARD',
      align: 'center',
      render: (text, record, index) => {
        const { handleSubInputChange } = this;
        const { subRequestValue } = this.state;
        if (index === 0) {
          return (
            <AntdInputNumber
              className="ant-input-number input-number-sm"
              value={subRequestValue.CONTENT_STANDARD}
              onChange={e => handleSubInputChange(e, 'NUMBER', 'CONTENT_STANDARD')}
            />
          );
        }
        return text;
      },
    },
    {
      title: '해당여부',
      dataIndex: 'IS_APPLICATE',
      key: 'IS_APPLICATE',
      align: 'center',
      width: '100px',
      render: (text, record, index) => {
        const { handleSubInputChange } = this;
        const { subRequestValue } = this.state;
        if (index === 0) {
          return (
            <AntdSelect
              className="select-sm"
              defaultValue="Y"
              onChange={e => handleSubInputChange(e, 'SELECT', 'IS_APPLICATE')}
              value={subRequestValue.IS_APPLICATE === 'Y' ? '해당' : '비해당'}
              style={{ width: '100%' }}
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
      align: 'center',
      render: (text, record, index) => {
        const { handleSubInputClick } = this;
        const { isSubModified } = this.state;
        if (index === 0) {
          return (
            <>
              <StyledButton className="btn-primary btn-first" onClick={handleSubInputClick}>
                {isSubModified ? '저장' : '추가'}
              </StyledButton>
              <StyledButton className="btn-primary">{isSubModified ? '삭제' : '초기화'}</StyledButton>
            </>
          );
        }
        return null;
      },
    },
  ];

  handleSubMaterialAddClick = () => {
    this.setState(prevState => ({
      subTableVisible: true,
      subRequestValue: {
        CAS_NO: '',
        NAME_KOR: '',
        NAME_ENG: '',
        CATEGORY: prevState.requestValue.CATEGORY,
        SUB_CATEGORY: prevState.requestValue.SUB_CATEGORY,
        IS_APPLICATE: 'Y',
        SERIAL_NO: prevState.requestValue.SERIAL_NO,
        CONTENT_STANDARD: '',
        PARENT_ID: '',
      },
    }));
  };

  modalColumns = [
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
      handleSubMaterialAddClick,
    } = this;
    const { columns, modalColumns } = this;
    const { requestValue, visible, deleteConfirmMessage, categories, subCategories, isModified, dataSource, subTableVisible } = this.state;
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
                <StyledButton className="btn-light btn-first" onClick={handleResetClick}>
                  초기화
                </StyledButton>
                <Popconfirm disabled={requestValue.SERIAL_NO && requestValue.CATEGORY} title="상위물질 정보를 먼저 입력하세요.">
                  <StyledButton className="btn-light" onClick={requestValue.SERIAL_NO && requestValue.CATEGORY ? handleSubMaterialAddClick : null}>
                    하위물질 추가
                  </StyledButton>
                </Popconfirm>
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
                    <th>연번</th>
                    <td>
                      <AntdInputNumber
                        className="ant-input-number input-number-sm"
                        value={requestValue.SERIAL_NO}
                        onChange={e => handleInputChange(e, 'NUMBER', 'SERIAL_NO')}
                        disabled={isModified}
                        // min={MAX_SERIAL_NO}
                      />
                    </td>
                    <th>분류</th>
                    <td>
                      <AntdSelect
                        className="select-sm"
                        onChange={e => handleInputChange(e, 'SELECT', 'CATEGORY')}
                        value={requestValue.CATEGORY ? Number(requestValue.CATEGORY) : ''}
                        style={{ width: '100%' }}
                      >
                        {categories.map(item => (
                          <Select.Option value={item.NODE_ID}>{item.NAME_KOR}</Select.Option>
                        ))}
                      </AntdSelect>
                    </td>
                    <th>하위 분류</th>
                    <td>
                      <AntdSelect
                        className="select-sm"
                        onChange={e => handleInputChange(e, 'SELECT', 'SUB_CATEGORY')}
                        value={requestValue.SUB_CATEGORY ? Number(requestValue.SUB_CATEGORY) : ''}
                        style={{ width: '100%' }}
                        disabled={requestValue.CATEGORY === 1958}
                      >
                        {subCategories.map(item => (
                          <Select.Option value={item.NODE_ID}>{item.NAME_KOR}</Select.Option>
                        ))}
                      </AntdSelect>
                    </td>
                    <th>함량기준</th>
                    <td>
                      <AntdInputNumber
                        className="ant-input-number input-number-sm"
                        value={requestValue.CONTENT_STANDARD}
                        onChange={e => handleInputChange(e, 'NUMBER', 'CONTENT_STANDARD')}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>CAS NO.</th>
                    <td>
                      <AntdInput className="ant-input-sm" name="CAS_NO" value={requestValue.CAS_NO} onChange={e => handleInputChange(e, 'INPUT')} />
                    </td>
                    <th>화학물질명_국문</th>
                    <td>
                      <AntdInput className="ant-input-sm" name="NAME_KOR" value={requestValue.NAME_KOR} onChange={e => handleInputChange(e, 'INPUT')} />
                    </td>
                    <th>화학물질명_영문</th>
                    <td>
                      <AntdInput className="ant-input-sm" name="NAME_ENG" value={requestValue.NAME_ENG} onChange={e => handleInputChange(e, 'INPUT')} />
                    </td>
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
                  </tr>
                </tbody>
              </table>
            </StyledHtmlTable>
            {subTableVisible ? (
              <AntdTable
                columns={columns}
                dataSource={dataSource}
                pagination={false}
                onRow={record => ({
                  onClick: () => this.setState(prevState => ({ subRequestValue: Object.assign(prevState.subRequestValue, record) })),
                })}
              />
            ) : null}
          </div>
        </ContentsWrapper>
        <Modal
          sagaKey={sagaKey}
          visible={visible}
          modalClose={handleModalClose}
          getCallDataHandler={getCallDataHandler}
          result={result}
          setRequestValue={setRequestValue}
          apiUrl="/api/eshs/v1/common/eshschemicalsafetyworkplace"
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
