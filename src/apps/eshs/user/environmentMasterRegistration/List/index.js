import React from 'react';
import PropTypes from 'prop-types';
import { Input, InputNumber, Select, Row, Col, DatePicker } from 'antd';

import Sketch from 'components/BizBuilder/Sketch';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import StyledSearchWrap from 'components/CommonStyled/StyledSearchWrap';
import StyledButton from 'components/BizBuilder/styled/StyledButton';

import EshsCmpnyComp from 'components/BizBuilder/Field/EshsCmpnyComp';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      requestValue: {
        sapNo: '',
        casNo: '',
        name_kor: '',
        name_eng: '',
        name_sap: '',
        name_etc: '',
        isImport: 'N',
        vendorCd: '',
        contentExpression: '',
        contentDose: 0,
        unit: '',
        firstUnitExchange: '',
        secondUnitExchange: '',
      },
    };
  }

  handleSearchClick = () => {
    this.setState({
      visible: true,
    });
  };

  handleInputChange = e => {
    console.debug(toString.call(e));
    let valueObj = {};
    if (!!e && typeof e === 'object') {
      valueObj = { [e.target.name]: e.target.value };
    }
    if (typeof e === 'string') {
      valueObj = { isImport: e };
    }
    return this.setState(prevState => ({
      requestValue: Object.assign(prevState.requestValue, valueObj),
    }));
  };

  handleInputNumberChange = value => {
    if (typeof value !== 'number') {
      const valueObj = { contentDose: '' };
      this.setState(prevState => ({
        requestValue: Object.assign(prevState.requestValue, valueObj),
      }));
    }
    const valueObj = { contentDose: value };
    this.setState(prevState => ({
      requestValue: Object.assign(prevState.requestValue, valueObj),
    }));
  };

  render() {
    const { handleSearchClick, handleInputChange, handleInputNumberChange } = this;
    const { requestValue } = this.state;
    return (
      <StyledViewDesigner>
        <Sketch>
          <StyledSearchWrap>
            <span className="input-label">화학물 추가</span>
            <Input.Search className="search-item input-width160" placeHolder="검색" onClick={handleSearchClick} />
          </StyledSearchWrap>
          <div className="alignRight">
            <StyledButton className="btn-primary">저장/수정</StyledButton>
          </div>
          <div className="data-grid">
            <Row className="data-grid-row">
              <Col span={2} className="col-label">
                SAP NO.
              </Col>
              <Col span={4} className="col-input">
                <Input name="sapNo" value={requestValue.sapNo} onChange={handleInputChange} />
              </Col>
              <Col span={2} className="col-label">
                CAS NO.
              </Col>
              <Col span={4} className="col-input">
                <Input name="casNo" value={requestValue.casNo} onChange={handleInputChange} />
              </Col>
              <Col span={2} className="col-label">
                화학물질명_국문
              </Col>
              <Col span={4} className="col-input">
                <Input name="name_kor" value={requestValue.name_kor} onChange={handleInputChange} />
              </Col>
              <Col span={2} className="col-label">
                화학물질명_영문
              </Col>
              <Col span={4} className="col-input">
                <Input name="name_eng" value={requestValue.name_eng} onChange={handleInputChange} />
              </Col>
            </Row>
            <Row className="data-grid-row">
              <Col span={2} className="col-label">
                화학물질명_SAP
              </Col>
              <Col span={4} className="col-input">
                <Input name="name_sap" value={requestValue.name_sap} onChange={handleInputChange} />
              </Col>
              <Col span={2} className="col-label">
                관용명 및 이명
              </Col>
              <Col span={4} className="col-input">
                <Input name="name_etc" value={requestValue.name_etc} onChange={handleInputChange} />
              </Col>
              <Col span={2} className="col-label">
                수입구분
              </Col>
              <Col span={4} className="col-input">
                <Select className="col-select" defaultValue="Y" onChange={handleInputChange}>
                  <Select.Option value="N">내수</Select.Option>
                  <Select.Option value="Y">수입</Select.Option>
                </Select>
              </Col>
            </Row>
            <Row className="data-grid-row">
              <Col span={2} className="col-label">
                공급업체
              </Col>
              <Col span={4} className="col-input">
                <EshsCmpnyComp
                  className="col-select"
                  sagaKey={this.props.sagaKey}
                  getExtraApiData={this.props.getCallDataHandler}
                  extraApiData={this.props.result}
                  // colData={this.state.requestValue.maker_cd}
                  visible
                  CONFIG={{ property: { isRequired: false } }}
                  changeFormData={this.props.changeFormData}
                  COMP_FIELD="VENDOR"
                  eshsCmpnyCompResult={(companyInfo, COMP_FIELD) => this.handleEshsCmpnyCompChange(companyInfo, COMP_FIELD)}
                />
              </Col>
              <Col span={2} className="col-label">
                함량(%) 표현값
              </Col>
              <Col span={4} className="col-input">
                <Input name="contentExpression" value={requestValue.contentExpression} onChange={handleInputChange} className="col-input-number" />
              </Col>
              <Col span={2} className="col-label">
                함량(%) 정량
              </Col>
              <Col span={4} className="col-input">
                <InputNumber value={requestValue.contentDose} onChange={handleInputNumberChange} className="col-input-number" />
              </Col>
            </Row>
            <Row className="data-grid-row">
              <Col span={2} className="col-label">
                단위
              </Col>
              <Col span={4} className="col-input">
                <Input name="unit" value={requestValue.unit} onChange={handleInputChange} />
              </Col>
              <Col span={2} className="col-label">
                단위환산1
              </Col>
              <Col span={4} className="col-input">
                <Input name="firstUnitExchange" value={requestValue.firstUnitExchange} onChange={handleInputChange} />
              </Col>
              <Col span={2} className="col-label">
                단위환산2
              </Col>
              <Col span={4} className="col-input">
                <Input name="secondUnitExchange" value={requestValue.secondUnitExchange} onChange={handleInputChange} />
              </Col>
              <Col span={2} className="col-label">
                kg환산계수
              </Col>
              <Col span={4} className="col-input">
                <div />
              </Col>
            </Row>
          </div>
          <div className="alignRight">kg환산계수: 단위환산1 * 단위환산2</div>
          <DatePicker defaultValue="" />
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
};
List.defaultProps = {
  sagaKey: '',
  getCallDataHandler: () => {},
  result: {},
  changeFormData: () => {},
};

export default List;
