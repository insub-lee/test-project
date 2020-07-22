import React from 'react';
import PropTypes from 'prop-types';
import { Table, InputNumber, Select, Modal, Input, message, Popconfirm } from 'antd';
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
      selectedYear: '',
    };
  }

  columns = () => [
    {
      title: '관리부서',
      dataIndex: 'DEPT_NAME_KOR',
      align: 'center',
      fixed: 'left',
    },
    {
      title: 'FAB',
      dataIndex: 'FAB',
      align: 'center',
      fixed: 'left',
    },
    {
      title: '층',
      dataIndex: 'FLOOR',
      align: 'center',
      fixed: 'left',
    },
    {
      title: 'NO',
      dataIndex: 'SEQ',
      align: 'center',
      fixed: 'left',
    },
    {
      title: '품목',
      children: [
        {
          title: '위치코드',
          dataIndex: 'FLOOR_CD',
          align: 'center',
          fixed: 'left',
        },
        {
          title: '위치',
          dataIndex: 'FLOOR_NM',
          align: 'center',
          fixed: 'left',
        },
      ],
      align: 'center',
      fixed: 'left',
    },
    {
      title: '관리자',
      children: [
        {
          title: '정',
          dataIndex: 'MASTER_EMP_NM',
          align: 'center',
          fixed: 'left',
        },
        {
          title: '부',
          dataIndex: 'SLAVE_EMP_NM',
          align: 'center',
          fixed: 'left',
        },
      ],
      align: 'center',
      fixed: 'left',
    },
    {
      title: 'Emergency Lock',
      children: [
        {
          title: 'Number',
          dataIndex: 'TEL',
          align: 'center',
          fixed: 'left',
        },
      ],
      align: 'center',
      fixed: 'left',
    },
    {
      title: '방독면',
      align: 'center',
      render: (text, record, index) =>
        index !== this.state.dataSource.length - 1 ? (
          <InputNumber defaultValue={Number(record.T1)} min={0} onChange={value => this.handleInputChange('T1', record.DETAIL_ID, value)} />
        ) : (
          <span>{Number(record.T1)}</span>
        ),
    },
    {
      title: '카트리지',
      align: 'center',
      render: (text, record, index) =>
        index !== this.state.dataSource.length - 1 ? (
          <InputNumber defaultValue={Number(record.T2)} min={0} onChange={value => this.handleInputChange('T2', record.DETAIL_ID, value)} />
        ) : (
          <span>{Number(record.T2)}</span>
        ),
    },
    {
      title: '보안경',
      align: 'center',
      render: (text, record, index) =>
        index !== this.state.dataSource.length - 1 ? (
          <InputNumber defaultValue={Number(record.T3)} min={0} onChange={value => this.handleInputChange('T3', record.DETAIL_ID, value)} />
        ) : (
          <span>{Number(record.T3)}</span>
        ),
    },
    {
      title: '보안면',
      align: 'center',
      render: (text, record, index) =>
        index !== this.state.dataSource.length - 1 ? (
          <InputNumber defaultValue={Number(record.T4)} min={0} onChange={value => this.handleInputChange('T4', record.DETAIL_ID, value)} />
        ) : (
          <span>{Number(record.T4)}</span>
        ),
    },
    {
      title: '내산장갑(대)',
      align: 'center',
      render: (text, record, index) =>
        index !== this.state.dataSource.length - 1 ? (
          <InputNumber defaultValue={Number(record.T5)} min={0} onChange={value => this.handleInputChange('T5', record.DETAIL_ID, value)} />
        ) : (
          <span>{Number(record.T5)}</span>
        ),
    },
    {
      title: '내산장갑(소)',
      align: 'center',
      render: (text, record, index) =>
        index !== this.state.dataSource.length - 1 ? (
          <InputNumber defaultValue={Number(record.T6)} min={0} onChange={value => this.handleInputChange('T6', record.DETAIL_ID, value)} />
        ) : (
          <span>{Number(record.T6)}</span>
        ),
    },
    {
      title: 'PH Paper',
      align: 'center',
      render: (text, record, index) =>
        index !== this.state.dataSource.length - 1 ? (
          <InputNumber defaultValue={Number(record.T7)} min={0} onChange={value => this.handleInputChange('T7', record.DETAIL_ID, value)} />
        ) : (
          <span>{Number(record.T7)}</span>
        ),
    },
    {
      title: '(산)중화제600ml',
      align: 'center',
      render: (text, record, index) =>
        index !== this.state.dataSource.length - 1 ? (
          <InputNumber defaultValue={Number(record.T8)} min={0} onChange={value => this.handleInputChange('T8', record.DETAIL_ID, value)} />
        ) : (
          <span>{Number(record.T8)}</span>
        ),
    },
    {
      title: '(산)중화제4l',
      align: 'center',
      render: (text, record, index) =>
        index !== this.state.dataSource.length - 1 ? (
          <InputNumber defaultValue={Number(record.T9)} min={0} onChange={value => this.handleInputChange('T9', record.DETAIL_ID, value)} />
        ) : (
          <span>{Number(record.T9)}</span>
        ),
    },
    {
      title: '(산)중화제10l',
      align: 'center',
      render: (text, record, index) =>
        index !== this.state.dataSource.length - 1 ? (
          <InputNumber defaultValue={Number(record.T10)} min={0} onChange={value => this.handleInputChange('T10', record.DETAIL_ID, value)} />
        ) : (
          <span>{Number(record.T10)}</span>
        ),
    },
    {
      title: '(알)중화제600ml',
      align: 'center',
      render: (text, record, index) =>
        index !== this.state.dataSource.length - 1 ? (
          <InputNumber defaultValue={Number(record.T11)} min={0} onChange={value => this.handleInputChange('T11', record.DETAIL_ID, value)} />
        ) : (
          <span>{Number(record.T11)}</span>
        ),
    },
    {
      title: '(알)중화제4l',
      align: 'center',
      render: (text, record, index) =>
        index !== this.state.dataSource.length - 1 ? (
          <InputNumber defaultValue={Number(record.T12)} min={0} onChange={value => this.handleInputChange('T12', record.DETAIL_ID, value)} />
        ) : (
          <span>{Number(record.T12)}</span>
        ),
    },
    {
      title: '(알)중화제10l',
      align: 'center',
      render: (text, record, index) =>
        index !== this.state.dataSource.length - 1 ? (
          <InputNumber defaultValue={Number(record.T13)} min={0} onChange={value => this.handleInputChange('T13', record.DETAIL_ID, value)} />
        ) : (
          <span>{Number(record.T13)}</span>
        ),
    },
    {
      title: '흡착포원형',
      align: 'center',
      render: (text, record, index) =>
        index !== this.state.dataSource.length - 1 ? (
          <InputNumber defaultValue={Number(record.T14)} min={0} onChange={value => this.handleInputChange('T14', record.DETAIL_ID, value)} />
        ) : (
          <span>{Number(record.T14)}</span>
        ),
    },
    {
      title: '흡착포사각',
      align: 'center',
      render: (text, record, index) =>
        index !== this.state.dataSource.length - 1 ? (
          <InputNumber defaultValue={Number(record.T15)} min={0} onChange={value => this.handleInputChange('T15', record.DETAIL_ID, value)} />
        ) : (
          <span>{Number(record.T15)}</span>
        ),
    },
    {
      title: '앞치마',
      align: 'center',
      render: (text, record, index) =>
        index !== this.state.dataSource.length - 1 ? (
          <InputNumber defaultValue={Number(record.T16)} min={0} onChange={value => this.handleInputChange('T16', record.DETAIL_ID, value)} />
        ) : (
          <span>{Number(record.T16)}</span>
        ),
    },
    {
      title: '토시',
      align: 'center',
      render: (text, record, index) =>
        index !== this.state.dataSource.length - 1 ? (
          <InputNumber defaultValue={Number(record.T17)} min={0} onChange={value => this.handleInputChange('T17', record.DETAIL_ID, value)} />
        ) : (
          <span>{Number(record.T17)}</span>
        ),
    },
    {
      title: '화학복',
      align: 'center',
      render: (text, record, index) =>
        index !== this.state.dataSource.length - 1 ? (
          <InputNumber defaultValue={Number(record.T18)} min={0} onChange={value => this.handleInputChange('T18', record.DETAIL_ID, value)} />
        ) : (
          <span>{Number(record.T18)}</span>
        ),
    },
    {
      title: '장화',
      align: 'center',
      render: (text, record, index) =>
        index !== this.state.dataSource.length - 1 ? (
          <InputNumber defaultValue={Number(record.T19)} min={0} onChange={value => this.handleInputChange('T19', record.DETAIL_ID, value)} />
        ) : (
          <span>{Number(record.T19)}</span>
        ),
    },
    {
      title: '방열장갑',
      align: 'center',
      render: (text, record, index) =>
        index !== this.state.dataSource.length - 1 ? (
          <InputNumber defaultValue={Number(record.T20)} min={0} onChange={value => this.handleInputChange('T20', record.DETAIL_ID, value)} />
        ) : (
          <span>{Number(record.T20)}</span>
        ),
    },
    {
      title: '귀마개',
      align: 'center',
      render: (text, record, index) =>
        index !== this.state.dataSource.length - 1 ? (
          <InputNumber defaultValue={Number(record.T21)} min={0} onChange={value => this.handleInputChange('T21', record.DETAIL_ID, value)} />
        ) : (
          <span>{Number(record.T21)}</span>
        ),
    },
    {
      title: '비고',
      align: 'center',
      render: (text, record, index) =>
        index !== this.state.dataSource.length - 1 ? (
          <InputNumber defaultValue={Number(record.T22)} min={0} onChange={value => this.handleInputChange('T22', record.DETAIL_ID, value)} />
        ) : (
          <span>{Number(record.T22)}</span>
        ),
    },
  ];

  componentDidMount() {
    this.getDataSource();
  }

  getDataSource = () => {
    const { setDataSource } = this;
    const { searchValue } = this.state;
    const { sagaKey: id, getExtraApiData } = this.props;
    const apiArr = [
      {
        key: 'toolboxList',
        url: `/api/eshs/v1/common/protectiontoolbox?CHK_YEAR=${searchValue.chkYear}&DEPT_CD=${searchValue.deptCd}`,
        type: 'GET',
      },
    ];

    getExtraApiData(id, apiArr, searchValue.chkYear && searchValue.deptCd ? setDataSource : null);
  };

  setDataSource = () => {
    const { extraApiData } = this.props;
    this.setState({
      dataSource: (extraApiData.toolboxList && extraApiData.toolboxList.list) || [],
    });
  };

  createYearList = () => {
    const currentYear = moment().year();
    const yearList = [];
    for (let i = 2009; i <= Number(currentYear); i += 1) {
      yearList.push(i.toString());
    }
    return yearList;
  };

  handleSearchYearChange = (key, value) => {
    this.setState(prevState => ({
      searchValue: Object.assign(prevState.searchValue, { [key]: value }),
      selectedYear: Number(value) + 1,
    }));
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
    const { getDataSource } = this;
    const deptInfo = { deptCd: dept.DEPT_CD, deptNm: dept.NAME_KOR };
    this.setState(
      prevState => ({
        searchValue: Object.assign(prevState.searchValue, deptInfo),
        modalVisible: false,
      }),
      getDataSource,
    );
    // this.setState({ modalVisible: false }, this.handleSearchChange('deptCd', dept.DEPT_CD));
  };

  handleInputChange = (key, id, value) => {
    const valueObj = { [id + key.substring(1)]: { DETAIL_ID: id, COLUMN: key, VALUE: value } };
    this.setState(
      prevState => ({
        requestValue: Object.assign(prevState.requestValue, valueObj),
      }),
      this.getDataSource,
    );
  };

  handleOnSaveClick = () => {
    const { requestValue } = this.state;
    const { sagaKey: id, submitExtraHandler } = this.props;
    submitExtraHandler(id, 'PUT', `/api/eshs/v1/common/protectiontoolbox`, { requestValue: Object.values(requestValue) }, () =>
      message.success('수정되었습니다.'),
    );
  };

  handleOnNewSave = () => {
    const { selectedYear, searchValue } = this.state;
    const { sagaKey: id, submitExtraHandler } = this.props;
    const paramValue = {
      // CHK_YEAR: 바꿀 연도, ORIGIN_YEAR: 복사할 연도, DEPT_CD: 부서코드
      CHK_YEAR: selectedYear,
      ORIGIN_YEAR: searchValue.chkYear,
      DEPT_CD: searchValue.deptCd,
    };

    submitExtraHandler(id, 'POST', `/api/eshs/v1/common/protectiontoolbox`, paramValue, () =>
      message.success(`${searchValue.chkYear}년도에서 ${selectedYear}년도로 복사되었습니다.`),
    );
  };

  popConfirmContent = () => {
    const { searchValue, selectedYear } = this.state;
    return (
      <>
        <div>{searchValue.deptNm}</div>
        <div>
          <span>{searchValue.chkYear}년도 정보를</span>
          <AntdSelect className="select-xs mr5 ml5" defaultValue={Number(selectedYear) + 1} onChange={value => this.setState({ selectedYear: value })}>
            <Select.Option value={Number(selectedYear) + 1}>{Number(selectedYear) + 1}</Select.Option>
            <Select.Option value={Number(selectedYear) + 2}>{Number(selectedYear) + 2}</Select.Option>
          </AntdSelect>
          <span>년도로 복사합니다.</span>
        </div>
      </>
    );
  };

  render() {
    const {
      columns,
      yearList,
      handleSearchYearChange,
      handleModalVisible,
      handleModalClose,
      handleDeptSelect,
      handleOnSaveClick,
      popConfirmContent,
      handleOnNewSave,
    } = this;
    const { dataSource, modalVisible, searchValue } = this.state;
    return (
      <>
        <StyledContentsWrapper>
          <StyledCustomSearchWrapper className="search-wrapper-inline">
            <div className="search-input-area">
              <span className="text-label">연도</span>
              <AntdSelect
                className="select-sm mr5 ml5"
                defaultValue={moment().format('YYYY')}
                onChange={value => handleSearchYearChange('chkYear', value)}
                style={{ width: 100 }}
              >
                {yearList.map(year => (
                  <Select.Option value={year}>{year}년</Select.Option>
                ))}
              </AntdSelect>
              <span className="text-label">부서코드</span>
              <AntdSearch
                className="input-search-sm mr5"
                style={{ width: 150 }}
                value={searchValue.deptNm}
                onClick={handleModalVisible}
                onSearch={handleModalVisible}
              />
              <StyledButton className="btn-gray btn-sm" onClick={this.getDataSource}>
                검색
              </StyledButton>
            </div>
          </StyledCustomSearchWrapper>
          {dataSource.length ? (
            <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10">
              <Popconfirm title={<span>수정하시겠습니까?</span>} okText="수정" cancelText="취소" onConfirm={handleOnSaveClick}>
                <StyledButton className="btn-primary btn-sm mr5">수정</StyledButton>
              </Popconfirm>
              <Popconfirm title={popConfirmContent()} okText="저장" cancelText="취소" onConfirm={handleOnNewSave}>
                <StyledButton className="btn-primary btn-sm">새로 저장하기</StyledButton>
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
  getExtraApiData: PropTypes.func,
  extraApiData: PropTypes.object,
  submitExtraHandler: PropTypes.func,
};

List.defaultProps = {};

export default List;
