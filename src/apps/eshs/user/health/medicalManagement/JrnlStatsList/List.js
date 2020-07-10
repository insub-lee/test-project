import React, { Component } from 'react';
import { Table, Select, DatePicker, Modal, Popconfirm } from 'antd';
import PropTypes from 'prop-types';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';

import DrugForm from 'apps/eshs/user/health/medicalManagement/Drug/DrugList/DrugForm';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import moment from 'moment';

const AntdTable = StyledAntdTable(Table);
const AntdSelect = StyledSelect(Select);
const AntdModal = StyledAntdModal(Modal);
const AntdRangeDatePicker = StyledDatePicker(DatePicker.RangePicker);

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
      searchParam: {
        TO_DATE: toDate,
        FROM_DATE: fromDate,
        LIST_TYPE: 'NEWLIST',
        SITE_ID: 317,
        SYSTEM_CD: '1',
      },
      modalObj: {
        modalTitle: '',
        modalContent: [],
        modalVisible: false,
      },
      columns: [],
    };
  }

  componentDidMount() {
    const { spinningOn } = this.props;

    spinningOn();

    this.getInitData();
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
        key: 'List',
        url: `/api/eshs/v1/common/health/eshsHealthJrnlList`,
        type: 'POST',
        params: { PARAM: { ...searchParam } },
      },
    ];

    getCallDataHandler(sagaKey, apiAry, () => this.setState({ columns: this.setColumn(searchParam.LIST_TYPE || '') }, spinningOff));
  };

  getList = () => {
    const { sagaKey: id, getCallDataHandler, spinningOn, spinningOff } = this.props;
    const { searchParam } = this.state;

    spinningOn();
    const apiAry = [
      {
        key: 'List',
        url: `/api/eshs/v1/common/health/eshsHealthJrnlList`,
        type: 'POST',
        params: { PARAM: { ...searchParam } },
      },
    ];
    return getCallDataHandler(id, apiAry, () =>
      this.setState(
        {
          columns: this.setColumn(searchParam.LIST_TYPE),
        },
        spinningOff,
      ),
    );
  };

  handleAction = actionType => {
    const { sagaKey, submitHandlerBySaga, profile, spinningOn, spinningOff } = this.props;
    const { searchParam } = this.state;
    const submitData = {
      PARAM: {
        ...searchParam,
        EMP_NO: profile.EMP_NO,
        USER_ID: profile.USER_ID,
      },
    };

    spinningOn();
    switch (actionType) {
      case 'SANGSIN':
        submitHandlerBySaga(sagaKey, 'POST', '/api/eshs/v1/common/health/eshsHealthJrnlStatusUpdate', submitData, (id, res) => {
          spinningOff();
          if (res && res.result > 0) {
            this.showMessage(`${res.result}건이 일괄상신 되었습니다.`);
            return this.getList();
          }
          return this.showMessage('일괄상신건이 없습니다.');
        });
        break;
      case 'APPROVAL':
        submitHandlerBySaga(sagaKey, 'PUT', '/api/eshs/v1/common/health/eshsHealthJrnlStatusUpdate', submitData, (id, res) => {
          spinningOff();
          if (res && res.result > 0) {
            this.showMessage(`${res.result}건이 일괄승인 되었습니다.`);
            return this.getList();
          }
          return this.showMessage('일괄승인건이 없습니다.');
        });
        break;
      default:
        break;
    }
  };

  showMessage = text => message.info(<MessageContent>{text}</MessageContent>);

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
          <DrugForm key="DrugForm" defaultForm={formData} type={type} workAreaList={workAreaList} modalVisible={this.modalVisible} getList={this.getList} />,
        ],
        modalTitle: type === 'INPUT' ? '신규등록' : '관리',
      },
    });
  };

  setColumn = listType => [
    {
      title: '일자',
      dataIndex: 'JRNL_DT',
      width: '12%',
      align: 'center',
    },
    {
      title: '상태',
      dataIndex: 'APP_DESC',
      width: '10%',
      align: 'center',
    },
    {
      title: '상병자',
      children:
        listType === 'OLDLIST'
          ? [
              {
                title: '총진료',
                dataIndex: 'TA',
                width: '8%',
                align: 'center',
              },
              {
                title: '의사진',
                dataIndex: 'T1',
                width: '8%',
                align: 'center',
              },
              {
                title: '비진료',
                dataIndex: 'T2',
                width: '8%',
                align: 'center',
              },
            ]
          : [
              {
                title: '총진료',
                dataIndex: 'TA',
                width: '8%',
                align: 'center',
              },
              {
                title: '직업성',
                dataIndex: 'T1',
                width: '8%',
                align: 'center',
              },
              {
                title: '비직업성',
                dataIndex: 'T2',
                width: '8%',
                align: 'center',
              },
            ],
      width: '24%',
      align: 'center',
    },
    listType === 'OLDLIST'
      ? {
          title: '치료',
          width: '24%',
          children: [
            { title: '총치료', dataIndex: 'PA', width: '8%', align: 'center' },
            { title: '사상', dataIndex: 'P1', width: '8%', align: 'center' },
            { title: '공상', dataIndex: 'P2', width: '8%', align: 'center' },
          ],
          align: 'center',
        }
      : {
          title: '방문',
          width: '24%',
          children: [
            { title: '건강관리실', dataIndex: 'PA', width: '12%', align: 'center' },
            { title: 'CMS', dataIndex: 'P1', width: '12%', align: 'center' },
          ],
          align: 'center',
        },
    {
      title: '작성자',
      dataIndex: 'CREATE_EMPNM',
      width: '10%',
      align: 'center',
    },
    {
      title: '1차 결재자',
      dataIndex: 'APP1_EMPNM',
      width: '10%',
      align: 'center',
    },
    {
      title: '2차 결재자',
      dataIndex: 'APP2_EMPNM',
      width: '10%',
      align: 'center',
    },
  ];

  getWorkName = (list, nodeId) => {
    const fIdx = (list && list.findIndex(item => item.NODE_ID === nodeId)) || -1;

    return fIdx > -1 ? list[fIdx].NAME_KOR : '';
  };

  render() {
    const { result, customOnRowClick, profile } = this.props;
    const { modalObj, columns, searchParam } = this.state;
    const list = (result && result.List && result.List.list) || [];
    const workAreaList = (result && result.workAreaList && result.workAreaList.categoryMapList) || [];

    return (
      <>
        <AntdModal width={850} visible={modalObj.modalVisible} title={modalObj.modalTitle || ''} onCancel={this.modalVisible} destroyOnClose footer={null}>
          {modalObj.modalContent}
        </AntdModal>
        <StyledContentsWrapper>
          <StyledCustomSearchWrapper className="search-wrapper-inline">
            <div>
              <AntdSelect className="select-sm mr5" style={{ width: 170 }} defaultValue="NEWLIST" onChange={val => this.onChangeSearchParam('LIST_TYPE', val)}>
                <AntdSelect.Option value="NEWLIST">최근 일지목록</AntdSelect.Option>
                <AntdSelect.Option value="OLDLIST">과거 일지목록</AntdSelect.Option>
              </AntdSelect>
              <AntdSelect
                className="select-sm mr5"
                style={{ width: 100 }}
                placeholder="지역"
                defaultValue={317}
                onChange={val => this.onChangeSearchParam('SITE_ID', val)}
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
                allowClear={false}
                defaultValue={[moment(toDate), moment(fromDate)]}
                onChange={(val1, val2) => this.onChangeRangeDatePicker(val1, val2)}
              />
              <AntdSelect
                className="select-sm mr5"
                style={{ width: 100 }}
                placeholder="상태전체"
                allowClear
                onChange={val => this.onChangeSearchParam('APP_STATUS', val)}
              >
                <AntdSelect.Option value="notApp">미작성</AntdSelect.Option>
                <AntdSelect.Option value="0">저장</AntdSelect.Option>
                <AntdSelect.Option value="0A">상신</AntdSelect.Option>
                <AntdSelect.Option value="1A">1차승인</AntdSelect.Option>
                <AntdSelect.Option value="2A">완료</AntdSelect.Option>
                <AntdSelect.Option value="0A', '1A">미결재</AntdSelect.Option>
              </AntdSelect>
              <StyledButton className="btn-gray btn-sm mr5" onClick={this.getList}>
                검색
              </StyledButton>
            </div>
          </StyledCustomSearchWrapper>
          <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10">
            <Popconfirm
              title={
                <pre>{`지역 : ${this.getWorkName(workAreaList, searchParam.SITE_ID)}\n기간 : ${searchParam.TO_DATE} ~ ${searchParam.FROM_DATE} \n사번 : ${
                  profile.EMP_NO
                } \n일괄상신 하시겠습니까 ?`}</pre>
              }
              onConfirm={() => this.handleAction('SANGSIN')}
              okText="Yes"
              cancelText="No"
            >
              <StyledButton className="btn-primary btn-sm mr5">일괄상신</StyledButton>
            </Popconfirm>
            <Popconfirm
              title={
                <pre>{`지역 : ${this.getWorkName(workAreaList, searchParam.SITE_ID)}\n기간 : ${searchParam.TO_DATE} ~ ${searchParam.FROM_DATE} \n사번 : ${
                  profile.EMP_NO
                } \n일괄승인 하시겠습니까 ?`}</pre>
              }
              onConfirm={() => this.handleAction('APPROVAL')}
              okText="Yes"
              cancelText="No"
            >
              <StyledButton className="btn-primary btn-sm mr5">일괄승인</StyledButton>
            </Popconfirm>
          </StyledButtonWrapper>
          <AntdTable
            columns={columns}
            footer={() => <span>{`${(list && list.length) || 0} 건`}</span>}
            dataSource={list || []}
            bordered
            rowKey="JRNL_DT"
            onRow={record => ({
              onClick: e => (typeof customOnRowClick === 'function' ? customOnRowClick(record) : this.modalVisible(record, 'MODIFY')),
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
  customOnRowClick: PropTypes.any,
  submitHandlerBySaga: PropTypes.func,
  profile: PropTypes.object,
};

List.defaultProps = {
  spinningOn: () => {},
  spinningOff: () => {},
  result: {},
  getCallDataHandler: () => {},
  customOnRowClick: undefined,
  submitHandlerBySaga: () => {},
  profile: {},
};

export default List;
