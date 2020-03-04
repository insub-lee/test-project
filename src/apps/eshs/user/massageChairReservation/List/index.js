import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Sketch from 'components/BizBuilder/Sketch';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import StyledButton from 'components/BizBuilder/styled/StyledButton';

import { Table, Row, Col, DatePicker, Checkbox } from 'antd';
import moment from 'moment';

// moment.locale('ko');
class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedIndex: '',
      userInfo: {},
      checkedTime: '',
      selectedDate: moment().format('YYYY-MM-DD'),
      currentDate:
        moment().format('YYMMDD') ===
          moment()
            .startOf('week')
            .format('YYMMDD') ||
        moment().format('YYMMDD') ===
          moment()
            .endOf('week')
            .format('YYMMDD')
          ? ''
          : moment(),
    };
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
          dataIndex: 'male',
          render: (text, record, index) =>
            record.time !== '12:00 ~ 12:30' && record.time !== '12:30 ~ 13:00' ? (
              <Checkbox
                onChange={e => this.handleOnCheck(e, index, record)}
                checked={this.state.checkedIndex !== '' && this.state.checkedIndex === index}
                disabled={this.state.userInfo.gender !== 'm'}
              ></Checkbox>
            ) : (
              ''
            ),
        },
        {
          title: '안마의자(여)',
          align: 'center',
          dataIndex: 'female',
          render: (text, record, index) =>
            record.time !== '12:00 ~ 12:30' && record.time !== '12:30 ~ 13:00' ? (
              <Checkbox
                onChange={e => this.handleOnCheck(e, index, record)}
                checked={this.state.checkedIndex !== '' && this.state.checkedIndex === index}
                disabled={this.state.userInfo.gender !== 'f'}
              ></Checkbox>
            ) : (
              ''
            ),
        },
      ],
    },
  ];

  componentDidMount() {
    this.handleGetUserInfo();
  }

  handleGetUserInfo = () => {
    const { sagaKey: id, getExtraApiData, extraApiData } = this.props;
    const apiArr = [
      {
        key: 'getUserInfo',
        url: '/api/eshs/v1/common/userinfowithgender',
        type: 'GET',
      },
    ];
    getExtraApiData(id, apiArr);
    return extraApiData;
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { extraApiData } = nextProps;
    if (extraApiData.getUserInfo) {
      if (prevState.userInfo !== extraApiData.getUserInfo) {
        return { userInfo: extraApiData.getUserInfo.userInfo };
      }
    }
    return null;
  }

  disableDate = current =>
    moment(current).format('YYYYMMDD') ===
      moment(current)
        .startOf('week')
        .format('YYYYMMDD') ||
    moment(current).format('YYYYMMDD') ===
      moment(current)
        .endOf('week')
        .format('YYYYMMDD');

  handleOnCheck = (e, index, record) => {
    if (e.target.checked) {
      return this.setState({
        checkedIndex: index,
        checkedTime: moment(record.time.substring(0, 5), 'HH:mm').format('HHmm'),
      });
    }
    return this.setState({
      checkedIndex: '',
      checkedTime: '',
    });
  };

  handleOnDateChange = date => {
    this.handleGetTimeTable(date.format('YYYYMMDD'));
    this.setState({
      selectedDate: moment(date).format('YYYY-MM-DD'),
    });
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

  handleButtonClick = () => {
    const { checkedIndex, checkedTime, selectedDate, userInfo } = this.state;
    console.debug(checkedTime, selectedDate);
    const { sagaKey: id, changeFormData, saveTask } = this.props;
    if (checkedIndex === '') {
      return;
    }
    userInfo.gender === 'm' ? changeFormData(id, 'BED_NO', '05') : changeFormData(id, 'BED_NO', '06');
    userInfo.barea_cd === '구미' ? changeFormData(id, 'SITE', 'H3') : changeFormData(id, 'STIE', 'C1');
    changeFormData(id, 'TIME_ZONE', checkedTime);
    changeFormData(id, 'APP_DT', selectedDate);
    this.setState({
      currentDate: selectedDate,
    });
    saveTask(id, id, null);
  };

  render() {
    const { userInfo } = this.state;
    console.debug(this.state.currentDate);
    return (
      <StyledViewDesigner>
        <Sketch>
          <div style={{ marginBottom: '10px' }}>
            <Row gutter={[24, 48]} type="flex" justify="center">
              <Col span={2}>사번</Col>
              <Col span={4}>{userInfo.emp_no}</Col>
              <Col span={2}>이름</Col>
              <Col span={2}>{userInfo.name}</Col>
              <Col span={2}>
                <StyledButton className="btn-primary" onClick={this.handleButtonClick}>
                  예약
                </StyledButton>
              </Col>
              <Col span={2}>소속</Col>
              <Col span={4}>{userInfo.dept}</Col>
            </Row>
            <Row gutter={[24, 48]} type="flex" justify="center">
              <Col span={2}>직위</Col>
              <Col span={4}>{userInfo.POSITION}</Col>
              <Col span={2}>지역</Col>
              <Col span={4}>{userInfo.barea_cd}</Col>
              <Col span={2}>신청일</Col>
              <Col span={4}>
                <DatePicker disabledDate={this.disableDate} defaultValue={this.state.currentDate} onChange={this.handleOnDateChange} />
              </Col>
            </Row>
            <hr />
          </div>
          <Table columns={this.columns} bordered dataSource={this.timeTable} pagination={false} />
        </Sketch>
      </StyledViewDesigner>
    );
  }
}

List.propTypes = {
  sagaKey: PropTypes.string,
  getExtraApiData: PropTypes.func,
  extraApiData: PropTypes.object,
  changeFormData: PropTypes.func,
};

export default List;
