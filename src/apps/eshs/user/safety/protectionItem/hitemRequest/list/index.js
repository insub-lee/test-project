import React from 'react';
import PropTypes from 'prop-types';
import { Table, Select, DatePicker, Modal } from 'antd';
import moment from 'moment';
import { debounce } from 'lodash';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledPicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import { getProcessRule } from 'apps/eshs/common/workProcessRule';
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
        hqId: '',
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
    const { startDate, endDate, type, deptId, hqId } = this.state.searchValue;
    const { sagaKey: id, getExtraApiData } = this.props;
    const params = `?&START_DATE=${startDate}&END_DATE=${endDate}&TYPE=${type}&HQ_ID=${hqId}&DEPT_ID=${deptId}`;
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
    if (!headquarterId) {
      return this.setState(prevState => ({
        isHeadquarterSelect: false,
        searchValue: Object.assign(prevState.searchValue, { deptId: '' }, { hqId: headquarterId }),
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
      title: '신청일',
      dataIndex: 'REQ_DT',
      key: 'REQ_DT',
      width: '10%',
      align: 'center',
    },
    {
      title: '신청팀',
      dataIndex: 'DEPT_NAME_KOR',
      key: 'DEPT_NAME_KOR',
      width: '10%',
      align: 'center',
    },
    {
      title: '신청자',
      dataIndex: 'NAME_KOR',
      key: 'NAME_KOR',
      width: '5%',
      align: 'center',
    },
    {
      title: '결재자',
      dataIndex: '',
      key: '',
      width: '5%',
      align: 'center',
    },
    {
      title: '품목',
      dataIndex: 'REQ_AMOUNT',
      key: 'REQ_AMOUNT',
      width: '5%',
      align: 'center',
    },
    {
      title: '지급요청일',
      dataIndex: 'TARGET_DT',
      key: 'TARGET_DT',
      width: '10%',
      align: 'center',
    },
    {
      title: '신청상태',
      dataIndex: 'APP_STATUS',
      key: 'APP_STATUS',
      width: '10%',
      align: 'center',
    },
    {
      title: '지급상태',
      dataIndex: 'CONF_STATUS',
      key: 'CONF_STATUS',
      width: '10%',
      align: 'center',
    },
  ];

  handleSearchChange = (key, value) => {
    this.setState(prevState => ({
      searchValue: Object.assign(prevState.searchValue, { [key]: value }),
    }));
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
      rowData: {},
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
    const { sagaKey, getExtraApiData, prcId } = this.props;
    const apiArr = [
      {
        key: 'reqDetails',
        url: `/api/eshs/v1/common/protection-req-detail?TASK_SEQ=${record.TASK_SEQ}`,
        type: 'GET',
      },
    ];

    // 여기서 record에 draft_id없을경우 processRule 가져와서 record안에 넣어줘

    if (record?.DRAFT_ID) {
      getExtraApiData(sagaKey, apiArr, () => this.setModalDataSource(record));
    } else {
      getProcessRule(prcId, prcRule => {
        getExtraApiData(sagaKey, apiArr, () => this.setModalDataSource({ ...record, processRule: prcRule }));
      });
    }
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

  handleChangeRowData = rowData => this.setState({ rowData });

  render() {
    const {
      columns,
      handleSearchChange,
      handleModalVisible,
      handleSearchDateChange,
      handleModalClose,
      getDataSource,
      handleHqChange,
      handleChangeRowData,
    } = this;
    const { dataSource, modalVisible, searchValue, rowData, isModified, headquarterList, departmentList, isHeadquarterSelect, modalDataSource } = this.state;
    const {
      sagaKey,
      changeFormData,
      formData,
      viewPageData,
      saveTask,
      getExtraApiData,
      submitExtraHandler,
      extraApiData,
      profile,
      setProcessRule,
      getProcessRule,
      workflowOpt,
      workPrcProps,
      relType,
      workInfo,
      setRelType,
      processRule,
      prcId,
      relKey,
      relKey2,
      workSeq,
    } = this.props;
    return (
      <>
        <StyledContentsWrapper>
          <StyledCustomSearchWrapper>
            <div className="search-input-area mb10">
              <span className="text-label">지역 test</span>
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
              <span className="text-label">신청부서</span>
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
            </div>
            <div className="btn-area">
              <StyledButton className="btn-gray btn-sm" onClick={this.getDataSource}>
                검색
              </StyledButton>
            </div>
          </StyledCustomSearchWrapper>
          <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10">
            <StyledButton className="btn-primary btn-sm mr5" onClick={handleModalVisible}>
              등록
            </StyledButton>
          </StyledButtonWrapper>
          <div style={{ padding: '10px' }}>
            <AntdTable
              columns={columns}
              dataSource={dataSource}
              onRow={record => ({ onClick: () => this.handleRowClick(record) })}
              footer={() => <span>{`${dataSource && dataSource.length} 건`}</span>}
            />
          </div>
          <AntdModal title="입고 등록" visible={modalVisible} footer={null} onCancel={handleModalClose} width="80%" destroyOnClose>
            <ModalContents
              sagaKey={sagaKey}
              changeFormData={changeFormData}
              handleChangeRowData={handleChangeRowData}
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
              prcId={prcId}
              relKey={relKey}
              relKey2={relKey2}
              workSeq={workSeq}
            />
          </AntdModal>
        </StyledContentsWrapper>
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
  setProcessRule: PropTypes.func,
};

List.defaultProps = {
  sagaKey: '',
  getExtraApiData: null,
  extraApiData: null,
  changeFormData: null,
};

export default List;
