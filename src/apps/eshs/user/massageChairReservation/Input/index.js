import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Sketch from 'components/BizBuilder/Sketch';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import StyledButton from 'components/BizBuilder/styled/StyledButton';
import { Row, Col, DatePicker, Typography, Popconfirm } from 'antd';

import moment from 'moment';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
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
    this.handleGetUserInfo();
  }

  date = moment().format('YYYY-MM-DD');

  componentDidMount() {}

  handleGetUserInfo = () => {
    const { sagaKey: id, getExtraApiData } = this.props;
    const apiArr = [
      {
        key: 'getUserInfo',
        url: '/api/eshs/v1/common/userinfowithgender',
        type: 'GET',
      },
    ];
    getExtraApiData(id, apiArr);
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { extraApiData, changeFormData, sagaKey: id } = nextProps;
    if (extraApiData.getUserInfo) {
      if (prevState.userInfo !== extraApiData.getUserInfo) {
        changeFormData(id, 'gender', extraApiData.getUserInfo.userInfo.gender);
        return { userInfo: extraApiData.getUserInfo.userInfo };
      }
    }
    return null;
  }

  makeFormData = userInfo => {
    const { changeFormData, sagaKey: id } = this.props;
    changeFormData(id, 'userInfo', userInfo);
  };

  disableDate = current =>
    moment(current).format('YYYYMMDD') ===
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

  handleOnDateChange = date => {
    const { handleGetTimeTable } = this.props;
    handleGetTimeTable(date.format('YYYYMMDD') || moment().format('YYYYMMDD'));
    this.setState({
      selectedDate: moment(date).format('YYYY-MM-DD'),
    });
  };

  handleButtonClick = () => {
    // formData 체크해서 시간 비었으면 저장 안하게
    const { selectedDate, userInfo } = this.state;
    const { sagaKey: id, changeFormData, saveTask, formData, handleGetTimeTable } = this.props;
    if (formData.checkedIndex === undefined) {
      return;
    }

    switch (userInfo.gender) {
      case 'm':
        changeFormData(id, 'BED_NO', '05');
        break;
      case 'f':
        changeFormData(id, 'BED_NO', '06');
        break;
      default:
        break;
    }

    switch (userInfo.barea_cd) {
      case '구미':
        changeFormData(id, 'SITE', 'H3');
        break;
      case '청주':
        changeFormData(id, 'STIE', 'C1');
        break;
      default:
        break;
    }

    changeFormData(id, 'APP_DT', selectedDate);
    changeFormData(id, 'checkedIndex', 9999);
    this.setState({
      currentDate: selectedDate,
    });
    saveTask(id, id, handleGetTimeTable(moment(selectedDate).format('YYYYMMDD')));
  };

  render() {
    const { userInfo, currentDate } = this.state;
    const { formData } = this.props;
    return (
      <StyledViewDesigner>
        <Sketch>
          <div style={{ marginBottom: '10px' }}>
            <Row gutter={[24, 48]} type="flex" justify="center">
              <Col span={8}>
                <Typography.Title level={1} style={{ textAlign: 'center' }}>
                  사용수칙
                </Typography.Title>
              </Col>
            </Row>
            <Row gutter={[24, 48]} type="flex" justify="center">
              <Col span={8}>
                <Typography>
                  1. 건강관리실 내 건강증진실(안마의자)은 <span style={{ color: '#0000ff' }}>남/여 ROOM구분</span>
                </Typography>
              </Col>
            </Row>
            <Row gutter={[24, 48]} type="flex" justify="center">
              <Col span={8}>
                <Typography>2. 운영시간 :월~금 08:30 ~ 17:30 (점심시간 제외 :12:00~13:00) </Typography>
              </Col>
            </Row>
            <Row gutter={[24, 48]} type="flex" justify="center">
              <Col span={8}>
                <Typography>3. 일주일 단위로 예약 ☞1인 1주 3회만 가능</Typography>
              </Col>
            </Row>
            <Row gutter={[24, 48]} type="flex" justify="center">
              <Col span={8}>
                <Typography>4. 예약 후 사용하지 못할 시 예약 취소.</Typography>
              </Col>
            </Row>
            <Row gutter={[24, 48]} type="flex" justify="center">
              <Col span={8}>
                <Typography style={{ color: '#0000ff' }}>☞ 예약 후 미사용 시 다음주는 예약 불가 </Typography>
              </Col>
            </Row>
            <hr />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <Row gutter={[24, 48]} type="flex" justify="center">
              <Col span={2}>사번</Col>
              <Col span={4}>{userInfo.emp_no}</Col>
              <Col span={2}>이름</Col>
              <Col span={2}>{userInfo.name}</Col>
              <Col span={2}>
                {formData.checkedIndex === undefined ? (
                  <Popconfirm title="시간을 선택하세요">
                    <StyledButton className="btn-primary" onClick={this.handleButtonClick}>
                      예약
                    </StyledButton>
                  </Popconfirm>
                ) : (
                  <StyledButton className="btn-primary" onClick={this.handleButtonClick}>
                    예약
                  </StyledButton>
                )}
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
                <DatePicker disabledDate={this.disableDate} defaultValue={moment(currentDate)} onChange={this.handleOnDateChange} allowClear={false} />
              </Col>
            </Row>
            <hr />
          </div>
        </Sketch>
      </StyledViewDesigner>
    );
  }
}

Input.propTypes = {
  sagaKey: PropTypes.string,
  getExtraApiData: PropTypes.func,
  extraApiData: PropTypes.object,
  changeFormData: PropTypes.func,
  saveTask: PropTypes.string,
  formData: PropTypes.object,
  handleGetTimeTable: PropTypes.func,
};

export default Input;
