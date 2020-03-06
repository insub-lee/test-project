import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Sketch from 'components/BizBuilder/Sketch';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';

import { Table, Checkbox } from 'antd';
import moment from 'moment';
import Input from '../Input';

// moment.locale('ko');
class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedIndex: '',
      validIndexArr: [],
      timetable: [],
      currentDate:
        moment().format('YYYYMMDD') ===
          moment()
            .startOf('week')
            .format('YYYYMMDD') ||
        moment().format('YYYYMMDD') ===
          moment()
            .endOf('week')
            .format('YYYYMMDD')
          ? ''
          : moment(),
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
            const { formData } = this.props;
            const { timetable } = this.state;
            // timetable.map(item => console.debug(item.time_zone));
            // this.disableCheckbox(index, record);
            if (record.time === '12:00 ~ 12:30' || record.time === '12:30 ~ 13:00') {
              return '';
            }

            if (!this.disableCheckbox(record.time.substring(0, 5))) {
              return (
                <Checkbox
                  onChange={e => this.handleOnCheck(e, index, record)}
                  checked={this.state.checkedIndex !== '' && this.state.checkedIndex === index}
                  disabled={formData.gender !== 'm'}
                />
              );
            }
            return <span>Reserved</span>;
          },
        },
        {
          title: '안마의자(여)',
          align: 'center',
          render: (text, record, index) => {
            if (record.time === '12:00 ~ 12:30' || record.time === '12:30 ~ 13:00') {
              return '';
            }
            // timetable에서 값 비교해서 disable 예약 있는 인덱스들 state에 저장
            return (
              <Checkbox
                onChange={e => this.handleOnCheck(e, index, record)}
                checked={this.state.checkedIndex !== '' && this.state.checkedIndex === index}
                // disabled={this.props.formData.gender !== 'f'}
                disabled={[]}
              />
            );
          },
        },
      ],
    },
  ];

  componentDidMount() {
    // const { currentDate } = this.state;
    // this.handleGetTimeTable(moment(currentDate).format('YYYYMMDD'));
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { extraApiData } = nextProps;
    if (extraApiData.getTimetable) {
      if (prevState.timetable !== nextProps.extraApiData.getTimetable) {
        return { timetable: nextProps.extraApiData.getTimetable.timetable };
      }
    }
    return null;
  }

  disableCheckbox = time => {
    const { timetable } = this.state;
    const reservedTimes = [];
    timetable.map(item => reservedTimes.push(moment(item.time_zone, 'HHmm').format('HH:mm')));
    console.debug(time, reservedTimes);
    return reservedTimes.includes(time);
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
      this.setState({
        checkedIndex: '',
      });
    }
  };

  makeFormData = (index, time) => {
    const { sagaKey: id, changeFormData } = this.props;
    changeFormData(id, 'checkedIndex', index);
    changeFormData(id, 'TIME_ZONE', time);
  };

  render() {
    // console.debug(this.state.timetable.timetable);
    this.disableCheckbox();
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
  apiArr: PropTypes.array,
};

const currentDate =
  moment().format('YYYYMMDD') ===
    moment()
      .startOf('week')
      .format('YYYYMMDD') ||
  moment().format('YYYYMMDD') ===
    moment()
      .endOf('week')
      .format('YYYYMMDD')
    ? ''
    : moment();

List.defaultProps = {
  apiArr: [
    {
      key: 'getTimetable',
      type: 'GET',
      url: `/api/eshs/v1/common/getphysicaltherapytimetable?date=${moment(currentDate).format('YYYYMMDD')}`,
    },
  ],
};

export default List;
