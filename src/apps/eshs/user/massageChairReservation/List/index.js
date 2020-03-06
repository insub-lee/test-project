import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Sketch from 'components/BizBuilder/Sketch';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import StyledButton from 'components/BizBuilder/styled/StyledButton';

import { Table, Checkbox } from 'antd';
import moment from 'moment';
import Input from '../Input';

// moment.locale('ko');
class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedIndex: '',
      // currentDate: '',
      timetable: [],
    };
    this.handleGetTimeTable(
      moment().format('YYYYMMDD') ===
        moment()
          .startOf('week')
          .format('YYYYMMDD') ||
        moment().format('YYYYMMDD') ===
          moment()
            .endOf('week')
            .format('YYYYMMDD')
        ? ''
        : moment().format('YYYYMMDD'),
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
      title: '건강증진실(안마의자)',
      children: [
        {
          title: '안마의자(남)',
          align: 'center',
          render: (text, record, index) => {
            const { formData, extraApiData } = this.props;
            if (record.time === '12:00 ~ 12:30' || record.time === '12:30 ~ 13:00') {
              return <span>점심 휴무</span>;
            }

            if (this.isReserved(record.time) && formData.gender === 'm') {
              if (
                extraApiData.getUserInfo.userInfo.user_id === this.getBookerInfo(record.time).reg_user_id ||
                extraApiData.getUserInfo.userInfo.user_id === 1
              ) {
                // 관리자이거나 예약자면 취소버튼 나옴
                return (
                  <div>
                    <span>{this.getBookerInfo(record.time).name_kor}님이 예약</span>
                    <StyledButton className="btn-primary" onClick={this.handleDeleteButtonClick}>
                      취소
                    </StyledButton>
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
                // disabled={formData.gender !== 'm' || moment() > moment(record.time, 'HH:mm')}
                disabled={formData.gender !== 'm'} // 테스트 용
              />
            );
          },
        },
        {
          title: '안마의자(여)',
          align: 'center',
          render: (text, record, index) => {
            const { formData } = this.props;
            if (record.time === '12:00 ~ 12:30' || record.time === '12:30 ~ 13:00') {
              return <span>점심 휴무</span>;
            }

            if (this.isReserved(record.time) && formData.gender === 'f') {
              // 나중에 권한 체크해서 관리자면 이름 나오게
              // 아니면 그냥 예약됨만 표시
              return <span>{this.getBookerName(record.time)}님이 예약</span>;
            }

            return (
              <Checkbox
                onChange={e => this.handleOnCheck(e, index, record)}
                checked={this.state.checkedIndex !== '' && this.state.checkedIndex === index}
                disabled={formData.gender !== 'f' || moment() > moment(record.time, 'HH:mm')}
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
      if (prevState.timetable !== nextProps.extraApiData.getTimetable) {
        return { timetable: nextProps.extraApiData.getTimetable.timetable };
      }
    }
    return null;
  }

  isReserved = time => {
    const { timetable } = this.state;
    const reservedTimes = [];
    const startTime = moment(time.substring(0, 5), 'HH:mm').format('HHmm');
    timetable.map(item => reservedTimes.push(item.time_zone));
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
        url: `/api/eshs/v1/common/getphysicaltherapytimetable?date=${date}`,
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

  handleDeleteButtonClick = () => {
    console.debug('@@@DELETE@@@');
  };

  render() {
    const { changeFormData, getExtraApiData, extraApiData, saveTask, formData, sagaKey } = this.props;
    return (
      <div>
        <Input
          changeFormData={changeFormData}
          getExtraApiData={getExtraApiData}
          extraApiData={extraApiData}
          saveTask={saveTask}
          formData={formData}
          sagaKey={sagaKey}
          handleGetTimeTable={this.handleGetTimeTable}
        />
        <StyledViewDesigner>
          <Sketch>
            <Table columns={this.columns} bordered dataSource={this.timeTable} pagination={false} />
          </Sketch>
        </StyledViewDesigner>
      </div>
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
};

export default List;
