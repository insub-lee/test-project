import React from 'react';
import PropTypes from 'prop-types';
import { Table, Input, Select, DatePicker, Modal } from 'antd';
import moment from 'moment';
import ExcelDownloadComp from 'components/BizBuilder/Field/ExcelDownloadComp';
import { createExcelData } from 'apps/eshs/common/createExcelData';
import DetailView from 'apps/eshs/user/health/medicalManagement/usageRegistration/input/detailView';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledPicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';

const AntdTable = StyledAntdTable(Table);
const AntdInput = StyledInput(Input);
const AntdPicker = StyledPicker(DatePicker.RangePicker);
const AntdSelect = StyledSelect(Select);
const AntdModal = StyledAntdModal(Modal);
class ListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      siteList: [],
      cooperatorList: [],
      diseaseList: [],
      treatmentList: [],
      headquarterList: [],
      departmentList: [],
      isSelectHeadQuarter: false,
      searchValue: {
        startDate: props.startDate
          ? moment(props.startDate).format('YYYY-MM-DD')
          : moment()
              .startOf('month')
              .format('YYYY-MM-DD'),
        endDate: props.endDate ? moment(props.endDate).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'),
        siteId: 317,
        cooperatorId: '',
        departmentId: '',
        empNo: '',
        visitCategoryId: '',
        patientCategoryId: '',
        diseaseId: '',
        treatmentId: '',
        gender: '',
        hqId: '',
      },
      isCooperator: false,
      modalVisible: false,
      selectedRecord: {},
    };
  }

  columns = [
    {
      title: '일시',
      dataIndex: 'JRNL_DTTM',
      align: 'center',
      width: '15%',
    },
    {
      title: '소속',
      dataIndex: 'DEPT_NAME',
      align: 'center',
      width: '7%',
    },
    {
      title: '사번',
      dataIndex: 'PATIENT_EMP_NO',
      align: 'center',
      width: '5%',
    },
    {
      title: '이름',
      dataIndex: 'PATIENT_NAME',
      align: 'center',
      width: '5%',
    },
    {
      title: '질환',
      dataIndex: 'DISEASE',
      align: 'center',
      width: '7%',
    },
    {
      title: '치료구분',
      dataIndex: 'TREATMENT',
      align: 'center',
      width: '10%',
    },
    {
      title: '증상',
      dataIndex: 'SYMPTOM',
      align: 'center',
      width: '10%',
    },
    {
      title: '의약품:출고수량',
      dataIndex: 'DRUG',
      align: 'center',
      width: '10%',
    },
    {
      title: '조치내용',
      dataIndex: 'MEASURE',
      align: 'center',
      width: '11%',
    },
    {
      title: '세부증상',
      dataIndex: 'DETAIL_CONTENT',
      align: 'center',
      width: '10%',
    },
    {
      title: 'ACS 결과',
      dataIndex: 'ACS',
      align: 'center',
      width: '9%',
    },
  ];

  componentDidMount() {
    this.getInitData();
    this.handleSearchClick();
  }

  getInitData = () => {
    const { sagaKey, getCallDataHandler } = this.props;
    const nodeIdMap = {
      SITE_MAP_ID: 316,
      COOPERATOR_NODE_ID: 673,
      DISEASE_NODE_ID: 694,
      TREATMENT_NODE_ID: 686,
      HEADQUARTER_NODE_ID: 72761,
    };

    const apiArr = [
      {
        key: 'siteList',
        url: `/api/admin/v1/common/categoryMapList`,
        type: 'POST',
        params: { PARAM: { NODE_ID: nodeIdMap.SITE_MAP_ID } },
      },
      {
        key: 'cooperatorList',
        url: `/api/admin/v1/common/categoryMapList`,
        type: 'POST',
        params: { PARAM: { NODE_ID: nodeIdMap.COOPERATOR_NODE_ID } },
      },
      {
        key: 'diseaseList',
        url: `/api/admin/v1/common/categoryMapList`,
        type: 'POST',
        params: { PARAM: { NODE_ID: nodeIdMap.DISEASE_NODE_ID } },
      },
      {
        key: 'treatmentList',
        url: `/api/admin/v1/common/categoryMapList`,
        type: 'POST',
        params: { PARAM: { NODE_ID: nodeIdMap.TREATMENT_NODE_ID } },
      },
      {
        key: 'deptList',
        url: `/api/eshs/v1/common/EshsHqAndDeptList?DEPT_ID=${nodeIdMap.HEADQUARTER_NODE_ID}`,
        type: 'GET',
      },
    ];

    getCallDataHandler(sagaKey, apiArr, () => this.setInitData(nodeIdMap));
  };

  setInitData = ({ SITE_MAP_ID, COOPERATOR_NODE_ID, DISEASE_NODE_ID, TREATMENT_NODE_ID, HEADQUARTER_NODE_ID }) => {
    const { result } = this.props;
    this.setState({
      siteList:
        (result.siteList &&
          result.siteList.categoryMapList &&
          result.siteList.categoryMapList.filter(site => site.PARENT_NODE_ID === SITE_MAP_ID && site.USE_YN === 'Y')) ||
        [],
      cooperatorList:
        (result.cooperatorList &&
          result.cooperatorList.categoryMapList &&
          result.cooperatorList.categoryMapList.filter(cooperator => cooperator.PARENT_NODE_ID === COOPERATOR_NODE_ID && cooperator.USE_YN === 'Y')) ||
        [],
      diseaseList:
        (result.diseaseList &&
          result.diseaseList.categoryMapList &&
          result.diseaseList.categoryMapList.filter(disease => disease.PARENT_NODE_ID === DISEASE_NODE_ID && disease.USE_YN === 'Y')) ||
        [],
      treatmentList:
        (result.treatmentList &&
          result.treatmentList.categoryMapList &&
          result.treatmentList.categoryMapList.filter(treatment => treatment.PARENT_NODE_ID === TREATMENT_NODE_ID && treatment.USE_YN === 'Y')) ||
        [],
      headquarterList: (result.deptList && result.deptList.dept && result.deptList.dept.filter(dept => dept.PRNT_ID === HEADQUARTER_NODE_ID)) || [],
    });
  };

  handleHqChange = headquarterId => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    if (!headquarterId) {
      return this.setState(prevState => ({
        isSelectHeadQuarter: false,
        searchValue: Object.assign(prevState.searchValue, { departmentId: '', hqId: headquarterId }),
      }));
    }

    this.setState(prevState => ({
      isSelectHeadQuarter: true,
      searchValue: Object.assign(prevState.searchValue, { hqId: headquarterId }),
    }));

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

    return getCallDataHandler(id, apiArr, selectHqCallback);
  };

  setDeptList = () => {
    const { result } = this.props;
    this.setState(prevState => ({
      departmentList: (result.deptListUnderHq && result.deptListUnderHq.dept) || [],
      searchValue: Object.assign(prevState.searchValue, { departmentId: '' }),
    }));
  };

  checkUserType = value => {
    this.setState(prevState =>
      value === 'Y'
        ? { isCooperator: value === 'Y' }
        : { isCooperator: value === 'Y', searchValue: Object.assign(prevState.searchValue, { cooperatorId: '' }) },
    );
  };

  handleDateChange = (date, dateString) => {
    this.setState(prevState => ({
      searchValue: Object.assign(prevState.searchValue, { startDate: dateString[0], endDate: dateString[1] }),
    }));
  };

  handleInputChange = (key, value) => {
    this.setState(prevState => ({
      searchValue: Object.assign(prevState.searchValue, { [key]: value }),
    }));
  };

  handleSearchClick = () => {
    const { searchValue } = this.state;
    const { sagaKey, getCallDataHandler } = this.props;

    const url = `/api/eshs/v1/common/health-usage-list`;
    const queryString = new URLSearchParams(searchValue).toString();
    const apiArr = [
      {
        key: 'healthUsageList',
        url: `${url}?${queryString}`,
        type: 'GET',
      },
    ];

    getCallDataHandler(sagaKey, apiArr, this.setDataSource);
  };

  setDataSource = () => {
    const { result } = this.props;
    this.setState({
      dataSource: (result.healthUsageList && result.healthUsageList.list) || [],
    });
  };

  handleModalVisible = (record = {}) => {
    this.setState({ modalVisible: true, selectedRecord: record });
  };

  handleModalClose = () => {
    this.setState({ modalVisible: false });
  };

  render() {
    const { columns } = this;
    const { handleHqChange, checkUserType, handleDateChange, handleInputChange, handleSearchClick, handleModalVisible, handleModalClose } = this;
    const {
      dataSource,
      siteList,
      cooperatorList,
      diseaseList,
      treatmentList,
      headquarterList,
      searchValue,
      isSelectHeadQuarter,
      departmentList,
      isCooperator,
      modalVisible,
      selectedRecord,
    } = this.state;
    return (
      <>
        <StyledContentsWrapper>
          <StyledCustomSearchWrapper>
            <div className="search-input-area mb10">
              <span className="text-label">지역</span>
              <AntdSelect className="select-mid mr5" onChange={value => handleInputChange('siteId', value)} value={317} style={{ width: '10%' }}>
                {siteList.map(site => (
                  <Select.Option value={site.NODE_ID}>{site.NAME_KOR}</Select.Option>
                ))}
              </AntdSelect>
              <span className="text-label">일시</span>
              <AntdPicker
                className="ant-picker-mid mr5"
                value={[moment(searchValue.startDate), moment(searchValue.endDate)]}
                onChange={handleDateChange}
                style={{ width: '20%' }}
              />
            </div>
            <div className="search-input-area mb10">
              <span className="text-label">이용자 구분</span>
              <AntdSelect defaultValue="N" onChange={checkUserType} className="select-mid mr5" style={{ width: '10%' }}>
                <AntdSelect.Option value="N">매그나칩</AntdSelect.Option>
                <AntdSelect.Option value="Y">협력업체</AntdSelect.Option>
              </AntdSelect>
              {isCooperator ? (
                <>
                  <span className="text-label">협력업체</span>
                  <AntdSelect
                    className="select-mid mr5"
                    onChange={value => handleInputChange('cooperatorId', value)}
                    value={searchValue.cooperatorId}
                    style={{ width: '10%' }}
                  >
                    <Select.Option value="">전체 보기</Select.Option>
                    {cooperatorList.map(cooperator => (
                      <Select.Option value={cooperator.NODE_ID}>{cooperator.NAME_KOR}</Select.Option>
                    ))}
                  </AntdSelect>
                </>
              ) : (
                <>
                  <span className="text-label">부서</span>
                  <AntdSelect disabled={isCooperator} value={searchValue.hqId} className="select-mid mr5" onChange={handleHqChange} style={{ width: '20%' }}>
                    <Select.Option value="">본부 전체</Select.Option>
                    {headquarterList.map(headquarter => (
                      <Select.Option value={headquarter.DEPT_ID}>{headquarter.NAME_KOR}</Select.Option>
                    ))}
                  </AntdSelect>
                  <AntdSelect
                    className="select-mid mr5"
                    disabled={!isSelectHeadQuarter}
                    defaultValue=""
                    value={searchValue.departmentId}
                    onChange={value => handleInputChange('departmentId', value)}
                    style={{ width: '20%' }}
                    placeholder="본부를 먼저 선택해주세요."
                  >
                    {departmentList.map((department, index) => (
                      <Select.Option value={department.DEPT_ID}>{!index ? '팀 전체' : department.NAME_KOR}</Select.Option>
                    ))}
                  </AntdSelect>
                </>
              )}
              <span className="text-label">사번</span>
              <AntdInput
                className="ant-input-mid"
                value={searchValue.empNo}
                onChange={event => handleInputChange('empNo', event.target.value)}
                onPressEnter={handleSearchClick}
                placeholder="사번을 입력하세요."
                style={{ width: '15%' }}
              />
            </div>
            <div className="search-input-area">
              <span className="text-label">방문구분</span>
              <AntdSelect
                className="select-mid mr5"
                value={searchValue.visitCategoryId}
                onChange={value => handleInputChange('visitCategoryId', value)}
                style={{ width: '10%' }}
              >
                <Select.Option value="">전체 보기</Select.Option>
                <Select.Option value={3}>건강관리실</Select.Option>
                <Select.Option value={4}>CMS</Select.Option>
              </AntdSelect>
              <span className="text-label">업무관련성</span>
              <AntdSelect
                className="select-mid mr5"
                value={searchValue.patientCategoryId}
                onChange={value => handleInputChange('patientCategoryId', value)}
                style={{ width: '10%' }}
              >
                <Select.Option value="">전체 보기</Select.Option>
                <Select.Option value={4}>직업성</Select.Option>
                <Select.Option value={5}>비직업성</Select.Option>
              </AntdSelect>
              <span className="text-label">질환</span>
              <AntdSelect
                className="select-mid mr5"
                value={searchValue.diseaseId}
                onChange={value => handleInputChange('diseaseId', value)}
                style={{ width: '10%' }}
              >
                <Select.Option value="">전체 보기</Select.Option>
                {diseaseList.map(disease => (
                  <Select.Option value={disease.NODE_ID}>{disease.NAME_KOR}</Select.Option>
                ))}
              </AntdSelect>
              <span className="text-label">치료구분</span>
              <AntdSelect
                className="select-mid mr5"
                value={searchValue.treatmentId}
                onChange={value => handleInputChange('treatmentId', value)}
                style={{ width: '10%' }}
              >
                <Select.Option value="">전체 보기</Select.Option>
                {treatmentList.map(treatment => (
                  <Select.Option value={treatment.NODE_ID}>{treatment.NAME_KOR}</Select.Option>
                ))}
              </AntdSelect>
              <span className="text-label">성별</span>
              <AntdSelect className="select-mid" value={searchValue.gender} onChange={value => handleInputChange('gender', value)} style={{ width: '10%' }}>
                <AntdSelect.Option value="">전체 보기</AntdSelect.Option>
                <AntdSelect.Option value="M">남</AntdSelect.Option>
                <AntdSelect.Option value="F">여</AntdSelect.Option>
              </AntdSelect>
            </div>
            <div className="btn-area">
              <StyledButton className="btn-gray btn-sm mr5" onClick={handleSearchClick}>
                검색
              </StyledButton>
              <ExcelDownloadComp
                isBuilder={false}
                fileName={`${moment().format('YYYYMMDD')}_의료등록_이용관리`}
                className="testClassName"
                btnText="엑셀 다운로드"
                sheetName="이용관리"
                listData={dataSource}
                btnSize="btn-sm"
                fields={createExcelData(columns, 'FIELD', 'dataIndex')}
                columns={createExcelData(columns, 'COLUMNS', 'title')}
              />
            </div>
          </StyledCustomSearchWrapper>
          <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10">
            <StyledButton className="btn-primary btn-sm mr5" onClick={handleModalVisible}>
              등록
            </StyledButton>
          </StyledButtonWrapper>
          <AntdTable
            columns={columns}
            dataSource={dataSource}
            onRow={record => ({ onClick: () => handleModalVisible(record) })}
            footer={() => <span>{dataSource.length} 건</span>}
          />
          <AntdModal title="건강관리실 이용관리" visible={modalVisible} footer={null} onCancel={handleModalClose} width="70%" destroyOnClose>
            <DetailView
              modalVisible={modalVisible}
              handleModalClose={handleModalClose}
              record={selectedRecord}
              sagaKey={this.props.sagaKey}
              getCallDataHandler={this.props.getCallDataHandler}
              result={this.props.result}
              diseaseList={diseaseList}
              treatmentList={treatmentList}
              submitHandlerBySaga={this.props.submitHandlerBySaga}
              handleSearchClick={this.handleSearchClick}
              isNew={this.props.isNew}
              listReload={handleSearchClick}
            />
          </AntdModal>
        </StyledContentsWrapper>
      </>
    );
  }
}

ListPage.propTypes = {
  sagaKey: PropTypes.string,
  getCallDataHandler: PropTypes.func,
  result: PropTypes.object,
  submitHandlerBySaga: PropTypes.func,
  isNew: PropTypes.bool,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
};

ListPage.defaultProps = {
  isNew: true,
};

export default ListPage;
