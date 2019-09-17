import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

import request from 'utils/request';

class WorkSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      selectedValue: '',
    };
  }

  componentDidMount() {
    const { preview } = this.props;
    if (!preview) {
      const { loadWorkSeq } = this.props;
      this.getData(loadWorkSeq).then(({ data }) => {
        this.setState({ list: data });
      });
    }
  }

  getData = async workSeq => {
    const url = `/api/builder/v1/work/taskList/${workSeq}`;
    const { response, error } = await request({
      url,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      method: 'GET',
    });
    const { list } = response;
    return { data: list || [] };
  };

  onChangeValue = value => {
    const { saveTempContents, name, contSeq, workKey, workValue } = this.props;
    const { list } = this.state;
    // 임시저장
    // saveTempContents(value, name, 'work-selector', contSeq);
    if (value !== undefined && value !== '') {
      const filterList = list.filter(item => item[workKey] === value);
      if (filterList && filterList.length > 0) {
        const selectedOptionText = filterList[0][workValue];
        const selectedValue = JSON.stringify({ key: value, values: selectedOptionText });
        this.setState({ selectedValue }, () => saveTempContents(selectedValue, name, 'work-selector', contSeq));
      }
    }
  };

  render() {
    const { list, selectedValue } = this.state;
    const { name, workKey, workValue, defaultValue } = this.props;

    return (
      <div style={{ width: 500 }}>
        <Select
          placeholder="select option"
          style={{ width: '100%' }}
          defaultValue={defaultValue && defaultValue.DETAIL ? defaultValue.DETAIL.key : ''}
          onChange={val => this.onChangeValue(val)}
        >
          {list.map(row => (
            <Select.Option key={row[workKey]} value={row[workKey]}>
              {`${row[workValue]}`}
            </Select.Option>
          ))}
        </Select>
        <input type="hidden" name={name} value={selectedValue} data-type="json" />
      </div>
    );
  }
}

WorkSelector.propTypes = {
  loadWorkSeq: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  workKey: PropTypes.string,
  workValue: PropTypes.string,
  // defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.object,
  preview: PropTypes.bool,
  saveTempContents: PropTypes.func,
  name: PropTypes.string,
  contSeq: PropTypes.number,
};

WorkSelector.defaultProsp = {
  loadWorkSeq: -1,
  workKey: '',
  workValue: '',
  defaultValue: {},
  preview: false,
  saveTempContents: () => {},
  name: '',
  contSeq: -1,
};

export default WorkSelector;
