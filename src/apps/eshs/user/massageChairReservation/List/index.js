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
      checkedTime: '',
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
                checked={this.props.formData.checkedIndex !== '' && this.props.formData.checkedIndex === index}
                disabled={this.props.formData.gender !== 'm'}
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
                checked={this.props.formData.checkedIndex !== '' && this.props.formData.checkedIndex === index}
                disabled={this.props.formData.gender !== 'f'}
              ></Checkbox>
            ) : (
              ''
            ),
        },
      ],
    },
  ];

  componentDidMount() {}

  handleOnCheck = (e, index, record) => {
    if (e.target.checked) {
      this.setState(
        {
          checkedIndex: index,
          checkedTime: moment(record.time.substring(0, 5), 'HH:mm').format('HHmm'),
        },
        this.makeFormData(index, moment(record.time.substring(0, 5), 'HH:mm').format('HHmm')),
      );
    }
    this.setState({
      checkedIndex: '',
      checkedTime: '',
    });
  };

  makeFormData = (index, time) => {
    const { sagaKey: id, changeFormData } = this.props;
    changeFormData(id, 'checkedIndex', index);
    changeFormData(id, 'TIME_ZONE', time);
  };

  render() {
    const { changeFormData, getExtraApiData, extraApiData, saveTask, formData, sagaKey } = this.props;
    console.debug('@@LIST@@', this.state);
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
};

export default List;
