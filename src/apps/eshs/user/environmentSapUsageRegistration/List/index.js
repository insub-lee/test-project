import React from 'react';
import PropTypes from 'prop-types';

import Sketch from 'components/BizBuilder/Sketch';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledSearchWrap from 'components/CommonStyled/StyledSearchWrap';

import { Table, Input, Row, Col, InputNumber, Select } from 'antd';
import Modal from 'apps/eshs/user/environmentMasterRegistration/InputModal';
import moment from 'moment';

const { Option } = Select;
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
        UNIT: '',
        FIR_UNIT_EXCHANGE: 0,
        SEC_UNIT_EXCHANGE: 0,
      },
      dataSource: [],
    };
  }

  columns = [
    {
      title: '연도',
      dataIndex: 'YEAR',
      key: 'YEAR',
      align: 'center',
    },
    {
      title: '출고량',
      dataIndex: 'SHIPMENT',
      key: 'SHIPMENT',
      align: 'center',
    },
    {
      title: '제품 사용량',
      dataIndex: 'USAGE',
      key: 'USAGE',
      align: 'center',
    },
  ];

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
    this.setState({
      requestValue: record,
      visible: false,
    });
    this.getSapUsage(record);
  };

  getSapUsage = ({ SAP_NO }) => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiArr = [
      {
        key: 'sapUsage',
        url: `/api/eshs/v1/common/eshschemicalmaterialsapusage?SAP_NO=${SAP_NO}`,
        type: 'GET',
      },
    ];

    getCallDataHandler(id, apiArr, this.setDataSource());
  };

  setDataSource = () => {
    const { result } = this.props;
    this.setState({
      dataSource: [...this.inputRow(), ...((result.sapUsage && result.sapUsage.list) || [])],
    });
  };

  inputRow = () => [
    {
      YEAR: <Select defaultValue={moment().year()} onChange={this.handleSelectChange}></Select>,
      SHIPMENT: <Input placeholder="출고량을 입력하세요." />,
      USAGE: '',
    },
  ];

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

  handleResetClick = () => {
    this.setState({
      requestValue: {
        SAP_NO: '',
        CAS_NO: '',
        NAME_KOR: '',
        NAME_ENG: '',
        NAME_SAP: '',
        NAME_ETC: '',
        UNIT: '',
        FIR_UNIT_EXCHANGE: 0,
        SEC_UNIT_EXCHANGE: 0,
      },
      dataSource: [],
    });
  };

  render() {
    const { columns, handleInputChange, handleInputNumberChange, handleModalClose, setRequestValue, handleSearchClick, handleResetClick } = this;
    const { requestValue, visible, dataSource } = this.state;
    const { sagaKey, getCallDataHandler, result, changeFormData } = this.props;
    return (
      <StyledViewDesigner>
        <Sketch>
          <StyledSearchWrap>
            <span className="input-label">화학물 추가</span>
            <Input.Search className="search-item input-width160" placeHolder="검색" onClick={handleSearchClick} value="" />
          </StyledSearchWrap>
          <div className="alignRight">
            <StyledButton className="btn-primary">수정</StyledButton>
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
                <div>{requestValue.SAP_NO}</div>
              </Col>
              <Col span={2} className="col-label">
                CAS NO.
              </Col>
              <Col span={4} className="col-input">
                <div>{requestValue.CAS_NO}</div>
              </Col>
            </Row>
            <Row className="data-grid-row">
              <Col span={2} className="col-label">
                화학물질명_국문
              </Col>
              <Col span={4} className="col-input">
                <div>{requestValue.NAME_KOR}</div>
              </Col>
              <Col span={2} className="col-label">
                화학물질명_영문
              </Col>
              <Col span={4} className="col-input">
                <div>{requestValue.NAME_ENG}</div>
              </Col>
              <Col span={2} className="col-label">
                화학물질명_SAP
              </Col>
              <Col span={4} className="col-input">
                <div>{requestValue.NAME_SAP}</div>
              </Col>
              <Col span={2} className="col-label">
                관용명 및 이명.
              </Col>
              <Col span={4} className="col-input">
                <div>{requestValue.NAME_ETC}</div>
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
          <hr style={{ width: '100%' }} />
          <StyledButton className="btn-primary">항목 추가</StyledButton>
          <Table columns={columns} dataSource={dataSource} pagination={false} />
          <div className="alignRight div-comment">제품사용량: 당해출고량 * kg환산계수</div>
          <Modal
            sagaKey={sagaKey}
            visible={visible}
            modalClose={handleModalClose}
            getCallDataHandler={getCallDataHandler}
            result={result}
            setRequestValue={setRequestValue}
          />
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
