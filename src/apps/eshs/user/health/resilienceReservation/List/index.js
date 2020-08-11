import React, { Component } from 'react';
import PropTypes from 'prop-types';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';

import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

import { Table, Checkbox, Popconfirm } from 'antd';
import moment from 'moment';
import request from 'utils/request';

import Input from '../Input';

const AntdTable = StyledAntdTable(Table);
class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedIndex: '',
      timetable: [],
    };
    this.handleGetTimeTable(
      moment().format('YYYYMMDD HH:mm:ss') ===
        moment()
          .startOf('week')
          .format('YYYYMMDD HH:mm:ss') ||
        moment().format('YYYYMMDD HH:mm:ss') ===
          moment()
            .endOf('week')
            .format('YYYYMMDD HH:mm:ss')
        ? ''
        : moment().format('YYYYMMDD HH:mm:ss'),
    );
  }

  timeTable = [
    { time: '08:30 ~ 09:00' },
    { time: '09:00 ~ 09:30' },
    { time: '09:30 ~ 10:00' },
    { time: '10:00 ~ 10:30' },
    { time: '10:30 ~ 11:00' },
    { time: '11:00 ~ 11:30' },
    { time: '11:30 ~ 12:00' },
    { time: '12:00 ~ 12:30' },
    { time: '12:30 ~ 13:00' },
    { time: '13:00 ~ 13:30' },
    { time: '13:30 ~ 14:00' },
    { time: '14:00 ~ 14:30' },
    { time: '14:30 ~ 15:00' },
    { time: '15:00 ~ 15:30' },
    { time: '15:30 ~ 16:00' },
    { time: '16:00 ~ 16:30' },
    { time: '16:30 ~ 17:00' },
    { time: '17:00 ~ 17:30' },
  ];

  columns = [
    {
      title: '시간',
      align: 'center',
      dataIndex: 'time',
    },
    {
      title: '건강증진실',
      align: 'center',
      children: [
        {
          title: '회복탄력성 상담 예약',
          align: 'center',
          render: (text, record, index) => {
            const { formData, extraApiData } = this.props;
            const userId = (extraApiData && extraApiData.getUserInfo && extraApiData.getUserInfo.userInfo && extraApiData.getUserInfo.userInfo.user_id) || 0;
            if (record.time === '12:00 ~ 12:30' || record.time === '12:30 ~ 13:00') {
              return <span>점심 휴무</span>;
            }

            if (this.isReserved(record.time)) {
              if (userId === 1 && this.getBookerInfo(record.time).is_chk === 2) {
                // 관리자면서 사용확인 안 된 예약
                return (
                  <div>
                    <span>{this.getBookerInfo(record.time).name_kor}님이 예약</span>
                    <Popconfirm title="취소하시겠습니까?" onConfirm={e => this.handleDelete(e, record.time)}>
                      <StyledButton className="btn-primary btn-sm ml5">취소</StyledButton>
                    </Popconfirm>
                    <Popconfirm title="확인하시겠습니까?" onConfirm={() => this.handleConfirm(record, 1)}>
                      <StyledButton className="btn-primary btn-sm ml5">사용확인</StyledButton>
                    </Popconfirm>
                  </div>
                );
              }

              if (userId === 1 && this.getBookerInfo(record.time).is_chk === 1) {
                // 관리자면서 사용확인된 예약
                return (
                  <div>
                    <span>{this.getBookerInfo(record.time).name_kor}님이 사용완료</span>
                  </div>
                );
              }

              if (userId === 1 && this.getBookerInfo(record.time).is_chk === 0) {
                // 관리자면서 노쇼한 예약
                return (
                  <div>
                    <span>{this.getBookerInfo(record.time).name_kor}님이 노쇼</span>
                  </div>
                );
              }

              if (userId === this.getBookerInfo(record.time).reg_user_id && userId !== 1) {
                // 예약했지만 관리자가 아니면 취소버튼 나옴
                return (
                  <div>
                    <span>{this.getBookerInfo(record.time).name_kor}님이 예약</span>
                    <Popconfirm title="취소하시겠습니까?" onConfirm={e => this.handleDelete(e, record, index)}>
                      <StyledButton className="btn-primary btn-sm ml5">취소</StyledButton>
                    </Popconfirm>
                  </div>
                );
              }

              return (
                // 관리자가 아니면서 남이 예약한 시간
                <div>
                  <span>{this.getBookerInfo(record.time).name_kor}님이 예약</span>
                </div>
              );
            }

            return (
              <Checkbox
                onChange={e => this.handleOnCheck(e, index, record)}
                checked={this.state.checkedIndex !== '' && this.state.checkedIndex === index}
                disabled={
                  moment() > moment(record.time.substring(0, 5), 'HH:mm') && moment().format('YYYY-MM-DD') >= moment(formData.APP_DT).format('YYYY-MM-DD')
                }
              />
            );
          },
        },
      ],
    },
  ];

  componentDidMount() {}

  static getDerivedStateFromProps(nextProps, prevState) {
    const { extraApiData } = nextProps;
    if (extraApiData.getTimetable) {
      if (prevState.timetable !== nextProps.extraApiData.getTimetable.timetable) {
        return { timetable: nextProps.extraApiData.getTimetable.timetable };
      }
    }
    return null;
  }

  isReserved = time => {
    const { timetable } = this.state;
    const reservedTimes = [];
    const startTime = moment(time.substring(0, 5), 'HH:mm').format('HHmm');
    if (timetable && timetable.length) {
      timetable.map(item => reservedTimes.push(item.time_zone || ''));
    }
    return reservedTimes.includes(startTime);
  };

  getBookerInfo = time => {
    const { timetable } = this.state;
    const startTime = moment(time.substring(0, 5), 'HH:mm').format('HHmm');
    return timetable.find(item => item.time_zone === startTime);
  };

  handleGetTimeTable = date => {
    const { sagaKey: id, getExtraApiData } = this.props;
    const apiArr = [
      {
        key: 'getTimetable',
        type: 'GET',
        url: `/api/eshs/v1/common/getreserveresiliencetimetable?date=${date}`,
      },
    ];
    getExtraApiData(id, apiArr);
  };

  handleOnCheck = (e, index, record) => {
    if (e.target.checked) {
      this.setState(
        {
          checkedIndex: index,
        },
        this.makeFormData(index, moment(record.time.substring(0, 5), 'HH:mm').format('HHmm')),
      );
    } else {
      this.setState(
        {
          checkedIndex: '',
        },
        this.makeFormData(undefined, undefined),
      );
    }
  };

  makeFormData = (index, time) => {
    const { sagaKey: id, changeFormData } = this.props;
    changeFormData(id, 'checkedIndex', index);
    changeFormData(id, 'TIME_ZONE', time);
  };

  handleDelete = (e, time) => {
    const { timetable } = this.state;
    const { sagaKey: id, workSeq, changeViewPage } = this.props;
    const timeZone = moment(time.substring(0, 5), 'HH:mm').format('HHmm');
    const appDt = moment(timetable[0].app_dt).format('YYYYMMDD');
    const paramMap = {
      timeZone,
      appDt,
    };

    request({
      method: 'DELETE',
      url: '/api/eshs/v1/common/getreserveresiliencetimetable',
      params: paramMap,
    });
    changeViewPage(id, workSeq, -1, 'LIST');
  };

  handleConfirm = (record, isChk) => {
    if (typeof isChk !== 'number') {
      return;
    }

    const { timetable } = this.state;
    const { sagaKey: id, workSeq, changeViewPage } = this.props;
    const paramMap = {
      timeZone: moment(record.time.substring(0, 5), 'HH:mm').format('HHmm'),
      appDt: moment(timetable[0].app_dt).format('YYYYMMDD'),
      isChk,
    };

    request({
      method: 'POST',
      url: `/api/eshs/v1/common/getreserveresiliencetimetable`,
      params: paramMap,
    });

    if (isChk) {
      changeViewPage(id, workSeq, -1, 'LIST');
    }
  };

  dateChange = () => {
    this.setState({
      checkedIndex: '',
    });
  };

  render() {
    const { columns, timeTable, handleGetTimeTable, dateChange } = this;
    const { changeFormData, getExtraApiData, extraApiData, saveTask, formData, sagaKey } = this.props;
    return (
      <StyledContentsWrapper>
        <Input
          changeFormData={changeFormData}
          getExtraApiData={getExtraApiData}
          extraApiData={extraApiData}
          saveTask={saveTask}
          formData={formData}
          sagaKey={sagaKey}
          handleGetTimeTable={handleGetTimeTable}
          dateChange={dateChange}
        />
        <AntdTable columns={columns} bordered dataSource={timeTable} pagination={false} />
      </StyledContentsWrapper>
    );
  }
}

List.propTypes = {
  sagaKey: PropTypes.string,
  getExtraApiData: PropTypes.func,
  extraApiData: PropTypes.object,
  changeFormData: PropTypes.func,
  formData: PropTypes.object,
  saveTask: PropTypes.string,
  workSeq: PropTypes.number,
  changeViewPage: PropTypes.func,
};

export default List;
