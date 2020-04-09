import React from 'react';
import PropTypes from 'prop-types';

import { Input, InputNumber, Popconfirm } from 'antd';
import StyledSearchWrap from 'components/CommonStyled/StyledSearchWrap';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledInput from 'commonStyled/Form/StyledInput';
import StyledSearchInput from 'commonStyled/Form/StyledSearchInput';
import StyledHtmlTable from 'commonStyled/EshsStyled/Table/StyledHtmlTable';

import Modal from 'apps/eshs/user/environmentMasterRegistration/InputModal';
import SearchComp from 'apps/eshs/user/environmentMasterRegistration/InputModal/SearchComp';
// import SearchComp from '../SearchComp';

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
        GROUP_NAME: '',
        HANDLE_AMOUNT: 0,
        INVESTIGATION_TARGET_RANGE: 0,
        CATEGORY: '',
        SUB_CATEGORY: '',
      },
      isModified: false,
      deleteConfirmMessage: '삭제하시겠습니까?',
    };
  }

  handleInputClick = () => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    const { requestValue, isModified } = this.state;
    if (isModified) {
      return submitHandlerBySaga(id, 'PUT', `/api/eshs/v1/common/eshschemicalmaterialmanageactregistration`, requestValue, this.getMaterialList);
    }
    return submitHandlerBySaga(id, 'POST', `/api/eshs/v1/common/eshschemicalmaterialmanageactregistration`, requestValue, this.getMaterialList);
  };

  handleDeleteClick = () => {
    const { requestValue } = this.state;
    if (!requestValue.PRTR_ID) {
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
    return submitHandlerBySaga(id, 'DELETE', `/api/eshs/v1/common/eshschemicalmaterialmanageactregistration`, requestValue, this.getMaterialList);
  };

  getMaterialList = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiArr = [
      {
        key: 'materialList',
        type: 'GET',
        url: '/api/eshs/v1/common/eshschemicalmaterialmanageactregistration',
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
        NAME_KOR: '',
        NAME_ENG: '',
        GROUP_NAME: '',
        HANDLE_AMOUNT: '',

        INVESTIGATION_TARGET_RANGE: '',
        CATEGORY: '',
        SUB_CATEGORY: '',
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
      title: 'CAS_NO',
      dataIndex: 'CAS_NO',
      key: 'CAS_NO',
      align: 'center',
    },
    {
      title: '물질명(국문)',
      dataIndex: 'NAME_KOR',
      key: 'NAME_KOR',
      align: 'center',
    },
    {
      title: '물질명(영문)',
      dataIndex: 'NAME_ENG',
      key: 'NAME_ENG',
      align: 'center',
    },
    {
      title: '호',
      dataIndex: 'CATEGORY',
      key: 'CATEGORY',
      align: 'center',
    },
    {
      title: '하위 호',
      dataIndex: 'SUB_CATEGORY',
      key: 'SUB_CATEGORY',
      align: 'center',
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
    const { visible, requestValue, deleteConfirmMessage } = this.state;
    const { sagaKey, getCallDataHandler, result, changeFormData, formData } = this.props;

    return (
      <>
        <ContentsWrapper>
          <StyledSearchWrap>
            <span className="input-label">화학물 추가</span>
            <AntdSearch className="ant-search-inline input-search-mid mr5" placeHolder="검색" onClick={handleSearchClick} value="" style={{ width: '200px' }} />
            <StyledButtonWrapper className="btn-wrap-inline">
              <StyledButton className="btn-primary btn-first" onClick={handleInputClick} style={{ width: '91px' }}>
                저장/수정
              </StyledButton>
              <Popconfirm title={deleteConfirmMessage} onConfirm={handleDeleteConfirm} okText="삭제" cancelText="취소">
                <StyledButton className="btn-light btn-first" onClick={handleDeleteClick} style={{ width: '91px' }}>
                  삭제
                </StyledButton>
              </Popconfirm>
              <StyledButton className="btn-light" onClick={handleResetClick} style={{ width: '91px' }}>
                초기화
              </StyledButton>
            </StyledButtonWrapper>
          </StyledSearchWrap>
          <div className="tableWrapper">
            <StyledHtmlTable>
              <table>
                <colgroup>
                  <col width="16.6%" />
                  <col width="16.6%" />
                  <col width="16.6%" />
                  <col width="16.6%" />
                  <col width="16.6%" />
                  <col width="16.6%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>CAS_NO.</th>
                    <td>
                      <AntdInput className="ant-input-sm" name="CAS_NO" value={requestValue.CAS_NO} onChange={handleInputChange} />
                    </td>
                    <th>화학물질명_국문</th>
                    <td>
                      <AntdInput className="ant-input-sm" name="NAME_KOR" value={requestValue.NAME_KOR} onChange={handleInputChange} />
                    </td>
                    <th>화학물질명_영문</th>
                    <td>
                      <AntdInput className="ant-input-sm" name="NAME_ENG" value={requestValue.NAME_ENG} onChange={handleInputChange} />
                    </td>
                  </tr>
                  <tr>
                    <th>그룹</th>
                    <td>
                      <AntdInput className="ant-input-sm" name="GROUP_NAME" value={requestValue.GROUP_NAME} onChange={handleInputChange} />
                    </td>
                    <th>취급량(kg/년)</th>
                    <td>
                      <InputNumber
                        value={requestValue.HANDLE_AMOUNT}
                        onChange={value => handleInputNumberChange(value, 'HANDLE_AMOUNT')}
                        className="col-input-number"
                        style={{ width: '100%' }}
                      />
                    </td>
                    <th>조사대상범위(무게함유율%)</th>
                    <td>
                      <InputNumber
                        value={requestValue.INVESTIGATION_TARGET_RANGE}
                        onChange={value => handleInputNumberChange(value, 'INVESTIGATION_TARGET_RANGE')}
                        className="col-input-number"
                        style={{ width: '100%' }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th colSpan={1}>호</th>
                    <td colSpan={2}>
                      <AntdInput className="ant-input-sm" name="CATEGORY" value={requestValue.CATEGORY} onChange={handleInputChange} />
                    </td>
                    <th colSpan={1}>하위 호</th>
                    <td colSpan={2}>
                      <AntdInput className="ant-input-sm" name="SUB_CATEGORY" value={requestValue.SUB_CATEGORY} onChange={handleInputChange} />
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
          apiUrl="/api/eshs/v1/common/eshschemicalmaterialmanageactregistration"
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
