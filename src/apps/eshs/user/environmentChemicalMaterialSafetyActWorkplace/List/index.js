import React from 'react';
import PropTypes from 'prop-types';
import { Input, Select, Popconfirm, Table } from 'antd';

import StyledSearchWrap from 'components/CommonStyled/StyledSearchWrap';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledSelect from 'commonStyled/Form/StyledSelect';
import StyledInput from 'commonStyled/Form/StyledInput';
import StyledHtmlTable from 'commonStyled/EshsStyled/Table/StyledHtmlTable';
import StyledLineTable from 'commonStyled/EshsStyled/Table/StyledLineTable';
import StyledSearchInput from 'commonStyled/Form/StyledSearchInput';

import Modal from 'apps/eshs/user/environmentMasterRegistration/InputModal';
import SearchComp from 'apps/eshs/user/environmentMasterRegistration/InputModal/SearchComp';

const AntdInput = StyledInput(Input);
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
      requestValue: {
        CAS_NO: '',
        NAME_KOR: '',
        NAME_ENG: '',
        CATEGORY: '',
        SUB_CATEGORY: '',
        IS_APPLICATE: 'Y',
      },
      subRequestValue: {
        NAME_KOR: '',
        NAME_ENG: '',
        CAS_NO: '',
        IS_APPLICATE: 'Y',
      },
      isModified: false,
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

  handleInputChange = (event, type, name, isSub) => {
    if (!isSub) {
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
    }
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
    const { requestValue, isModified } = this.state;
    if (isModified) {
      this.setState({
        isModified: false,
      });
      return submitHandlerBySaga(id, 'PUT', `/api/eshs/v1/common/eshschemicalsafetyworkplace`, requestValue, this.getMaterialList);
    }
    this.setState({
      isModified: false,
    });
    return submitHandlerBySaga(id, 'POST', `/api/eshs/v1/common/eshschemicalsafetyworkplace`, requestValue, this.getMaterialList);
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

  columns = [
    {
      title: '화학물질명_국문',
      dateIndex: 'NAME_KOR',
      key: 'NAME_KOR',
      align: 'center',
      render: () => {
        const { subRequestValue } = this.state;
        return (
          <AntdInput
            className="ant-input-sm ant-input-inline"
            name="NAME_KOR"
            value={subRequestValue.NAME_KOR}
            onChange={e => this.handleInputChange(e, 'INPUT', 'NAME_KOR', true)}
            style={{ width: '70%' }}
          />
        );
      },
    },
    {
      title: '화학물질명_영문',
      dateIndex: 'NAME_ENG',
      key: 'NAME_ENG',
      align: 'center',
      render: () => {
        const { subRequestValue } = this.state;
        return (
          <AntdInput
            className="ant-input-sm ant-input-inline"
            name="NAME_ENG"
            value={subRequestValue.NAME_ENG}
            onChange={e => this.handleInputChange(e, 'INPUT', 'NAME_ENG', true)}
            style={{ width: '70%' }}
          />
        );
      },
    },
    {
      title: 'CAS_NO',
      dateIndex: 'CAS_NO',
      key: 'CAS_NO',
      align: 'center',
      render: () => {
        const { subRequestValue } = this.state;
        return (
          <AntdInput
            className="ant-input-sm ant-input-inline"
            name="CAS_NO"
            value={subRequestValue.CAS_NO}
            onChange={e => this.handleInputChange(e, 'INPUT', 'CAS_NO', true)}
            style={{ width: '70%' }}
          />
        );
      },
    },
    {
      title: '해당여부',
      dateIndex: 'IS_APPLICATE',
      key: 'IS_APPLICATE',
      align: 'center',
      render: () => {
        const { subRequestValue } = this.state;
        return (
          <AntdSelect
            className="select-sm"
            defaultValue="Y"
            onChange={e => this.handleInputChange(e, 'SELECT', 'IS_APPLICATE', true)}
            value={subRequestValue.IS_APPLICATE}
            style={{ width: '100%' }}
          >
            <Select.Option value="Y">해당</Select.Option>
            <Select.Option value="N">비해당</Select.Option>
          </AntdSelect>
        );
      },
    },
  ];

  handleSapDeleteClick = () => {
    const { requestValue, subRequestValue } = this.state;
    console.debug(Object.assign(requestValue, subRequestValue));
  };

  dataSource = [
    {
      NAME_KOR: 'DD',
      NAME_ENG: 'DD',
      CAS_NO: 'DSA',
      IS_APPLICATE: 'Y',
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
      handleSapDeleteClick,
    } = this;
    const { columns, modalColumns, dataSource } = this;
    const { requestValue, visible, deleteConfirmMessage, categories, subCategories } = this.state;
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
                  <col width="8%" />
                  <col width="17%" />
                  <col width="8%" />
                  <col width="17%" />
                  <col width="8%" />
                  <col width="17%" />
                  <col width="8%" />
                  <col width="17%" />
                </colgroup>
                <tbody>
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
                  <tr>
                    <th colSpan={1}>분류</th>
                    <td colSpan={3}>
                      <AntdSelect
                        className="select-sm"
                        onChange={e => handleInputChange(e, 'SELECT', 'CATEGORY')}
                        value={Number(requestValue.CATEGORY)}
                        style={{ width: '100%' }}
                      >
                        {categories.map(item => (
                          <Select.Option value={item.NODE_ID}>{item.NAME_KOR}</Select.Option>
                        ))}
                      </AntdSelect>
                    </td>
                    <th colSpan={1}>하위 분류</th>
                    <td colSpan={3}>
                      <AntdSelect
                        className="select-sm"
                        onChange={e => handleInputChange(e, 'SELECT', 'SUB_CATEGORY')}
                        value={Number(requestValue.SUB_CATEGORY)}
                        style={{ width: '100%' }}
                      >
                        {subCategories.map(item => (
                          <Select.Option value={item.NODE_ID}>{item.NAME_KOR}</Select.Option>
                        ))}
                      </AntdSelect>
                    </td>
                  </tr>
                </tbody>
              </table>
            </StyledHtmlTable>
          </div>
          <div className="selSaveWrapper alignLeft">
            {/* <Popconfirm
              title={checkedIndex === -1 ? '삭제할 항목을 선택하세요.' : '삭제하시겠습니까?'}
              onConfirm={checkedIndex === -1 ? null : handleSapDeleteClick}
            > */}
            <StyledButton className="btn-light" onClick={this.handleSapDeleteClick}>
              선택 삭제
            </StyledButton>
            {/* </Popconfirm> */}
          </div>
          <AntdTable columns={columns} dataSource={dataSource} pagination={false} />
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
