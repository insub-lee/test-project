import React from 'react';
import PropTypes from 'prop-types';
import { Table, Select, DatePicker, Modal } from 'antd';
import moment from 'moment';
import { debounce } from 'lodash';

import StyledSearchWrap from 'components/CommonStyled/StyledSearchWrap';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledLineTable from 'commonStyled/EshsStyled/Table/StyledLineTable';
import StyledSelect from 'commonStyled/Form/StyledSelect';
import StyledPicker from 'commonStyled/Form/StyledPicker';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledContentsModal from 'commonStyled/EshsStyled/Modal/StyledContentsModal';
import ModalContents from './modalContents';

const AntdModal = StyledContentsModal(Modal);
const AntdSelect = StyledSelect(Select);
const AntdTable = StyledLineTable(Table);
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
    const { sagaKey: id, getExtraApiData } = this.props;
    const params = `?&START_DATE=${startDate}&END_DATE=${endDate}&TYPE=${type}&DEPT_ID=${deptId}`;
    const apiArr = [
      {
        key: 'dataSource',
        url: `/api/eshs/v1/common/protection-req${params}`,
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
    this.setState({ isHeadquarterSelect: true });
    const apiArr = [
      {
        key: 'deptListUnderHq',
        type: 'GET',
        url: `/api/eshs/v1/common/EshsHqAndDeptList?DEPT_ID=${headquarterId}`,
      },
    ];
    getExtraApiData(id, apiArr, this.setDeptList);
  };

  setDeptList = () => {
    const { extraApiData } = this.props;
    this.setState({
      departmentList: (extraApiData.deptListUnderHq && extraApiData.deptListUnderHq.dept) || [],
    });
  };

  columns = [
    {
      title: '신청일',
      dataIndex: 'REQ_DT',
      key: 'REQ_DT',
      width: '10%',
    },
    {
      title: '신청팀',
      dataIndex: 'DEPT_NAME_KOR',
      key: 'DEPT_NAME_KOR',
      width: '10%',
    },
    {
      title: '신청자',
      dataIndex: 'NAME_KOR',
      key: 'NAME_KOR',
      width: '5%',
    },
    {
      title: '결재자',
      dataIndex: '',
      key: '',
      width: '5%',
    },
    {
      title: '품목',
      dataIndex: 'REQ_AMOUNT',
      key: 'REQ_AMOUNT',
      width: '5%',
    },
    {
      title: '지급요청일',
      dataIndex: 'TARGET_DT',
      key: 'TARGET_DT',
      width: '10%',
    },
    {
      title: '신청상태',
      dataIndex: 'APP_STATUS',
      key: 'APP_STATUS',
      width: '10%',
    },
    {
      title: '지급상태',
      dataIndex: 'CONF_STATUS',
      key: 'CONF_STATUS',
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
    const { sagaKey, getExtraApiData } = this.props;
    const apiArr = [
      {
        key: 'reqDetails',
        url: `/api/eshs/v1/common/protection-req-detail?REQ_CD=${record.REQ_CD}`,
        type: 'GET',
      },
    ];

    getExtraApiData(sagaKey, apiArr, () => this.setModalDataSource(record));
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
    const { sagaKey, changeFormData, formData, viewPageData, saveTask, getExtraApiData, submitExtraHandler, extraApiData, profile } = this.props;
    return (
      <>
        <ContentsWrapper>
          <StyledSearchWrap>
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
              <AntdSelect defaultValue="" className="select-mid mr5" onChange={value => handleSearchChange('type', value)} style={{ width: '10%' }}>
                <Select.Option value="E">입고</Select.Option>
                <Select.Option value="R">출고</Select.Option>
                <Select.Option value="">전체</Select.Option>
              </AntdSelect>
              <AntdSelect defaultValue="" className="select-mid mr5" onChange={handleHqChange} style={{ width: '20%' }}>
                <Select.Option value="">본부 전체</Select.Option>
                {headquarterList.map(headquarter => (
                  <Select.Option value={headquarter.DEPT_ID}>{headquarter.NAME_KOR}</Select.Option>
                ))}
              </AntdSelect>
              <AntdSelect
                disabled={!isHeadquarterSelect}
                defaultValue=""
                className="select-mid mr5"
                onChange={value => handleSearchChange('deptId', value)}
                style={{ width: '20%' }}
              >
                {departmentList.map(department => (
                  <Select.Option value={department.DEPT_ID}>{department.NAME_KOR}</Select.Option>
                ))}
              </AntdSelect>
              <StyledButton className="btn-primary mr5" onClick={handleModalVisible}>
                등록
              </StyledButton>
            </div>
          </StyledSearchWrap>
          <div style={{ padding: '10px' }}>
            <AntdTable
              columns={columns}
              dataSource={dataSource}
              // onRow={record => ({ onClick: () => this.setState({ rowData: record, modalVisible: true, isModified: true }) })}
              onRow={record => ({ onClick: () => this.handleRowClick(record) })}
              footer={() => <span>{`${dataSource && dataSource.length} 건`}</span>}
            />
          </div>
        </ContentsWrapper>
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
            getExtraApiData={getExtraApiData}
            submitExtraHandler={submitExtraHandler}
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
