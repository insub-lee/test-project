import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Sketch from 'components/BizBuilder/Sketch';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import StyledButton from 'components/BizBuilder/styled/StyledButton';
import { Row, Col, DatePicker } from 'antd';

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
  }

  componentDidMount() {
    this.handleGetUserInfo();
  }

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
      moment(this.state.selectedDate)
        .add(1, 'week')
        .endOf('week')
        .format('YYYYMMDD');

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
    // formData 체크해서 시간 비었으면 저장 안하게
    const { selectedDate, userInfo } = this.state;
    const { formData } = this.props;
    console.debug(formData.checkedIndex);
    const { sagaKey: id, changeFormData, saveTask } = this.props;
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
      case '청수':
        changeFormData(id, 'STIE', 'C1');
        break;
      default:
        break;
    }

    changeFormData(id, 'APP_DT', selectedDate);
    this.setState({
      currentDate: selectedDate,
    });
    saveTask(id, id, () => console.debug('SAVE TASK'));
  };

  render() {
    const { userInfo } = this.state;
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
};

export default Input;
