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
        SEARCH_LIST: 'STMT',
      },
      modalObj: {
        modalTitle: '',
        modalContent: [],
        modalVisible: false,
      },
      selectColumn: 'STMT',
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
    ];

    getCallDataHandler(sagaKey, apiAry, spinningOff);
  };

  getList = () => {
    const { sagaKey: id, getCallDataHandler, spinningOn, spinningOff } = this.props;
    const {
      searchParam,
      searchParam: { SEARCH_LIST },
    } = this.state;
    const apiAry = [
      {
        key: 'List',
        url: `/api/eshs/v1/common/health/eshsHealthChkResultList`,
        type: 'POST',
        params: { PARAM: { ...searchParam } },
      },
    ];
    spinningOn();
    this.setState(
      {
        selectColumn: SEARCH_LIST,
      },
      () => getCallDataHandler(id, apiAry, spinningOff),
    );
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
    width: '100px',
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

  chkCdColumn = {
    title: '검진코드',
    dataIndex: 'CHK_CD',
    width: '100px',
    align: 'center',
    render: (text, record) => text, // TODO 검진코드 모달 추가
  };

  colObj = {
    RESULT: [
      {
        title: '이름',
        dataIndex: 'NAME_KOR',
        width: '100px',
        align: 'center',
      },
      {
        title: '주민번호',
        dataIndex: 'REGNO',
        width: '180px',
        align: 'center',
      },
      { ...this.empNoColumn },
      {
        title: '종합소견',
        dataIndex: 'TOTAL_COMMENT',
        width: '500px',
        align: 'center',
        render: (text, record) => text && <div dangerouslySetInnerHTML={{ __html: text.replace(/니다./gi, '니다.<br/>') }} />,
      },
      {
        title: '조치',
        dataIndex: 'MEASURE',
        width: '500px',
        align: 'center',
        render: (text, record) => text && <div dangerouslySetInnerHTML={{ __html: text.replace(/니다./gi, '니다.<br/>') }} />,
      },
      {
        title: '검진기관',
        dataIndex: 'HOSPITAL_NAME',
        width: '200px',
        align: 'center',
      },
      {
        title: '검진당시 소속',
        dataIndex: 'DEPT_NAME_KOR',
        width: '200px',
        align: 'center',
      },
      {
        title: '현지역',
        dataIndex: 'WORK_AREA_NAME',
        width: '100px',
        align: 'center',
      },
      {
        title: '검종',
        dataIndex: 'CHK_TYPE_NAME',
        width: '70px',
        align: 'center',
      },
      {
        title: '시행차수',
        dataIndex: 'TRIAL_SEQ',
        width: '100px',
        align: 'center',
      },
      {
        title: '차수',
        dataIndex: 'CHK_SEQ',
        width: '50px',
        align: 'center',
      },
      {
        ...this.chkCdColumn,
      },
    ],
    STMT: [
      {
        title: '이름',
        dataIndex: 'NAME_KOR',
        width: '100px',
        align: 'center',
      },
      {
        title: '주민번호',
        dataIndex: 'REGNO',
        width: '180px',
        align: 'center',
      },
      { ...this.empNoColumn },
      {
        title: '검종',
        dataIndex: 'CHK_TYPE_NAME',
        width: '70px',
        align: 'center',
      },
      {
        title: '시행차수',
        dataIndex: 'TRIAL_SEQ',
        width: '100px',
        align: 'center',
      },
      {
        title: '차수',
        dataIndex: 'CHK_SEQ',
        width: '50px',
        align: 'center',
      },
      {
        title: '배우자',
        dataIndex: 'FAM_NAME',
        width: '100px',
        align: 'center',
      },
      {
        title: '검진기관',
        dataIndex: 'HOSPITAL_NAME',
        width: '200px',
        align: 'center',
      },
      {
        title: '결과',
        dataIndex: 'IS_RESULT',
        width: '50px',
        align: 'center',
      },
      {
        title: '예약일',
        dataIndex: 'APP_DT',
        width: '200px',
        align: 'center',
      },
      {
        title: '검진일',
        dataIndex: 'CHK_DT',
        width: '200px',
        align: 'center',
      },
      {
        title: '검진당시 소속',
        dataIndex: 'DEPT_NAME_KOR',
        width: '200px',
        align: 'center',
      },
      {
        title: '현지역',
        dataIndex: 'WORK_AREA_NAME',
        width: '100px',
        align: 'center',
      },
      {
        ...this.chkCdColumn,
      },
    ],
    ITEM: [
      {
        title: '이름',
        dataIndex: 'NAME_KOR',
        width: '100px',
        align: 'center',
      },
      {
        title: '주민번호',
        dataIndex: 'REGNO',
        width: '180px',
        align: 'center',
      },
      { ...this.empNoColumn },

      {
        title: '코드',
        dataIndex: 'CHK_RESULT_ITEM_CD',
        width: '80px',
        align: 'center',
      },
      {
        title: '항목명',
        dataIndex: 'CHK_RESULT_ITEM_NM',
        width: '300px',
        align: 'center',
      },
      {
        title: '결과',
        dataIndex: 'RESULT',
        width: '300px',
        align: 'center',
      },
      {
        title: '검진기관',
        dataIndex: 'HOSPITAL_NAME',
        width: '200px',
        align: 'center',
      },
      {
        title: '검진당시 소속',
        dataIndex: 'DEPT_NAME_KOR',
        width: '200px',
        align: 'center',
      },
      {
        title: '현지역',
        dataIndex: 'WORK_AREA_NAME',
        width: '100px',
        align: 'center',
      },
      {
        title: '종합',
        dataIndex: 'CHK_TYPE_NAME',
        width: '70px',
        align: 'center',
      },
      {
        title: '시행차수',
        dataIndex: 'TRIAL_SEQ',
        width: '100px',
        align: 'center',
      },
      {
        title: '차수',
        dataIndex: 'CHK_SEQ',
        width: '50px',
        align: 'center',
      },
      {
        ...this.chkCdColumn,
      },
    ],
    DISEASE: [
      {
        title: '이름',
        dataIndex: 'NAME_KOR',
        width: '100px',
        align: 'center',
      },
      {
        title: '주민번호',
        dataIndex: 'REGNO',
        width: '180px',
        align: 'center',
      },
      { ...this.empNoColumn },
      {
        title: '등급',
        dataIndex: 'DECISION_NAME',
        width: '100px',
        align: 'center',
      },
      {
        title: '판정',
        dataIndex: 'DISEASE_CD',
        width: '100px',
        align: 'left',
      },
      {
        title: '기타및D2 병명',
        dataIndex: 'DISEASE_DESC',
        width: '350px',
        align: 'left',
        render: (text, record) => text && <div dangerouslySetInnerHTML={{ __html: text }} />,
      },
      {
        title: '검진기관',
        dataIndex: 'HOSPITAL_NAME',
        width: '200px',
        align: 'center',
      },
      {
        title: '검진당시 소속',
        dataIndex: 'DEPT_NAME_KOR',
        width: '200px',
        align: 'center',
      },
      {
        title: '현지역',
        dataIndex: 'WORK_AREA_NAME',
        width: '100px',
        align: 'center',
      },
      {
        title: '검종',
        dataIndex: 'CHK_TYPE_NAME',
        width: '70px',
        align: 'center',
      },
      {
        title: '시행차수',
        dataIndex: 'TRIAL_SEQ',
        width: '100px',
        align: 'center',
      },
      {
        title: '차수',
        dataIndex: 'CHK_SEQ',
        width: '50px',
        align: 'center',
      },
      {
        ...this.chkCdColumn,
      },
    ],
  };

  render() {
    const { result } = this.props;
    const { yearList, modalObj, selectColumn } = this.state;
    const list = (result && result.List && result.List.list) || [];
    const hospitalList = (result && result.hospitalList && result.hospitalList.list) || [];
    const chkTypeList = (result && result.chkTypeList && result.chkTypeList.categoryMapList) || [];
    const workAreaList = (result && result.workAreaList && result.workAreaList.categoryMapList) || [];

    return (
      <>
        <AntdModal width={850} visible={modalObj.modalVisible} title={modalObj.modalTitle || ''} onCancel={this.modalVisible} destroyOnClose footer={null}>
          {modalObj.modalContent}
        </AntdModal>
        <StyledContentsWrapper>
          <StyledCustomSearchWrapper className="search-wrapper-inline">
            <div className="search-input-area">
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
              <AntdSelect
                className="select-sm mr5"
                style={{ width: 200 }}
                defaultValue="STMT"
                placeholder="조회"
                onChange={val => this.onChangeSearchParam('SEARCH_LIST', val)}
              >
                <AntdSelect.Option value="RESULT">1. 종합소견/조치</AntdSelect.Option>
                <AntdSelect.Option value="ITEM">2. 항목</AntdSelect.Option>
                <AntdSelect.Option value="DISEASE">3. 판정/병명</AntdSelect.Option>
                <AntdSelect.Option value="STMT">4. 검진상세정보</AntdSelect.Option>
              </AntdSelect>
              <div style={{ display: 'inline-block' }}>
                <UserSearchModal visible onClickRow={record => this.onChangeSearchParam('userId', record.USER_ID)} />
              </div>
            </div>
            <div className="btn-area">
              <StyledButton className="btn-gray btn-sm" onClick={this.getList}>
                검색
              </StyledButton>
            </div>
          </StyledCustomSearchWrapper>
          <AntdTable columns={this.colObj[selectColumn]} dataSource={list || []} bordered scroll={{ x: 1277 }} />
        </StyledContentsWrapper>
      </>
    );
  }
}

export default List;
