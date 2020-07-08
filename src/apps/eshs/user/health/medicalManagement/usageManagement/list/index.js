import React from 'react';
import PropTypes from 'prop-types';
import { Table, Input, Select, DatePicker } from 'antd';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledPicker from 'components/BizBuilder/styled/Form/StyledDatePicker';

const AntdTable = StyledAntdTable(Table);
const AntdInput = StyledInput(Input);
const AntdPicker = StyledPicker(DatePicker.RangePicker);
const AntdSelect = StyledSelect(Select);
class ListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      siteList: [],
      cooperatorList: [],
      visitTypeList: [],
      patientTypeList: [],
      diseaseList: [],
      treatmentList: [],
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
      width: '7%',
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
      width: '9%',
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
      width: '6%',
    },
    {
      title: '의약품:출고수량',
      dataIndex: '',
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
  }

  getInitData = () => {
    const { sagaKey, getCallDataHandler } = this.props;
    const nodeIdMap = {
      SITE_MAP_ID: 316,
      COOPERATOR_NODE_ID: 673,
      DISEASE_NODE_ID: 694,
      TREATMENT_NODE_ID: 686,
      VISIT_TYPE_NODE_ID: 30589,
      PATIENT_TYPE_NODE_ID: 30594,
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
        key: 'visitTypeList',
        url: `/api/admin/v1/common/categoryMapList`,
        type: 'POST',
        params: { PARAM: { NODE_ID: nodeIdMap.VISIT_TYPE_NODE_ID } },
      },
      {
        key: 'patientTypeList',
        url: `/api/admin/v1/common/categoryMapList`,
        type: 'POST',
        params: { PARAM: { NODE_ID: nodeIdMap.PATIENT_TYPE_NODE_ID } },
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

  setInitData = ({ SITE_MAP_ID, COOPERATOR_NODE_ID, DISEASE_NODE_ID, TREATMENT_NODE_ID, VISIT_TYPE_NODE_ID, PATIENT_TYPE_NODE_ID }) => {
    // 필터조건 확인해야 함
    const { result } = this.props;
    this.setState({
      siteList:
        result.siteList &&
        result.siteList.categoryMapList &&
        result.siteList.categoryMapList.filter(site => site.PARENT_NODE_ID === SITE_MAP_ID && site.USE_YN === 'Y'),
      cooperatorList:
        result.cooperatorList &&
        result.cooperatorList.categoryMapList &&
        result.cooperatorList.categoryMapList.filter(cooperator => cooperator.PARENT_NODE_ID === COOPERATOR_NODE_ID && cooperator.USE_YN === 'Y'),
      visitTypeList:
        result.visitTypeList &&
        result.visitTypeList.categoryMapList &&
        result.visitTypeList.categoryMapList.filter(visitType => visitType.PARENT_NODE_ID === DISEASE_NODE_ID && visitType.USE_YN === 'Y'),
      patientTypeList:
        result.patientTypeList &&
        result.patientTypeList.categoryMapList &&
        result.patientTypeList.categoryMapList.filter(patientType => patientType.PARENT_NODE_ID === TREATMENT_NODE_ID && patientType.USE_YN === 'Y'),
      diseaseList:
        result.diseaseList &&
        result.diseaseList.categoryMapList &&
        result.diseaseList.categoryMapList.filter(disease => disease.PARENT_NODE_ID === VISIT_TYPE_NODE_ID && disease.USE_YN === 'Y'),
      treatmentList:
        result.treatmentList &&
        result.treatmentList.categoryMapList &&
        result.treatmentList.categoryMapList.filter(treatment => treatment.PARENT_NODE_ID === PATIENT_TYPE_NODE_ID && treatment.USE_YN === 'Y'),
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

  render() {
    const { columns } = this;
    const { handleHqChange } = this;
    const { dataSource, siteList, cooperatorList, visitTypeList, patientTypeList, diseaseList, treatmentList } = this.state;
    return (
      <>
        <StyledContentsWrapper>
          <StyledCustomSearchWrapper>
            <div className="search-input-area mb10">
              <span className="text-label">지역</span>
              <AntdSelect className="select-mid mr5" style={{ width: '10%' }}>
                {siteList.map(site => (
                  <Select.Option value={site.NODE_ID}>{site.NAME_KOR}</Select.Option>
                ))}
              </AntdSelect>
              <span className="text-label">일시</span>
              <AntdPicker className="ant-picker-mid mr5" style={{ width: '20%' }} />
            </div>
            <div className="search-input-area mb10">
              <span className="text-label">부서</span>
              {/* <AntdSelect defaultValue="" className="select-mid mr5" onChange={handleHqChange} style={{ width: '20%' }}>
                <Select.Option value="">본부 전체</Select.Option>
                {headquarterList.map(headquarter => (
                  <Select.Option value={headquarter.DEPT_ID}>{headquarter.NAME_KOR}</Select.Option>
                ))}
              </AntdSelect> */}
              {/* <AntdSelect
                disabled={!isHeadquarterSelect}
                defaultValue=""
                value={searchValue.deptId}
                className="select-mid mr5"
                // onChange={value => handleSearchChange('deptId', value)}
                style={{ width: '20%' }}
                placeholder="본부를 먼저 선택해주세요."
              >
                {departmentList.map((department, index) => (
                  <Select.Option value={department.DEPT_ID}>{!index ? '팀 전체' : department.NAME_KOR}</Select.Option>
                ))}
              </AntdSelect> */}
              <span className="text-label">협력업체</span>
              <AntdSelect className="select-mid mr5" style={{ width: '10%' }}>
                {cooperatorList.map(cooperator => (
                  <Select.Option value={cooperator.NODE_ID}>{cooperator.NAME_KOR}</Select.Option>
                ))}
              </AntdSelect>
              <span className="text-label">사번</span>
              <AntdInput className="ant-input-mid" placeholder="사번을 입력하세요." style={{ width: '10%' }} />
            </div>
            <div className="search-input-area">
              <span className="text-label">이용자 구분</span>
              <AntdSelect className="select-mid mr5" style={{ width: '10%' }}>
                <AntdSelect.Option value="">이용자 선택</AntdSelect.Option>
              </AntdSelect>
              <span className="text-label">방문구분</span>
              <AntdSelect className="select-mid mr5" style={{ width: '10%' }}>
                {visitTypeList.map(visitType => (
                  <Select.Option value={visitType.NODE_ID}>{visitType.NAME_KOR}</Select.Option>
                ))}
              </AntdSelect>
              <span className="text-label">업무관련성</span>
              <AntdSelect className="select-mid mr5" style={{ width: '10%' }}>
                {patientTypeList.map(patientType => (
                  <Select.Option value={patientType.NODE_ID}>{patientType.NAME_KOR}</Select.Option>
                ))}
              </AntdSelect>
              <span className="text-label">질환</span>
              <AntdSelect className="select-mid mr5" style={{ width: '10%' }}>
                {diseaseList.map(disease => (
                  <Select.Option value={disease.NODE_ID}>{disease.NAME_KOR}</Select.Option>
                ))}
              </AntdSelect>
              <span className="text-label">치료구분</span>
              <AntdSelect className="select-mid mr5" style={{ width: '10%' }}>
                {treatmentList.map(treatment => (
                  <Select.Option value={treatment.NODE_ID}>{treatment.NAME_KOR}</Select.Option>
                ))}
              </AntdSelect>
              <span className="text-label">성별</span>
              <AntdSelect className="select-mid" style={{ width: '5%' }}>
                <AntdSelect.Option value="">남녀전체</AntdSelect.Option>
                <AntdSelect.Option value="M">남</AntdSelect.Option>
                <AntdSelect.Option value="F">여</AntdSelect.Option>
              </AntdSelect>
            </div>
            <div className="btn-area">
              <StyledButton className="btn-gray btn-sm">검색</StyledButton>
            </div>
          </StyledCustomSearchWrapper>
          <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10">
            <StyledButton className="btn-primary btn-sm mr5">등록</StyledButton>
            <StyledButton className="btn-primary btn-sm">엑셀받기</StyledButton>
          </StyledButtonWrapper>
          <AntdTable columns={columns} dataSource={dataSource} footer={() => <span>{dataSource.length} 건</span>} />
        </StyledContentsWrapper>
      </>
    );
  }
}

ListPage.propTypes = {
  sagaKey: PropTypes.string,
  getCallDataHandler: PropTypes.func,
  result: PropTypes.object,
};

ListPage.defaultProps = {};

export default ListPage;
