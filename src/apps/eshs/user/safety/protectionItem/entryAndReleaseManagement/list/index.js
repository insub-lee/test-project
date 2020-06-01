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
      requestValue: {},
      searchValue: {
        site: '',
        startDate: moment().format('YYYY-MM-DD'),
        endDate: moment().format('YYYY-MM-DD'),
        type: '',
        deptId: '',
      },
      modalVisible: false,
    };
    this.getSearchData = debounce(this.getSearchData, 300);
  }

  componentDidMount() {
    const { getDataSource } = this;
    getDataSource();
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

  columns = [
    {
      title: '품목',
      dataIndex: 'KIND',
      key: 'KIND',
    },
    {
      title: '모델',
      dataIndex: 'MODEL',
      key: 'MODEL',
    },
    {
      title: 'Size',
      dataIndex: 'SIZE1',
      key: 'SIZE1',
    },
    {
      title: '업체',
      dataIndex: 'VENDOR_NM',
      key: 'VENDOR_NM',
    },
    {
      title: '입출',
      dataIndex: 'TYPE',
      key: 'TYPE',
    },
    {
      title: '단가',
      dataIndex: 'UNITPRICE',
      key: 'UNITPRICE',
    },
    {
      title: '수량',
      dataIndex: 'QTY',
      key: 'QTY',
    },
    {
      title: '금액',
      dataIndex: 'TOTAL_PRICE',
      key: 'TOTAL_PRICE',
    },
    {
      title: '발생일',
      dataIndex: 'POSTING_DT',
      key: 'POSTING_DT',
    },
    {
      title: '출고장소',
      dataIndex: 'DEPT_NAME_KOR',
      key: 'DEPT_NAME_KOR',
    },
  ];

  modalFooter = () => [
    <>
      <StyledButton className="btn-primary mr5">저장</StyledButton>
      <StyledButton className="btn-primary">취소</StyledButton>
    </>,
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

  getSearchData = () => {
    const { getDataSource } = this;
    getDataSource();
  };

  render() {
    const { columns, modalFooter, handleSearchChange, handleModalVisible, handleSearchDateChange } = this;
    const { dataSource, modalVisible, searchValue } = this.state;
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
              <AntdSelect defaultValue="" className="select-mid mr5" onChange={value => handleSearchChange('hq', value)} style={{ width: '20%' }}>
                <Select.Option value="">본부 전체</Select.Option>
                <Select.Option value={72761}>Magnachip 반도체</Select.Option>
                <Select.Option value={72762}>재무기획실</Select.Option>
              </AntdSelect>
              <AntdSelect defaultValue="" className="select-mid mr5" onChange={value => handleSearchChange('deptId', value)} style={{ width: '20%' }}>
                <Select.Option value="">팀 전체</Select.Option>
                <Select.Option value={76332}>HR</Select.Option>
                <Select.Option value={76332}>HR</Select.Option>
                <Select.Option value={76332}>HR</Select.Option>
                <Select.Option value={76332}>HR</Select.Option>
              </AntdSelect>
              <StyledButton className="btn-primary mr5" onClick={handleModalVisible}>
                입고등록
              </StyledButton>
            </div>
          </StyledSearchWrap>
          <AntdTable columns={columns} dataSource={dataSource} />
        </ContentsWrapper>
        <AntdModal title="입고 등록" visible={modalVisible} footer={modalFooter} onCancel={() => this.setState({ modalVisible: false })}>
          <ModalContents />
        </AntdModal>
      </>
    );
  }
}

List.propTypes = {
  sagaKey: PropTypes.string,
  getExtraApiData: PropTypes.func,
  extraApiData: PropTypes.object,
};

List.defaultProps = {
  sagaKey: '',
  getExtraApiData: null,
  extraApiData: null,
};

export default List;
