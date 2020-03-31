import React from 'react';
import PropTypes from 'prop-types';

import Sketch from 'components/BizBuilder/Sketch';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledSearchWrap from 'components/CommonStyled/StyledSearchWrap';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';

import { Table, Input, Row, Col, InputNumber, Select, Checkbox, Popconfirm } from 'antd';
import Modal from 'apps/eshs/user/environmentMasterRegistration/InputModal';
import moment from 'moment';
import request from 'utils/request';

const { Option } = Select;
class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      requestValue: {
        UNIT: '',
        FIR_UNIT_EXCHANGE: 0,
        SEC_UNIT_EXCHANGE: 0,
        SHIPMENT: 0,
        YEAR: moment()
          .year()
          .toString(),
        USAGE: 0,
      },
      dataSource: [],
      checkedIndex: -1,
      selectedIndex: -1,
      isModified: false,
      originYear: -1,
    };
  }

  columns = [
    {
      title: '',
      align: 'center',
      render: (text, record, index) =>
        index !== 0 ? (
          <Checkbox onChange={e => this.handleCheckboxChange(e, index, record)} checked={this.state.checkedIndex !== '' && this.state.checkedIndex === index} />
        ) : (
          ''
        ),
    },
    {
      title: '연도',
      dataIndex: 'YEAR',
      key: 'YEAR',
      align: 'center',
      render: (text, record, index) => {
        if (index === 0) {
          return (
            <Select
              defaultValue={moment()
                .year()
                .toString()}
              onChange={this.handleYearChange}
              style={{ width: '50%' }}
              disabled={this.state.isModified && !index}
            >
              {this.makeYearRange().map(item => (
                <Option value={item.toString()}>{item.toString()}</Option>
              ))}
            </Select>
          );
        }
        if (index === this.state.selectedIndex) {
          return (
            <Select defaultValue={record.YEAR} onChange={this.handleYearChange} style={{ width: '50%' }} disabled={this.state.isModified && !index}>
              {this.makeYearRange().map(item => (
                <Option value={item.toString()}>{item.toString()}</Option>
              ))}
            </Select>
          );
        }
        return <div>{text}</div>;
      },
    },
    {
      title: '출고량',
      dataIndex: 'SHIPMENT',
      key: 'SHIPMENT',
      align: 'center',
      render: (text, record, index) => {
        const { requestValue, isModified, selectedIndex } = this.state;
        if (index === 0) {
          return (
            <InputNumber
              placeholder="출고량을 입력하세요."
              style={{ width: '70%' }}
              onChange={this.handleShipmentChange}
              value={isModified ? '' : requestValue.SHIPMENT}
              disabled={isModified && !index}
            />
          );
        }
        if (index === selectedIndex) {
          return (
            <InputNumber
              placeholder="출고량을 입력하세요."
              defaultValue={record.SHIPMENT}
              style={{ width: '70%' }}
              onChange={this.handleShipmentChange}
              // value={requestValue.SHIPMENT}
              disabled={isModified && !index}
            />
          );
        }
        return <div>{text}</div>;
      },
    },
    {
      title: '제품 사용량',
      dataIndex: 'USAGE',
      key: 'USAGE',
      align: 'center',
      render: (text, record, index) => {
        const { requestValue, selectedIndex, isModified } = this.state;
        if (index === 0) {
          return (
            <div>{Math.floor(isModified ? 0 : requestValue.FIR_UNIT_EXCHANGE * requestValue.SEC_UNIT_EXCHANGE * requestValue.SHIPMENT * 100) / 100 || 0}</div>
          );
        }
        if (index === selectedIndex) {
          return <div>{Math.floor(requestValue.FIR_UNIT_EXCHANGE * requestValue.SEC_UNIT_EXCHANGE * requestValue.SHIPMENT * 100) / 100 || 0}</div>;
        }
        return <div>{text}</div>;
      },
    },
    {
      title: '',
      align: 'center',
      width: '20%',
      render: (text, record, index) => {
        const { selectedIndex } = this.state;
        if (index === 0) {
          return (
            <StyledButton className="btn-primary btn-first" onClick={this.handleInputClick}>
              저장
            </StyledButton>
          );
        }
        if (index === selectedIndex) {
          return (
            <>
              <StyledButton className="btn-primary btn-first" onClick={() => this.updateSapUsage(record, index)}>
                저장
              </StyledButton>
              <StyledButton className="btn-primary btn-first" onClick={this.handleCancelClick}>
                취소
              </StyledButton>
            </>
          );
        }
        return (
          <StyledButton className="btn-primary btn-first" onClick={() => this.handleModifyClick(record, index)}>
            수정
          </StyledButton>
        );
      },
    },
  ];

  handleInputClick = () => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    const { requestValue } = this.state;
    if (this.validationCheck()) {
      submitHandlerBySaga(id, 'POST', `/api/eshs/v1/common/eshschemicalmaterialsapusage`, requestValue, () => this.getSapUsage(requestValue));
      this.setState(prevState => ({
        requestValue: Object.assign(prevState.requestValue, { SHIPMENT: 0, USAGE: 0, YEAR: moment().year() }),
      }));
    }
  };

  handleModifyClick = (record, index) => {
    this.setState(prevState => ({
      isModified: true,
      selectedIndex: index,
      requestValue: Object.assign(prevState.requestValue, record),
      originYear: record.YEAR,
    }));
  };

  updateSapUsage = () => {
    const { requestValue, originYear } = this.state;
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    const valueObj = {
      YEAR: requestValue.YEAR,
      SHIPMENT: requestValue.SHIPMENT,
      USAGE: requestValue.USAGE,
      SAP_NO: requestValue.SAP_NO,
      originYear,
    };

    if (this.validationCheck()) {
      submitHandlerBySaga(id, 'PUT', `/api/eshs/v1/common/eshschemicalmaterialsapusage`, valueObj, () => this.getSapUsage(requestValue));
      this.setState(prevState => ({
        isModified: false,
        selectedIndex: -1,
        requestValue: Object.assign(prevState.requestValue, { YEAR: moment().year(), SHIPMENT: 0 }),
      }));
    }
  };

  validationCheck = () => {
    // 저장할 때 체크해서 popconfirm 나오도록
    const { requestValue, dataSource } = this.state;
    return dataSource.findIndex(item => item.YEAR === requestValue.YEAR) === -1;
  };

  handleCancelClick = () => {
    this.setState(prevState => ({
      isModified: false,
      selectedIndex: -1,
      requestValue: Object.assign(prevState.requestValue, { SHIPMENT: 0 }),
    }));
  };

  makeYearRange = () => {
    const yearRange = [];
    const maxYear = moment()
      .add(5, 'year')
      .year();
    let minYear = moment()
      .subtract(3, 'year')
      .year();
    while (minYear !== maxYear) {
      yearRange.push(minYear);
      minYear += 1;
    }
    return yearRange;
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
    this.getSapUsage(record);
  };

  getSapUsage = ({ SAP_NO }) => {
    const getSapUsage = request({
      method: 'GET',
      url: `/api/eshs/v1/common/eshschemicalmaterialsapusage?SAP_NO=${SAP_NO}`,
    });
    this.setDataSource(getSapUsage);
  };

  setDataSource = data => {
    data.then(res => this.setState({ dataSource: [{}, ...(res.response && res.response.list)] }));
  };

  handleShipmentChange = value => {
    const valueObj = {
      SHIPMENT: value,
      USAGE: Math.floor(this.state.requestValue.FIR_UNIT_EXCHANGE * this.state.requestValue.SEC_UNIT_EXCHANGE * value * 100) / 100,
    };

    this.setState(prevState => ({
      requestValue: Object.assign(prevState.requestValue, valueObj),
    }));
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
      const CONVERT_COEFFICIENT = Math.floor(requestValue.FIR_UNIT_EXCHANGE * requestValue.SEC_UNIT_EXCHANGE * 100) / 100;
      const USAGE =
        Math.floor(this.state.requestValue.FIR_UNIT_EXCHANGE * this.state.requestValue.SEC_UNIT_EXCHANGE * this.state.requestValue.SHIPMENT * 100) / 100;
      this.setState(prevState => ({
        requestValue: Object.assign(prevState.requestValue, { CONVERT_COEFFICIENT, USAGE }),
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
      isModified: false,
      selectedIndex: -1,
    });
  };

  handleYearChange = YEAR => {
    this.setState(prevState => ({
      requestValue: Object.assign(prevState.requestValue, { YEAR }),
    }));
  };

  handleMasterModifyClick = () => {
    const { requestValue } = this.state;
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    const params = { requestValue, originSapNo: requestValue.SAP_NO, originCasNo: requestValue.CAS_NO };
    return submitHandlerBySaga(id, 'PUT', `/api/eshs/v1/common/eshschemicalmaterialMaster`, params);
  };

  handleSapDeleteClick = () => {
    const { requestValue, selectedRecord } = this.state;
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    const params = { SAP_NO: requestValue.SAP_NO, CAS_NO: requestValue.CAS_NO, YEAR: selectedRecord.YEAR };
    submitHandlerBySaga(id, 'DELETE', `/api/eshs/v1/common/eshschemicalmaterialsapusage`, params, () => this.getSapUsage(requestValue));
    this.setState({
      checkedIndex: -1,
      selectedRecord: {},
    });
  };

  handleCheckboxChange = (e, index, record) => {
    if (e.target.checked) {
      this.setState({
        checkedIndex: index,
        selectedRecord: record,
      });
    } else {
      this.setState({
        checkedIndex: -1,
        selectedRecord: '',
      });
    }
  };

  render() {
    const {
      columns,
      handleInputChange,
      handleInputNumberChange,
      handleModalClose,
      setRequestValue,
      handleSearchClick,
      handleResetClick,
      handleMasterModifyClick,
      handleSapDeleteClick,
    } = this;
    const { requestValue, visible, dataSource, checkedIndex } = this.state;
    const { sagaKey, getCallDataHandler, result } = this.props;
    return (
      <StyledViewDesigner>
        <Sketch>
          <StyledSearchWrap>
            <span className="input-label">화학물 추가</span>
            <Input.Search className="search-item input-width160" placeHolder="검색" onClick={handleSearchClick} value="" />
          </StyledSearchWrap>
          <div className="alignRight">
            <StyledButton className="btn-primary btn-first" onClick={handleMasterModifyClick}>
              수정
            </StyledButton>
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
          <Popconfirm
            title={checkedIndex === -1 ? '삭제할 항목을 선택하세요.' : '삭제하시겠습니까?'}
            onConfirm={checkedIndex === -1 ? null : handleSapDeleteClick}
          >
            <StyledButton className="btn-primary">선택 삭제</StyledButton>
          </Popconfirm>
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
  submitHandlerBySaga: PropTypes.func,
};

List.defaultProps = {
  sagaKey: '',
  getCallDataHandler: () => {},
  result: {},
  submitHandlerBySaga: () => {},
};

export default List;
