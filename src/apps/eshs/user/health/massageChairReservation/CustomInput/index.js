import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Checkbox, Popconfirm, DatePicker } from 'antd';

import BizMicroDevBase from 'components/BizMicroDevBase';
import BizBuilderBase from 'components/BizBuilderBase';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';

import styled from 'styled-components';

import moment from 'moment';

import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

const saveBefore = (spinningOn, timeZone, setFormData, saveFunc) => {
  if (!timeZone) return message.info(<MessageContent>시간을 선택하세요.</MessageContent>);
  spinningOn();
  setFormData();
  return saveFunc();
};

const saveBtn = ({ ...props }) => {
  const { sagaKey: id, inputFormData, setFormData, saveTask, formData, viewPageData, changeViewPage, getTimeTable, spinningOn, spinningOff } = props;
  const timeZone = (inputFormData && inputFormData.TIME_ZONE) || '';

  // saveTask(id, id)
  return (
    <Popconfirm
      title="예약하시겠습니까?"
      onConfirm={() =>
        saveBefore(
          spinningOn,
          timeZone,
          () => setFormData(id, { ...formData, ...inputFormData }),
          () =>
            saveTask(id, id, () => {
              changeViewPage(id, viewPageData.workSeq, -1, 'INPUT');
              message.info(<MessageContent>저장되었습니다.</MessageContent>);
              getTimeTable();
              return spinningOff();
            }),
        )
      }
    >
      <StyledButton className="btn-primary btn-sm ml5">예약</StyledButton>
    </Popconfirm>
  );
};

const CustomBuilderSave = styled.div`
  .ant-spin-spinning {
    display: none;

    .ant-spin-dot {
      display: none;
    }
    .ant-spin-dot-spin {
      display: none;
    }
  }
`;

const BuilderSave = ({ inputFormData = {}, getTimeTable, spinningOn, spinningOff }) => (
  <CustomBuilderSave>
    <BizBuilderBase
      sagaKey="MassageChairReservation_SAVE"
      workSeq={4201}
      viewType="INPUT"
      getTimeTable={getTimeTable}
      spinningOn={spinningOn}
      spinningOff={spinningOff}
      inputFormData={inputFormData}
      CustomInputPage={saveBtn}
    />
  </CustomBuilderSave>
);

const AntdDatePicker = StyledDatePicker(DatePicker);
const AntdTable = StyledAntdTable(Table);

const today = moment(new Date()).format('YYYY-MM-DD');

const timeList = [
  { text: '08:30 ~ 09:00', value: '0830' },
  { text: '09:00 ~ 09:30', value: '0900' },
  { text: '09:30 ~ 10:00', value: '0930' },
  { text: '10:00 ~ 10:30', value: '1000' },
  { text: '10:30 ~ 11:00', value: '1030' },
  { text: '11:00 ~ 11:30', value: '1100' },
  { text: '11:30 ~ 12:00', value: '1130' },
  { text: '12:00 ~ 12:30', value: '1200' },
  { text: '12:30 ~ 13:00', value: '1230' },
  { text: '13:00 ~ 13:30', value: '1300' },
  { text: '13:30 ~ 14:00', value: '1330' },
  { text: '14:00 ~ 14:30', value: '1400' },
  { text: '14:30 ~ 15:00', value: '1430' },
  { text: '15:00 ~ 15:30', value: '1500' },
  { text: '15:30 ~ 16:00', value: '1530' },
  { text: '16:00 ~ 16:30', value: '1600' },
  { text: '16:30 ~ 17:00', value: '1630' },
  { text: '17:00 ~ 17:30', value: '1700' },
];

