import React from 'react';
import PropTypes from 'prop-types';
import { Table, Select, DatePicker, Modal } from 'antd';
import moment from 'moment';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledPicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import ModalContents from './modalContents';

const AntdModal = StyledAntdModal(Modal);
const AntdSelect = StyledSelect(Select);
const AntdTable = StyledAntdTable(Table);
const AntdPicker = StyledPicker(DatePicker.RangePicker);
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
  }

  componentDidMount() {
    const { getDataSource, getDepartmentList } = this;
    getDataSource();
    getDepartmentList();
  }

  getDataSource = () => {
    const { setDataSource } = this;
    const { site, startDate, endDate, type, deptId } = this.state.searchValue;
    const { sagaKey: id, getExtraApiData } = this.props;
    const params = `?SITE=${site}&START_DATE=${startDate}&END_DATE=${endDate}&TYPE=${type}&DEPT_ID=${deptId}`;
    const apiArr = [
      {
        key: 'dataSource',
        url: `/api/eshs/v1/common/protectionerm${params}`,
        type: 'GET',
      },
    ];

    getExtraApiData(id, apiArr, setDataSource);
  };

  setDataSource = () => {
    const { extraApiData } = this.props;
    this.setState({
      dataSource: (extraApiData.dataSource && extraApiData.dataSource.list) || [],
    });
  };

  getDepartmentList = () => {
    const { setDeraptmentList } = this;
    const { sagaKey: id, getExtraApiData } = this.props;
    const headquarterId = 72761;
    const apiArr = [
      {
        key: 'deptList',
        url: `/api/eshs/v1/common/EshsHqAndDeptList?DEPT_ID=${headquarterId}`,
        type: 'GET',
      },
    ];

    getExtraApiData(id, apiArr, () => setDeraptmentList(headquarterId));
  };

  setDeraptmentList = headquarterId => {
    const { extraApiData } = this.props;
    this.setState({
      headquarterList: (extraApiData.deptList && extraApiData.deptList.dept && extraApiData.deptList.dept.filter(dept => dept.PRNT_ID === headquarterId)) || [],
    });
  };

  handleHqChange = headquarterId => {
    const { sagaKey: id, getExtraApiData } = this.props;
    if (!headquarterId) {
      return this.setState(prevState => ({
        isHeadquarterSelect: false,
        searchValue: Object.assign(prevState.searchValue, { deptId: '' }),
      }));
    }

    this.setState({
      isHeadquarterSelect: true,
    });
    const apiArr = [
      {
        key: 'deptListUnderHq',
        type: 'GET',
        url: `/api/eshs/v1/common/EshsHqAndDeptList?DEPT_ID=${headquarterId}`,
      },
    ];

    const selectHqCallback = () => {
      this.setDeptList();
    };

    return getExtraApiData(id, apiArr, selectHqCallback);
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
      title: '품목',
      dataIndex: 'KIND',
      key: 'KIND',
      width: '255px',
      align: 'center',
    },
    {
      title: '모델',
      dataIndex: 'MODEL',
      key: 'MODEL',
      width: '220px',
      align: 'center',
    },
    {
      title: 'Size',
      dataIndex: 'SIZE1',
      key: 'SIZE1',
      width: '110px',
      align: 'center',
    },
    {
      title: '업체',
      dataIndex: 'VENDOR_NM',
      key: 'VENDOR_NM',
      width: '110px',
      align: 'center',
    },
    {
      title: '입출',
      dataIndex: 'TYPE',
      key: 'TYPE',
      width: '85px',
      align: 'center',
    },
    {
      title: '단가',
      dataIndex: 'UNITPRICE',
      key: 'UNITPRICE',
      width: '80px',
      align: 'center',
    },
    {
      title: '수량',
      dataIndex: 'QTY',
      key: 'QTY',
      width: '50px',
      align: 'center',
    },
    {
      title: '금액',
      dataIndex: 'TOTAL_PRICE',
      key: 'TOTAL_PRICE',
      width: '80px',
      align: 'center',
    },
    {
      title: '발생일',
      dataIndex: 'POSTING_DT',
      key: 'POSTING_DT',
      width: '120px',
      align: 'center',
    },
    {
      title: '출고장소',
      dataIndex: 'DEPT_NAME_KOR',
      key: 'DEPT_NAME_KOR',
      width: '150px',
      align: 'center',
    },
  ];

  handleSearchChange = (key, value) => {
    this.setState(prevState => ({
      searchValue: Object.assign(prevState.searchValue, { [key]: value }),
    }));
  };

  handleSearchDateChange = (date, dateString) => {
    this.setState(prevState => ({
      searchValue: Object.assign(prevState.searchValue, { startDate: dateString[0], endDate: dateString[1] }),
    }));
  };

  handleModalVisible = () => {
    this.setState({
      modalVisible: true,
    });
  };

  handleModalClose = () => {
    this.setState({ modalVisible: false, isModified: false });
  };

  getSearchData = () => {
    const { getDataSource } = this;
    getDataSource();
  };

  render() {
    const { columns, handleSearchChange, handleModalVisible, handleSearchDateChange, handleModalClose, getDataSource, handleHqChange } = this;
    const { dataSource, modalVisible, searchValue, rowData, isModified, headquarterList, departmentList, isHeadquarterSelect } = this.state;
    const { sagaKey, changeFormData, formData, viewPageData, saveTask, submitExtraHandler, profile } = this.props;
    return (
      <>
        <StyledContentsWrapper>
          <StyledCustomSearchWrapper>
            <div className="search-input-area mb10">
              <span className="text-label">지역</span>
              <AntdSelect defaultValue={317} className="select-mid mr5" onChange={value => handleSearchChange('site', value)} style={{ width: '10%' }}>
                <Select.Option value={317}>청주</Select.Option>
                <Select.Option value={318}>구미</Select.Option>
              </AntdSelect>
              <span className="text-label">기간</span>
              <AntdPicker
                className="ant-picker-mid"
                defaultValue={[moment(searchValue.startDate), moment(searchValue.endDate)]}
                onChange={handleSearchDateChange}
              />
            </div>
            <div className="search-input-area">
              <span className="text-label">상태</span>
              <AntdSelect defaultValue="" className="select-mid mr5" onChange={value => handleSearchChange('type', value)} style={{ width: '10%' }}>
                <Select.Option value="E">입고</Select.Option>
                <Select.Option value="R">출고</Select.Option>
                <Select.Option value="">전체</Select.Option>
              </AntdSelect>
              <span className="text-label">부서</span>
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
                placeholder="본부를 먼저 선택해주세요."
              >
                {departmentList.map((department, index) => (
                  <Select.Option value={department.DEPT_ID}>{!index ? '팀 전체' : department.NAME_KOR}</Select.Option>
                ))}
              </AntdSelect>
              <div className="btn-area">
                <StyledButton className="btn-gray btn-sm" onClick={this.getSearchData}>
                  검색
                </StyledButton>
              </div>
            </div>
          </StyledCustomSearchWrapper>
          <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10">
            <StyledButton className="btn-primary btn-sm" onClick={handleModalVisible}>
              입고등록
            </StyledButton>
          </StyledButtonWrapper>
          <div style={{ padding: '10px' }}>
            <AntdTable
              columns={columns}
              dataSource={dataSource}
              onRow={record => ({ onClick: () => this.setState({ rowData: record, modalVisible: true, isModified: true }) })}
              footer={() => <span>{`${dataSource && dataSource.length} 건`}</span>}
            />
          </div>
        </StyledContentsWrapper>
        <AntdModal title="입고 등록" visible={modalVisible} footer={null} onCancel={handleModalClose} destroyOnClose>
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
            submitExtraHandler={submitExtraHandler}
            profile={profile}
          />
        </AntdModal>
      </>
    );
  }
}

List.propTypes = {
  sagaKey: PropTypes.string,
  getExtraApiData: PropTypes.func,
  extraApiData: PropTypes.object,
  changeFormData: PropTypes.func,
  saveTask: PropTypes.func,
  formData: PropTypes.object,
  viewPageData: PropTypes.object,
  submitExtraHandler: PropTypes.func,
  profile: PropTypes.object,
};

List.defaultProps = {
  sagaKey: '',
  getExtraApiData: null,
  extraApiData: null,
  changeFormData: null,
};

export default List;
