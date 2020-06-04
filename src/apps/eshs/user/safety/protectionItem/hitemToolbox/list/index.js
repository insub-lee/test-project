import React from 'react';
import PropTypes from 'prop-types';
import { Table, InputNumber, Select, Modal, Input, message, Popconfirm } from 'antd';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
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
        // chkYear: '',
        // deptCd: '',
        chkYear: '2015',
        deptCd: 'MN3T',
      },
      requestValue: {},
      modalVisible: false,
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
      render: record => <InputNumber defaultValue={Number(record.T1)} onChange={value => this.handleInputChange('T1', record.DETAIL_ID, value)} />,
    },
    {
      title: '카트리지',
      align: 'center',
      render: record => <InputNumber defaultValue={Number(record.T2)} onChange={value => this.handleInputChange('T2', record.DETAIL_ID, value)} />,
    },
    {
      title: '보안경',
      align: 'center',
      render: record => <InputNumber defaultValue={Number(record.T3)} onChange={value => this.handleInputChange('T3', record.DETAIL_ID, value)} />,
    },
    {
      title: '보안면',
      align: 'center',
      render: record => <InputNumber defaultValue={Number(record.T4)} onChange={value => this.handleInputChange('T4', record.DETAIL_ID, value)} />,
    },
    {
      title: '내산장갑(대)',
      align: 'center',
      render: record => <InputNumber defaultValue={Number(record.T5)} onChange={value => this.handleInputChange('T5', record.DETAIL_ID, value)} />,
    },
    {
      title: '내산장갑(소)',
      align: 'center',
      render: record => <InputNumber defaultValue={Number(record.T6)} onChange={value => this.handleInputChange('T6', record.DETAIL_ID, value)} />,
    },
    {
      title: 'PH Paper',
      align: 'center',
      render: record => <InputNumber defaultValue={Number(record.T7)} onChange={value => this.handleInputChange('T7', record.DETAIL_ID, value)} />,
    },
    {
      title: '(산)중화제600ml',
      align: 'center',
      render: record => <InputNumber defaultValue={Number(record.T8)} onChange={value => this.handleInputChange('T8', record.DETAIL_ID, value)} />,
    },
    {
      title: '(산)중화제4l',
      align: 'center',
      render: record => <InputNumber defaultValue={Number(record.T9)} onChange={value => this.handleInputChange('T9', record.DETAIL_ID, value)} />,
    },
    {
      title: '(산)중화제10l',
      align: 'center',
      render: record => <InputNumber defaultValue={Number(record.T10)} onChange={value => this.handleInputChange('T10', record.DETAIL_ID, value)} />,
    },
    {
      title: '(알)중화제600ml',
      align: 'center',
      render: record => <InputNumber defaultValue={Number(record.T11)} onChange={value => this.handleInputChange('T11', record.DETAIL_ID, value)} />,
    },
    {
      title: '(알)중화제4l',
      align: 'center',
      render: record => <InputNumber defaultValue={Number(record.T12)} onChange={value => this.handleInputChange('T12', record.DETAIL_ID, value)} />,
    },
    {
      title: '(알)중화제10l',
      align: 'center',
      render: record => <InputNumber defaultValue={Number(record.T13)} onChange={value => this.handleInputChange('T13', record.DETAIL_ID, value)} />,
    },
    {
      title: '흡착포원형',
      align: 'center',
      render: record => <InputNumber defaultValue={Number(record.T14)} onChange={value => this.handleInputChange('T14', record.DETAIL_ID, value)} />,
    },
    {
      title: '흡착포사각',
      align: 'center',
      render: record => <InputNumber defaultValue={Number(record.T15)} onChange={value => this.handleInputChange('T15', record.DETAIL_ID, value)} />,
    },
    {
      title: '앞치마',
      align: 'center',
      render: record => <InputNumber defaultValue={Number(record.T16)} onChange={value => this.handleInputChange('T16', record.DETAIL_ID, value)} />,
    },
    {
      title: '토시',
      align: 'center',
      render: record => <InputNumber defaultValue={Number(record.T17)} onChange={value => this.handleInputChange('T17', record.DETAIL_ID, value)} />,
    },
    {
      title: '화학복',
      align: 'center',
      render: record => <InputNumber defaultValue={Number(record.T18)} onChange={value => this.handleInputChange('T18', record.DETAIL_ID, value)} />,
    },
    {
      title: '장화',
      align: 'center',
      render: record => <InputNumber defaultValue={Number(record.T19)} onChange={value => this.handleInputChange('T19', record.DETAIL_ID, value)} />,
    },
    {
      title: '방열장갑',
      align: 'center',
      render: record => <InputNumber defaultValue={Number(record.T20)} onChange={value => this.handleInputChange('T20', record.DETAIL_ID, value)} />,
    },
    {
      title: '귀마개',
      align: 'center',
      render: record => <InputNumber defaultValue={Number(record.T21)} onChange={value => this.handleInputChange('T21', record.DETAIL_ID, value)} />,
    },
    {
      title: '비고',
      align: 'center',
      render: record => <InputNumber defaultValue={Number(record.T22)} onChange={value => this.handleInputChange('T22', record.DETAIL_ID, value)} />,
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

    getExtraApiData(id, apiArr, setDataSource);
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

  handleSearchChange = (key, value) => {
    const { getDataSource } = this;
    this.setState(
      prevState => ({
        searchValue: Object.assign(prevState.searchValue, { [key]: value }),
      }),
      getDataSource,
    );
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
    this.setState({ modalVisible: false }, this.handleSearchChange('deptCd', dept.DEPT_CD));
  };

  handleInputChange = (key, id, value) => {
    const valueObj = { [id + key.substring(1)]: { DETAIL_ID: id, COLUMN: key, VALUE: value } };
    this.setState(prevState => ({ requestValue: Object.assign(prevState.requestValue, valueObj) }));
  };

  handleOnSaveClick = () => {
    const { requestValue } = this.state;
    const { sagaKey: id, submitExtraHandler } = this.props;
    submitExtraHandler(id, 'PUT', `/api/eshs/v1/common/protectiontoolbox`, { requestValue: Object.values(requestValue) }, () =>
      message.success('수정되었습니다.'),
    );
  };

  render() {
    const { columns, yearList, handleSearchChange, handleModalVisible, handleModalClose, handleDeptSelect, handleOnSaveClick } = this;
    const { dataSource, modalVisible } = this.state;
    return (
      <>
        <StyledContentsWrapper>
          <StyledCustomSearchWrapper>
            <div className="search-input-area">
              <span className="text-label">평가년도</span>
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
              <span>부서코드</span>
              <AntdSearch className="input-search-mid" style={{ width: '15%' }} onClick={handleModalVisible} />
            </div>
            <div>
              <Popconfirm okText="수정" cancelText="취소" onConfirm={handleOnSaveClick}>
                <StyledButton className="btn-primary">수정</StyledButton>
              </Popconfirm>
            </div>
          </StyledCustomSearchWrapper>
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
