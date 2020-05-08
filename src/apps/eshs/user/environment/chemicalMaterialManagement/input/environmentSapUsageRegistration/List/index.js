import React from 'react';
import PropTypes from 'prop-types';

import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledSearchWrap from 'components/CommonStyled/StyledSearchWrap';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';
import StyledLineTable from 'commonStyled/EshsStyled/Table/StyledLineTable';
import StyledSelect from 'commonStyled/Form/StyledSelect';
import StyledInput from 'commonStyled/Form/StyledInput';
import StyledHtmlTable from 'commonStyled/EshsStyled/Table/StyledHtmlTable';
import StyledSearchInput from 'commonStyled/Form/StyledSearchInput';

import { Table, Input, InputNumber, Select, Checkbox, Popconfirm } from 'antd';
import moment from 'moment';
import request from 'utils/request';

import Modal from 'apps/eshs/user/environment/chemicalMaterialManagement/input/environmentMasterRegistration/InputModal';
import SearchComp from 'apps/eshs/user/environment/chemicalMaterialManagement/input/environmentMasterRegistration/InputModal/SearchComp';

const { Option } = Select;
const AntdTable = StyledLineTable(Table);
const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);
const AntdSearch = StyledSearchInput(Input.Search);
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
              className="select-sm"
              defaultValue={moment()
                .year()
                .toString()}
              onChange={this.handleYearChange}
              style={{ width: '50%' }}
              disabled={this.state.isModified && !index}
            >
              {this.createYearRange().map(item => (
                <Option value={item.toString()}>{item.toString()}</Option>
              ))}
            </AntdSelect>
          );
        }
        if (index === this.state.selectedIndex) {
          return (
            <AntdSelect defaultValue={record.YEAR} onChange={this.handleYearChange} style={{ width: '50%' }} disabled={this.state.isModified && !index}>
              {this.createYearRange().map(item => (
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
          return <div>{Math.floor(isModified ? 0 : requestValue.SHIPMENT * requestValue.CONVERT_COEFFICIENT * 100) / 100 || 0}</div>;
        }
        if (index === selectedIndex) {
          return <div>{Math.floor(!isModified ? 0 : requestValue.SHIPMENT * requestValue.CONVERT_COEFFICIENT * 100) / 100 || 0}</div>;
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
              <StyledButton className="btn-primary btn-first btn-sm" onClick={this.isValid() ? this.handleInputClick : null}>
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
                  className="btn-primary btn-first btn-sm"
                  onClick={this.isValid() || this.isModifyValid() ? () => this.updateSapUsage(record, index) : null}
                >
                  저장
                </StyledButton>
              </Popconfirm>
              <StyledButton className="btn-primary btn-first btn-sm" onClick={this.handleCancelClick}>
                취소
              </StyledButton>
            </>
          );
        }
        return (
          <StyledButton className="btn-primary btn-first btn-sm" onClick={() => this.handleModifyClick(record, index)}>
            수정
          </StyledButton>
        );
      },
    },
  ];

  handleInputClick = () => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    const { requestValue } = this.state;
    submitHandlerBySaga(id, 'PUT', `/api/eshs/v1/common/eshschemicalmaterialsap`, requestValue);
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

    submitHandlerBySaga(id, 'PUT', `/api/eshs/v1/common/eshschemicalmaterialsap`, requestValue);
    submitHandlerBySaga(id, 'PUT', `/api/eshs/v1/common/eshschemicalmaterialsapusage`, requestValue, () => this.getSapUsage(requestValue));
    this.setState(prevState => ({
      isModified: false,
      selectedIndex: -1,
      requestValue: Object.assign(prevState.requestValue, { YEAR: moment().year(), SHIPMENT: 0 }),
    }));
  };

  isValid = () => {
    const { requestValue, dataSource } = this.state;
    return dataSource.findIndex(item => item.YEAR === requestValue.YEAR.toString()) === -1;
  };

  isModifyValid = () => {
    const { requestValue, dataSource, selectedIndex } = this.state;
    return dataSource[selectedIndex].YEAR === requestValue.YEAR;
  };

  handleSapDeleteClick = () => {
    const { requestValue, selectedRecord } = this.state;
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    const params = { USAGE_ID: selectedRecord.USAGE_ID };
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

  createYearRange = () => {
    const yearRange = [];
    const maxYear = moment()
      .add(5, 'year')
      .year();
    let minYear = moment()
      .subtract(4, 'year')
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
    const { requestValue } = this.state;
    const valueObj = {
      SHIPMENT: value,
      USAGE: Math.floor(value * requestValue.CONVERT_COEFFICIENT * 100) / 100 || 0,
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
    const { sagaKey, getCallDataHandler, result, changeFormData, formData } = this.props;
    return (
      <>
        <ContentsWrapper>
          <StyledSearchWrap>
            <div className="search-inner">
              <span className="input-label">화학물 추가</span>
              <AntdSearch
                className="ant-search-inline input-search-mid mr5"
                placeHolder="검색"
                onClick={handleSearchClick}
                value=""
                style={{ width: '200px' }}
              />
              <StyledButtonWrapper className="btn-wrap-inline">
                <StyledButton className="btn-primary btn-first" onClick={handleMasterModifyClick}>
                  수정
                </StyledButton>
                <StyledButton className="btn-light" onClick={handleResetClick}>
                  초기화
                </StyledButton>
              </StyledButtonWrapper>
            </div>
          </StyledSearchWrap>
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
                      <AntdInput
                        className="ant-input-sm"
                        name="UNIT"
                        value={requestValue.UNIT}
                        onChange={handleInputChange}
                        style={{ width: '100%', visibility: !isSelectSapMaterial() ? 'hidden' : 'visible' }}
                      />
                    </td>
                    <th>kg환산계수</th>
                    <td>
                      <InputNumber
                        value={requestValue.CONVERT_COEFFICIENT}
                        onChange={value => handleInputNumberChange(value, 'CONVERT_COEFFICIENT')}
                        className="col-input-number"
                        style={{ width: '100%', visibility: !isSelectSapMaterial() ? 'hidden' : 'visible' }}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </StyledHtmlTable>
          </div>
          {!isSelectSapMaterial() ? null : (
            <>
              <div className="selSaveWrapper">
                <Popconfirm
                  placement="leftTop"
                  title={checkedIndex === -1 ? '삭제할 항목을 선택하세요.' : '삭제하시겠습니까?'}
                  onConfirm={checkedIndex === -1 ? null : handleSapDeleteClick}
                >
                  <StyledButton className="btn-light">선택 삭제</StyledButton>
                </Popconfirm>
              </div>
              <AntdTable columns={columns} dataSource={dataSource} pagination={false} />
              <div className="div-comment div-comment-antd">제품사용량: 당해출고량 * kg환산계수</div>
            </>
          )}
        </ContentsWrapper>
        <Modal
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
