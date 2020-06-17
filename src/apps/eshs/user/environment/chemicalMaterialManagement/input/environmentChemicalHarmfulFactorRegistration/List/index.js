import React from 'react';
import PropTypes from 'prop-types';
import { Input, Select, Popconfirm, message } from 'antd';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';

import Modal from 'apps/eshs/user/environment/chemicalMaterialManagement/input/environmentMasterRegistration/InputModal';
import SearchComp from 'apps/eshs/user/environment/chemicalMaterialManagement/input/environmentMasterRegistration/InputModal/SearchComp';
import { callBackAfterPost, callBackAfterDelete } from 'apps/eshs/user/environment/chemicalMaterialManagement/input/submitCallbackFunc';

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
      return submitHandlerBySaga(id, 'POST', `/api/eshs/v1/common/eshschemicalmaterialharmfulfactor`, requestValue, (key, response) =>
        callBackAfterPost(key, response, this.getMaterialList),
      );
    }
    return message.error('화학물을 먼저 선택하세요.');
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
    return submitHandlerBySaga(id, 'DELETE', `/api/eshs/v1/common/eshschemicalmaterialharmfulfactor`, requestValue, (key, response) =>
      callBackAfterDelete(key, response, this.getMaterialList),
    );
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
      width: '10%',
    },
    {
      title: '화학물질명_SAP',
      dataIndex: 'NAME_SAP',
      key: 'NAME_SAP',
      align: 'center',
      width: '20%',
    },
    {
      title: '공급업체',
      dataIndex: 'WRK_CMPNY_NM',
      key: 'WRK_CMPNY_NM',
      align: 'center',
      width: '20%',
    },
    {
      title: '위험물 분류',
      dataIndex: 'NAME_KOR',
      key: 'NAME_KOR',
      align: 'center',
      width: '15%',
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
                  <td>{requestValue.WRK_CMPNY_NM} </td>
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
        </StyledContentsWrapper>
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