class Comp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        APP_DT: today,
        TIME_ZONE: '',
      },
      timeTable: [],
      weekCount: {
        RCNT: 0,
        NCNT: 0,
      },
    };
  }

  componentDidMount = () => {
    const { sagaKey: id, getCallDataHandler, spinningOn, profile } = this.props;
    const {
      formData: { APP_DT },
    } = this.state;
    spinningOn();
    const userId = profile.USER_ID || 0;
    const apiAry = [
      {
        key: 'getUserInfo',
        url: '/api/eshs/v1/common/userinfowithgender',
        type: 'GET',
      },
      {
        key: 'getTimetable',
        type: 'GET',
        url: `/api/eshs/v1/common/getphysicaltherapytimetable?date=${APP_DT}`,
      },
      {
        key: 'weekCount',
        type: 'GET',
        url: `/api/eshs/v1/common/getphysicaltheraptyreservation?DATE=${APP_DT}&USER_ID=${userId}`,
      },
      {
        key: 'noShowUpdate',
        type: 'PUT',
        url: `/api/eshs/v1/common/getphysicaltherapynoshowcount`,
        params: { PARAM: { date: moment(APP_DT).format('YYYYMMDD') } },
      },
    ];

    getCallDataHandler(id, apiAry, this.appStart);
  };

  appStart = () => {
    const { result, spinningOff } = this.props;

    const userInfo = (result && result.getUserInfo && result.getUserInfo.userInfo) || {};
    const timeTable = (result && result.getTimetable && result.getTimetable.timetable) || [];
    const weekCount = (result && result.weekCount && result.weekCount.reservationCount) || {};

    return this.setState(
      prevState => ({
        formData: {
          ...userInfo,
          APP_DT: prevState.formData.APP_DT,
          IS_APP: 1,
          IS_CHK: 2,
          BOOKER_ID: userInfo.USER_ID,
          BED_NO: userInfo.GENDER === 'f' ? '06' : '05',
          SITE: userInfo.BAREA_CD === '청주' ? 'C1' : 'H3',
        },
        timeTable,
        weekCount,
      }),
      spinningOff,
    );
  };

  getTimeTable = () => {
    const { sagaKey: id, getCallDataHandler, spinningOn } = this.props;
    const {
      formData: { APP_DT },
      formData,
    } = this.state;
    spinningOn();
    const userId = (formData && formData.USER_ID) || 0;
    const apiAry = [
      {
        key: 'getTimetable',
        type: 'GET',
        url: `/api/eshs/v1/common/getphysicaltherapytimetable?date=${APP_DT}`,
      },
      {
        key: 'weekCount',
        type: 'GET',
        url: `/api/eshs/v1/common/getphysicaltheraptyreservation?DATE=${APP_DT}&USER_ID=${userId}`,
      },
    ];

    getCallDataHandler(id, apiAry, this.appStart);
  };

  handleOnDateChange = date =>
    this.setState(
      prevState => ({
        formData: { ...prevState.formData, APP_DT: date },
      }),
      this.getTimeTable,
    );

  disableDate = current => {
    const {
      profile: { USER_ID },
    } = this.props;

    return USER_ID === 1
      ? false
      : moment(current).format('YYYYMMDD') ===
          moment(current)
            .startOf('week')
            .format('YYYYMMDD') ||
          moment(current).format('YYYYMMDD') ===
            moment(current)
              .endOf('week')
              .format('YYYYMMDD') ||
          moment(current).format('YYYYMMDD') >
            moment(this.date)
              .add(1, 'week')
              .endOf('week')
              .format('YYYYMMDD') ||
          (current && current < moment().startOf('day'));
  };

  handleOnCheck = (checked, index, record) => {
    const {
      weekCount: { RCNT, NCNT },
      timeTable,
      formData,
    } = this.state;
    const userId = (formData && formData.USER_ID) || 0;
    if (timeTable.findIndex(user => user.reg_user_id === userId) !== -1) return message.info(<MessageContent>1일 1회만 예약이 가능합니다.</MessageContent>);
    if (RCNT >= 3) return message.info(<MessageContent>1주 3회까지 예약이 가능합니다.</MessageContent>);
    if (NCNT >= 1) return message.info(<MessageContent>예약 후 미사용으로 예약이 불가능합니다.</MessageContent>);
    return this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        TIME_ZONE: checked ? record.value : '',
      },
    }));
  };

  handleDelete = timeZone => {
    const { sagaKey: id, submitHandlerBySaga, spinningOn, spinningOff } = this.props;
    const {
      formData: { APP_DT },
    } = this.state;
    spinningOn();

    submitHandlerBySaga(id, 'DELETE', '/api/eshs/v1/common/getphysicaltherapytimetable', { PARAM: { appDt: APP_DT, timeZone } }, (afterId, res) => {
      if (res && res.isDeleted === 1) {
        message.info(<MessageContent>삭제되었습니다.</MessageContent>);
        return this.getTimeTable();
      }
      spinningOff();
      return message.info(<MessageContent>삭제에 실패하였습니다.</MessageContent>);
    });
  };

  handleConfirm = (timeZone, isChk) => {
    const { sagaKey: id, submitHandlerBySaga, spinningOn, spinningOff } = this.props;
    const {
      formData: { APP_DT },
    } = this.state;
    spinningOn();

    if (typeof isChk !== 'number') {
      return;
    }

    submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/getphysicaltherapytimetable', { PARAM: { appDt: APP_DT, timeZone, isChk } }, (afterId, res) => {
      if (res && res.isUpdated === 1) {
        message.info(<MessageContent>사용확인 되었습니다.</MessageContent>);
        return this.getTimeTable();
      }
      spinningOff();
      return message.info(<MessageContent>사용확인에 실패하였습니다.</MessageContent>);
    });
  };

  columns = [
    {
      title: '시간',
      align: 'center',
      dataIndex: 'text',
    },
    {
      title: '건강증진실(안마의자)',
      children: [
        {
          title: '안마의자(남)',
          align: 'center',
          dataIndex: 'value',

          render: (text, record, index) => {
            if (text === '1200' || text === '1230') return <span>점심 휴무</span>;

            const { formData, timeTable } = this.state;
            const userId = (formData && formData.USER_ID) || 0;
            const gender = (formData && formData.GENDER) || 'm';
            const APP_DT = (formData && formData.APP_DT) || '';
            const timeZone = (formData && formData.TIME_ZONE) || '';

            const fIdx = timeTable && timeTable.findIndex(user => user.gender !== 'f' && user.time_zone === text);

            if (fIdx <= -1)
              return (
                <Checkbox
                  onChange={e => this.handleOnCheck(e.target.checked, index, record)}
                  checked={text === timeZone && gender !== 'f'}
                  disabled={
                    gender === 'f' ||
                    (moment() > moment(record.text.substring(0, 5), 'HH:mm') && moment().format('YYYY-MM-DD') >= moment(APP_DT).format('YYYY-MM-DD'))
                  }
                />
              );

            const chkUser = timeTable[fIdx] || {};

            // 예약했지만 관리자가 아니면 취소버튼 나옴
            if (userId === chkUser.reg_user_id && userId !== 1)
              return (
                <div>
                  <span>{chkUser.name_kor}님이 예약</span>
                  <Popconfirm title="취소하시겠습니까?" onConfirm={e => this.handleDelete(text)}>
                    <StyledButton className="btn-primary btn-sm ml5">취소</StyledButton>
                  </Popconfirm>
                </div>
              );
            // 관리자
            if (userId === 1) {
              // 관리자면서 사용확인 안 된 예약
              if (chkUser.is_chk === 2)
                return (
                  <div>
                    <span>{chkUser.name_kor}님이 예약</span>
                    <Popconfirm title="취소하시겠습니까?" onConfirm={e => this.handleDelete(text)}>
                      <StyledButton className="btn-primary btn-sm ml5">취소</StyledButton>
                    </Popconfirm>
                    <Popconfirm title="확인하시겠습니까?" onConfirm={() => this.handleConfirm(text, 1)}>
                      <StyledButton className="btn-primary btn-sm ml5">사용확인</StyledButton>
                    </Popconfirm>
                  </div>
                );

              // 관리자면서 사용확인된 예약
              if (chkUser.is_chk === 1)
                return (
                  <div>
                    <span>{chkUser.name_kor}님이 사용완료</span>
                  </div>
                );

              // 관리자면서 노쇼한 예약
              if (chkUser.is_chk === 0)
                return (
                  <div>
                    <span>{chkUser.name_kor}님이 노쇼</span>
                  </div>
                );
            }

            // 관리자가 아니면서 남이 예약한 시간
            return (
              <div>
                <span>{chkUser.name_kor}님이 예약</span>
              </div>
            );
          },
        },
        {
          title: '안마의자(여)',
          align: 'center',
          dataIndex: 'value',
          render: (text, record, index) => {
            if (text === '1200' || text === '1230') return <span>점심 휴무</span>;

            const { formData, timeTable } = this.state;
            const userId = (formData && formData.USER_ID) || 0;
            const gender = (formData && formData.GENDER) || 'm';
            const APP_DT = (formData && formData.APP_DT) || '';
            const timeZone = (formData && formData.TIME_ZONE) || '';

            const fIdx = timeTable && timeTable.findIndex(user => user.gender === 'f' && user.time_zone === text);

            if (fIdx <= -1)
              return (
                <Checkbox
                  onChange={e => this.handleOnCheck(e.target.checked, index, record)}
                  checked={text === timeZone && gender === 'f'}
                  disabled={
                    gender !== 'f' ||
                    (moment() > moment(record.text.substring(0, 5), 'HH:mm') && moment().format('YYYY-MM-DD') >= moment(APP_DT).format('YYYY-MM-DD'))
                  }
                />
              );

            const chkUser = timeTable[fIdx] || {};

            // 예약했지만 관리자가 아니면 취소버튼 나옴
            if (userId === chkUser.reg_user_id && userId !== 1)
              return (
                <div>
                  <span>{chkUser.name_kor}님이 예약</span>
                  <Popconfirm title="취소하시겠습니까?" onConfirm={e => this.handleDelete(text)}>
                    <StyledButton className="btn-primary btn-sm ml5">취소</StyledButton>
                  </Popconfirm>
                </div>
              );

            // 관리자
            if (userId === 1) {
              // 관리자면서 사용확인 안 된 예약
              if (chkUser.is_chk === 2)
                return (
                  <div>
                    <span>{chkUser.name_kor}님이 예약</span>
                    <Popconfirm title="취소하시겠습니까?" onConfirm={e => this.handleDelete(text)}>
                      <StyledButton className="btn-primary btn-sm ml5">취소</StyledButton>
                    </Popconfirm>
                    <Popconfirm title="확인하시겠습니까?" onConfirm={() => this.handleConfirm(text, 1)}>
                      <StyledButton className="btn-primary btn-sm ml5">사용확인</StyledButton>
                    </Popconfirm>
                  </div>
                );

              // 관리자면서 사용확인된 예약
              if (chkUser.is_chk === 1)
                return (
                  <div>
                    <span>{chkUser.name_kor}님이 사용완료</span>
                  </div>
                );

              // 관리자면서 노쇼한 예약
              if (chkUser.is_chk === 0)
                return (
                  <div>
                    <span>{chkUser.name_kor}님이 노쇼</span>
                  </div>
                );
            }

            // 관리자가 아니면서 남이 예약한 시간
            return (
              <div>
                <span>{chkUser.name_kor}님이 예약</span>
              </div>
            );
          },
        },
      ],
    },
  ];

  render() {
    const { formData } = this.state;
    const { spinningOn, spinningOff } = this.props;
    return (
      <StyledContentsWrapper>
        <StyledHtmlTable>
          <table>
            <colgroup>
              <col width="16%" />
              <col width="17%" />
              <col width="16%" />
              <col width="17%" />
              <col width="16%" />
              <col width="18%" />
            </colgroup>
            <thead></thead>
            <tbody>
              <tr>
                <th colSpan={6} align="center">
                  <span style={{ fontSize: '18px', fontWeight: '500', color: '#000' }}>사용수칙</span>
                </th>
              </tr>
              <tr>
                <td style={{ borderRight: 'none', borderBottom: 'none' }}></td>
                <td colSpan={2} style={{ borderRight: 'none', borderBottom: 'none' }}>
                  <p style={{ fontWeight: '500' }}>
                    1. 건강관리실 내 건강증진실(안마의자)은 <span style={{ color: '#0000ff' }}>남/여 ROOM구분</span>
                  </p>
                  <p style={{ fontWeight: '500' }}>3. 일주일 단위로 예약 ☞1인 1일 1회, 1주 3회만 가능</p>
                </td>
                <td colSpan={3} style={{ borderRight: 'none', borderBottom: 'none' }}>
                  <p style={{ fontWeight: '500' }}>2. 운영시간 :월~금 08:30 ~ 17:30 (점심시간 제외 :12:00~13:00)</p>
                  <p style={{ fontWeight: '500' }}>4. 예약 후 사용하지 못할 시 예약 취소.</p>
                </td>
              </tr>
              <tr>
                <td colSpan={6} align="center">
                  <span style={{ color: '#0000ff', fontWeight: '500' }}>☞ 예약 후 미사용 시 다음주는 예약 불가</span>
                </td>
              </tr>
              <tr>
                <th>사번</th>
                <td>{(formData && formData.EMP_NO) || ''}</td>
                <th>이름</th>
                <td>{(formData && formData.NAME) || ''}</td>
                <th>소속</th>
                <td>{(formData && formData.DEPT) || ''}</td>
              </tr>
              <tr>
                <th>직위</th>
                <td>{(formData && formData.POSITION) || ''}</td>
                <th>지역</th>
                <td>{(formData && formData.BAREA_CD) || ''}</td>
                <th>신청일</th>
                <td>
                  <AntdDatePicker
                    className="ant-picker-xs"
                    disabledDate={this.disableDate}
                    defaultValue={moment(today)}
                    onChange={(date, strDate) => this.handleOnDateChange(strDate)}
                    allowClear={false}
                    style={{ width: '60%' }}
                  />
                  <div style={{ display: 'inline-block', position: 'absolute' }}>
                    <BuilderSave inputFormData={formData} getTimeTable={this.getTimeTable} spinningOn={spinningOn} spinningOff={spinningOff} />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </StyledHtmlTable>
        <br />
        <br />
        <AntdTable columns={this.columns} dataSource={timeList} pagination={false} />
      </StyledContentsWrapper>
    );
  }
}

const CustomInput = ({ sagaKey }) => <BizMicroDevBase sagaKey={`${sagaKey}_input`} component={Comp} />;

CustomInput.propTypes = {
  sagaKey: PropTypes.string,
};

Comp.propTypes = {
  sagaKey: PropTypes.string,
  getCallDataHandler: PropTypes.func,
  submitHandlerBySaga: PropTypes.func,
  spinningOn: PropTypes.func,
  spinningOff: PropTypes.func,
  result: PropTypes.object,
  profile: PropTypes.object,
};

Comp.defaultProps = {
  getCallDataHandler: () => {},
  submitHandlerBySaga: () => {},
  spinningOn: () => {},
  spinningOff: () => {},
  result: {},
  profile: { USER_ID: 1 },
};

export default CustomInput;
