import React, { Component } from 'react';
import Sketch from 'components/BizBuilder/Sketch';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import StyledButton from 'components/BizBuilder/styled/StyledButton';

import { Table, Row, Col, DatePicker, Checkbox } from 'antd';
import moment from 'moment';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedIndex: '',
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
                name="male"
                onChange={e => this.handleOnCheck(e, index)}
                disabled={this.state.checkedIndex !== '' && this.state.checkedIndex !== index}
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
                name="male"
                onChange={e => this.handleOnCheck(e, index)}
                disabled={this.state.checkedIndex !== '' && this.state.checkedIndex !== index}
              ></Checkbox>
            ) : (
              ''
            ),
        },
      ],
    },
  ];

  disableDate = current => current && current > moment().startOf('week') && current < moment().endOf('week');

  handleOnCheck = (e, index) => {
    if (e.target.checked) {
      return this.setState({
        checkedIndex: index,
      });
    }
    return this.setState({
      checkedIndex: '',
    });
  };

  render() {
    console.debug(this.props);
    return (
      <StyledViewDesigner>
        <Sketch>
          <div style={{ marginBottom: '10px' }}>
            <Row gutter={[24, 48]} type="flex" justify="center">
              <Col span={2}>사번</Col>
              <Col span={4}>로그인사번</Col>
              <Col span={2}>이름</Col>
              <Col span={2}>
                <span>로그인이름</span>
              </Col>
              <Col span={2}>
                <StyledButton className="btn-primary">예약</StyledButton>
              </Col>
              <Col span={2}>소속</Col>
              <Col span={4}>로그인소속</Col>
            </Row>
            <Row gutter={[24, 48]} type="flex" justify="center">
              <Col span={2}>직위</Col>
              <Col span={4}>로그인직위</Col>
              <Col span={2}>지역</Col>
              <Col span={4}>로그인지역</Col>
              <Col span={2}>신청일</Col>
              <Col span={4}>
                <DatePicker disableDate={this.disableDate} />
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

export default List;
