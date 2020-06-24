import React from 'react';
import PropTypes from 'prop-types';
import { Input, Table, Select, DatePicker, Modal } from 'antd';
import moment from 'moment';
import { debounce } from 'lodash';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledPicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import ModalContents from './modalContents';

const AntdModal = StyledAntdModal(Modal);
const AntdSelect = StyledSelect(Select);
const AntdTable = StyledAntdTable(Table);
const AntdPicker = StyledPicker(DatePicker.RangePicker);
const AntdInput = StyledInput(Input);
class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      rowData: {},
      searchValue: {
        site: '',
        startDate: moment()
          .startOf('month')
          .format('YYYY-MM-DD'),
        endDate: moment().format('YYYY-MM-DD'),
        type: '',
        deptId: '',
      },
      modalVisible: false,
      isModified: false,
      headquarterList: [],
      departmentList: [],
      isHeadquarterSelect: false,
    };
    this.getSearchData = debounce(this.getSearchData, 500);
  }

  componentDidMount() {
    const { getDataSource, getDepartmentList } = this;
    getDataSource();
    getDepartmentList();
  }

  getDataSource = () => {
    const { setDataSource } = this;
    const { startDate, endDate, type, deptId } = this.state.searchValue;
    const { sagaKey: id, getCallDataHandler } = this.props;
    const params = `?&START_DATE=${startDate}&END_DATE=${endDate}&TYPE=${type}&DEPT_ID=${deptId}`;
    const apiArr = [
      {
        key: 'dataSource',
        url: `/api/eshs/v1/common/protection-req${params}`,
        type: 'GET',
      },
    ];

    getCallDataHandler(id, apiArr, setDataSource);
  };

  setDataSource = () => {
    const { extraApiData } = this.props;
    this.setState({
      dataSource: (extraApiData.dataSource && extraApiData.dataSource.list) || [],
    });
  };

  getDepartmentList = () => {
    const { setDeraptmentList } = this;
    const { sagaKey: id, getCallDataHandler } = this.props;
    const headquarterId = 72761;
    const apiArr = [
      {
        key: 'deptList',
        url: `/api/eshs/v1/common/EshsHqAndDeptList?DEPT_ID=${headquarterId}`,
        type: 'GET',
      },
    ];

    getCallDataHandler(id, apiArr, () => setDeraptmentList(headquarterId));
  };

  setDeraptmentList = headquarterId => {
    const { extraApiData } = this.props;
    this.setState({
      headquarterList: (extraApiData.deptList && extraApiData.deptList.dept && extraApiData.deptList.dept.filter(dept => dept.PRNT_ID === headquarterId)) || [],
    });
  };

  handleHqChange = headquarterId => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    if (!headquarterId) {
      return this.setState(prevState => ({
        isHeadquarterSelect: false,
        searchValue: Object.assign(prevState.searchValue, { deptId: '' }),
      }));
    }
    this.setState({ isHeadquarterSelect: true });
    const apiArr = [
      {
        key: 'deptListUnderHq',
        type: 'GET',
        url: `/api/eshs/v1/common/EshsHqAndDeptList?DEPT_ID=${headquarterId}`,
      },
    ];
    return getCallDataHandler(id, apiArr, this.setDeptList);
  };

  setDeptList = () => {
    const { extraApiData } = this.props;
    this.setState(prevState => ({
      departmentList: (extraApiData.deptListUnderHq && extraApiData.deptListUnderHq.dept) || [],
      searchValue: Object.assign(prevState.searchValue, { deptId: '' }),
    }));
  };

  columns = [
    {
      title: '신청팀',
      dataIndex: 'DEPT_NAME_KOR',
      key: 'DEPT_NAME_KOR',
      width: '10%',
    },
    {
      title: '품목',
      dataIndex: 'KIND',
      key: 'KIND',
      width: '10%',
    },
    {
      title: '모델',
      dataIndex: 'MODEL',
      key: 'MODEL',
      width: '10%',
    },
    {
      title: '사이즈',
      dataIndex: 'SIZE1',
      key: 'SIZE1',
      width: '10%',
    },
    {
      title: '신청수량',
      dataIndex: 'QTY',
      key: 'QTY',
      width: '10%',
    },
    {
      title: '지급요청일',
      dataIndex: 'TARGET_DT',
      key: 'TARGET_DT',
      width: '10%',
    },
    {
      title: '지급수량',
      dataIndex: '',
      key: '',
      width: '10%',
    },
    {
      title: '지급일',
      dataIndex: '',
      key: '',
      width: '10%',
    },
    {
      title: '지급상태',
      dataIndex: 'CONF_STATUS',
      key: 'CONF_STATUS',
      width: '10%',
    },
    {
      title: '신청사유',
      dataIndex: 'REQ_COMMENTS',
      key: 'REQ_COMMENTS',
      width: '10%',
    },
  ];

  handleSearchChange = (key, value) => {
    const { getSearchData } = this;
    this.setState(
      prevState => ({
        searchValue: Object.assign(prevState.searchValue, { [key]: value }),
      }),
      getSearchData,
    );
  };

  handleSearchDateChange = (date, dateString) => {
    const { getSearchData } = this;
    this.setState(
      prevState => ({
        searchValue: Object.assign(prevState.searchValue, { startDate: dateString[0], endDate: dateString[1] }),
      }),
      getSearchData,
    );
  };

  handleModalVisible = () => {
    this.setState({
      modalVisible: true,
    });
  };

  handleModalClose = () => {
    this.setState({ modalVisible: false, isModified: false, modalDataSource: null });
  };

  getSearchData = () => {
    const { getDataSource } = this;
    getDataSource();
  };

  handleRowClick = record => {
    const { sagaKey, getCallDataHandler } = this.props;
    const apiArr = [
      {
        key: 'reqDetails',
        url: `/api/eshs/v1/common/protection-req-detail?REQ_CD=${record.REQ_CD}`,
        type: 'GET',
      },
    ];

    getCallDataHandler(sagaKey, apiArr, () => this.setModalDataSource(record));
  };

  setModalDataSource = record => {
    const { extraApiData } = this.props;
    this.setState({
      rowData: record,
      modalVisible: true,
      isModified: true,
      modalDataSource: (extraApiData.reqDetails && extraApiData.reqDetails.list) || [],
    });
  };

  render() {
    const { columns, handleSearchChange, handleModalVisible, handleSearchDateChange, handleModalClose, getDataSource, handleHqChange } = this;
    const { dataSource, modalVisible, searchValue, rowData, isModified, headquarterList, departmentList, isHeadquarterSelect, modalDataSource } = this.state;
    const { sagaKey, changeFormData, formData, viewPageData, saveTask, getCallDataHandler, submitHandlerBySaga, extraApiData, profile } = this.props;
    return (
      <>
        <StyledContentsWrapper>
          <StyledCustomSearchWrapper>
            <div style={{ marginBottom: '10px' }}>
              <AntdSelect defaultValue="CP" className="select-mid mr5" onChange={value => handleSearchChange('site', value)} style={{ width: '10%' }}>
                <Select.Option value="CP">청주</Select.Option>
                <Select.Option value="GP">구미</Select.Option>
              </AntdSelect>
              <AntdPicker
                className="ant-picker-mid"
                defaultValue={[moment(searchValue.startDate), moment(searchValue.endDate)]}
                onChange={handleSearchDateChange}
              />
            </div>
            <div>
              <AntdSelect defaultValue="" className="select-mid mr5" onChange={handleHqChange} style={{ width: '20%' }}>
                <Select.Option value="">본부 전체</Select.Option>
                {headquarterList.map(headquarter => (
                  <Select.Option value={headquarter.DEPT_ID}>{headquarter.NAME_KOR}</Select.Option>
                ))}
              </AntdSelect>
              <AntdSelect
                disabled={!isHeadquarterSelect}
                defaultValue=""
                value={searchValue.deptId}
                className="select-mid mr5"
                onChange={value => handleSearchChange('deptId', value)}
                style={{ width: '20%' }}
              >
                <Select.Option value="">팀 전체</Select.Option>
                {departmentList.map(department => (
                  <Select.Option value={department.DEPT_ID}>{department.NAME_KOR}</Select.Option>
                ))}
              </AntdSelect>
              <AntdSelect defaultValue="" className="select-mid mr5" onChange={value => handleSearchChange('type', value)} style={{ width: '10%' }}>
                <Select.Option value="1">접수</Select.Option>
                <Select.Option value="2">진행</Select.Option>
                <Select.Option value="3">완료</Select.Option>
                <Select.Option value="">상태전체</Select.Option>
              </AntdSelect>
              <AntdInput className="ant-input-mid ant-input-inline" placeholder="품목명" style={{ width: '15%' }} />
            </div>
          </StyledCustomSearchWrapper>
          <div style={{ padding: '10px' }}>
            <AntdTable
              columns={columns}
              dataSource={dataSource}
              // onRow={record => ({ onClick: () => this.setState({ rowData: record, modalVisible: true, isModified: true }) })}
              onRow={record => ({ onClick: () => this.handleRowClick(record) })}
              footer={() => <span>{`${dataSource && dataSource.length} 건`}</span>}
            />
          </div>
        </StyledContentsWrapper>
        <AntdModal title="입고 등록" visible={modalVisible} footer={null} onCancel={handleModalClose} width="80%" destroyOnClose>
          <ModalContents
            sagaKey={sagaKey}
            changeFormData={changeFormData}
            formData={formData}
            viewPageData={viewPageData}
            handleModalVisible={handleModalVisible}
            handleModalClose={handleModalClose}
            saveTask={saveTask}
            getDataSource={getDataSource}
            rowData={rowData}
            isModified={isModified}
            getCallDataHandler={getCallDataHandler}
            submitHandlerBySaga={submitHandlerBySaga}
            extraApiData={extraApiData}
            profile={profile}
            modalDataSource={modalDataSource}
          />
        </AntdModal>
      </>
    );
  }
}

List.propTypes = {
  sagaKey: PropTypes.string,
  getCallDataHandler: PropTypes.func,
  extraApiData: PropTypes.object,
  changeFormData: PropTypes.func,
  saveTask: PropTypes.func,
  formData: PropTypes.object,
  viewPageData: PropTypes.object,
  submitHandlerBySaga: PropTypes.func,
  profile: PropTypes.object,
};

List.defaultProps = {
  sagaKey: '',
  getCallDataHandler: null,
  extraApiData: null,
  changeFormData: null,
};

export default List;
