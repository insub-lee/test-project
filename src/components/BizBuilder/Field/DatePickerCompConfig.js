import React, { Component } from 'react';
import { Select, DatePicker as AntdDatePicker } from 'antd';
import { debounce } from 'lodash';
import moment from 'moment';
import BizMicroDevBase from 'components/BizMicroDevBase';

const { Option } = Select;

class ComponentConfig extends Component {
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
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">기본값 타입 설정</span>
          <Select
            placeholder="기본값을 선택하십시오."
            style={{ width: '100%' }}
            defaultValue={configInfo && configInfo.property && configInfo.property.defaultType || 'default'}
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
    );
  }
}

const configer = ({ changeViewCompData, groupIndex, rowIndex, colIndex, configInfo }) => (
  <BizMicroDevBase
    id="componentConfig"
    changeViewCompData={changeViewCompData}
    groupIndex={groupIndex}
    rowIndex={rowIndex}
    colIndex={colIndex}
    configInfo={configInfo}
    component={ComponentConfig}
  ></BizMicroDevBase>
);

export default configer;
