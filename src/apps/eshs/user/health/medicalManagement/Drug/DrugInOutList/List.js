import React, { Component } from 'react';
import { Table, Input, Select, DatePicker, Modal } from 'antd';
import PropTypes from 'prop-types';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';

import DrugForm from 'apps/eshs/user/health/medicalManagement/Drug/DrugList/DrugForm';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import moment from 'moment';

const AntdTable = StyledAntdTable(Table);
const AntdSelect = StyledSelect(Select);
const AntdInput = StyledInput(Input);
const AntdRangeDatePicker = StyledDatePicker(DatePicker.RangePicker);

const AntdModal = StyledAntdModal(Modal);

const now = new Date();
const currentYear = now.getFullYear().toString();
const currentMonth = now.getMonth() + 1;
const currentDate = now.getDate();

const fromDate = moment(`${currentYear}-${currentMonth}-${currentDate}`).format('YYYY-MM-DD');
const toDate = moment(`${currentYear}-${currentMonth}-01`).format('YYYY-MM-DD');

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchParam: {},
      modalObj: {
        modalTitle: '',
        modalContent: [],
        modalVisible: false,
      },
    };
  }

  componentDidMount() {
    const { spinningOn } = this.props;
    spinningOn();
    this.setState(
      {
        searchParam: {
          TO_DATE: toDate,
          FROM_DATE: fromDate,
        },
      },
      this.getInitData,
    );
  }

  getInitData = () => {
    const { sagaKey, getCallDataHandler, spinningOff } = this.props;
    const { searchParam } = this.state;
    const apiAry = [
      {
        key: 'workAreaList',
        url: '/api/admin/v1/common/categoryMapList',
        type: 'POST',
        params: {
          PARAM: { NODE_ID: 316 },
        },
      },
      {
        key: 'companyList',
        url: '/api/admin/v1/common/categoryMapList',
        type: 'POST',
        params: {
          PARAM: { NODE_ID: 673 },
        },
      },
      {
        key: 'drugList',
        url: `/api/eshs/v1/common/health/eshsHealthMedicine`,
        type: 'POST',
        params: { PARAM: {} },
      },
      {
        key: 'List',
        url: `/api/eshs/v1/common/health/eshsHealthMedicineInOut`,
        type: 'POST',
        params: { PARAM: searchParam },
      },
    ];

    getCallDataHandler(sagaKey, apiAry, spinningOff);
  };

  getList = () => {
    const { sagaKey: id, getCallDataHandler, spinningOn, spinningOff } = this.props;
    const { searchParam } = this.state;

    spinningOn();
    const apiAry = [
      {
        key: 'List',
        url: `/api/eshs/v1/common/health/eshsHealthMedicineInOut`,
        type: 'POST',
        params: { PARAM: searchParam },
      },
    ];
    return getCallDataHandler(id, apiAry, spinningOff);
  };

  onChangeSearchParam = (key, val) => {
    this.setState(prevState => {
      const { searchParam } = prevState;
      searchParam[key] = val;
      return { searchParam };
    });
  };

  onChangeRangeDatePicker = (val1, val2) => {
    if (val2.length === 2) {
      const { searchParam } = this.state;
      this.setState({
        searchParam: { ...searchParam, TO_DATE: val2[0], FROM_DATE: val2[1] },
      });
    }
  };

  modalVisible = (formData = {}, type = 'INPUT') => {
    const { result } = this.props;
    const {
      modalObj: { modalVisible },
    } = this.state;
    const workAreaList = (result && result.workAreaList && result.workAreaList.categoryMapList) || [];
    if (modalVisible) {
      return this.setState({
        modalObj: { modalContent: [], modalTitle: '', modalVisible: !modalVisible },
      });
    }
    return this.setState({
      modalObj: {
        modalVisible: !modalVisible,
        modalContent: [
          <DrugForm key="DrugForm" defaultForm={formData} type={type} workAreaList={workAreaList} modalVisible={this.modalVisible} saveAfter={this.getList} />,
        ],
        modalTitle: type === 'INPUT' ? '신규등록' : '관리',
      },
    });
  };

  columns = [
    {
      title: '품목',
      dataIndex: 'DRUG',
      width: '13%',
      align: 'center',
    },
    {
      title: '제약회사',
      dataIndex: 'COMPANY',
      width: '13%',
      align: 'center',
    },
    {
      title: '규격',
      dataIndex: 'SIZE1',
      width: '8%',
      align: 'center',
    },
    {
      title: '입출',
      dataIndex: 'IN_OUT_TYPE',
      width: '8%',
      align: 'center',
    },
    {
      title: '수량',
      dataIndex: 'QTY',
      width: '10%',
      align: 'center',
    },
    {
      title: '단위',
      dataIndex: 'UNIT',
      width: '8%',
      align: 'center',
    },
    {
      title: '발생일',
      dataIndex: 'POSTING_DT',
      width: '10%',
      align: 'center',
    },
    {
      title: '부서',
      dataIndex: 'DEPT_NAME_KOR',
      width: '20%',
      align: 'center',
    },
    {
      title: '이름',
      dataIndex: 'EMP_NM',
      width: '10%',
      align: 'center',
    },
  ];

  render() {
    const { result } = this.props;
    const { modalObj } = this.state;
    const list = (result && result.List && result.List.list) || [];
    const workAreaList = (result && result.workAreaList && result.workAreaList.categoryMapList) || [];
    const companyList = (result && result.companyList && result.companyList.categoryMapList) || [];
    const drugList = (result && result.drugList && result.drugList.list) || [];

    return (
      <>
        <AntdModal width={850} visible={modalObj.modalVisible} title={modalObj.modalTitle || ''} onCancel={this.modalVisible} destroyOnClose footer={null}>
          {modalObj.modalContent}
        </AntdModal>
        <StyledContentsWrapper>
          <StyledCustomSearchWrapper>
            <div className="search-input-area mb10">
              <AntdSelect
                className="select-sm mr5"
                style={{ width: 100 }}
                allowClear
                placeholder="지역"
                onChange={val => this.onChangeSearchParam('SITE_NODE_ID', val)}
              >
                {workAreaList
                  .filter(item => item.LVL === 1)
                  .map(item => (
                    <AntdSelect.Option key={item.NODE_ID} value={item.NODE_ID}>
                      {item.NAME_KOR}
                    </AntdSelect.Option>
                  ))}
              </AntdSelect>
              <AntdRangeDatePicker
                className="ant-picker-sm mr5"
                format="YYYY-MM-DD"
                style={{ width: 325 }}
                defaultValue={[moment(toDate), moment(fromDate)]}
                onChange={(val1, val2) => this.onChangeRangeDatePicker(val1, val2)}
              />
              <AntdSelect
                className="select-sm mr5"
                style={{ width: 120 }}
                allowClear
                placeholder="입출고 전체"
                onChange={val => this.onChangeSearchParam('IN_OUT_TYPE', val)}
              >
                <AntdSelect.Option value="입고">입고</AntdSelect.Option>
                <AntdSelect.Option value="출고">출고</AntdSelect.Option>
              </AntdSelect>
              <AntdSelect
                className="select-sm mr5"
                style={{ width: 150 }}
                allowClear
                placeholder="협력업체 전체"
                onChange={val => this.onChangeSearchParam('COOPERATOR', val)}
              >
                {companyList
                  .filter(item => item.LVL === 3)
                  .map(item => (
                    <AntdSelect.Option key={item.NODE_ID} value={item.NODE_ID}>
                      {item.NAME_KOR}
                    </AntdSelect.Option>
                  ))}
              </AntdSelect>
              <AntdSelect
                className="select-sm mr5"
                style={{ width: 200 }}
                allowClear
                placeholder="일반의약품 전체"
                onChange={val => this.onChangeSearchParam('DRUG_CD', val)}
              >
                {drugList.map(item => (
                  <AntdSelect.Option key={item.DRUG_CD} value={item.DRUG_CD}>
                    {item.DRUG}
                  </AntdSelect.Option>
                ))}
              </AntdSelect>
            </div>
            <div className="btn-area">
              <StyledButton className="btn-gray btn-sm mr5" onClick={this.getList}>
                검색
              </StyledButton>
              <StyledButton className="btn-primary btn-sm" onClick={() => this.modalVisible({}, 'INPUT')}>
                등록
              </StyledButton>
            </div>
          </StyledCustomSearchWrapper>
          <AntdTable
            columns={this.columns}
            footer={() => <span>{`${(list && list.length) || 0} 건`}</span>}
            // scroll={{ y: '100%' }}
            // pagination={false}
            dataSource={list || []}
            bordered
            rowKey="ROWNUM"
            onRow={record => ({
              onClick: e => this.modalVisible(record, 'MODIFY'),
            })}
          />
        </StyledContentsWrapper>
      </>
    );
  }
}

List.propTypes = {
  spinningOn: PropTypes.func,
  spinningOff: PropTypes.func,
  sagaKey: PropTypes.string,
  result: PropTypes.object,
  getCallDataHandler: PropTypes.func,
};

List.defaultProps = {
  spinningOn: () => {},
  spinningOff: () => {},
  result: {},
  getCallDataHandler: () => {},
};

export default List;
