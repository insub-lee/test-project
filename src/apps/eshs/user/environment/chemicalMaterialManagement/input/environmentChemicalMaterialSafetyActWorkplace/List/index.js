import React from 'react';
import PropTypes from 'prop-types';
import { Input, InputNumber, Select, Popconfirm, Table } from 'antd';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledInputNumber from 'components/BizBuilder/styled/Form/StyledInputNumber';

import { callBackAfterPost, callBackAfterPut, callBackAfterDelete } from 'apps/eshs/user/environment/chemicalMaterialManagement/input/submitCallbackFunc';
import Modal from '../InputModal';
import SearchComp from '../InputModal/SearchComp';

const AntdInput = StyledInput(Input);
const AntdInputNumber = StyledInputNumber(InputNumber);
const AntdSelect = StyledSelect(Select);
const AntdSearch = StyledSearchInput(Input.Search);
const AntdTable = StyledAntdTable(Table);
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
        CONTENT_STANDARD: '0',
      },
      subRequestValue: {
        CAS_NO: '',
        NAME_KOR: '',
        NAME_ENG: '',
        CATEGORY: '',
        SUB_CATEGORY: '',
        IS_APPLICATE: 'Y',
        WORK_ID: '',
        CONTENT_STANDARD: '0',
        PARENT_ID: '',
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
      return submitHandlerBySaga(
        id,
        'PUT',
        `/api/eshs/v1/common/eshschemicalsafetyworkplace`,
        { requestValue, SUB_MATERIALS: dataSource.slice(1) },
        (key, response) => callBackAfterPut(key, response, this.getMaterialList),
      );
    }
    this.setState({
      isModified: false,
    });
    return submitHandlerBySaga(
      id,
      'POST',
      `/api/eshs/v1/common/eshschemicalsafetyworkplace`,
      { requestValue, SUB_MATERIALS: dataSource.slice(1) },
      (key, response) => callBackAfterPost(key, response, this.getMaterialList),
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
    const submitCallbackFunc = () => {
      this.getMaterialList();
      this.handleResetClick();
    };

    return submitHandlerBySaga(id, 'DELETE', `/api/eshs/v1/common/eshschemicalsafetyworkplace`, requestValue, (key, response) =>
      callBackAfterDelete(key, response, submitCallbackFunc),
    );
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
    getCallDataHandler(id, apiArr, this.handleResetClick);
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
        CONTENT_STANDARD: '0',
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
        SUB_CATEGORY: '',
        IS_APPLICATE: '',
        CONTENT_STANDARD: '0',
      },
    });
  };

  handleModalClose = () => {
    this.setState({
      visible: false,
    });
  };

  setRequestValue = record => {
    const { setSubMaterials, getSubCategories } = this;
    const { sagaKey: id, getCallDataHandler } = this.props;
    getSubCategories(Number(record.CATEGORY));
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
        CONTENT_STANDARD: '0',
        PARENT_ID: record.WORK_ID,
      },
    });

    const apiArr = [
      {
        key: 'subMaterials',
        type: 'GET',
        url: `/api/eshs/v1/common/eshschemicalsafetyworkplacesub?PARENT_ID=${record.WORK_ID}`,
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
          SUB_CATEGORY: prevState.requestValue.SUB_CATEGORY,
          IS_APPLICATE: 'Y',
          CONTENT_STANDARD: '0',
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
              className="ant-input-number ant-input-number-sm"
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
        SUB_CATEGORY: prevState.requestValue.SUB_CATEGORY,
        IS_APPLICATE: 'Y',
        CONTENT_STANDARD: '0',
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
          SUB_CATEGORY: prevState.requestValue.SUB_CATEGORY,
          IS_APPLICATE: 'Y',
          CONTENT_STANDARD: '0',
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
          SUB_CATEGORY: prevState.requestValue.SUB_CATEGORY,
          IS_APPLICATE: 'Y',
          CONTENT_STANDARD: '0',
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
        SUB_CATEGORY: prevState.requestValue.SUB_CATEGORY,
        IS_APPLICATE: 'Y',
        CONTENT_STANDARD: '0',
        PARENT_ID: '',
      },
    }));
  };

  modalColumns = [
    {
      title: '연번',
      dataIndex: 'SERIAL_NO',
      key: 'SERIAL_NO',
      align: 'center',
      width: '10%',
    },
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
      title: '해당여부',
      dataIndex: 'IS_APPLICATE',
      key: 'IS_APPLICATE',
      align: 'center',
      width: '10%',
    },
    {
      title: '함량기준',
      dataIndex: 'CONTENT_STANDARD',
      key: 'CONTENT_STANDARD',
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
    const { requestValue, visible, deleteConfirmMessage, categories, subCategories, isModified, dataSource, subTableVisible } = this.state;
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
              <StyledButton className="btn-light btn-first btn-sm" onClick={handleResetClick}>
                초기화
              </StyledButton>
              <Popconfirm disabled={requestValue.CATEGORY && requestValue.NAME_KOR} title="상위물질 정보를 먼저 입력하세요.">
                <StyledButton
                  className="btn-light btn-sm"
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
                  {subTableVisible ? '하위물질 삭제' : '하위물질 추가'}
                </StyledButton>
              </Popconfirm>
            </div>
          </StyledCustomSearchWrapper>
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
                  <td>{requestValue.SERIAL_NO}</td>
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
                      disabled={requestValue.CATEGORY === 1958 || !requestValue.CATEGORY}
                    >
                      {subCategories.map(item => (
                        <Select.Option value={item.NODE_ID}>{item.NAME_KOR}</Select.Option>
                      ))}
                    </AntdSelect>
                  </td>
                  <th>함량기준</th>
                  <td>
                    <AntdInputNumber
                      className="ant-input-number ant-input-number-sm"
                      value={requestValue.CONTENT_STANDARD}
                      onChange={e => handleInputChange(e, 'NUMBER', 'CONTENT_STANDARD')}
                    />
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
                  <th>CAS NO.</th>
                  <td>
                    <AntdInput className="ant-input-sm" name="CAS_NO" value={requestValue.CAS_NO} onChange={e => handleInputChange(e, 'INPUT')} />
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
              onRow={(record, index) => ({
                // onClick: () => this.setState(prevState => ({ subRequestValue: Object.assign(prevState.subRequestValue, record), isSubModified: true })),
                onClick: () => handleSubMaterialRowClick(record, index),
              })}
            />
          ) : null}
        </StyledContentsWrapper>
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
