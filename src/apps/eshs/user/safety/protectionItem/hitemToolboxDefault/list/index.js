import React from 'react';
import PropTypes from 'prop-types';
import { Table, InputNumber, Select, Modal, Input, Popconfirm } from 'antd';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import DeptSelect from 'components/DeptSelect';
import moment from 'moment';
import { callBackAfterPut } from 'apps/eshs/user/environment/chemicalMaterialManagement/input/submitCallbackFunc';

const AntdTable = StyledAntdTable(Table);
const AntdSelect = StyledSelect(Select);
const AntdModal = StyledAntdModal(Modal);
const AntdSearch = StyledSearchInput(Input.Search);
class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      searchValue: {
        chkYear: '',
        deptCd: '',
        // chkYear: '2015',
        // deptCd: 'MN3T',
      },
      requestValue: {},
      modalVisible: false,
    };
  }

  columns = () => [
    {
      title: '관리부서',
      dataIndex: 'NAME_KOR',
      align: 'center',
      fixed: 'left',
    },
    {
      title: '방독면',
      align: 'center',
      render: record => (
        <InputNumber
          defaultValue={Number(record.T1) || 0}
          value={this.state.requestValue.T1}
          min={0}
          onChange={value => this.handleInputChange('T1', record.DEFAULT_ID, value)}
        />
      ),
    },
    {
      title: '카트리지',
      align: 'center',
      render: record => (
        <InputNumber
          defaultValue={Number(record.T2) || 0}
          value={this.state.requestValue.T2}
          min={0}
          onChange={value => this.handleInputChange('T2', record.DEFAULT_ID, value)}
        />
      ),
    },
    {
      title: '보안경',
      align: 'center',
      render: record => (
        <InputNumber
          defaultValue={Number(record.T3) || 0}
          value={this.state.requestValue.T3}
          min={0}
          onChange={value => this.handleInputChange('T3', record.DEFAULT_ID, value)}
        />
      ),
    },
    {
      title: '보안면',
      align: 'center',
      render: record => (
        <InputNumber
          defaultValue={Number(record.T4) || 0}
          value={this.state.requestValue.T4}
          min={0}
          onChange={value => this.handleInputChange('T4', record.DEFAULT_ID, value)}
        />
      ),
    },
    {
      title: '내산장갑(대)',
      align: 'center',
      render: record => (
        <InputNumber
          defaultValue={Number(record.T5) || 0}
          value={this.state.requestValue.T5}
          min={0}
          onChange={value => this.handleInputChange('T5', record.DEFAULT_ID, value)}
        />
      ),
    },
    {
      title: '내산장갑(소)',
      align: 'center',
      render: record => (
        <InputNumber
          defaultValue={Number(record.T6) || 0}
          value={this.state.requestValue.T6}
          min={0}
          onChange={value => this.handleInputChange('T6', record.DEFAULT_ID, value)}
        />
      ),
    },
    {
      title: 'PH Paper',
      align: 'center',
      render: record => (
        <InputNumber
          defaultValue={Number(record.T7) || 0}
          value={this.state.requestValue.T7}
          min={0}
          onChange={value => this.handleInputChange('T7', record.DEFAULT_ID, value)}
        />
      ),
    },
    {
      title: '(산)중화제600ml',
      align: 'center',
      render: record => (
        <InputNumber
          defaultValue={Number(record.T8) || 0}
          value={this.state.requestValue.T8}
          min={0}
          onChange={value => this.handleInputChange('T8', record.DEFAULT_ID, value)}
        />
      ),
    },
    {
      title: '(산)중화제4l',
      align: 'center',
      render: record => (
        <InputNumber
          defaultValue={Number(record.T9) || 0}
          value={this.state.requestValue.T9}
          min={0}
          onChange={value => this.handleInputChange('T9', record.DEFAULT_ID, value)}
        />
      ),
    },
    {
      title: '(산)중화제10l',
      align: 'center',
      render: record => (
        <InputNumber
          defaultValue={Number(record.T10) || 0}
          value={this.state.requestValue.T10}
          min={0}
          onChange={value => this.handleInputChange('T10', record.DEFAULT_ID, value)}
        />
      ),
    },
    {
      title: '(알)중화제600ml',
      align: 'center',
      render: record => (
        <InputNumber
          defaultValue={Number(record.T11) || 0}
          value={this.state.requestValue.T11}
          min={0}
          onChange={value => this.handleInputChange('T11', record.DEFAULT_ID, value)}
        />
      ),
    },
    {
      title: '(알)중화제4l',
      align: 'center',
      render: record => (
        <InputNumber
          defaultValue={Number(record.T12) || 0}
          value={this.state.requestValue.T12}
          min={0}
          onChange={value => this.handleInputChange('T12', record.DEFAULT_ID, value)}
        />
      ),
    },
    {
      title: '(알)중화제10l',
      align: 'center',
      render: record => (
        <InputNumber
          defaultValue={Number(record.T13) || 0}
          value={this.state.requestValue.T13}
          min={0}
          onChange={value => this.handleInputChange('T13', record.DEFAULT_ID, value)}
        />
      ),
    },
    {
      title: '흡착포원형',
      align: 'center',
      render: record => (
        <InputNumber
          defaultValue={Number(record.T14) || 0}
          value={this.state.requestValue.T14}
          min={0}
          onChange={value => this.handleInputChange('T14', record.DEFAULT_ID, value)}
        />
      ),
    },
    {
      title: '흡착포사각',
      align: 'center',
      render: record => (
        <InputNumber
          defaultValue={Number(record.T15) || 0}
          value={this.state.requestValue.T15}
          min={0}
          onChange={value => this.handleInputChange('T15', record.DEFAULT_ID, value)}
        />
      ),
    },
    {
      title: '앞치마',
      align: 'center',
      render: record => (
        <InputNumber
          defaultValue={Number(record.T16) || 0}
          value={this.state.requestValue.T16}
          min={0}
          onChange={value => this.handleInputChange('T16', record.DEFAULT_ID, value)}
        />
      ),
    },
    {
      title: '토시',
      align: 'center',
      render: record => (
        <InputNumber
          defaultValue={Number(record.T17) || 0}
          value={this.state.requestValue.T17}
          min={0}
          onChange={value => this.handleInputChange('T17', record.DEFAULT_ID, value)}
        />
      ),
    },
    {
      title: '화학복',
      align: 'center',
      render: record => (
        <InputNumber
          defaultValue={Number(record.T18) || 0}
          value={this.state.requestValue.T18}
          min={0}
          onChange={value => this.handleInputChange('T18', record.DEFAULT_ID, value)}
        />
      ),
    },
    {
      title: '장화',
      align: 'center',
      render: record => (
        <InputNumber
          defaultValue={Number(record.T19) || 0}
          value={this.state.requestValue.T19}
          min={0}
          onChange={value => this.handleInputChange('T19', record.DEFAULT_ID, value)}
        />
      ),
    },
    {
      title: '방열장갑',
      align: 'center',
      render: record => (
        <InputNumber
          defaultValue={Number(record.T20) || 0}
          value={this.state.requestValue.T20}
          min={0}
          onChange={value => this.handleInputChange('T20', record.DEFAULT_ID, value)}
        />
      ),
    },
    {
      title: '귀마개',
      align: 'center',
      render: record => (
        <InputNumber
          defaultValue={Number(record.T21) || 0}
          value={this.state.requestValue.T21}
          min={0}
          onChange={value => this.handleInputChange('T21', record.DEFAULT_ID, value)}
        />
      ),
    },
    {
      title: '비고',
      align: 'center',
      render: record => (
        <InputNumber
          defaultValue={Number(record.T22) || 0}
          value={this.state.requestValue.T22}
          min={0}
          onChange={value => this.handleInputChange('T22', record.DEFAULT_ID, value)}
        />
      ),
    },
  ];

  componentDidMount() {
    this.getDataSource();
  }

  getDataSource = () => {
    const { setDataSource } = this;
    const { searchValue } = this.state;
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiArr = [
      {
        key: 'toolboxList',
        url: `/api/eshs/v1/common/protectiontoolboxdef?CHK_YEAR=${searchValue.chkYear}&DEPT_CD=${searchValue.deptCd}`,
        type: 'GET',
      },
    ];

    getCallDataHandler(id, apiArr, searchValue.chkYear && searchValue.deptCd ? setDataSource : null);
  };

  setDataSource = () => {
    const { result } = this.props;
    const tempDataSource = [];
    tempDataSource.push((result.toolboxList && result.toolboxList.list) || {});
    this.setState({
      dataSource: tempDataSource,
      requestValue: (result.toolboxList && result.toolboxList.list) || {},
    });
  };

  createYearList = () => {
    const currentYear = moment().year();
    const yearList = [];
    for (let i = 2008; i <= Number(currentYear); i += 1) {
      yearList.push(i.toString());
    }
    return yearList;
  };

  handleSearchChange = (key, value) => {
    this.setState(prevState => {
      if (key === 'chkYear') {
        return { searchValue: Object.assign(prevState.searchValue, { [key]: value }), selectedYear: Number(value) + 1 };
      }
      return { searchValue: Object.assign(prevState.searchValue, { [key]: value }) };
    });
  };

  yearList = this.createYearList();

  handleModalVisible = () => {
    this.setState({
      modalVisible: true,
    });
  };

  handleModalClose = () => {
    this.setState({
      modalVisible: false,
    });
  };

  handleDeptSelect = dept => {
    const deptInfo = { deptCd: dept.DEPT_CD, deptNm: dept.NAME_KOR };
    this.setState(prevState => ({
      searchValue: Object.assign(prevState.searchValue, deptInfo),
      modalVisible: false,
    }));
  };

  handleInputChange = (key, id, value) => {
    const valueObj = { [key]: value.toString() };
    this.setState(prevState => ({
      requestValue: Object.assign(prevState.requestValue, valueObj),
    }));
  };

  handleOnSaveClick = () => {
    const { requestValue } = this.state;
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    const submitCallback = () => {
      this.getDataSource();
    };
    submitHandlerBySaga(id, 'POST', `/api/eshs/v1/common/protectiontoolboxdef`, requestValue, (key, response) =>
      callBackAfterPut(key, response, submitCallback),
    );
  };

  render() {
    const { columns, yearList, handleSearchChange, handleModalVisible, handleModalClose, handleDeptSelect, handleOnSaveClick } = this;
    const { dataSource, modalVisible, searchValue } = this.state;
    return (
      <>
        <StyledContentsWrapper>
          <StyledCustomSearchWrapper>
            <div className="search-input-area">
              <span className="text-label">평가 연도</span>
              <AntdSelect
                className="select-mid mr5 ml5"
                defaultValue={moment().format('YYYY')}
                onChange={value => handleSearchChange('chkYear', value)}
                style={{ width: '10%' }}
              >
                {yearList.map(year => (
                  <Select.Option value={year}>{year}년</Select.Option>
                ))}
              </AntdSelect>
              <span className="text-label">부서코드</span>
              <AntdSearch
                className="input-search-mid"
                style={{ width: '15%' }}
                value={searchValue.deptNm}
                onClick={handleModalVisible}
                onSearch={handleModalVisible}
              />
            </div>
            <div className="btn-area">
              <StyledButton className="btn-gray btn-sm" onClick={this.getDataSource}>
                검색
              </StyledButton>
            </div>
          </StyledCustomSearchWrapper>
          {dataSource.length ? (
            <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10">
              <Popconfirm title={<span>수정하시겠습니까?</span>} okText="수정" cancelText="취소" onConfirm={handleOnSaveClick} placement="left">
                <StyledButton className="btn-primary btn-sm">수정</StyledButton>
              </Popconfirm>
            </StyledButtonWrapper>
          ) : null}
          <div style={{ padding: '10px' }}>
            <AntdTable bordered columns={columns()} dataSource={dataSource} scroll={{ x: true }} pagination={false} />
          </div>
        </StyledContentsWrapper>
        <AntdModal visible={modalVisible} title="부서 선택" onCancel={handleModalClose} footer={null}>
          <DeptSelect onCancel={handleModalClose} onComplete={handleDeptSelect} rootDeptChange defaultRootDeptId={72761} />
        </AntdModal>
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

List.defaultProps = {};

export default List;
