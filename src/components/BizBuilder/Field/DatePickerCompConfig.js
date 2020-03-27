import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { Select, DatePicker as AntdDatePicker } from 'antd';
import { debounce } from 'lodash';
import moment from 'moment';

const { Option } = Select;

/*
    목적 : dataPicker Default Value 설정
    기본값 타입 설정 : default (초기값 없음), System Date (현재날짜), Custom Date(사용자 지정일)
    create by. JeongHyun
*/
class configer extends Component {
  constructor(props) {
    super(props);
    this.handleChangeViewCompData = debounce(this.handleChangeViewCompData, 500);
  }

  handleChangeViewCompData = (key, value) => {
    const { changeViewCompData, groupIndex, rowIndex, colIndex, configInfo } = this.props;
    configInfo.property[key] = value;
    changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', configInfo);
  };

  handleChangeDatePicker = (key, date) => {
    const customDate = moment(date).format('YYYY-MM-DD');
    this.handleChangeViewCompData(key, customDate);
  };

  render() {
    const { configInfo } = this.props;
    return (
      <>
        {configInfo && configInfo.property && configInfo.property.searchCondition !== 'BETWEEN' && (
          <>
            <div className="popoverItem popoverItemInput">
              <span className="spanLabel">기본값 타입 설정</span>
              <Select
                placeholder="기본값을 선택하십시오."
                style={{ width: '100%' }}
                defaultValue={(configInfo && configInfo.property && configInfo.property.defaultType) || 'default'}
                onChange={value => this.handleChangeViewCompData('defaultType', value)}
              >
                <Option value="default">Default</Option>
                <Option value="sysDate">System Date</Option>
                <Option value="customDate">Custom Date</Option>
              </Select>
            </div>
            {configInfo && configInfo.property && configInfo.property.defaultType === 'customDate' && (
              <div className="popoverItem popoverItemInput">
                <span className="spanLabel">사용자 지정값 설정</span>
                <AntdDatePicker
                  style={{ width: '100%' }}
                  onChange={date => this.handleChangeDatePicker('defaultDate', date)}
                  placeholder="지정할 날짜를 선택하세요."
                  defaultValue={configInfo && configInfo.property && configInfo.property.customDate && moment(configInfo.property.customDate)}
                />
              </div>
            )}
          </>
        )}
      </>
    );
  }
}

configer.propTypes = {
  configInfo: PropTypes.object,
  changeViewCompData: PropTypes.func,
  groupIndex: PropTypes.number,
  rowIndex: PropTypes.number,
  colIndex: PropTypes.number,
};

export default configer;
