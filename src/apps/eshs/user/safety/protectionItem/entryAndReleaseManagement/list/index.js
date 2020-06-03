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
        startDate: moment().format('YYYY-MM-DD'),
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
      title: '품목',
      dataIndex: 'KIND',
      key: 'KIND',
      width: '255px',
    },
    {
      title: '모델',
      dataIndex: 'MODEL',
      key: 'MODEL',
      width: '220px',
    },
    {
      title: 'Size',
      dataIndex: 'SIZE1',
      key: 'SIZE1',
      width: '110px',
    },
    {
      title: '업체',
      dataIndex: 'VENDOR_NM',
      key: 'VENDOR_NM',
      width: '110px',
    },
    {
      title: '입출',
      dataIndex: 'TYPE',
      key: 'TYPE',
      width: '85px',
    },
    {
      title: '단가',
      dataIndex: 'UNITPRICE',
      key: 'UNITPRICE',
      width: '80px',
    },
    {
      title: '수량',
      dataIndex: 'QTY',
      key: 'QTY',
      width: '50px',
    },
    {
      title: '금액',
      dataIndex: 'TOTAL_PRICE',
      key: 'TOTAL_PRICE',
      width: '80px',
    },
    {
      title: '발생일',
      dataIndex: 'POSTING_DT',
      key: 'POSTING_DT',
      width: '120px',
    },
    {
      title: '출고장소',
      dataIndex: 'DEPT_NAME_KOR',
      key: 'DEPT_NAME_KOR',
      width: '150px',
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
    this.setState({ modalVisible: false, isModified: false });
  };

  getSearchData = () => {
    const { getDataSource } = this;
    getDataSource();
  };

  render() {
    const { columns, handleSearchChange, handleModalVisible, handleSearchDateChange, handleModalClose, getDataSource, handleHqChange } = this;
    const { dataSource, modalVisible, searchValue, rowData, isModified, headquarterList, departmentList, isHeadquarterSelect } = this.state;
    const { sagaKey, changeFormData, formData, viewPageData, saveTask, submitExtraHandler } = this.props;
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
                입고등록
              </StyledButton>
            </div>
          </StyledSearchWrap>
          <div style={{ padding: '10px' }}>
            <AntdTable
              columns={columns}
              dataSource={dataSource}
              onRow={record => ({ onClick: () => this.setState({ rowData: record, modalVisible: true, isModified: true }) })}
              footer={() => <span>{`${dataSource && dataSource.length} 건`}</span>}
            />
          </div>
        </ContentsWrapper>
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
};

List.defaultProps = {
  sagaKey: '',
  getExtraApiData: null,
  extraApiData: null,
  changeFormData: null,
};

export default List;
