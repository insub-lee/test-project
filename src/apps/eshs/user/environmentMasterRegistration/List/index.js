import React from 'react';
import PropTypes from 'prop-types';
import { Input, InputNumber, Select, Popconfirm } from 'antd';

import StyledSearchWrap from 'components/CommonStyled/StyledSearchWrap';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledSelect from 'commonStyled/Form/StyledSelect';
import StyledInput from 'commonStyled/Form/StyledInput';
import StyledHtmlTable from 'commonStyled/EshsStyled/Table/StyledHtmlTable';

import EshsCmpnyComp from 'components/BizBuilder/Field/EshsCmpnyComp';
import Modal from '../InputModal';

const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);
class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      requestValue: {
        SAP_NO: '',
        CAS_NO: '',
        NAME_KOR: '',
        NAME_ENG: '',
        NAME_SAP: '',
        NAME_ETC: '',
        IS_IMPORT: 'N',
        VENDOR_CD: '',
        CONTENT_EXP: '',
        CONTENT_DOSE: 0,
        MASTER_ID: '',
      },
      isModified: false,
      deleteConfirmMessage: '삭제하시겠습니까?',
    };
  }

  handleSearchClick = () => {
    this.setState({
      visible: true,
    });
  };

  handleInputChange = e => {
    let valueObj = {};
    if (!!e && typeof e === 'object') {
      valueObj = { [e.target.name]: e.target.value };
    }
    if (typeof e === 'string') {
      valueObj = { IS_IMPORT: e };
    }
    return this.setState(prevState => ({
      requestValue: Object.assign(prevState.requestValue, valueObj),
    }));
  };

  handleInputNumberChange = (value, name) => {
    const { requestValue } = this.state;
    if (typeof value !== 'number') {
      const valueObj = { [name]: '' };
      this.setState(prevState => ({
        requestValue: Object.assign(prevState.requestValue, valueObj),
      }));
    }
    const valueObj = { [name]: value };
    this.setState(prevState => ({
      requestValue: Object.assign(prevState.requestValue, valueObj),
    }));

    if (name === 'FIR_UNIT_EXCHANGE' || name === 'SEC_UNIT_EXCHANGE') {
      const kgConvertValue = Math.floor(requestValue.FIR_UNIT_EXCHANGE * requestValue.SEC_UNIT_EXCHANGE * 100) / 100;
      this.setState(prevState => ({
        requestValue: Object.assign(prevState.requestValue, { kgConvertValue }),
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
      return submitHandlerBySaga(id, 'PUT', `/api/eshs/v1/common/eshschemicalmaterialMaster`, { requestValue }, this.getMaterialList);
    }
    this.setState({
      isModified: false,
    });
    return submitHandlerBySaga(id, 'POST', `/api/eshs/v1/common/eshschemicalmaterialMaster`, requestValue, this.getMaterialList);
  };

  handleDeleteClick = () => {
    const { requestValue } = this.state;
    if (!requestValue.MASTER_ID) {
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
    return submitHandlerBySaga(id, 'DELETE', `/api/eshs/v1/common/eshschemicalmaterialMaster`, requestValue, this.getMaterialList);
  };

  getMaterialList = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiArr = [
      {
        key: 'materialList',
        type: 'GET',
        url: '/api/eshs/v1/common/eshschemicalmaterialMaster',
      },
    ];
    getCallDataHandler(id, apiArr, this.handleResetClick);
  };

  handleResetClick = () => {
    this.setState({
      requestValue: {
        SAP_NO: '',
        CAS_NO: '',
        NAME_KOR: '',
        NAME_ENG: '',
        NAME_SAP: '',
        NAME_ETC: '',
        IS_IMPORT: 'N',
        VENDOR_CD: '',
        CONTENT_EXP: '',
        CONTENT_DOSE: 0,
        UNIT: '',
        FIR_UNIT_EXCHANGE: 0,
        SEC_UNIT_EXCHANGE: 0,
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
    {
      title: '화학물질명_SAP',
      dataIndex: 'NAME_SAP',
      key: 'NAME_SAP',
      align: 'center',
    },
    {
      title: '관용명 및 이명',
      dataIndex: 'NAME_ETC',
      key: 'NAME_ETC',
      align: 'center',
    },
  ];

  render() {
    const {
      handleSearchClick,
      handleInputChange,
      handleInputNumberChange,
      handleInputClick,
      handleModalClose,
      setRequestValue,
      handleResetClick,
      handleDeleteConfirm,
      handleDeleteClick,
    } = this;
    const { columns } = this;
    const { requestValue, visible, deleteConfirmMessage } = this.state;
    const { sagaKey, getCallDataHandler, result, changeFormData } = this.props;
    return (
      <>
        <ContentsWrapper>
          <StyledSearchWrap>
            <span className="input-label">화학물 추가</span>
            <Input.Search className="search-item input-width160" placeHolder="검색" onClick={handleSearchClick} value="" />
          </StyledSearchWrap>
          <div className="selSaveWrapper">
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
          </div>
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
                    <th colSpan={1}>SAP NO.</th>
                    <td colSpan={3}>
                      <AntdInput className="ant-input-sm" name="SAP_NO" value={requestValue.SAP_NO} onChange={handleInputChange} />
                    </td>
                    <th colSpan={1}>CAS NO.</th>
                    <td colSpan={3}>
                      <AntdInput className="ant-input-sm" name="CAS_NO" value={requestValue.CAS_NO} onChange={handleInputChange} />
                    </td>
                  </tr>
                  <tr>
                    <th>화학물질명_국문</th>
                    <td>
                      <AntdInput className="ant-input-sm" name="NAME_KOR" value={requestValue.NAME_KOR} onChange={handleInputChange} />
                    </td>
                    <th>화학물질명_영문</th>
                    <td>
                      <AntdInput className="ant-input-sm" name="NAME_ENG" value={requestValue.NAME_ENG} onChange={handleInputChange} />
                    </td>
                    <th>화학물질명_SAP</th>
                    <td>
                      <AntdInput className="ant-input-sm" name="NAME_SAP" value={requestValue.NAME_SAP} onChange={handleInputChange} />
                    </td>
                    <th>관용명 및 이명</th>
                    <td>
                      <AntdInput className="ant-input-sm" name="NAME_ETC" value={requestValue.NAME_ETC} onChange={handleInputChange} />
                    </td>
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
                    <th>수입구분</th>
                    <td>
                      <AntdSelect className="select-sm" defaultValue="N" onChange={handleInputChange} value={requestValue.IS_IMPORT}>
                        <Select.Option value="N">내수</Select.Option>
                        <Select.Option value="Y">수입</Select.Option>
                      </AntdSelect>
                    </td>
                    <th>함량(%) 표현값</th>
                    <td>
                      <AntdInput name="CONTENT_EXP" value={requestValue.CONTENT_EXP} onChange={handleInputChange} className="col-input-number ant-input-sm" />
                    </td>
                    <th>함량(%) 정량</th>
                    <td>
                      <InputNumber
                        value={requestValue.CONTENT_DOSE}
                        onChange={value => handleInputNumberChange(value, 'CONTENT_DOSE')}
                        className="col-input-number"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="div-comment">kg환산계수: 단위환산1 * 단위환산2</div>
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
          apiUrl="/api/eshs/v1/common/eshschemicalmaterialMaster"
          tableColumns={columns}
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
};

List.defaultProps = {
  sagaKey: '',
  getCallDataHandler: () => {},
  result: {},
  changeFormData: () => {},
  submitHandlerBySaga: () => {},
};

export default List;
