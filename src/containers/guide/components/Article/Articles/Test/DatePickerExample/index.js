import React, { Component } from 'react';
import moment from 'moment';
import * as feed from 'components/Feedback/functions';
import { DatePicker, Row, Col } from 'antd';

const { RangePicker } = DatePicker;
class DatePickerExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFromDate1: moment().format('YYYY-MM-DD'),
      searchToDate1: moment().format('YYYY-MM-DD'),
      searchFromDate2: moment().format('YYYY-MM-DD'),
      searchToDate2: moment().format('YYYY-MM-DD'),
    };
    this.onDateChange1 = this.onDateChange1.bind(this);
    this.onDateChange2 = this.onDateChange2.bind(this);
  }

  onDateChange1 = (value, valueString) => {
    if (moment.duration(value[1] - value[0]).as('months') > 3) {
      feed.error('조회기간은 세 달을 초과할 수 없습니다. ');
      return;
    }
    this.setState({
      searchFromDate1: valueString[0],
      searchToDate1: valueString[1],
    });
  };

  onDateChange2 = (value, valueString) => {
    // if (moment.duration(value[1] - value[0]).as('months') > 3) {
    //   feed.error('조회기간은 세 달을 초과할 수 없습니다. ');
    //   return;
    // }
    this.setState({
      searchFromDate2: valueString[0],
      searchToDate2: valueString[1],
    });
  };

  render() {
    return (
      <Row>
        <Col xl={24} style={{ margin: 20 }}>
          <RangePicker
            onChange={this.onDateChange1}
            style={{ width: '370px' }}
            value={[moment(this.state.searchFromDate1), moment(this.state.searchToDate1)]}
            allowClear={false}
            ranges={{ 오늘: [moment(), moment()], '이번 달': [moment().startOf('month'), moment().endOf('month')] }}
            format="YYYY-MM-DD HH:mm:ss"
            showTime={{
              hideDisabledOptions: true,
              defaultValue: { 시간: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')] },
            }}
          />
        </Col>
        <Col xl={24} style={{ margin: 20 }}>
          <RangePicker
            onChange={this.onDateChange2}
            style={{ width: '250px' }}
            value={[moment(this.state.searchFromDate2), moment(this.state.searchToDate2)]}
            allowClear={false}
            ranges={{ 오늘: [moment(), moment()], '이번 달': [moment().startOf('month'), moment().endOf('month')] }}
            format="YYYY-MM-DD"
          />
        </Col>
      </Row>
    );
  }
}
export default DatePickerExample;
