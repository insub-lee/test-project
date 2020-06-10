import React, { Component } from 'react';
import { Table, Input, Select, DatePicker, Modal } from 'antd';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import UserSearchModal from 'apps/eshs/common/userSearchModal';

import EmpChkResultDetail from 'apps/eshs/admin/health/ChkResult/EmpChkResultDetail';

import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import moment from 'moment';
import MessageTab from 'containers/portal/App/UserSetting/MessageTab';

const currentYear = moment(new Date()).format('YYYY');

const AntdTable = StyledAntdTable(Table);
const AntdSelect = StyledSelect(Select);
const AntdInput = StyledInput(Input);
const AntdDatePicker = StyledDatePicker(DatePicker);
const AntdModal = StyledAntdModal(Modal);

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yearList: [],
      searchParam: {
        CHK_YEAR: currentYear,
      },
      modalObj: {
        modalTitle: '',
        modalContent: [],
        modalVisible: false,
      },
    };
  }

  componentDidMount() {
    const { sagaKey: id, getCallDataHandler, spinningOn } = this.props;

    spinningOn();

    const yearList = [];
    for (let i = currentYear; i >= 1998; i--) {
      yearList.push(i);
    }
    this.setState({ yearList });

    this.getInitData();
  }

  getInitData = () => {
    const { sagaKey, getCallDataHandler, spinningOff } = this.props;
    const apiAry = [
      {
        key: 'hospitalList',
        url: `/api/eshs/v1/common/health/healthChkHospital`,
        type: 'GET',
        params: {},
      },
      {
        key: 'chkTypeList',
        url: '/api/admin/v1/common/categoryMapList',
        type: 'POST',
        params: {
          PARAM: { NODE_ID: 675 },
        },
      },
      {
        key: 'workAreaList',
        url: '/api/admin/v1/common/categoryMapList',
        type: 'POST',
        params: {
          PARAM: { NODE_ID: 316 },
        },
      },
      {
        key: 'resultCodeList',
        url: '/api/eshs/v1/common/health/healthChkResultCodeList',
        type: 'POST',
        params: {
          PARAM: {},
        },
      },
    ];

    getCallDataHandler(sagaKey, apiAry, spinningOff);
  };

  getList = () => {
    const { sagaKey: id, getCallDataHandler, spinningOn, spinningOff } = this.props;
    const { searchParam } = this.state;
    const chkResultItemCd = (searchParam && searchParam.CHK_RESULT_ITEM_CD) || '';
    if (!chkResultItemCd) return message.info(<MessageContent>검진항목을 선택해 주세요.</MessageContent>);

    spinningOn();
    const apiAry = [
      {
        key: 'List',
        url: `/api/eshs/v1/common/health/eshsHealthChkResutListByItemCd`,
        type: 'POST',
        params: { PARAM: { ...searchParam } },
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

  modalVisible = () => {
    const {
      modalObj,
      modalObj: { modalVisible },
    } = this.state;
    if (modalVisible) {
      return this.setState({
        modalObj: { modalContent: [], modalTitle: '', modalVisible: !modalVisible },
      });
    }
    return this.setState({
      modalObj: { ...modalObj, modalVisible: !modalVisible },
    });
  };

  empNoColumn = {
    title: '사번',
    dataIndex: 'EMP_NO',
    width: '7%',
    align: 'center',
    render: (text, record) => (
      <StyledButton
        className="btn-link btn-sm"
        onClick={() =>
          this.setState(
            {
              modalObj: {
                modalTitle: '개인검진결과',
                modalContent: [<EmpChkResultDetail userSearch={false} defaultUser={record.USER_ID} chkYear={record.CHK_YEAR} />],
              },
            },
            this.modalVisible,
          )
        }
      >
        {text}
      </StyledButton>
    ),
  };

  columns = [
    {
      title: '소속',
      dataIndex: 'DEPT_NAME_KOR',
      width: '20%',
      align: 'center',
    },
    {
      title: '이름',
      dataIndex: 'NAME_KOR',
      width: '7%',
      align: 'center',
    },
    { ...this.empNoColumn },
    {
      title: '검종',
      dataIndex: 'CHK_TYPE_NAME',
      width: '7%',
      align: 'center',
    },
    {
      title: '시행차수',
      dataIndex: 'TRIAL_SEQ',
      width: '10%',
      align: 'center',
    },
    {
      title: '차수',
      dataIndex: 'CHK_SEQ',
      width: '7%',
      align: 'center',
    },
    {
      title: '결과',
      dataIndex: 'RESULT',
      width: '15%',
      align: 'center',
    },
    {
      title: '검사항목',
      dataIndex: 'CHK_RESULT_ITEM_DESC',
      width: '20%',
      align: 'center',
    },
    {
      title: '상세',
      dataIndex: '',
      width: '7%',
      align: 'center',
      render: (text, record) => (
        <StyledButton className="btn-link btn-sm" onClick={() => message.info(<MessageContent>OzViewer 미구현</MessageContent>)}>
          보기
        </StyledButton>
      ),
    },
  ];

  render() {
    const { result } = this.props;
    const { yearList, modalObj, searchParam } = this.state;
    const list = (result && result.List && result.List.list) || [];
    const hospitalList = (result && result.hospitalList && result.hospitalList.list) || [];
    const chkTypeList = (result && result.chkTypeList && result.chkTypeList.categoryMapList) || [];
    const workAreaList = (result && result.workAreaList && result.workAreaList.categoryMapList) || [];
    const resultCodeList = (result && result.resultCodeList && result.resultCodeList.list) || [];

    return (
      <>
        <AntdModal width={850} visible={modalObj.modalVisible} title={modalObj.modalTitle || ''} onCancel={this.modalVisible} destroyOnClose footer={null}>
          {modalObj.modalContent}
        </AntdModal>
        <StyledContentsWrapper>
          <StyledCustomSearchWrapper className="search-wrapper-inline">
            <div className="search-input-area mb10">
              <AntdSelect
                defaultValue={currentYear}
                className="select-sm mr5"
                style={{ width: 100 }}
                onChange={val => this.onChangeSearchParam('CHK_YEAR', val)}
              >
                {yearList.map(year => (
                  <AntdSelect.Option value={year}>{`${year}년`}</AntdSelect.Option>
                ))}
              </AntdSelect>
              <AntdSelect
                className="select-sm mr5"
                style={{ width: 100 }}
                allowClear
                placeholder="지역"
                onChange={val => this.onChangeSearchParam('WORK_AREA_CD', val)}
              >
                {workAreaList
                  .filter(item => item.LVL === 1)
                  .map(item => (
                    <AntdSelect.Option value={item.NODE_ID}>{item.NAME_KOR}</AntdSelect.Option>
                  ))}
              </AntdSelect>
              <AntdSelect
                className="select-sm mr5"
                style={{ width: 200 }}
                allowClear
                placeholder="검진기관"
                onChange={val => this.onChangeSearchParam('HOSPITAL_CODE', val)}
              >
                {hospitalList.map(item => (
                  <AntdSelect.Option value={item.HOSPITAL_CODE}>{item.HOSPITAL_NAME}</AntdSelect.Option>
                ))}
              </AntdSelect>
              <AntdSelect
                className="select-sm mr5"
                style={{ width: 100 }}
                allowClear
                placeholder="검종"
                onChange={val => this.onChangeSearchParam('CHK_TYPE_CD_NODE_ID', val)}
              >
                {chkTypeList
                  .filter(item => item.LVL === 3)
                  .map(item => (
                    <AntdSelect.Option value={item.NODE_ID}>{item.NAME_KOR}</AntdSelect.Option>
                  ))}
              </AntdSelect>
            </div>

            <div className="search-input-area ">
              <AntdSelect
                className="select-sm mr5"
                style={{ width: 200 }}
                showSearch
                onChange={val => this.onChangeSearchParam('CHK_RESULT_ITEM_CD', val)}
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                placeholder="검진항목"
              >
                {resultCodeList
                  .filter(item => item.USE_YN === '1')
                  .map(item => (
                    <AntdSelect.Option key={item.CHK_RESULT_ITEM_CD} value={item.CHK_RESULT_ITEM_CD}>
                      {item.CHK_RESULT_ITEM_NM}
                    </AntdSelect.Option>
                  ))}
              </AntdSelect>
              <AntdSelect
                className="select-sm mr5"
                style={{ width: 120 }}
                allowClear
                placeholder="검진차수"
                onChange={val => this.onChangeSearchParam('CHK_SEQ', val)}
              >
                <AntdSelect.Option value="1">1차</AntdSelect.Option>
                <AntdSelect.Option value="2">재검</AntdSelect.Option>
              </AntdSelect>
              <UserSearchModal visible onClickRow={record => this.onChangeSearchParam('userId', record.USER_ID)} />
              <AntdSelect
                className="select-sm mr5"
                style={{ width: 100 }}
                placeholder="성별전체"
                allowClear
                onChange={val => this.onChangeSearchParam('GENDER', val)}
              >
                <AntdSelect.Option value="m">남성</AntdSelect.Option>
                <AntdSelect.Option value="f">여성</AntdSelect.Option>
              </AntdSelect>
              <AntdInput
                placeholder="결과 검색"
                allowClear
                className="ant-input-sm ant-input-inline mr5"
                style={{ width: 150 }}
                onChange={e => this.onChangeSearchParam('RESULT', e.target.value)}
              />
            </div>
            <div className="btn-area">
              <StyledButton className="btn-gray btn-sm" onClick={this.getList}>
                검색
              </StyledButton>
            </div>
          </StyledCustomSearchWrapper>
          <AntdTable columns={this.columns} dataSource={list || []} bordered scroll={{ x: 1277 }} />
        </StyledContentsWrapper>
      </>
    );
  }
}

export default List;
