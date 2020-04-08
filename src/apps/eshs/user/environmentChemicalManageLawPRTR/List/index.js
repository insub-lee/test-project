import React from 'react';
import PropTypes from 'prop-types';

import { Input, InputNumber } from 'antd';
import StyledSearchWrap from 'components/CommonStyled/StyledSearchWrap';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledInput from 'commonStyled/Form/StyledInput';
import StyledHtmlTable from 'commonStyled/EshsStyled/Table/StyledHtmlTable';

import Modal from 'apps/eshs/user/environmentMasterRegistration/InputModal';
import SearchComp from '../SearchComp';

const AntdInput = StyledInput(Input);
class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      requestValue: {
        CAS_NO: '',
        NAME_KOR: '',
        NAME_ENG: '',
        GROUP: '',
        HANDLE_AMOUNT: 0,
        INVESTIGATION_TARGET_RANGE: 0,
        CATEGORY: '',
        SUB_CATEGORY: '',
      },
      isModified: false,
    };
  }

  handleInputClick = () => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    const { requestValue, isModified } = this.state;
    console.debug(submitHandlerBySaga);
    if (isModified) {
      return submitHandlerBySaga(id, 'PUT', `/api/eshs/v1/common/eshschemicalmaterialmanageactregistration`, requestValue, this.getMaterialList);
    }
    return submitHandlerBySaga(id, 'POST', `/api/eshs/v1/common/eshschemicalmaterialmanageactregistration`, requestValue, this.getMaterialList);
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
    // getCallDataHandler(id, apiArr, this.handleResetClick);
    getCallDataHandler(id, apiArr);
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
        GROUP: '',
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
      title: '호',
      dateIndex: 'CATEGORY',
      key: 'CATEGORY',
      align: 'center',
    },
    {
      title: '하위 호',
      dateIndex: 'SUB_CATEGORY',
      key: 'SUB_CATEGORY',
      align: 'center',
    },
  ];

  render() {
    const { columns } = this;
    const { handleInputClick, handleSearchClick, handleResetClick, handleModalClose, setRequestValue, handleInputChange, handleInputNumberChange } = this;
    const { visible, requestValue } = this.state;
    const { sagaKey, getCallDataHandler, result, changeFormData, formData } = this.props;

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
            <StyledButton className="btn-light" onClick={handleResetClick}>
              초기화
            </StyledButton>
          </div>
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
                      <AntdInput className="ant-input-sm" name="GROUP" value={requestValue.GROUP} onChange={handleInputChange} />
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
  sagaKey: '',
  getCallDataHandler: () => {},
  result: {},
  changeFormData: () => {},
  formData: {},
};

export default List;
