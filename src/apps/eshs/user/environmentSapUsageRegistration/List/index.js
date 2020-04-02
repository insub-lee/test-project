import React from 'react';
import PropTypes from 'prop-types';

import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledSearchWrap from 'components/CommonStyled/StyledSearchWrap';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledLineTable from 'commonStyled/EshsStyled/Table/StyledLineTable';
import StyledSelect from 'commonStyled/Form/StyledSelect';
import StyledInput from 'commonStyled/Form/StyledInput';
import StyledHtmlTable from 'commonStyled/EshsStyled/Table/StyledHtmlTable';

import { Table, Input, InputNumber, Select, Checkbox, Popconfirm } from 'antd';
import Modal from 'apps/eshs/user/environmentMasterRegistration/InputModal';
import moment from 'moment';
import request from 'utils/request';

const { Option } = Select;
const AntdTable = StyledLineTable(Table);
const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);
class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      requestValue: {
        UNIT: '',
        CONVERT_COEFFICIENT: '',
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
            <AntdSelect
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
            </AntdSelect>
          );
        }
        if (index === this.state.selectedIndex) {
          return (
            <AntdSelect defaultValue={record.YEAR} onChange={this.handleYearChange} style={{ width: '50%' }} disabled={this.state.isModified && !index}>
              {this.makeYearRange().map(item => (
                <Option value={item.toString()}>{item.toString()}</Option>
              ))}
            </AntdSelect>
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
            <Popconfirm disabled={this.isValid()} title="중복된 연도가 있습니다.">
              <StyledButton className="btn-primary btn-first" onClick={this.isValid() ? this.handleInputClick : null}>
                저장
              </StyledButton>
            </Popconfirm>
          );
        }
        if (index === selectedIndex) {
          return (
            <>
              <Popconfirm disabled={this.isValid()} title="중복된 연도가 있습니다.">
                <StyledButton
                  className="btn-primary btn-first"
                  onClick={this.isValid() || this.isModifyValid() ? () => this.updateSapUsage(record, index) : null}
                >
                  저장
                </StyledButton>
              </Popconfirm>
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
    submitHandlerBySaga(id, 'POST', `/api/eshs/v1/common/eshschemicalmaterialsapusage`, requestValue, () => this.getSapUsage(requestValue));
    this.setState(prevState => ({
      requestValue: Object.assign(prevState.requestValue, { SHIPMENT: 0, USAGE: 0, YEAR: moment().year() }),
    }));
  };

  handleModifyClick = (record, index) => {
    this.setState(prevState => ({
      isModified: true,
      selectedIndex: index,
      requestValue: Object.assign(prevState.requestValue, record),
    }));
  };

  updateSapUsage = () => {
    const { requestValue } = this.state;
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    const valueObj = {
      YEAR: requestValue.YEAR,
      SHIPMENT: requestValue.SHIPMENT,
      USAGE: requestValue.USAGE,
      SAP_ID: requestValue.SAP_ID,
    };

    submitHandlerBySaga(id, 'PUT', `/api/eshs/v1/common/eshschemicalmaterialsapusage`, valueObj, () => this.getSapUsage(requestValue));
    this.setState(prevState => ({
      isModified: false,
      selectedIndex: -1,
      requestValue: Object.assign(prevState.requestValue, { YEAR: moment().year(), SHIPMENT: 0 }),
    }));
  };

  isValid = () => {
    //   const { requestValue, dataSource } = this.state;
    //   return dataSource.findIndex(item => item.YEAR === requestValue.YEAR) === -1;
    // };
    // isModifyValid = () => {
    //   const { requestValue, dataSource, selectedIndex } = this.state;
    //   return dataSource[selectedIndex].YEAR === requestValue.YEAR;
  };

  handleSapDeleteClick = () => {
    const { requestValue, selectedRecord } = this.state;
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    const params = { SAP_ID: selectedRecord.SAP_ID };
    submitHandlerBySaga(id, 'DELETE', `/api/eshs/v1/common/eshschemicalmaterialsapusage`, params, () => this.getSapUsage(requestValue));
    this.setState({
      checkedIndex: -1,
      selectedRecord: {},
      selectedIndex: -1,
      isModified: false,
    });
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
      isModified: false,
      selectedIndex: -1,
      checkedIndex: -1,
    }));
    // this.getSapUsage(record);
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
    return submitHandlerBySaga(id, 'PUT', `/api/eshs/v1/common/eshschemicalmaterialsap`, requestValue);
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
    },
    {
      title: 'NAME_SAP',
      dataIndex: 'NAME_SAP',
      key: 'NAME_SAP',
      align: 'center',
    },
  ];

  render() {
    const {
      columns,
      ModalColumns,
      handleInputChange,
      handleInputNumberChange,
      handleModalClose,
      setRequestValue,
      handleSearchClick,
      handleResetClick,
      handleMasterModifyClick,
      handleSapDeleteClick,
      isSelectSapMaterial,
    } = this;
    const { requestValue, visible, dataSource, checkedIndex } = this.state;
    const { sagaKey, getCallDataHandler, result } = this.props;
    return (
      <>
        <ContentsWrapper>
          <StyledSearchWrap>
            <span className="input-label">화학물 추가</span>
            <AntdInput.Search className="search-item input-width160" placeHolder="검색" onClick={handleSearchClick} value="" />
          </StyledSearchWrap>
          <div className="selSaveWrapper">
            <StyledButton className="btn-primary btn-first" onClick={handleMasterModifyClick}>
              수정
            </StyledButton>
            <StyledButton className="btn-primary" onClick={handleResetClick}>
              초기화
            </StyledButton>
          </div>
          <div className="tableWrapper">
            <StyledHtmlTable>
              <table>
                <colgroup>
                  <col width="10%" />
                  <col width="15%" />
                  <col width="10%" />
                  <col width="15%" />
                  <col width="10%" />
                  <col width="15%" />
                  <col width="10%" />
                  <col width="15%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>SAP NO.</th>
                    <td>{requestValue.SAP_NO}</td>
                    <th>화학물질명_SAP</th>
                    <td>{requestValue.NAME_SAP}</td>
                    <th>단위</th>
                    <td>
                      <AntdInput className="input-sm" name="UNIT" value={requestValue.UNIT} onChange={handleInputChange} disabled={!isSelectSapMaterial()} />
                    </td>
                    <th>kg환산계수</th>
                    <td>
                      <InputNumber
                        value={requestValue.CONVERT_COEFFICIENT}
                        onChange={value => handleInputNumberChange(value, 'CONVERT_COEFFICIENT')}
                        className="col-input-number"
                        disabled={!isSelectSapMaterial()}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </StyledHtmlTable>
            <div className="div-comment">kg환산계수: 단위환산1 * 단위환산2</div>
          </div>
          <div className="selSaveWrapper">
            <Popconfirm
              title={checkedIndex === -1 ? '삭제할 항목을 선택하세요.' : '삭제하시겠습니까?'}
              onConfirm={checkedIndex === -1 ? null : handleSapDeleteClick}
            >
              <StyledButton className="btn-primary">선택 삭제</StyledButton>
            </Popconfirm>
          </div>
          <AntdTable columns={columns} dataSource={dataSource} pagination={false} />
          <div className="div-comment div-comment-antd">제품사용량: 당해출고량 * kg환산계수</div>
        </ContentsWrapper>
        <Modal
          sagaKey={sagaKey}
          visible={visible}
          modalClose={handleModalClose}
          getCallDataHandler={getCallDataHandler}
          result={result}
          setRequestValue={setRequestValue}
          tableColumns={ModalColumns}
          apiUrl="/api/eshs/v1/common/eshschemicalmaterialsap"
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
};

List.defaultProps = {
  sagaKey: '',
  getCallDataHandler: () => {},
  result: {},
  submitHandlerBySaga: () => {},
};

export default List;
