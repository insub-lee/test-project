import React from 'react';
import PropTypes from 'prop-types';
import { Input, InputNumber, Select, Row, Col, Popconfirm } from 'antd';

import Sketch from 'components/BizBuilder/Sketch';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import StyledSearchWrap from 'components/CommonStyled/StyledSearchWrap';
import StyledButton from 'components/BizBuilder/styled/StyledButton';

import EshsCmpnyComp from 'components/BizBuilder/Field/EshsCmpnyComp';
import Modal from '../InputModal';

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
        UNIT: '',
        FIR_UNIT_EXCHANGE: 0,
        SEC_UNIT_EXCHANGE: 0,
      },
      isModified: false,
      originSapNo: '',
      originCasNo: '',
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

    if (name === 'firstUnitExchange' || name === 'secondUnitExchange') {
      const kgConvertValue = Math.floor(requestValue.FIR_UNIT_EXCHANGE * requestValue.SEC_UNIT_EXCHANGE * 100) / 100;
      this.setState(prevState => ({
        requestValue: Object.assign(prevState.requestValue, { kgConvertValue }),
      }));
    }
  };

  handleInputClick = () => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    const { requestValue, isModified, originSapNo, originCasNo } = this.state;
    if (isModified) {
      this.setState({
        isModified: false,
      });
      return submitHandlerBySaga(id, 'PUT', `/api/eshs/v1/common/eshschemicalmaterialMaster`, { requestValue, originSapNo, originCasNo }, this.getMaterialList);
    }
    this.setState({
      isModified: false,
    });
    return submitHandlerBySaga(id, 'POST', `/api/eshs/v1/common/eshschemicalmaterialMaster`, requestValue, this.getMaterialList);
  };

  handleDeleteClick = () => {
    const { originSapNo, originCasNo } = this.state;
    if (!originSapNo && !originCasNo) {
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
    const { originSapNo, originCasNo } = this.state;
    const params = { SAP_NO: originSapNo, CAS_NO: originCasNo };
    return submitHandlerBySaga(id, 'DELETE', `/api/eshs/v1/common/eshschemicalmaterialMaster`, params, this.getMaterialList);
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
      originSapNo: '',
      originCasNo: '',
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
      originSapNo: record.SAP_NO,
      originCasNo: record.CAS_NO,
    });
  };

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
    const { requestValue, visible, deleteConfirmMessage } = this.state;
    const { sagaKey, getCallDataHandler, result, changeFormData } = this.props;
    return (
      <StyledViewDesigner>
        <Sketch>
          <StyledSearchWrap>
            <span className="input-label">화학물 추가</span>
            <Input.Search className="search-item input-width160" placeHolder="검색" onClick={handleSearchClick} />
          </StyledSearchWrap>
          <div className="alignRight">
            <StyledButton className="btn-primary" onClick={handleInputClick}>
              저장/수정
            </StyledButton>
            <Popconfirm title={deleteConfirmMessage} onConfirm={handleDeleteConfirm} okText="삭제" cancelText="취소">
              <StyledButton className="btn-primary" onClick={handleDeleteClick}>
                삭제
              </StyledButton>
            </Popconfirm>
            <StyledButton className="btn-primary" onClick={handleResetClick}>
              초기화
            </StyledButton>
          </div>
          <div className="data-grid">
            <Row className="data-grid-row">
              <Col span={2} className="col-label">
                SAP NO.
              </Col>
              <Col span={4} className="col-input">
                <Input name="SAP_NO" value={requestValue.SAP_NO} onChange={handleInputChange} />
              </Col>
              <Col span={2} className="col-label">
                CAS NO.
              </Col>
              <Col span={4} className="col-input">
                <Input name="CAS_NO" value={requestValue.CAS_NO} onChange={handleInputChange} />
              </Col>
              <Col span={2} className="col-label">
                화학물질명_국문
              </Col>
              <Col span={4} className="col-input">
                <Input name="NAME_KOR" value={requestValue.NAME_KOR} onChange={handleInputChange} />
              </Col>
              <Col span={2} className="col-label">
                화학물질명_영문
              </Col>
              <Col span={4} className="col-input">
                <Input name="NAME_ENG" value={requestValue.NAME_ENG} onChange={handleInputChange} />
              </Col>
            </Row>
            <Row className="data-grid-row">
              <Col span={2} className="col-label">
                화학물질명_SAP
              </Col>
              <Col span={4} className="col-input">
                <Input name="NAME_SAP" value={requestValue.NAME_SAP} onChange={handleInputChange} />
              </Col>
              <Col span={2} className="col-label">
                관용명 및 이명
              </Col>
              <Col span={4} className="col-input">
                <Input name="NAME_ETC" value={requestValue.NAME_ETC} onChange={handleInputChange} />
              </Col>
              <Col span={2} className="col-label">
                수입구분
              </Col>
              <Col span={4} className="col-input">
                <Select className="col-select" defaultValue="N" onChange={handleInputChange} value={requestValue.IS_IMPORT}>
                  <Select.Option value="N">내수</Select.Option>
                  <Select.Option value="Y">수입</Select.Option>
                </Select>
              </Col>
            </Row>
            <Row className="data-grid-row">
              <Col span={2} className="col-label">
                공급업체
              </Col>
              <Col span={10}>
                <div className="alignLeft company-comp">
                  <EshsCmpnyComp
                    searchWidth="50%"
                    sagaKey={sagaKey}
                    getExtraApiData={getCallDataHandler}
                    extraApiData={result}
                    colData={requestValue.VENDOR_CD}
                    visible
                    CONFIG={{ property: { isRequired: false } }}
                    changeFormData={changeFormData}
                    COMP_FIELD="VENDOR_CD"
                    eshsCmpnyCompResult={(companyInfo, COMP_FIELD) => this.handleEshsCmpnyCompChange(companyInfo, COMP_FIELD)}
                  />
                </div>
              </Col>
              <Col span={2} className="col-label">
                함량(%) 표현값
              </Col>
              <Col span={4} className="col-input">
                <Input name="CONTENT_EXP" value={requestValue.CONTENT_EXP} onChange={handleInputChange} className="col-input-number" />
              </Col>
              <Col span={2} className="col-label">
                함량(%) 정량
              </Col>
              <Col span={4} className="col-input">
                <InputNumber
                  value={requestValue.CONTENT_DOSE}
                  onChange={value => handleInputNumberChange(value, 'CONTENT_DOSE')}
                  className="col-input-number"
                />
              </Col>
            </Row>
            <Row className="data-grid-row">
              <Col span={2} className="col-label">
                단위
              </Col>
              <Col span={4} className="col-input">
                <Input name="UNIT" value={requestValue.UNIT} onChange={handleInputChange} />
              </Col>
              <Col span={2} className="col-label">
                단위환산1
              </Col>
              <Col span={4} className="col-input">
                <InputNumber
                  value={requestValue.FIR_UNIT_EXCHANGE}
                  onChange={value => handleInputNumberChange(value, 'FIR_UNIT_EXCHANGE')}
                  className="col-input-number"
                />
              </Col>
              <Col span={2} className="col-label">
                단위환산2
              </Col>
              <Col span={4} className="col-input">
                <InputNumber
                  value={requestValue.SEC_UNIT_EXCHANGE}
                  onChange={value => handleInputNumberChange(value, 'SEC_UNIT_EXCHANGE')}
                  className="col-input-number"
                />
              </Col>
              <Col span={2} className="col-label">
                kg환산계수
              </Col>
              <Col span={4} className="col-input">
                <div>{Math.floor(requestValue.FIR_UNIT_EXCHANGE * requestValue.SEC_UNIT_EXCHANGE * 100) / 100}</div>
              </Col>
            </Row>
          </div>
          <div className="alignRight div-comment">kg환산계수: 단위환산1 * 단위환산2</div>
          <Modal visible={visible} modalClose={handleModalClose} getCallDataHandler={getCallDataHandler} result={result} setRequestValue={setRequestValue} />
        </Sketch>
      </StyledViewDesigner>
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
