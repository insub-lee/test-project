import React, { Component } from 'react';
import { Select, DatePicker as AntdDatePicker } from 'antd';
import { debounce } from 'lodash';
import moment from 'moment';
import BizMicroDevBase from 'components/BizMicroDevBase';

const { Option } = Select;

/*
    목적 : View 목록 제목 컴포넌트 클릭시 생성되는 모달페이지의 ViewType 지정 Config
    변경전 : View Page 고정 모달 생성
    변경후 : View / Modify (선택형)
    create by. JeongHyun
*/
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

  render() {
    const { configInfo } = this.props;
    return (
      <>
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">모달 페이지 설정</span>
          <Select
            style={{ width: '100%' }}
            defaultValue={(configInfo && configInfo.property && configInfo.property.changeViewType) || 'VIEW'}
            onChange={value => this.handleChangeViewCompData('changeViewType', value)}
          >
            <Option value="VIEW" disable>View Page</Option>
            <Option value="MODIFY">Modify Page</Option>
          </Select>
        </div>
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
