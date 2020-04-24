import React from 'react';
import PropTypes from 'prop-types';
import { Input, Select, Popconfirm } from 'antd';

import StyledSearchWrap from 'components/CommonStyled/StyledSearchWrap';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledSelect from 'commonStyled/Form/StyledSelect';
import StyledHtmlTable from 'commonStyled/EshsStyled/Table/StyledHtmlTable';
import StyledSearchInput from 'commonStyled/Form/StyledSearchInput';

import EshsCmpnyComp from 'components/BizBuilder/Field/EshsCmpnyComp';
import Modal from 'apps/eshs/user/environment/chemicalMaterialManagement/input/environmentMasterRegistration/InputModal';
import SearchComp from 'apps/eshs/user/environment/chemicalMaterialManagement/input/environmentMasterRegistration/InputModal/SearchComp';

const AntdSelect = StyledSelect(Select);
const AntdSearch = StyledSearchInput(Input.Search);
class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      categorys: [],
      requestValue: {
        SAP_NO: '',
        NAME_SAP: '',
        VENDOR_CD: '',
        CATEGORY: '',
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

  setCategorys = () => {
    const { result } = this.props;
    this.setState({
      categorys: (result.categorys && result.categorys.list) || [],
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

  handleInputClick = () => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    const { requestValue, isModified } = this.state;
    if (isModified) {
      this.setState({
        isModified: false,
      });
      return submitHandlerBySaga(id, 'PUT', `/api/eshs/v1/common/eshschemicalmaterialharmfulfactor`, requestValue, this.getMaterialList);
    }
    this.setState({
      isModified: false,
    });
    return submitHandlerBySaga(id, 'POST', `/api/eshs/v1/common/eshschemicalmaterialharmfulfactor`, requestValue, this.getMaterialList);
  };

  handleDeleteClick = () => {
    const { requestValue } = this.state;
    if (!requestValue.FACTOR_ID) {
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
    return submitHandlerBySaga(id, 'DELETE', `/api/eshs/v1/common/eshschemicalmaterialharmfulfactor`, requestValue, this.getMaterialList);
  };

  getMaterialList = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiArr = [
      {
        key: 'materialList',
        type: 'GET',
        url: '/api/eshs/v1/common/eshschemicalmaterialharmfulfactor',
      },
    ];
    getCallDataHandler(id, apiArr, this.handleResetClick);
  };

  handleResetClick = () => {
    this.setState({
      requestValue: {
        SAP_NO: '',
        NAME_SAP: '',
        VENDOR_CD: '',
        CATEGORY: '',
      },
      isModified: false,
    });
  };

  handleEshsCmpnyCompChange = data => {
    const valueObj = { VENDOR_CD: data.WRK_CMPNY_CD }; // 키값 바꾸기
    this.setState(prevState => ({ requestValue: Object.assign(prevState.requestValue, valueObj) }));
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
      title: 'SAP_NO',
      dataIndex: 'SAP_NO',
      key: 'SAP_NO',
      align: 'center',
    },
    {
      title: '화학물질명_SAP',
      dataIndex: 'NAME_SAP',
      key: 'NAME_SAP',
      align: 'center',
    },
    {
      title: '공급업체',
      dataIndex: 'VENDOR_NM',
      key: 'VENDOR_NM',
      align: 'center',
    },
    {
      title: '위험물 분류',
      dataIndex: 'CATEGORY',
      key: 'CATEGORY',
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
    } = this;
    const { columns } = this;
    const { requestValue, visible, deleteConfirmMessage, categorys, isModified } = this.state;
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
                  <col width="15%" />
                  <col width="35%" />
                  <col width="15%" />
                  <col width="35%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>SAP NO.</th>
                    <td>{requestValue.SAP_NO}</td>
                    <th>화학물질명_SAP</th>
                    <td>{requestValue.NAME_SAP}</td>
                  </tr>
                  <tr>
                    <th>공급업체</th>
                    <td>
                      <EshsCmpnyComp
                        searchWidth="50%"
                        sagaKey={sagaKey}
                        getExtraApiData={getCallDataHandler}
                        extraApiData={result}
                        colData={requestValue.VENDOR_CD}
                        visible
                        CONFIG={{ property: { isRequired: false, className: 'ant-input-search input-search-sm' } }}
                        changeFormData={changeFormData}
                        COMP_FIELD="VENDOR_CD"
                        eshsCmpnyCompResult={(companyInfo, COMP_FIELD) => this.handleEshsCmpnyCompChange(companyInfo, COMP_FIELD)}
                      />
                    </td>
                    <th>위험물 분류</th>
                    <td>
                      <AntdSelect
                        className="select-sm"
                        onChange={e => handleInputChange(e, 'SELECT', 'CATEGORY')}
                        value={requestValue.CATEGORY}
                        style={{ width: '100%' }}
                      >
                        {categorys.map(item => (
                          <Select.Option value={item.CODE_ID}>{item.NAME_KOR}</Select.Option>
                        ))}
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
          apiUrl="/api/eshs/v1/common/eshschemicalmaterialharmfulfactor"
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
