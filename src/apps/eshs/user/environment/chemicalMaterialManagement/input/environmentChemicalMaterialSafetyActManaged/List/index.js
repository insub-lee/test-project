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

import Modal from 'apps/eshs/user/environment/chemicalMaterialManagement/input/environmentMasterRegistration/InputModal';
import SearchComp from '../SearchComp';

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
      visible: false,
      subTableVisible: false,
      requestValue: {
        CAS_NO: '',
        NAME_KOR: '',
        NAME_ENG: '',
        CATEGORY: '',
        SERIAL_NO: '',
        MANAGE_ID: '',
        IS_MANAGED: 'Y',
        MANAGED_CONT: '0',
        IS_SPE_MANAGED: 'Y',
        SPE_MANAGED_CONT: '0',
      },
      subRequestValue: {
        CAS_NO: '',
        NAME_KOR: '',
        NAME_ENG: '',
        CATEGORY: '',
        MANAGE_ID: '',
        PARENT_ID: '',
        IS_MANAGED: 'Y',
        MANAGED_CONT: '0',
        IS_SPE_MANAGED: 'Y',
        SPE_MANAGED_CONT: '0',
      },
      dataSource: [{}],
      isModified: false,
      isSubModified: false,
      selectedIndex: -1,
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
        params: { PARAM: { NODE_ID: 1952 } },
      },
    ];

    getCallDataHandler(id, apiArr, this.setCategory);
  };

  setCategory = () => {
    const { result } = this.props;
    const category = result.codeCategory.categoryMapList.slice(1);
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

  handleInputClick = () => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    const { requestValue, isModified, dataSource } = this.state;
    if (isModified) {
      this.setState({
        isModified: false,
      });
      return submitHandlerBySaga(
        id,
        'PUT',
        `/api/eshs/v1/common/eshschemicalsafetymanaged`,
        { requestValue, SUB_MATERIALS: dataSource.slice(1) },
        this.getMaterialList,
      );
    }
    this.setState({
      isModified: false,
    });
    return submitHandlerBySaga(
      id,
      'POST',
      `/api/eshs/v1/common/eshschemicalsafetymanaged`,
      { requestValue, SUB_MATERIALS: dataSource.slice(1) },
      this.getMaterialList,
    );
  };

  handleDeleteClick = () => {
    const { requestValue } = this.state;
    if (!requestValue.MANAGE_ID) {
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
    return submitHandlerBySaga(id, 'DELETE', `/api/eshs/v1/common/eshschemicalsafetymanaged`, requestValue, this.getMaterialList);
  };

  getMaterialList = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiArr = [
      {
        key: 'materialList',
        type: 'GET',
        url: '/api/eshs/v1/common/eshschemicalsafetymanaged',
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
        CATEGORY: '',
        IS_MANAGED: '',
        MANAGED_CONT: '0',
        IS_SPE_MANAGED: '',
        SPE_MANAGED_CONT: '0',
        SERIAL_NO: '',
      },
      isModified: false,
      subTableVisible: false,
      dataSource: [{}],
      subRequestValue: {
        CAS_NO: '',
        NAME_KOR: '',
        NAME_ENG: '',
        CATEGORY: '',
        IS_MANAGED: '',
        MANAGED_CONT: '0',
        IS_SPE_MANAGED: '',
        SPE_MANAGED_CONT: '0',
      },
    });
  };

  handleModalClose = () => {
    this.setState({
      visible: false,
    });
  };

  setRequestValue = record => {
    const { setSubMaterials } = this;
    const { sagaKey: id, getCallDataHandler } = this.props;
    this.setState({
      requestValue: record,
      visible: false,
      isModified: true,
      subRequestValue: {
        CAS_NO: '',
        NAME_KOR: '',
        NAME_ENG: '',
        CATEGORY: record.CATEGORY,
        IS_MANAGED: '',
        MANAGED_CONT: '0',
        IS_SPE_MANAGED: '',
        SPE_MANAGED_CONT: '0',
        PARENT_ID: record.MANAGE_ID,
      },
    });

    const apiArr = [
      {
        key: 'subMaterials',
        type: 'GET',
        url: `/api/eshs/v1/common/eshschemicalsafetymanagedsub?PARENT_ID=${record.MANAGE_ID}`,
      },
    ];
    getCallDataHandler(id, apiArr, setSubMaterials);
  };

  setSubMaterials = () => {
    const { result } = this.props;
    this.setState(prevState => ({
      dataSource: prevState.dataSource.slice(0, 1).concat((result.subMaterials && result.subMaterials.list) || []),
      subTableVisible: ((result.subMaterials && result.subMaterials.list) || []).length > 0,
    }));
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
          IS_MANAGED: 'Y',
          MANAGED_CONT: '0',
          IS_SPE_MANAGED: 'Y',
          SPE_MANAGED_CONT: '0',
          PARENT_ID: '',
        },
      }));
    }
  };

  columns = [
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
      title: 'CAS_NO',
      dataIndex: 'CAS_NO',
      key: 'CAS_NO',
      align: 'center',
      width: '120px',
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
      title: '관리대상여부',
      dataIndex: 'IS_MANAGED',
      key: 'IS_MANAGED',
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
              onChange={e => handleSubInputChange(e, 'SELECT', 'IS_MANAGED')}
              value={subRequestValue.IS_MANAGED === 'Y' ? '해당' : '비해당'}
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
      title: '함량기준',
      dataIndex: 'MANAGED_CONT',
      key: 'MANAGED_CONT',
      align: 'center',
      width: '100px',
      render: (text, record, index) => {
        const { handleSubInputChange } = this;
        const { subRequestValue } = this.state;
        if (index === 0) {
          return (
            <AntdInputNumber
              className="ant-input-number input-number-sm"
              value={subRequestValue.MANAGED_CONT}
              onChange={e => handleSubInputChange(e, 'NUMBER', 'MANAGED_CONT')}
            />
          );
        }
        return text;
      },
    },
    {
      title: '특별관리여부',
      dataIndex: 'IS_SPE_MANAGED',
      key: 'IS_SPE_MANAGED',
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
              onChange={e => handleSubInputChange(e, 'SELECT', 'IS_SPE_MANAGED')}
              value={subRequestValue.IS_SPE_MANAGED === 'Y' ? '해당' : '비해당'}
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
      title: '함량기준',
      dataIndex: 'SPE_MANAGED_CONT',
      key: 'SPE_MANAGED_CONT',
      align: 'center',
      width: '100px',
      render: (text, record, index) => {
        const { handleSubInputChange } = this;
        const { subRequestValue } = this.state;
        if (index === 0) {
          return (
            <AntdInputNumber
              className="ant-input-number input-number-sm"
              value={subRequestValue.SPE_MANAGED_CONT}
              onChange={e => handleSubInputChange(e, 'NUMBER', 'SPE_MANAGED_CONT')}
            />
          );
        }
        return text;
      },
    },
    {
      title: '',
      align: 'center',
      width: '200px',
      render: (text, record, index) => {
        const { handleSubInputClick, handleSubModifyClick, handleSubDeleteClick, handleSubCancelClick } = this;
        const { isSubModified } = this.state;
        if (index === 0) {
          return (
            <>
              <StyledButton className="btn-primary btn-first btn-sm" onClick={isSubModified ? handleSubModifyClick : handleSubInputClick}>
                {isSubModified ? '저장' : '추가'}
              </StyledButton>
              <StyledButton className="btn-primary btn-first btn-sm" onClick={isSubModified ? handleSubDeleteClick : handleSubCancelClick}>
                {isSubModified ? '삭제' : '초기화'}
              </StyledButton>
              {isSubModified ? (
                <StyledButton className="btn-primary btn-sm" onClick={handleSubCancelClick}>
                  취소
                </StyledButton>
              ) : null}
            </>
          );
        }
        return null;
      },
    },
  ];

  handleSubMaterialRowClick = (record, index) => {
    if (index === 0) {
      return;
    }
    this.setState(prevState => ({
      subRequestValue: Object.assign(prevState.subRequestValue, record),
      isSubModified: true,
      selectedIndex: index,
    }));
  };

  handleSubMaterialAddClick = () => {
    this.setState(prevState => ({
      subTableVisible: true,
      subRequestValue: {
        CAS_NO: '',
        NAME_KOR: '',
        NAME_ENG: '',
        CATEGORY: prevState.requestValue.CATEGORY,
        IS_MANAGED: 'Y',
        MANAGED_CONT: '0',
        IS_SPE_MANAGED: 'Y',
        SPE_MANAGED_CONT: '0',
        PARENT_ID: '',
      },
    }));
  };

  handleSubModifyClick = () => {
    const { isSubModified, selectedIndex } = this.state;
    if (isSubModified) {
      this.setState(prevState => ({
        dataSource: [...prevState.dataSource.slice(0, selectedIndex), prevState.subRequestValue, ...prevState.dataSource.slice(selectedIndex + 1)],
        subRequestValue: {
          CAS_NO: '',
          NAME_KOR: '',
          NAME_ENG: '',
          CATEGORY: prevState.requestValue.CATEGORY,
          IS_MANAGED: 'Y',
          MANAGED_CONT: '0',
          IS_SPE_MANAGED: 'Y',
          SPE_MANAGED_CONT: '0',
          PARENT_ID: '',
        },
        isSubModified: false,
      }));
    }
  };

  handleSubDeleteClick = () => {
    const { isSubModified } = this.state;
    if (isSubModified) {
      this.setState(prevState => ({
        dataSource: [...prevState.dataSource.slice(0, prevState.selectedIndex), ...prevState.dataSource.slice(prevState.selectedIndex + 1)],
        subRequestValue: {
          CAS_NO: '',
          NAME_KOR: '',
          NAME_ENG: '',
          CATEGORY: prevState.requestValue.CATEGORY,
          IS_MANAGED: '',
          MANAGED_CONT: '0',
          IS_SPE_MANAGED: '',
          SPE_MANAGED_CONT: '0',
          PARENT_ID: '',
        },
        isSubModified: false,
      }));
    }
  };

  handleSubCancelClick = () => {
    this.setState(prevState => ({
      isSubModified: false,
      subRequestValue: {
        CAS_NO: '',
        NAME_KOR: '',
        NAME_ENG: '',
        CATEGORY: prevState.requestValue.CATEGORY,
        IS_MANAGED: '',
        MANAGED_CONT: '0',
        IS_SPE_MANAGED: '',
        SPE_MANAGED_CONT: '0',
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
      title: '관리대상여부',
      dataIndex: 'IS_MANAGED',
      key: 'IS_MANAGED',
      align: 'center',
      width: '10%',
    },
    {
      title: '특별관리여부',
      dataIndex: 'IS_SPE_MANAGED',
      key: 'IS_SPE_MANAGED',
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
      handleSubMaterialAddClick,
      handleSubMaterialRowClick,
    } = this;
    const { columns, modalColumns } = this;
    const { requestValue, visible, deleteConfirmMessage, categories, isModified, dataSource, subTableVisible } = this.state;
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
                <Popconfirm disabled={requestValue.CATEGORY && requestValue.NAME_KOR} title="기준물질 정보를 먼저 입력하세요.">
                  <StyledButton
                    className="btn-light"
                    onClick={() => {
                      if (subTableVisible) {
                        return this.setState({ subTableVisible: false, dataSource: [{}] });
                      }

                      if (requestValue.CATEGORY && requestValue.NAME_KOR) {
                        return handleSubMaterialAddClick();
                      }

                      return null;
                    }}
                  >
                    {subTableVisible ? '화합물 삭제' : '화합물 추가'}
                  </StyledButton>
                </Popconfirm>
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
                    <th>분류</th>
                    <td colSpan={7}>
                      <AntdSelect
                        className="select-sm"
                        onChange={e => handleInputChange(e, 'SELECT', 'CATEGORY')}
                        value={requestValue.CATEGORY ? Number(requestValue.CATEGORY) : ''}
                        style={{ width: '146.3px' }}
                      >
                        {categories.map(item => (
                          <Select.Option value={item.NODE_ID}>{item.NAME_KOR}</Select.Option>
                        ))}
                      </AntdSelect>
                    </td>
                  </tr>
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
                    <th>CAS NO.</th>
                    <td>
                      <AntdInput className="ant-input-sm" name="CAS_NO" value={requestValue.CAS_NO} onChange={e => handleInputChange(e, 'INPUT')} />
                    </td>
                  </tr>
                  <tr>
                    <th>관리대상유해물질여부</th>
                    <td>
                      <AntdSelect
                        className="select-sm"
                        defaultValue="Y"
                        onChange={e => handleInputChange(e, 'SELECT', 'IS_MANAGED')}
                        value={requestValue.IS_MANAGED}
                        style={{ width: '100%' }}
                      >
                        <Select.Option value="Y">해당</Select.Option>
                        <Select.Option value="N">비해당</Select.Option>
                      </AntdSelect>
                    </td>
                    <th>관리대상물질 함량기준</th>
                    <td>
                      <AntdInputNumber
                        className="ant-input-number input-number-sm"
                        value={requestValue.MANAGED_CONT}
                        onChange={e => handleInputChange(e, 'NUMBER', 'MANAGED_CONT')}
                      />
                    </td>
                    <th>특별관리대상물질여부</th>
                    <td>
                      <AntdSelect
                        className="select-sm"
                        defaultValue="Y"
                        onChange={e => handleInputChange(e, 'SELECT', 'IS_SPE_MANAGED')}
                        value={requestValue.IS_SPE_MANAGED}
                        style={{ width: '100%' }}
                      >
                        <Select.Option value="Y">해당</Select.Option>
                        <Select.Option value="N">비해당</Select.Option>
                      </AntdSelect>
                    </td>
                    <th>특별관리대상물질 함량기준</th>
                    <td>
                      <AntdInputNumber
                        className="ant-input-number input-number-sm"
                        value={requestValue.SPE_MANAGED_CONT}
                        onChange={e => handleInputChange(e, 'NUMBER', 'SPE_MANAGED_CONT')}
                      />
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
                onRow={(record, index) => ({
                  onClick: () => handleSubMaterialRowClick(record, index),
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
          apiUrl="/api/eshs/v1/common/eshschemicalsafetymanaged"
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
