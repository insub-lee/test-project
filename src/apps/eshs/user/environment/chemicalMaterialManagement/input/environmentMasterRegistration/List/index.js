import React from 'react';
import PropTypes from 'prop-types';
import { Input, InputNumber, Select, Popconfirm, Table, message } from 'antd';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledInputNumber from 'components/BizBuilder/styled/Form/StyledInputNumber';

import { callBackAfterPost, callBackAfterPut, callBackAfterDelete } from 'apps/eshs/user/environment/chemicalMaterialManagement/input/submitCallbackFunc';
import Modal from '../InputModal';
import SearchComp from '../InputModal/SearchComp';

const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);
const AntdSearch = StyledSearchInput(Input.Search);
const AntdInputNumber = StyledInputNumber(InputNumber);
const AntdTable = StyledAntdTable(Table);
class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      requestValue: {
        SAP_ID: '',
        SAP_NO: '',
        NAME_SAP: '',
        UNIT: '',
        CONVERT_COEFFICIENT: '',
      },
      isModified: false,
      deleteConfirmMessage: '삭제하시겠습니까?',
      dataSource: [],
    };
  }

  componentDidMount() {
    this.getMaterialList();
  }

  getMaterialList = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiArr = [
      {
        key: 'materialList',
        type: 'GET',
        url: '/api/eshs/v1/common/eshschemicalmaterialsap',
      },
    ];
    getCallDataHandler(id, apiArr, this.handleResetClick);
  };

  handleSearchClick = () => {
    this.setState({
      visible: true,
    });
  };

  handleInputChange = (event, type, name) => {
    if (type.toUpperCase() === 'INPUT') {
      const valueObj = { [event.target.name.toUpperCase()]: event.target.value };
      this.setState(prevState => ({
        requestValue: Object.assign(prevState.requestValue, valueObj),
      }));
    }

    if (type.toUpperCase() === 'SELECT') {
      const valueObj = { [name.toUpperCase()]: event };
      this.setState(prevState => ({
        requestValue: Object.assign(prevState.requestValue, valueObj),
      }));
    }
  };

  handleInputClick = () => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    const { dataSource, requestValue } = this.state;
    const param = dataSource.map(data => Object.assign(data, { SAP_ID: requestValue.SAP_ID }));

    if (!requestValue.SAP_ID) {
      return message.error('화학물질을 선택해주세요.');
    }

    return submitHandlerBySaga(
      id,
      'POST',
      `/api/eshs/v1/common/eshschemicalmaterialMaster`,
      { dataSource: param, SAP_ID: requestValue.SAP_ID },
      (key, response) => callBackAfterPost(key, response, this.getMaterialList),
    );
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
    return submitHandlerBySaga(id, 'DELETE', `/api/eshs/v1/common/eshschemicalmaterialMaster`, requestValue, (key, response) =>
      callBackAfterDelete(key, response, this.getMaterialList),
    );
  };

  handleResetClick = () => {
    this.setState({
      requestValue: {
        SAP_ID: '',
        SAP_NO: '',
        NAME_SAP: '',
        UNIT: '',
        CONVERT_COEFFICIENT: '',
      },
      isModified: false,
    });
  };

  handleModalClose = () => {
    this.setState({
      visible: false,
    });
  };

  setRequestValue = record => {
    this.setState(
      prevState => ({
        requestValue: Object.assign(prevState.requestValue, record),
        visible: false,
        isModified: true,
      }),
      () => this.getSubMaterialList(record.SAP_ID),
    );
  };

  getSubMaterialList = sapId => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiArr = [
      {
        key: 'subMaterial',
        type: 'GET',
        url: `/api/eshs/v1/common/eshschemicalmaterialMaster?SAP_ID=${sapId}`,
      },
    ];
    this.setState({ dataSource: [] });

    getCallDataHandler(id, apiArr, this.setDataSource);
    // getCallDataHandler(id, apiArr);
  };

  setDataSource = () => {
    const { result } = this.props;

    this.setState(prevState => ({ dataSource: prevState.dataSource.concat((result.subMaterial && result.subMaterial.list) || []) }));
  };

  columns = [
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

  tableColumns = [
    {
      title: 'CAS_NO',
      render: (text, record, index) => (
        <AntdInput
          className="ant-input-sm"
          name="CAS_NO"
          value={this.state.dataSource[index].CAS_NO}
          onChange={e => this.handleRequestChange('CAS_NO', e.target.value, index)}
        />
      ),
      align: 'center',
      width: '12%',
    },
    {
      title: '화학물질명_국문',
      render: (text, record, index) => (
        <AntdInput
          className="ant-input-sm"
          name="NAME_KOR"
          value={this.state.dataSource[index].NAME_KOR}
          onChange={e => this.handleRequestChange('NAME_KOR', e.target.value, index)}
        />
      ),
      align: 'center',
      width: '12%',
    },
    {
      title: '화학물질명_영문',
      render: (text, record, index) => (
        <AntdInput
          className="ant-input-sm"
          name="NAME_ENG"
          value={this.state.dataSource[index].NAME_ENG}
          onChange={e => this.handleRequestChange('NAME_ENG', e.target.value, index)}
        />
      ),
      align: 'center',
      width: '12%',
    },
    {
      title: '관용명 및 이명',
      render: (text, record, index) => (
        <AntdInput
          className="ant-input-sm"
          name="NAME_ETC"
          value={this.state.dataSource[index].NAME_ETC}
          onChange={e => this.handleRequestChange('NAME_ETC', e.target.value, index)}
        />
      ),
      align: 'center',
      width: '12%',
    },
    {
      title: 'MSDS 함량',
      render: (text, record, index) => (
        <AntdInput
          name="CONTENT_EXP"
          value={this.state.dataSource[index].CONTENT_EXP}
          onChange={e => this.handleRequestChange('CONTENT_EXP', e.target.value, index)}
          className="col-input-number ant-input-sm"
        />
      ),
      align: 'center',
      width: '8%',
    },
    {
      title: '함유량',
      render: (text, record, index) => (
        <AntdInputNumber
          value={this.state.dataSource[index].CONTENT_DOSE}
          onChange={value => this.handleRequestChange('CONTENT_DOSE', value, index)}
          className="ant-input-number-sm"
          style={{ width: '100%' }}
        />
      ),
      align: 'center',
      width: '8%',
    },
    {
      title: '인화성가스 구분',
      render: (text, record, index) => (
        <AntdSelect
          className="select-sm"
          defaultValue={-1}
          onChange={value => this.handleRequestChange('IS_INFLAMMABILITY_GAS', value, index)}
          value={this.state.dataSource[index].IS_INFLAMMABILITY_GAS}
          style={{ width: '100%' }}
        >
          <Select.Option value={1}>1</Select.Option>
          <Select.Option value={2}>2</Select.Option>
          <Select.Option value={3}>3</Select.Option>
          <Select.Option value={4}>4</Select.Option>
          <Select.Option value={-1}>해당 없음</Select.Option>
        </AntdSelect>
      ),
      align: 'center',
      width: '10%',
    },
    {
      title: '인화성액체 구분',
      render: (text, record, index) => (
        <AntdSelect
          className="select-sm"
          defaultValue={-1}
          onChange={value => this.handleRequestChange('IS_INFLAMMABILITY_LIQUID', value, index)}
          value={this.state.dataSource[index].IS_INFLAMMABILITY_LIQUID}
          style={{ width: '100%' }}
        >
          <Select.Option value={1}>1</Select.Option>
          <Select.Option value={2}>2</Select.Option>
          <Select.Option value={3}>3</Select.Option>
          <Select.Option value={4}>4</Select.Option>
          <Select.Option value={-1}>해당 없음</Select.Option>
        </AntdSelect>
      ),
      align: 'center',
      width: '10%',
    },
    {
      title: '수입구분',
      render: (text, record, index) => (
        <AntdSelect
          className="select-sm"
          defaultValue="N"
          onChange={value => this.handleRequestChange('IS_IMPORT', value, index)}
          value={this.state.dataSource[index].IS_IMPORT}
          style={{ width: '100%' }}
        >
          <Select.Option value="N">내수</Select.Option>
          <Select.Option value="Y">수입</Select.Option>
        </AntdSelect>
      ),
      align: 'center',
      width: '8%',
    },
    {
      title: '',
      render: (text, record, index) => (
        <StyledButton className="btn-primary btn-sm" onClick={() => this.handleSubMaterialDelete(index)}>
          삭제
        </StyledButton>
      ),
    },
  ];

  handleRequestChange = (key, value, index) => {
    const valueObj = { [key]: value };
    this.setState(prevState => {
      const tempData = prevState.dataSource;
      tempData[index] = Object.assign(tempData[index], valueObj);
      return { dataSource: tempData };
    });
  };

  handleSubMateiralAdd = () => {
    this.setState(prevState => ({ dataSource: prevState.dataSource.concat({}) }));
  };

  handleSubMaterialDelete = index => {
    this.setState(prevState => {
      const tempData = prevState.dataSource.filter((value, i) => i !== index);
      return { dataSource: tempData };
    });
  };

  render() {
    const {
      handleSearchClick,
      handleInputClick,
      handleModalClose,
      setRequestValue,
      handleResetClick,
      handleDeleteConfirm,
      handleDeleteClick,
      getMaterialList,
      handleSubMateiralAdd,
    } = this;
    const { columns } = this;
    const { requestValue, visible, deleteConfirmMessage, dataSource, isModified } = this.state;
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
              <StyledButton className="btn-primary btn-first btn-sm" onClick={handleInputClick}>
                저장/수정
              </StyledButton>
              <Popconfirm title={deleteConfirmMessage} onConfirm={handleDeleteConfirm} okText="삭제" cancelText="취소">
                <StyledButton className="btn-light btn-first btn-sm" onClick={handleDeleteClick}>
                  삭제
                </StyledButton>
              </Popconfirm>
              <StyledButton className="btn-light btn-sm" onClick={handleResetClick}>
                초기화
              </StyledButton>
            </div>
          </StyledCustomSearchWrapper>
          <StyledHtmlTable>
            <table style={{ marginBottom: '10px' }}>
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
                  <td>{requestValue.UNIT}</td>
                  <th>kg환산계수</th>
                  <td>{requestValue.CONVERT_COEFFICIENT} </td>
                </tr>
              </tbody>
            </table>
          </StyledHtmlTable>
          {isModified ? (
            <>
              <div style={{ padding: '10px' }}>혼합물 정보 입력</div>
              <AntdTable columns={this.tableColumns} dataSource={dataSource} pagination={false} />
              <div className="selSaveWrapper" style={{ marginBottom: '10px', marginTop: '10px' }}>
                <StyledButton className="btn-primary btn-sm" onClick={handleSubMateiralAdd}>
                  추가
                </StyledButton>
              </div>
            </>
          ) : null}
        </StyledContentsWrapper>
        <Modal
          getMaterialList={getMaterialList}
          sagaKey={sagaKey}
          visible={visible}
          modalClose={handleModalClose}
          getCallDataHandler={getCallDataHandler}
          result={result}
          setRequestValue={setRequestValue}
          apiUrl="/api/eshs/v1/common/eshschemicalmaterialsap"
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
  submitHandlerBySaga: PropTypes.func,
  formData: PropTypes.object,
};

List.defaultProps = {
  sagaKey: '',
  getCallDataHandler: () => {},
  result: {},
  changeFormData: () => {},
  submitHandlerBySaga: () => {},
  formData: {},
};

export default List;
