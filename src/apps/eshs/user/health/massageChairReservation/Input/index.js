import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Row, Col, DatePicker, Typography, Popconfirm } from 'antd';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';

import moment from 'moment';
import request from 'utils/request';

const AntdDatePicker = StyledDatePicker(DatePicker);

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      selectedDate: moment().format('YYYY-MM-DD'),
      noShowCount: 0,
      noShowDate: '',
      reserveCount: '',
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

  componentDidMount() {
    const { sagaKey: id, changeFormData } = this.props;
    changeFormData(id, 'APP_DT', this.state.selectedDate);
    this.reserveLimitCheck(moment(this.state.selectedDate).format('YYYY-MM-DD')).then(res => this.setState({ reserveCount: res.reservationCount.count }));
    this.updateNoShow();
    this.getNoShowCount().then(res => {
      if (res.noShowCount && !res.noShowCount.length) {
        return this.setState({
          noShowCount: 0,
        });
      }
      if (res.noShowCount && res.noShowCount.length && res.noShowCount[res.noShowCount.length - 1].count !== -1) {
        return this.setState({
          noShowCount: res.noShowCount.length,
          noShowDate: moment(res.noShowCount[res.noShowCount.length - 1].app_dt).format('YYYYMMDD'),
        });
      }
      return null;
    });
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
        changeFormData(id, 'gender', extraApiData.getUserInfo.userInfo.GENDER);
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
      moment(this.date)
        .add(1, 'week')
        .endOf('week')
        .format('YYYYMMDD') ||
    (current && current < moment().startOf('day'));

  handleOnDateChange = date => {
    const { handleGetTimeTable, sagaKey: id, changeFormData } = this.props;
    handleGetTimeTable(date.format('YYYYMMDD') || moment().format('YYYYMMDD'));
    this.setState(
      {
        selectedDate: moment(date).format('YYYY-MM-DD'),
      },
      changeFormData(id, 'APP_DT', moment(date).format('YYYY-MM-DD')),
      // changeFormData(id, 'checkedIndex', -1),
    );
    this.reserveLimitCheck(moment(date).format('YYYY-MM-DD')).then(res => this.setState({ reserveCount: res.reservationCount.count }));
    return this.props.dateChange();
  };

  handleButtonClick = () => {
    const { selectedDate, noShowCount, reserveCount, noShowDate } = this.state;
    const { sagaKey: id, saveTask, formData, handleGetTimeTable } = this.props;
    if (
      formData.checkedIndex === undefined ||
      this.isReservedToday() ||
      reserveCount >= 3 ||
      (noShowCount &&
        moment(selectedDate).format('w') ===
          moment(noShowDate)
            .add(1, 'week')
            .format('w'))
    ) {
      // formData 체크해서 시간 선택 안했거나, 노쇼했으면 예약 불가
      return;
    }

    this.makeFormData();

    saveTask(id, id, handleGetTimeTable(moment(selectedDate).format('YYYYMMDD')));
  };

  makeFormData = () => {
    const { changeFormData, sagaKey: id } = this.props;
    const { userInfo, selectedDate } = this.state;
    switch (userInfo.GENDER) {
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
  };

  isReservedToday = () => {
    const { extraApiData } = this.props;
    const { userInfo } = this.state;
    return extraApiData.getTimetable.timetable.findIndex(item => item.reg_user_id === userInfo.user_id) !== -1;
  };

  updateNoShow = async () => {
    const result = await request({
      method: 'PATCH',
      url: `/api/eshs/v1/common/getphysicaltherapynoshowcount?date=${moment().format('YYYYMMDD')}`,
    });
    return result.response;
  };

  reserveLimitCheck = async date => {
    const result = await request({
      method: 'GET',
      url: `/api/eshs/v1/common/getphysicaltheraptyreservation?date=${date}`,
    });
    return result.response;
  };

  getNoShowCount = () => {
    const getCount = async () => {
      const result = await request({
        url: `/api/eshs/v1/common/getphysicaltherapynoshowcount`,
        method: 'GET',
      });
      return result.response;
    };
    return getCount();
  };

  makePopconfirmTitle = () => {
    const { noShowCount, reserveCount, selectedDate, noShowDate } = this.state;
    const { formData } = this.props;
    if (formData.checkedIndex === undefined) {
      return '시간을 선택하세요.';
    }
    if (
      noShowCount &&
      moment(selectedDate) <
        moment(noShowDate)
          .add(1, 'week')
          .endOf('week') // 조건에 따라 삭제할 것, 7일 후인지, 다음 주 금요일 까지인지
    ) {
      return '예약 후 미사용으로 예약이 불가능합니다.';
    }
    if (this.isReservedToday()) {
      return '1일 1회만 예약이 가능합니다.';
    }
    if (reserveCount >= 3) {
      return '1주 3회까지 예약이 가능합니다.';
    }
    return '';
  };

  render() {
    const { userInfo, currentDate, reserveCount, selectedDate, noShowDate } = this.state;
    const { formData } = this.props;
    return (
      <ContentsWrapper>
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
            <Typography>3. 일주일 단위로 예약 ☞1인 1일 1회, 1주 3회만 가능</Typography>
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
        <div className="tableWrapper">
          <StyledHtmlTable>
            <table>
              <colgroup>
                <col width="15%" />
                <col width="18%" />
                <col width="15%" />
                <col width="18%" />
                <col width="15%" />
                <col width="18%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>사번</th>
                  <td>{userInfo.EMP_NO}</td>
                  <th>이름</th>
                  <td>{userInfo.NAME}</td>
                  <th>소속</th>
                  <td>{userInfo.DEPT}</td>
                </tr>
                <tr>
                  <th>직위</th>
                  <td>{userInfo.POSITION}</td>
                  <th>지역</th>
                  <td>{userInfo.BAREA_CD}</td>
                  <th>신청일</th>
                  <td>
                    <AntdDatePicker
                      className="ant-picker-xs"
                      disabledDate={this.disableDate}
                      defaultValue={moment(currentDate)}
                      onChange={this.handleOnDateChange}
                      allowClear={false}
                      style={{ width: '50%' }}
                    />
                    <Popconfirm
                      title={this.makePopconfirmTitle()}
                      disabled={
                        formData.checkedIndex !== undefined &&
                        !this.isReservedToday() &&
                        reserveCount < 3 &&
                        moment(selectedDate).format('w') !==
                          moment(noShowDate)
                            .add('1', 'week')
                            .format('w')
                      }
                    >
                      <StyledButton className="btn-gray btn-xs ml5" onClick={this.handleButtonClick}>
                        예약
                      </StyledButton>
                    </Popconfirm>
                  </td>
                </tr>
              </tbody>
            </table>
          </StyledHtmlTable>
        </div>
      </ContentsWrapper>
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
  dateChange: PropTypes.func,
};

export default Input;
