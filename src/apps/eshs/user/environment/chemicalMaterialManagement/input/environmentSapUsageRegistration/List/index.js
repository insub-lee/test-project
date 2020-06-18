import React from 'react';
import PropTypes from 'prop-types';
import { Input, InputNumber, message } from 'antd';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';

import Modal from 'apps/eshs/user/environment/chemicalMaterialManagement/input/environmentMasterRegistration/InputModal';
import SearchComp from 'apps/eshs/user/environment/chemicalMaterialManagement/input/environmentMasterRegistration/InputModal/SearchComp';
import { callBackAfterPost, callBackAfterPut, callBackAfterDelete } from 'apps/eshs/user/environment/chemicalMaterialManagement/input/submitCallbackFunc';

const AntdSearch = StyledSearchInput(Input.Search);
class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      requestValue: {
        VESSEL_COEFFICIENT: 0,
        DENSITY_COEFFICIENT: 0,
        CONVERT_COEFFICIENT: 0,
      },
    };
  }

  getMaterialList = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiArr = [
      {
        key: 'materialList',
        type: 'GET',
        url: `/api/eshs/v1/common/eshschemicalmaterialsap`,
      },
    ];
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

  setRequestValue = record => {
    this.setState(prevState => ({
      requestValue: Object.assign(prevState.requestValue, record),
      visible: false,
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
    const valueObj = { [name]: value, USAGE: Math.floor(value * requestValue.SHIPMENT * 100) / 100 || 0 };
    this.setState(prevState => ({
      requestValue: Object.assign(prevState.requestValue, valueObj),
    }));
  };

  handleResetClick = () => {
    this.setState({
      requestValue: {
        SAP_NO: '',
        NAME_SAP: '',
        UNIT: '',
      },
    });
  };

  handleMasterModifyClick = () => {
    const { requestValue } = this.state;
    const { sagaKey: id, submitHandlerBySaga } = this.props;

    const submitAfterCallback = () => {
      this.getMaterialList();
      this.handleResetClick();
    };

    return submitHandlerBySaga(id, 'PUT', `/api/eshs/v1/common/eshschemicalmaterialsap`, requestValue, (key, response) =>
      callBackAfterPut(key, response, submitAfterCallback),
    );
  };

  isSelectSapMaterial = () => {
    const { requestValue } = this.state;
    return !!requestValue.SAP_ID;
  };

  ModalColumns = [
    {
      title: 'SAP_NO',
      dataIndex: 'SAP_NO',
      key: 'SAP_NO',
      align: 'center',
      width: '20%',
    },
    {
      title: 'NAME_SAP',
      dataIndex: 'NAME_SAP',
      key: 'NAME_SAP',
      align: 'center',
      width: '40%',
    },
    {
      title: '단위',
      dataIndex: 'UNIT',
      key: 'UNIT',
      align: 'center',
      width: '20%',
    },
    {
      title: '환산계수',
      dataIndex: 'CONVERT_COEFFICIENT',
      key: 'CONVERT_COEFFICIENT',
      align: 'center',
      width: '20%',
    },
  ];

  render() {
    const {
      ModalColumns,
      handleInputNumberChange,
      handleModalClose,
      setRequestValue,
      handleSearchClick,
      handleResetClick,
      handleMasterModifyClick,
      isSelectSapMaterial,
      getMaterialList,
    } = this;
    const { requestValue, visible } = this.state;
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
              <div className="btn-area">
                <StyledButton className="btn-primary btn-first btn-sm" onClick={handleMasterModifyClick}>
                  수정
                </StyledButton>
                <StyledButton className="btn-light btn-sm" onClick={handleResetClick}>
                  초기화
                </StyledButton>
              </div>
            </div>
          </StyledCustomSearchWrapper>
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
                  <th>SAP NO.</th>
                  <td>
                    <span style={{ width: '100%' }}>{requestValue.SAP_NO}</span>
                  </td>
                  <th>화학물질명_SAP</th>
                  <td>
                    <span style={{ width: '100%' }}>{requestValue.NAME_SAP}</span>
                  </td>
                  <th>단위</th>
                  <td>
                    <span style={{ width: '100%' }}>{requestValue.UNIT}</span>
                  </td>
                </tr>
                <tr>
                  <th>단위환산(용기)</th>
                  <td>
                    <InputNumber
                      value={requestValue.VESSEL_COEFFICIENT}
                      onChange={value => handleInputNumberChange(value, 'VESSEL_COEFFICIENT')}
                      className="col-input-number ant-input-number-sm"
                      style={{ width: '100%' }}
                    />
                  </td>
                  <th>단위환산(밀도)</th>
                  <td>
                    <InputNumber
                      value={requestValue.DENSITY_COEFFICIENT}
                      onChange={value => handleInputNumberChange(value, 'DENSITY_COEFFICIENT')}
                      className="col-input-number ant-input-number-sm"
                      style={{ width: '100%' }}
                    />
                  </td>
                  <th>kg환산계수</th>
                  <td>
                    <InputNumber
                      value={requestValue.CONVERT_COEFFICIENT}
                      onChange={value => handleInputNumberChange(value, 'CONVERT_COEFFICIENT')}
                      className="col-input-number ant-input-number-sm"
                      style={{ width: '100%' }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </StyledHtmlTable>
          <div className="div-comment div-comment-antd">kg환산계수: 단위환산(용기) * 단위환산(밀도)</div>
        </StyledContentsWrapper>
        <Modal
          getMaterialList={getMaterialList}
          SearchComp={SearchComp}
          sagaKey={sagaKey}
          visible={visible}
          modalClose={handleModalClose}
          getCallDataHandler={getCallDataHandler}
          result={result}
          setRequestValue={setRequestValue}
          tableColumns={ModalColumns}
          apiUrl="/api/eshs/v1/common/eshschemicalmaterialsap"
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
  submitHandlerBySaga: PropTypes.func,
  changeFormData: PropTypes.func,
  formData: PropTypes.object,
};

List.defaultProps = {
  sagaKey: '',
  getCallDataHandler: () => {},
  result: {},
  submitHandlerBySaga: () => {},
  changeFormData: () => {},
  formData: {},
};

export default List;
